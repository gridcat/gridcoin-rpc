/* eslint-disable max-classes-per-file */
import { expect } from 'chai';
import { IJsonRPC } from '../../src/lib/JsonRPC';
import { RPCBase } from '../../src/RPCBase';
import { RPCError } from '../../src/Errors/RpcError';

/**
 * Mock JSON-RPC client that captures requests and returns configurable responses
 */
class JsonRPCMock implements IJsonRPC {
  public lastCommand = '';

  public lastParams: any[] = [];

  public response: any = { result: null, error: null };

  request(command: string, parameters: any[]): Promise<any> {
    this.lastCommand = command;
    this.lastParams = parameters;
    return Promise.resolve(this.response);
  }
}

/**
 * Expose the protected call() method for testing
 */
class TestableRPCBase extends RPCBase {
  public async testCall<T>(command: string, ...params: any[]): Promise<T> {
    return this.call<T>(command, ...params);
  }
}

const configMock = { host: 'localhost', port: 1751 };

describe('RPCBase', () => {
  let mock: JsonRPCMock;
  let rpc: TestableRPCBase;

  beforeEach(() => {
    mock = new JsonRPCMock();
    rpc = new TestableRPCBase(configMock, mock);
  });

  describe('parameter filtering', () => {
    it('should strip trailing undefined parameters', async () => {
      mock.response = { result: 'ok' };
      await rpc.testCall('somecommand', 'a', 'b', undefined, undefined);
      expect(mock.lastParams).to.deep.equal(['a', 'b']);
    });

    it('should strip undefined parameters in the middle', async () => {
      mock.response = { result: 'ok' };
      await rpc.testCall('somecommand', 'a', undefined, 'b', undefined);
      expect(mock.lastParams).to.deep.equal(['a', 'b']);
    });

    it('should pass all parameters when none are undefined', async () => {
      mock.response = { result: 'ok' };
      await rpc.testCall('somecommand', 'a', 1, true);
      expect(mock.lastParams).to.deep.equal(['a', 1, true]);
    });

    it('should pass an empty array when all parameters are undefined', async () => {
      mock.response = { result: 'ok' };
      await rpc.testCall('somecommand', undefined, undefined);
      expect(mock.lastParams).to.deep.equal([]);
    });

    it('should pass an empty array when no parameters given', async () => {
      mock.response = { result: 'ok' };
      await rpc.testCall('somecommand');
      expect(mock.lastParams).to.deep.equal([]);
    });

    it('should preserve false, 0, and empty string parameters', async () => {
      mock.response = { result: 'ok' };
      await rpc.testCall('somecommand', false, 0, '');
      expect(mock.lastParams).to.deep.equal([false, 0, '']);
    });

    it('should preserve array and object parameters', async () => {
      mock.response = { result: 'ok' };
      const arr = ['addr1', 'addr2'];
      const obj = { address: 'test', amount: 1.5 };
      await rpc.testCall('somecommand', arr, obj);
      expect(mock.lastParams).to.deep.equal([arr, obj]);
    });

    it('should forward the correct command string', async () => {
      mock.response = { result: 'ok' };
      await rpc.testCall('getwalletinfo');
      expect(mock.lastCommand).to.equal('getwalletinfo');
    });
  });

  describe('camelCase conversion', () => {
    it('should convert snake_case keys to camelCase', async () => {
      mock.response = {
        result: {
          wallet_version: 60000,
          unlocked_until: 0,
          staking_active: true,
        },
      };
      const result = await rpc.testCall<any>('getwalletinfo');
      expect(result).to.have.property('walletVersion', 60000);
      expect(result).to.have.property('unlockedUntil', 0);
      expect(result).to.have.property('stakingActive', true);
    });

    it('should convert nested snake_case keys deeply', async () => {
      mock.response = {
        result: {
          side_staking: {
            local_side_staking_enabled: true,
            side_staking_allocations: [
              { allocation_pct: 10, some_address: 'abc' },
            ],
          },
        },
      };
      const result = await rpc.testCall<any>('getstakinginfo');
      expect(result.sideStaking).to.have.property('localSideStakingEnabled', true);
      expect(result.sideStaking.sideStakingAllocations[0]).to.have.property('allocationPct', 10);
      expect(result.sideStaking.sideStakingAllocations[0]).to.have.property('someAddress', 'abc');
    });

    it('should NOT convert the p2sh key', async () => {
      mock.response = {
        result: {
          p2sh: 'some_address_hash',
          other_field: 'value',
        },
      };
      const result = await rpc.testCall<any>('decodescript');
      expect(result).to.have.property('p2sh', 'some_address_hash');
      expect(result).to.have.property('otherField', 'value');
    });

    it('should handle null result', async () => {
      mock.response = { result: null };
      const result = await rpc.testCall<null>('walletlock');
      expect(result).to.be.null;
    });

    it('should handle string result without conversion', async () => {
      mock.response = { result: 'some_hash_value' };
      const result = await rpc.testCall<string>('getbestblockhash');
      expect(result).to.equal('some_hash_value');
    });

    it('should handle numeric result', async () => {
      mock.response = { result: 42 };
      const result = await rpc.testCall<number>('getblockcount');
      expect(result).to.equal(42);
    });

    it('should handle array of objects', async () => {
      mock.response = {
        result: [
          { address_type: 'p2pkh', is_valid: true },
          { address_type: 'p2sh', is_valid: false },
        ],
      };
      const result = await rpc.testCall<any[]>('listreceivedbyaddress');
      expect(result[0]).to.have.property('addressType', 'p2pkh');
      expect(result[0]).to.have.property('isValid', true);
      expect(result[1]).to.have.property('addressType', 'p2sh');
    });
  });

  describe('addPoll answer joining', () => {
    it('should join answers with semicolons when passed through call', async () => {
      mock.response = { result: { title: 'test' } };
      const answers = ['yes', 'no', 'maybe'];
      // Simulate what Voting.addPoll does: join answers before calling
      await rpc.testCall('addpoll', 'survey', 'Test', 30, 'Question?', answers.join(';'), 1, 1, 'http://example.com');
      expect(mock.lastParams[4]).to.equal('yes;no;maybe');
    });

    it('should pass empty string for yes/no/abstain polls', async () => {
      mock.response = { result: { title: 'test' } };
      const answers: string[] = [];
      await rpc.testCall('addpoll', 'survey', 'Test', 30, 'Question?', answers.join(';'), 1, 1, 'http://example.com');
      expect(mock.lastParams[4]).to.equal('');
    });
  });

  describe('error handling', () => {
    it('should throw RPCError when response contains error', async () => {
      mock.response = {
        result: null,
        error: {
          code: -4,
          message: 'Wallet is locked',
        },
      };
      try {
        await rpc.testCall('sendtoaddress', 'addr', 10);
        expect.fail('Should have thrown');
      } catch (e) {
        expect(e).to.be.instanceof(RPCError);
        expect((e as RPCError).message).to.equal('Wallet is locked');
        expect((e as RPCError).code).to.equal(-4);
      }
    });

    it('should throw RPCError with default values', async () => {
      mock.response = {
        result: null,
        error: {
          code: 0,
          message: '',
        },
      };
      try {
        await rpc.testCall('badcommand');
        expect.fail('Should have thrown');
      } catch (e) {
        expect(e).to.be.instanceof(RPCError);
        expect((e as RPCError).code).to.equal(0);
      }
    });

    it('should NOT throw when error is absent', async () => {
      mock.response = { result: { status: 'ok' } };
      const result = await rpc.testCall<any>('getinfo');
      expect(result).to.have.property('status', 'ok');
    });

    it('should NOT throw when error is null', async () => {
      mock.response = { result: 'ok', error: null };
      const result = await rpc.testCall<string>('ping');
      expect(result).to.equal('ok');
    });
  });
});
