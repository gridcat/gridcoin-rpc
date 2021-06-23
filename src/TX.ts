import assert from 'assert';

export class TX {
  constructor(private transaction: string) {
    this.validate();
  }

  private validate(): void {
    assert(this.transaction.length === 64);
  }

  public toString(): string {
    return this.transaction;
  }
}
