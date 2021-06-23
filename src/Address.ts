import assert from 'assert';

const prefixes = [
  'Rw', 'Rx', 'Ry', 'Rz',
  'S1', 'S2', 'S3', 'S4',
  'S5', 'S6', 'S7', 'S8',
  'S9', 'SE', 'SA', 'SD',
  'SF', 'SG', 'SH', 'SJ',
  'SK', 'SL', 'SC', 'SB',
  'SM',
  // multisig
  '2N', '2M',
];

const allowedCharacters = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

export class Address {
  constructor(private address: string) {
    this.validate();
  }

  public isMultisig(): boolean {
    return this.address[0] === '2' && this.address.length === 35;
  }

  private validate(): void {
    assert(this.address.length === 34 || this.address.length === 35);
    // respect testnet
    if (this.address[0] !== 'n' && this.address[0] !== 'm') {
      assert(prefixes.includes(this.address.slice(0, 2)));
    }
    const re = new RegExp(`^[${allowedCharacters}]+$`);
    assert(re.test(this.address));
  }

  public toString(): string {
    return this.address;
  }
}
