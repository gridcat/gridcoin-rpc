/* eslint-disable max-len */
import chai, { expect } from 'chai';
import chaiString from 'chai-string';
import * as bitcoin from 'bitcoinjs-lib';
import { GridcoinRPC } from '../../src/GridcoinRPC';

chai.use(chaiString);

// const validAddresses = [
//   'muuGx4fwdNFU7ZsoTEHAXs3BtsaxgRKFRE',
//   'mkKj2dJREPDaztCvVZ9uLeFEfWnmR4xg5q',
//   'mpdD5xjx82oF9E4HGZwLaTZEx5Hu5xFi6J',
//   'mnAESTuL4bVX9zzKwwn6CU4WbDW4Tz8q9Z',
//   'mx8w3ZNnk119V9z35EqJNNLwiukzDt3UNR',
//   // multisig
//   '2NAQFNoQQvwFWhC4bEcJUf7XqrzBwzgujZw',
// ];

describe.skip('Wallet', () => {
  let inst: GridcoinRPC;
  beforeEach(async () => {
    inst = new GridcoinRPC({
      host: 'localhost',
      port: 47812,
      username: '',
      password: '',
    });
    await inst.repairWallet();
  });

  // describe.skip('checkwallet', () => {
  //   it('should check wallet', async () => {
  //     const res = await inst.checkWallet();
  //     expect(res.walletCheckPassed).to.be.true;
  //   });
  // });

  describe.skip('burn', () => {
    afterAll(async () => {
      // Somehow those bad transactions makes wallet broken
      await inst.repairWallet();
    });
    it('should throw if amount is zero', async () => {
      try {
        await inst.burn(0);
      } catch (e) {
        expect(e.message).to.be.equal('Invalid amount');
      }
    });
    it('should not accept wrong hexdecimal string', async () => {
      try {
        await inst.burn(0.000000001, 'FEFEF');
      } catch (e) {
        expect(e.message).to.startsWith('Data must be hexadecimal string');
      }
    });
    it('should throw error if amount is too low', async () => {
      try {
        await inst.burn(0.000000001, 'cab00d1e');
      } catch (e) {
        expect(e.message).to.startWith('Error: The transaction was rejected.');
      }
    });
    // @payment
    // it('should burn amount', async (done) => {
    //   const res = await inst.burn(0.00000001, '7e57');
    //   expect(res).to.be.instanceOf(Transaction);
    //   expect(res.toString()).to.be.a('string');
    //   done();
    // });
  });

  describe.skip('decodeRawTransaction', () => {
    it('should error if transaction string is wrong', async () => {
      try {
        await inst.decodeRawTransaction('123p[');
      } catch (e) {
        expect(e.message).to.be.equal('TX decode failed');
      }
    });
    it('should decode raw transaction', async () => {
      const res = await inst.decodeRawTransaction('0200000042ca8560046bbb57a6914cec267c43205506ac01b7a5ec984767a17dca1bbd8706f109d29b0000000069463043021f29aa827b3d0473a676273a27d59d6e68a4e74c4f8ed20a6f15dc35cad2fa06022079ca485f8a2d541f275afac111064c947aa16ca2785c67de3235b6a5e2ab0149012102ec894c8fadcb2b1c46ec0d3b3411a580700035425bfbf4a969dd9dd75709ae84ffffffffcc3c293343e2105b81be8f1ef4ea5a25c0673c317f6cec5f79b9160b030e1365020000006a47304402202a4adb131f56d62b434d767bdd1751b12fd07b1c4a45762bbcac678e7f333c7902201abd36e57fc777d6d9a27e3e0feec629ad3ea1e55c634ef3d313dcffbe3cc93f012103119ed725b94caac743063714a794d14132e91c487849be229637dfc59f269104ffffffff4ee1bbceb3e9a3d40d74ff941f945b616b6fa05764caf5435779e2433b3b2d6c020000006a47304402206b8527f399c95e1d50d6c558cfc6f5832f7e50872671bfef3fbacfad5b6b3fac02201dc9ceab177a3bd2f7c4581385c0cf6460d4dc8ba14fe7334ec7132f7c505feb012103119ed725b94caac743063714a794d14132e91c487849be229637dfc59f269104ffffffffe7ea3375f2b494e65a1ea385e1e2412db59932ab9d4052f6211a2560ffd22bb301000000484730440220081557a67a79fb3f0281cb78cd2dd8a665ac65baa153b6dacde6b545d68cc4570220073d9cf8bcf568ea045b3e4082384a1d25dbfc269d484f8dbdaa62278901f41a01ffffffff0265861000000000001976a914df5008cfa882ccf8e40a03aac7c6f756092d418188acd83d1088150000001976a91412c251c49ec2729fb37daaa39a3537482e3c0ae188ac0000000000');
      expect(res.txid).to.be.equal('90ee8a4913707517b38ee234ce8678f3683468cb45d28d61a282fccae01d0a2e');
    });
  });

  describe.skip('decodeScript', () => {
    it('should throw if script is not valid hex', async () => {
      try {
        await inst.decodeScript('I am an arm');
      } catch (e) {
        expect(e.message).to.startWith('argument must be hexadecimal string');
      }
    });
    it('should throw if script is not valid hex', async () => {
      const res = await inst.decodeScript('FEFE');
      expect(res.type).to.be.equal('nonstandard');
      expect(res.asm).to.be.equal('OP_PUBKEY OP_PUBKEY');
      expect(res.p2sh).to.be.equal('2N1kLnUe1CKi3WEZHwRTroCaHuxAWJ6zETs');
    });
    it('should decode the script', async () => {
      const res = await inst.decodeScript('47304402201d303f7fda1bf1a1dff96f55c9e50b8df6dfe44034143dc25e1dce8c4330093f0220230f523e2615346f13c69a21c1f501ed455f19a0a043e578fd04db47a0e95cf601210320ecdd2c9e106d5854e0eec995bfc8f73ead1507773700bde366e7009c63a0ac');
      expect(res.type).to.be.equal('nonstandard');
      expect(res.p2sh).to.be.equal('2NAk7mkzbqPBufE2YJvroz8TRohY8MmCfoS');
      expect(res.asm).to.be.equal('304402201d303f7fda1bf1a1dff96f55c9e50b8df6dfe44034143dc25e1dce8c4330093f0220230f523e2615346f13c69a21c1f501ed455f19a0a043e578fd04db47a0e95cf601 0320ecdd2c9e106d5854e0eec995bfc8f73ead1507773700bde366e7009c63a0ac');
    });
  });

  describe.skip('getBalance', () => {
    it('should get balance', async () => {
      const res = await inst.getBalance();
      expect(res).to.be.a('number');
    });
  });

  describe.skip('getWalletInfo', () => {
    it('should get the wallet info', async () => {
      const res = await inst.getWalletInfo();
      expect(Object.keys(res).length).to.be.equal(8);
      expect(res.walletversion).to.be.a('number');
      expect(res.balance).to.be.a('number');
      expect(res.newmint).to.be.a('number');
      expect(res.stake).to.be.a('number');
      expect(res.keypoololdest).to.be.a('number');
      expect(res.staking).to.be.a('boolean');
      expect(res.miningError).to.be.a('string');
    });
  });

  describe.skip('multisig address', () => {
    it('should create multisig ', async () => {
      const keyPair = bitcoin.ECPair.makeRandom();
      const res = await inst.addMultisigAddress(1, [keyPair.publicKey.toString('hex')]);
      expect(res.toString()).to.be.a('string');
    });
    it('should throw and error if public key gets used multiple times', async (done) => {
      const keyPair = bitcoin.ECPair.makeRandom();
      await inst.addMultisigAddress(1, [keyPair.publicKey.toString('hex')]);
      try {
        await inst.addMultisigAddress(1, [keyPair.publicKey.toString('hex')]);
      } catch (e) {
        done();
      }
    });
  });
});
