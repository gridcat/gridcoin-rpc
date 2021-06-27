import { BackupPrivateKeys } from '../contracts/backupPrivateKeys';
import { BackupWallet } from '../contracts/backupWallet';
import { BalanceDetail } from '../contracts/balanceDetail';
import { CheckWallet } from '../contracts/checkwallet';
import { Output, RawTransaction } from '../contracts/rawTransaction';
import { Script } from '../contracts/script';
import { DetailedRawTransaction, Transaction } from '../contracts/transaction';
import { WalletInfo } from '../contracts/walletInfo';
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
   * @memberof Wallet
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
   * @memberof Wallet
   */
  public async checkWallet(): Promise<CheckWallet> {
    return this.call<CheckWallet>('checkwallet');
  }

  /**
   * Create a transaction spending the given inputs and creating new outputs.
   *
   * Outputs can be addresses or data.
   * Returns hex-encoded raw transaction.
   * Note that the transaction's inputs are not signed, and
   * it is not stored in the wallet or transmitted to the network.
   *
   * @param {RawTransaction[]} transactions - A json array of json objects
   * @example
   * [
   *   {
   *     "txid":"id",    (string, required) The transaction id
   *     "vout":n        (numeric, required) The output number
   *   }
   *   ,...
   * ]
   * @param {Output} outputs - a json object with outputs
   * @example
   *  {
   *    "address": x.xxx   (numeric, required) The key is the bitcoin address, the value is the CURRENCY_UNIT amount
   *    "data\": "hex",     (string, required) The key is "data", the value is hex encoded data
   *    ...
   *  }
   * @returns {Promise<{ transaction: string }>}
   * @memberof Wallet
   */
  public async createRawTransaction(
    transactions: RawTransaction[],
    outputs: Output,
  ): Promise<{ transaction: string }> {
    return this.call<{ transaction: string }>(
      'createrawtransaction',
      JSON.stringify(transactions),
      JSON.stringify(outputs),
    );
  }

  /** @todo: consolidatemsunspent */

  /**
   * Return a JSON object representing the serialized, hex-encoded transaction
   *
   * @param {string} rawTransaction - hex string
   * @returns {Promise<Transaction>}
   * @memberof Wallet
   */
  public async decodeRawTransaction(rawTransaction: string): Promise<Transaction> {
    return this.call<Transaction>('decoderawtransaction', rawTransaction);
  }

  /**
   * Decode a hex-encoded script
   *
   * @param {string} script - hex string
   * @returns {Promise<Script>}
   * @memberof Wallet
   */
  public async decodeScript(script: string): Promise<Script> {
    return this.call<Script>('decodescript', script);
  }

  /** @todo: dumpprivkey */
  /** @todo: dumpwallet */
  /** @todo: encryptwallet */

  /**
   * Returns the account associated with the given address.
   *
   * @param {string} gridcoinAddress
   * @returns {Promise<string>} - an account name
   * @memberof Wallet
   */
  public async getAccount(gridcoinAddress: Address): Promise<string> {
    return this.call<string>('getaccount', gridcoinAddress);
  }

  /**
   * Returns the current Gridcoin address for receiving payments to this account.
   * @description
   * If <account> does not exist, it will be created along with an associated new address that will be returned.
   *
   * @param {string} account - an account name
   * @returns {Promise<Address>} - GRC address
   * @memberof Wallet
   */
  public async getAccountAddress(account: string): Promise<Address> {
    return this.call<Address>('getaccountaddress', account);
  }

  /**
   * Returns the list of addresses for the given account.
   *
   * @param {string} account - the account name
   * @returns {Promise<Address[]>} - a list of addresses
   * @memberof Wallet
   */
  public async getAddressesByAccount(account: string): Promise<Address[]> {
    return this.call<Address[]>('getaddressesbyaccount', account);
  }

  /**
   * Get current balance
   * @description
   * If account is not specified, returns the server's total available balance
   * If account is specified, returns the balance in the account
   * Note that the account "" is not the same as leaving the parameter out
   * The server total may be different to the balance in the default "" account.
   *
   * @param {string} [account='*'] - The selected account, or "*" for entire wallet. It may be the default account using
   * @param {number} [minConf=1] - Only include transactions confirmed at least this many times.
   * @param {boolean} [includeWatchOnly=false] - Also include balance in watchonly addresses (@see importAddress)
   * @returns {Promise<number>}
   * @memberof Wallet
   */
  public async getBalance(
    account = '*',
    minConf = 1,
    includeWatchOnly = false,
  ): Promise<number> {
    return this.call<number>('getbalance', account, minConf, includeWatchOnly);
  }

  /**
   * Lists outputs similar to listtransactions that compose the entire balance
   *
   * @param {number} [minConf=1] - Only include transactions confirmed at least this many times
   * @param {boolean} [includeWatchOnly=false] - Also include balance in watchonly addresses (@see importAddress)
   * @returns {Promise<BalanceDetail>}
   * @memberof Wallet
   */
  public async getBalanceDetail(
    minConf = 1,
    includeWatchOnly = false,
  ): Promise<BalanceDetail> {
    return this.call<BalanceDetail>('getbalancedetail', minConf, includeWatchOnly);
  }

  /**
   * Returns a new Gridcoin address for receiving payments.
   * @description
   * If [account] is specified, it is added to the address book
   * so payments received with the address will be credited to [account].
   *
   * @param {string} [account]
   * @returns {Promise<string>}
   * @memberof Wallet
   */
  public async getNewAddress(account?: string): Promise<Address> {
    return this.call<Address>('getnewaddress', account);
  }

  /**
   * Returns new public key for coinbase generation.
   *
   * @param {string} [account]
   * @returns {Promise<PublicKey>}
   * @memberof Wallet
   */
  public async getNewPubkey(account?: string): Promise<PublicKey> {
    return this.call<PublicKey>('getnewpubkey', account);
  }

  /**
   * returns a string that is serialized, hex-encoded data for txid
   *
   * @param {TX} txid
   * @returns {Promise<string>}
   * @memberof Wallet
   */
  public async getRawTransaction(txid: TX): Promise<string> {
    return this.call<string>('getrawtransaction', txid);
  }

  /**
   * returns an Object with information about txid
   *
   * @param {TX} txid
   * @returns {Promise<DetailedRawTransaction>}
   * @memberof Wallet
   */
  public async getRawTransactionVerbose(txid: TX): Promise<DetailedRawTransaction> {
    return this.call<DetailedRawTransaction>('getrawtransaction', txid, true);
  }

  /**
   * Get a string that is serialized, hex-encoded data for <txid> from the wallet.
   *
   * @param {TX} txid
   * @returns {Promise<string>}
   * @memberof Wallet
   */
  public async getRawWalletTransaction(txid: TX): Promise<string> {
    return this.call<string>('getrawwallettransaction', txid);
  }

  /**
   * Returns the total amount received by addresses with [account] in transactions with at least [minconf] confirmations.
   * If [account] not provided return will include all transactions to all accounts.
   *
   * @param {string} account - the account name
   * @param {number} [minconf=1] - the minimum number of confirmations
   * @returns {Promise<number>} - the number of coins received
   * @deprecated
   * @memberof Wallet
   */
  public async getReceivedByAccount(account: string, minconf = 1): Promise<number> {
    return this.call<number>('getreceivedbyaccount', account, minconf);
  }

  /**
   * Returns the amount received by <gridcoinaddress> in transactions with at least [minconf] confirmations.
   * @description
   * It correctly handles the case where someone has sent to the address in multiple transactions.
   * Keep in mind that addresses are only ever used for receiving transactions.
   * Works only for addresses in the local wallet, external addresses will always show 0.
   *
   * @param {string} gridcoinAddress - the address
   * @param {number} [minconf=1] - the minimum number of confirmations
   * @returns {Promise<number>} - the number of coins received
   * @memberof Wallet
   */
  public async getReceivedByAddress(
    gridcoinAddress: string,
    minconf = 1,
  ): Promise<number> {
    return this.call<number>('getreceivedbyaddress', gridcoinAddress, minconf);
  }

  /**
   * Get detailed information about in-wallet transaction <txid>
   *
   * @param {TX} txid - The transaction id
   * @param {boolean} [includeWatchOnly=false] - Whether to include watchonly addresses in balance calculation and details
   * @returns {Promise<Transaction>}
   * @memberof Wallet
   */
  public async getTransaction(
    txid: TX,
    includeWatchOnly = false,
  ): Promise<Transaction> {
    return this.call<Transaction>('gettransaction', txid, includeWatchOnly);
  }

  /**
   * returns the unconfirmed balance in the wallet
   *
   * @returns {Promise<number>}
   * @memberof Wallet
   */
  public async getUnconfirmedBalance(): Promise<number> {
    return this.call<number>('getunconfirmedbalance');
  }

  /**
   * Returns useful information about current wallet state.
   *
   * @returns {Promise<WalletInfo>}
   * @memberof Wallet
   */
  public async getWalletInfo(): Promise<WalletInfo> {
    return this.call<WalletInfo>('getwalletinfo');
  }

  /** @todo: importprivkey */
  /** @todo: importwallet */

  /**
   * Fills the keypool.
   *
   * @param {number} newSize
   * @returns {Promise<null>}
   * @memberof Wallet
   */
  public async keyPoolRefill(newSize: number): Promise<null> {
    return this.call('keypoolrefill', newSize);
  }
}
