import { expect } from 'chai';
import { Address } from '../../src/Address';

const validAddresses = [
  'SBqubTKufqwpupnZsvzC3kSv9MCLrFXEUz',
  'S2hj7QcMbfwytaZDYYjutcZQEJKVr1jbLB',
  'mhE9F4Cixhx9Dn8cB4Uf2EXLMCJR7muAFZ',
];

const invalidAddresses = [
  'dsadadas',
  'kopdkfpvdfv',
  '123123123213213123123',
  'SBqubTKufqwpupnZsvzC3kSv9MCLrFXE',
  'sBqubTKufqwpupnZsvzC3kSv9MCLrFXEUz',
  'S2hj7QcMbfwytaZDYYjutcZQEJKVr1jbLl',
];

describe('Address', () => {
  it('should be constructed with correct addresses', () => {
    validAddresses.forEach((address: string) => {
      const addr = new Address(address);
      expect(addr.toString()).to.be.equal(address);
    });
  });
  it('should throw if address is wrong', () => {
    invalidAddresses.forEach((address: string) => {
      expect(() => new Address(address)).to.throw();
    });
  });
});
