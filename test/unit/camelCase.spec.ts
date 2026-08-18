import { expect } from 'chai';
import { camelCaseKey, camelCaseKeys } from '../../src/lib/camelCase';
import golden from '../fixtures/camelcase-golden.json';

const EXCLUDED = ['p2sh'];

/**
 * The fixture records what camelcase-keys@7.0.2 produced.
 * Where we differ, the intended output is listed here rather than edited into the fixture,
 * so every difference is visible.
 */
const INTENTIONAL_DIVERGENCES: Record<string, string> = {
  // An excluded token matches a leading word too, so the daemon's
  // `p2sh_address` keeps its `p2sh` intact instead of becoming `p2ShAddress`.
  p2sh_address: 'p2shAddress',
};

describe('camelCase', () => {
  describe('golden fixture', () => {
    const entries = Object.entries(golden as Record<string, string>);

    it('covers every response key the daemon emits', () => {
      expect(entries.length).to.be.greaterThan(900);
    });

    it('matches camelcase-keys@7.0.2 on every key, bar the declared divergences', () => {
      const mismatches = entries
        .map(([key, frozen]) => {
          const expected = INTENTIONAL_DIVERGENCES[key] || frozen;
          const actual = Object.keys(camelCaseKeys({ [key]: 1 }, EXCLUDED))[0];
          if (actual === expected) {
            return null;
          }
          return `${JSON.stringify(key)}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`;
        })
        .filter((mismatch): mismatch is string => mismatch !== null);

      expect(mismatches, mismatches.join('\n')).to.have.lengthOf(0);
    });

    it('diverges from the frozen output only where declared', () => {
      const diverged = entries
        .filter(([key, frozen]) => Object.keys(camelCaseKeys({ [key]: 1 }, EXCLUDED))[0] !== frozen)
        .map(([key]) => key);

      expect(diverged).to.deep.equal(Object.keys(INTENTIONAL_DIVERGENCES));
    });
  });

  describe('key transform', () => {
    it('converts separator delimited keys', () => {
      expect(camelCaseKey('total_credit')).to.equal('totalCredit');
      expect(camelCaseKey('reject-reason')).to.equal('rejectReason');
      expect(camelCaseKey('m_mrc_tx_map_size')).to.equal('mMrcTxMapSize');
    });

    it('lowercases a leading uppercase run', () => {
      expect(camelCaseKey('MoneySupply')).to.equal('moneySupply');
      expect(camelCaseKey('IsSuperBlock')).to.equal('isSuperBlock');
      expect(camelCaseKey('CPID')).to.equal('cpid');
      expect(camelCaseKey('UTXOs consolidated')).to.equal('utxOsConsolidated');
    });

    it('preserves capitals that already start a word', () => {
      expect(camelCaseKey('final_scriptSig')).to.equal('finalScriptSig');
    });

    it('breaks a word at a digit followed by a letter', () => {
      expect(camelCaseKey('bip32_derivs')).to.equal('bip32Derivs');
      expect(camelCaseKey('a1b2c3')).to.equal('a1B2C3');
      // without an exclusion, p2sh splits on the digit boundary
      expect(camelCaseKey('p2sh_address')).to.equal('p2ShAddress');
    });

    it('leaves keys that are already camelCase alone', () => {
      expect(camelCaseKey('addednode')).to.equal('addednode');
      expect(camelCaseKey('fooBar')).to.equal('fooBar');
    });
  });

  describe('traversal', () => {
    it('converts nested objects', () => {
      expect(camelCaseKeys({ outer_key: { inner_key: 1 } })).to.deep.equal({ outerKey: { innerKey: 1 } });
    });

    it('converts objects inside arrays', () => {
      expect(camelCaseKeys([{ a_b: 1 }, { c_d: 2 }])).to.deep.equal([{ aB: 1 }, { cD: 2 }]);
    });

    it('honours the exclude list', () => {
      expect(camelCaseKeys({ p2sh: 'x', total_credit: 1 }, EXCLUDED)).to.deep.equal({ p2sh: 'x', totalCredit: 1 });
    });

    it('keeps an excluded token intact when it leads the key', () => {
      // decodescript returns `p2sh`, createhtlc returns `p2sh_address`
      expect(camelCaseKeys({ p2sh_address: 'S1' }, EXCLUDED)).to.deep.equal({ p2shAddress: 'S1' });
    });

    it('only treats an excluded token as leading when a separator follows', () => {
      expect(camelCaseKeys({ p2shAddress: 'S1' }, EXCLUDED)).to.deep.equal({ p2ShAddress: 'S1' });
    });

    it('maps a full createhtlc response onto CreateHtlcResult', () => {
      const response = {
        p2sh_address: 'S1',
        redeem_script: 'ab',
        sender_pubkey: '02',
        receiver_pubkey: '03',
        hash: 'ff',
        timeout: 1,
        txid: 'de',
      };
      expect(camelCaseKeys(response, EXCLUDED)).to.deep.equal({
        p2shAddress: 'S1',
        redeemScript: 'ab',
        senderPubkey: '02',
        receiverPubkey: '03',
        hash: 'ff',
        timeout: 1,
        txid: 'de',
      });
    });

    it('passes non-object values through', () => {
      expect(camelCaseKeys(null)).to.equal(null);
      expect(camelCaseKeys('a_string')).to.equal('a_string');
      expect(camelCaseKeys(42)).to.equal(42);
      expect(camelCaseKeys(true)).to.equal(true);
    });

    it('does not walk non-plain objects', () => {
      const date = new Date();
      expect(camelCaseKeys({ some_date: date })).to.deep.equal({ someDate: date });
    });
  });
});
