import { BackupPrivateKeys } from '../contracts/backupPrivateKeys';
import { BackupWallet } from '../contracts/backupWallet';
import { CheckWallet } from '../contracts/checkwallet';
import { RPCBase } from '../RPCBase';
import {
  Address,
  Hex,
  PublicKey,
  TX,
} from '../types';

export class Wallet extends RPCBase {
  /**
   * Add a nrequired-to-sign multisignature address to the wallet.
   *
   * @description
   * Adds a multisignature address to the wallet.
   * Returns the address addeded.
   * Requires to tell the number of keys needed for a transaction and list of
   * keys (keys are either addresses or a hexadecimal public key).
   * If an account is given, the address will go into that account.
   * Multisignature addresses make it so that you can share a wallet with multiple people and
   * require nrequired people to approve of a transaction. The maximum number keys is 16.
   * @example
   * grcRPC.addmultisigaddress(2, ['SBqubTKufqwpupnZsvzC3kSv9MCLrFXEUz', 'mhE9F4Cixhx9Dn8cB4Uf2EXLMCJR7muAFZ']);
   *
   * @param {number} nrequired - The minimum (m) number of signatures required to spend this m-of-n multisig script.
   * @param {(Array<Address> | Array<PublicKey>)} keys - A public key against which signatures will be checked.
   * @param {string} [account] - The account name in which the address should be stored. Leave blank for the default account.
   * @returns {Promise<Address> | never}
   * @memberof Wallet
   */
  public async addMultisigAddress(
    nrequired: number,
    keys: Address[] | PublicKey[],
    account?: string,
  ): Promise<Address> | never {
    return this.call<Address>(
      'addmultisigaddress',
      nrequired,
      keys,
      account,
    );
  }

  /**
   * Adds a reedemscript specified in hex to the wallet.
   * Will return the address generated.
   * If account is given, the pay to script hash will go into that account.
   *
   * @param {Hex} redeemScript
   * @param {string} [account]
   * @returns {Promise<Address>}
   * @memberof Wallet
   */
  public async addRedeemScript(
    redeemScript: Hex,
    account?: string,
  ): Promise<Address> {
    return this.call<Address>(
      'addredeemscript',
      redeemScript,
      account,
    );
  }

  /**
   * Creates a backup of the private keys and creates a keys.dat files (also includes the date in the filename).
   * The data in the file is formatted like this: Address: ADDRESS, Secret: PRIVATE KEY.
   * File location and "result": true will be given if it successes, otherwise it will show an error message.
   * Requires the wallet to be fully unlocked
   *
   * @returns {(Promise<BackupPrivateKeys> | never)}
   * @memberof Wallet
   */
  public async backupPrivateKeys(): Promise<BackupPrivateKeys> | never {
    return this.call<BackupPrivateKeys>('backupprivatekeys');
  }

  /**
   * Creates a backup of the wallet.dat and gridcoinresearch.conf files (it also adds dates in the backup files’ names).
   * Returns if it was successful for each file
   * The files will be created in the walletbackups folder.
   * See the Config Wiki Page to find the location for your operating system of the walletbackups folder and other Gridcoin files
   * @see https://gridcoin.us/wiki/config-file
   *
   * @returns {Promise<BackupWallet>}
   * @memberof Wallet
   */
  public async backupWallet(): Promise<BackupWallet> {
    return this.call<BackupWallet>('backupwallet');
  }

  /**
   * Creates a transaction that will send the given amount (rounded to 0.00000001) to no one making the coins disappear permanently.
   * No one can get back the coins spent by this command.
   * If [hex string] is specified, it will add on to the script used in the transaction.
   *
   * Requires the wallet to be fully unlocked
   *
   * @param {number} amount - Amount to be burned down
   * @param {string} [hexString]
   * @returns {Promise<string>}
   * @memberof GridcoinRPC
   */
  public async burn(amount: number, hexString?: Hex): Promise<TX> {
    return this.call<TX>('burn', amount, hexString);
  }

  /**
   * Checks that the wallet is reporting the correct balance and is not missing any transactions.
   * Returns { walletCheckPassed: true } if it finds no issues. On error it will return:
   * {
   *   mismatchedSpentCoins: nMismatchSpent,
   *   amountInQuestion: nBalanceInQuestion
   * }
   * with nMismatchSpent numbers showing the number of transactions missed (either counted when it shouldn’t be or not counted when it should)
   * and nBalanceInQuestion showing the amount involved in those transactions (absolute value, does not subtract)
   *
   * @returns {Promise<any>}
   * @memberof GridcoinRPC
   */
  public async checkWallet(): Promise<CheckWallet> {
    return this.call<CheckWallet>('checkwallet');
  }
}
