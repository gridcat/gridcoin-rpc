import { AddressValidation, PubKeyValidation } from '../contracts/validation';
import { BackupPrivateKeys } from '../contracts/backupPrivateKeys';
import { BackupWallet } from '../contracts/backupWallet';
import { BalanceDetail } from '../contracts/balanceDetail';
import { WalletFailStatus, WalletSuccessStatus } from '../contracts/checkwallet';
import { KeysPair } from '../contracts/keysPair';
import { ListSinceBlock } from '../contracts/listSinceBolck';
import { RainByMagnitude } from '../contracts/rainByMagnitude';
import { Output, RawTransaction } from '../contracts/rawTransaction';
import { Receivement } from '../contracts/receivement';
import { Reserve } from '../contracts/reserve';
import { Script } from '../contracts/script';
import { StakeListing } from '../contracts/stake';
import { DetailedRawTransaction, Transaction } from '../contracts/transaction';
import { SigHashType, TransactionDependencies, TransactionSigned } from '../contracts/transactionRaw';
import { TransactionShort } from '../contracts/transactionShort';
import { TransactionUnspent } from '../contracts/transactionUnspent';
import { UnspentReport, UTXO } from '../contracts/utxo';
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
  public async checkWallet(): Promise<WalletFailStatus | WalletSuccessStatus> {
    return this.call<WalletFailStatus | WalletSuccessStatus>('checkwallet');
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
      transactions as any,
      outputs,
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

  /**
   * Returns UniValue that has account names as keys, account balances as values.
   *
   * @deprecated
   * @param {number} [minConf=1] - Only include transactions with at least this many confirmations
   * @param {boolean} [includeWatchOnly=false] Include balances in watchonly addresses (@see importaddress)
   * @returns {Promise<{ [key: string]: number }>} - The property name is the account name, and the value is the total balance for the account
   * @memberof Wallet
   */
  public async listAccounts(
    minConf = 1,
    includeWatchOnly = false,
  ): Promise<{ [key: string]: number }> {
    return this.call('listaccounts', minConf, includeWatchOnly);
  }

  /**
   * Lists groups of addresses which have had their common ownership
   * made public by common use as inputs or as the resulting change in past transactions
   *
   * @returns {Promise<[string, number][][]>}
   * @memberof Wallet
   */
  public async listAddressGroupings(): Promise<[string, number][][]> {
    return this.call('listaddressgroupings');
  }

  /** @todo: listreceivedbyaccount */

  /**
   * List balances by receiving address.
   *
   * @param {number} [minConf=1] - The minimum number of confirmations before payments are included.
   * @param {boolean} [includeEmpty=false] - Whether to include addresses that haven't received any payments.
   * @param {boolean} [includeWatchOnly=false] - Whether to include watchonly addresses (see 'importaddress').
   * @returns {Promise<Receivement[]>}
   * @memberof Wallet
   */
  public listReceivedByAddress(
    minConf = 1,
    includeEmpty = false,
    includeWatchOnly = false,
  ): Promise<Receivement[]> {
    return this.call<Receivement[]>(
      'listreceivedbyaddress',
      minConf,
      includeEmpty,
      includeWatchOnly,
    );
  }

  /**
   * Get all transactions in blocks since block [blockhash], or all transactions if omitted
   *
   * @param {string} [blockHash] - The block hash to list transactions since
   * @param {number} [targetConfirmations] - The confirmations required, must be 1 or more
   * @param {boolean} [includeWatchonly] - Include transactions to watchonly addresses (@see importaddress)
   * @returns {Promise<ListSinceBlock>}
   * @memberof GridcoinRPC
   */
  public async listSinceBlock(
    blockHash?: string,
    targetConfirmations?: number,
    includeWatchonly?: boolean,
  ): Promise<ListSinceBlock> {
    return this.call<ListSinceBlock>(
      'listsinceblock',
      blockHash,
      targetConfirmations,
      includeWatchonly,
    );
  }

  /**
   * Returns count most recent stakes.
   *
   * @param {number} [count=10]
   * @returns {Promise<StakeListing[]>}
   * @memberof Wallet
   */
  public async listStakes(count = 10): Promise<StakeListing[]> {
    return this.call<StakeListing[]>('liststakes', count);
  }

  /**
   * Returns up to 'count' most recent transactions skipping the first 'from' transactions for account 'account'.
   *
   * @param {string} [account='*'] - The account name. If not included, it will list all transactions for all accounts.
   * @param {number} [count=10] - The number of transactions to return
   * @param {number} [from=0] - The number of transactions to skip
   * @param {boolean} [includeWatchonly=false] - Include transactions to watchonly addresses (@see importaddress) If is set true, it will list sent transactions as well
   * @returns {Promise<ITransactionShort>}
   * @memberof Wallet
   */
  public async listTransactions(
    account = '*',
    count = 10,
    from = 0,
    includeWatchonly = false,
  ): Promise<TransactionShort[]> {
    return this.call<TransactionShort[]>(
      'listtransactions',
      account,
      count,
      from,
      includeWatchonly,
    );
  }

  /**
   * Returns array of unspent transaction outputs with between minconf and maxconf (inclusive) confirmations
   * Optionally filtered to only include txouts paid to specified addresses
   * Results are an array of Objects, each of which has
   * {txid, vout, scriptPubKey, amount, confirmations}
   *
   * @param {number} [minConf]
   * @param {number} [maxConf]
   * @param {...Address[]} addresses
   * @returns {Promise<TransactionUnspent[]>}
   * @memberof Wallet
   */
  public async listUnspent(
    minConf?: number,
    maxConf?: number,
    ...addresses: Address[]
  ): Promise<TransactionUnspent[]> {
    return this.call<TransactionUnspent[]>('listunspent', minConf, maxConf, ...addresses);
  }

  /** @todo: consolidateunspent */

  /**
   * Make a public/private key pair.
   *
   * @param {string} [prefix] - is optional preferred prefix for the public key
   * @returns {Promise<KeysPair>}
   * @memberof Wallet
   */
  public async makeKeyPair(prefix?: string): Promise<KeysPair> {
    return this.call<KeysPair>('makekeypair', prefix);
  }

  /** @todo: maintainbackups */

  /**
   * rain coins by magnitude on network
   *
   * @param {string} project - Required: If a project is specified, rain will be limited to that project. Use * for network-wide.
   * @param {number} amount - Required: Specify amount of coins to be rained in double precision float
   * @param {string} [message] - Optional: Provide a message rained to all rainees
   * @returns {Promise<RainByMagnitude>}
   * @memberof Wallet
   */
  public async rainByMagnitude(
    project: string,
    amount: number,
    message?: string,
  ): Promise<RainByMagnitude> {
    return this.call<RainByMagnitude>('rainbymagnitude', project, amount, message);
  }

  /**
   * Repair wallet if checkwallet reports any problem.
   *
   * @returns {Promise<RepairWallet>}
   * @memberof Wallet
   */
  public async repairWallet(): Promise<WalletSuccessStatus | WalletFailStatus> {
    return this.call<WalletSuccessStatus | WalletFailStatus>('repairwallet');
  }

  /**
   * Resend any failed or unsent transactions.
   * Requires unlocked wallet
   *
   * @returns {Promise<null>}
   * @memberof Wallet
   */
  public async resendTx(): Promise<null> {
    return this.call('resendtx');
  }

  /**
   * Reserved amount secures a balance in wallet that can be spendable at anytime.
   * However reserve will secure utxo(s) of any size to respect this setting.
   * If no parameters provided current setting is printed
   *
   * @param {boolean} [reserve] - is true or false to turn balance reserve on or off.
   * @param {number} [amount] - is a real and rounded to cent
   * @returns {Promise<Reserve>}
   * @memberof Wallet
   */
  public async reserveBalance(reserve?: boolean, amount?: number): Promise<Reserve> {
    return this.call<Reserve>('reservebalance', reserve, amount);
  }

  /**
   * Searches a block range for a specified address with unspent utxos
   * and displays them in a json response with the option of exporting
   * to file
   *
   * @param {Address} address - Multi-signature address
   * @param {number} blockStart - Block number to start search from
   * @param {number} blockEnd - Block number to end search on
   * @param {string} [exports] - Exports to a file in backup-dir/rpc in format of multisigaddress-datetime.type
   * @param {boolean} [type] - Export to a file with file type (xml, txt or json -- Required if export true)
   * @returns {Promise<[UTXO[], UnspentReport]>}
   * @memberof Wallet
   */
  public async scanForUnspent(
    address: Address,
    blockStart: number,
    blockEnd: number,
    exports?: boolean,
    type?: string,
  ): Promise<[UTXO[], UnspentReport]> {
    return this.call(
      'scanforunspent',
      address,
      blockStart,
      blockEnd,
      exports,
      type,
    );
  }

  /**
   * Sends <amount> of Gridcoin from <account> to <gridcoinaddress>.
   *
   * @param {string} account - Account FROM
   * @param {Address} address - Address TO
   * @param {number} amount - Amount to send
   * @param {number} [minConf] - is the minimum number of confirmations for a UTXO to be used.
   * @param {string} [comment] - is a personal comment about what the transaction is for (doesn’t go into the transaction, it is only stored locally).
   * @param {string} [commentTo] - is also a personal comment about who you are sending to (also only local).
   * @param {string} [message] - is a message/comment that is sent publicly on the transaction.
   * @returns {Promise<TX>}
   * @memberof Wallet
   */
  public async sendFrom(
    account: string,
    address: Address,
    amount: number,
    minConf?: number,
    comment?: string,
    commentTo?: string,
    message?: string,
  ): Promise<TX> {
    return this.call<TX>(
      'sendfrom',
      account,
      address,
      amount,
      minConf,
      comment,
      commentTo,
      message,
    );
  }

  /**
   * Send from <fromaccount> to a list of addresses.
   * Use '' if you don’t want to limit to one account label. Addresses should be listed in JSON format.
   *
   * @param {string} account -  - Account FROM
   * @param {{ [key: string]: number }} recipients - { Address1: amount1, Address2: amount2, ... }
   * @param {number} [minConf=1] - is the minimum number of confirmations for a UTXO to be used.
   * @param {string} [comment] - is a personal comment about what the transaction is for (doesn’t go into the transaction, it is only stored locally).
   * @returns {Promise<any>}
   * @memberof Wallet
   */
  public async sendMany(
    account: string,
    recipients: { [key: string]: number },
    minConf = 1,
    comment?: string,
  ): Promise<TX> {
    return this.call<TX>(
      'sendmany',
      account,
      recipients,
      minConf,
      comment,
    );
  }

  /**
   * Submits raw transaction (serialized, hex-encoded) to local node and network
   *
   * @param {string} rawTransaction - raw transaction (serialized, hex-encoded)
   * @returns {Promise<TX>}
   * @memberof Wallet
   */
  public async sendRawTransaction(rawTransaction: string): Promise<TX> {
    return this.call<TX>('sendrawtransaction', rawTransaction);
  }

  /**
   * Sends <amount> of Gridcoin to <gridcoinaddress>.
   *
   * @param {Address} address - Recipient address
   * @param {number} amount - is a real and is rounded to the nearest 0.000001
   * @param {string} [comment] - a comment used to store what the transaction is for. This is not part of the transaction, just kept in your wallet.
   * @param {string} [commentTo] - a comment to store the name of the person or organization to which you're sending the transaction. This is not part of the transaction, just kept in your wallet
   * @param {string} [message] - Optional message to add to the receiver.
   * @returns {Promise<TX>}
   * @memberof Wallet
   */
  public async sendToAddress(
    address: Address,
    amount: number,
    comment?: string,
    commentTo?: string,
    message?: string,
  ): Promise<TX> {
    return this.call<TX>(
      'sendtoaddress',
      address,
      amount,
      comment,
      commentTo,
      message,
    );
  }

  /**
   * Sets the account associated with the given address.
   * Assigning address that is already assigned to the same account will create a new address associated with that account.
   *
   * @param {Address} address
   * @param {string} account
   * @returns {Promise<null>}
   * @memberof Wallet
   */
  public async setAccount(address: Address, account: string): Promise<null> {
    return this.call('setaccount', address, account);
  }

  /**
   * Set the transaction fee per kilobyte paid by transactions created by this wallet.
   *
   * @param {number} amount - TX fee, rounds to 0.00000001 GRC
   * @returns {Promise<boolean>}
   * @memberof Wallet
   */
  public async setTXfee(amount: number): Promise<boolean> {
    return this.call('settxfee', amount);
  }

  /**
   * Returns a signed a message using the private key from <Gridcoinaddress>.
   * Lets you prove that this message came from the owner of an address.
   * You can verify a signed message with the verify message command.
   * (It will not send this message anywhere. You have to do that)
   *
   * @param {Address} address
   * @param {string} message
   * @returns {Promise<string>} - Base64 signature
   * @memberof Wallet
   */
  public async signMessage(address: Address, message: string): Promise<string> {
    return this.call('signmessage', address, message);
  }

  /**
   * Sign inputs for raw transaction (serialized, hex-encoded).
   *
   *
   * @param {string} rawTransaction - raw transaction (serialized, hex-encoded)
   * @param {TransactionDependencies[]|null} transactionDependencies - is an array of previous transaction outputs that this transaction depends on but may not yet be in the blockchain.
   * @param {string[]|null} privateKeys - is an array of base58-encoded private keys that, if given, will be the only keys used to sign the transaction
   * @param {SigHashType} sigHashType - is a string that is one of six values; ALL, NONE, SINGLE or ALL|ANYONECANPAY, NONE|ANYONECANPAY, SINGLE|ANYONECANPAY.
   * @returns {Promise<TransactionSigned>}
   * @memberof Wallet
   */
  public async signRawTransaction(
    rawTransaction: string,
    transactionDependencies: TransactionDependencies[] | null,
    privateKeys: string[] | null,
    sigHashType: SigHashType,
  ): Promise<TransactionSigned> {
    return this.call<TransactionSigned>(
      'signrawtransaction',
      rawTransaction,
      transactionDependencies as any,
      privateKeys,
      sigHashType,
    );
  }

  /**
   * Return information about <gridcoinaddress>.
   * @description
   * The validateaddress RPC accepts a block
   * verifies it is a valid addition to the block chain
   * and broadcasts it to the network.
   *
   * @param {Address} gridcoinAddress
   * @returns {Promise<AddressValidation>}
   * @memberof GridcoinRPC
   */
  public async validateAddress(gridcoinAddress: Address): Promise<AddressValidation> {
    return this.call<AddressValidation>('validateaddress', gridcoinAddress);
  }

  /**
   * Return information about <gridcoinpubkey>.
   *
   * @param {PublicKey} gridcoinPubkey
   * @returns {Promise<IAddress>}
   * @memberof GridcoinRPC
   */
  public async validatePubkey(gridcoinPubkey: PublicKey): Promise<PubKeyValidation> {
    return this.call<PubKeyValidation>('validatepubkey', gridcoinPubkey);
  }

  /**
   * Verify a signed message.
   * @description
   * The P2PKH address corresponding to the private key which made the signature.
   * A P2PKH address is a hash of the public key corresponding to the private key which made the signature.
   * When the ECDSA signature is checked, up to four possible ECDSA public keys will be reconstructed from the signature;
   * each key will be hashed and compared against the P2PKH address provided to see if any of them match.
   * If there are no matches, signature validation will fail.
   *
   * @param {Address} gridcoinAddress - The gridcoin address to use for the signature.
   * @param {string} signature - The signature provided by the signer in base 64 encoding.
   * @param {string} message - The message that was signed.
   * @returns {Promise<boolean>}
   * @memberof GridcoinRPC
   * @see signmessage
   */
  public async verifyMessage(gridcoinAddress: Address, signature: string, message: string): Promise<boolean> {
    return this.call('verifymessage', gridcoinAddress, signature, message);
  }

  /**
   * Removes the wallet encryption key from memory, locking the wallet.
   * After calling this method, you will need to call @see walletPassPhrase again
   * before being able to call any methods which require the wallet to be unlocked.
   *
   * @returns {Promise<null>}
   * @memberof Wallet
   */
  public async walletLock(): Promise<null> {
    return this.call('walletlock');
  }
}
