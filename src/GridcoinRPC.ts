import assert from 'assert';
import JsonRPC, { IParameters, IJsonRPC } from './JsonRPC';
import IDifficulty from './contracts/difficulty';
import ICpid from './contracts/cpid';
import IBeaconStatus from './contracts/beaconStatus';
import IMiningInfo from './contracts/miningInfo';
import IOwnership from './contracts/ownership';
import IRsaWeight from './contracts/rsaWeight';
import IStakeTime from './contracts/stakeTime';
import ISuperBlockAge from './contracts/superBlockAge';
import ITime from './contracts/time';
import IBlock from './contracts/block';
import IBlockChainInfo from './contracts/blockChainInfo';
import ICheckpoint from './contracts/checkpoint';
import IInfo from './contracts/info';
import INetTotals from './contracts/netTotals';
import INetworkInfo from './contracts/networkInfo';
import IPeer from './contracts/peer';
import IPollDetails from './contracts/pollDetails';
import IPoll from './contracts/poll';
import IMemoryPool from './contracts/memoryPool';
import INode from './contracts/node';
import IBackupPrivateKeys from './contracts/backupPrivateKeys';
import IBackupWallet from './contracts/backupWallet';
import IInput from './contracts/input';
import IOutput from './contracts/output';
import ITransaction from './contracts/transaction';
import IScript from './contracts/script';
import IWalletInfo from './contracts/walletInfo';
import IReceivement from './contracts/receivement';
import IAddress from './contracts/address';
import IUnspent from './contracts/unspent';
import ITransactionShort from './contracts/transactionShort';
import IListSinceBlock from './contracts/listSinceBolck';
import ITransactionUnspent from './contracts/transactionUnspent';
import IKeysPair from './contracts/keysPair';
import IBurnAddress from './contracts/burnAddress';
import IReserve from './contracts/reserve';
import IRain from './contracts/rain';

function filterParameters(parameters: Array<any>): Array<any> {
  return parameters.filter(element => element !== undefined);
}

type callParameters = string | number | boolean | undefined | Array<string>;

class GridcoinRPC {
  public readonly client: IJsonRPC;

  /**
   * Creates an instance of GridcoinRPC
   * @param {IParameters} config -
   * @param {IJsonRPC} [rpc] - Dependency injection for the client class
   * @memberof GridcoinRPC
   */
  constructor(config: IParameters, rpc?: any) {
    if (arguments[1]) {
      this.client = new arguments[1](config);
    } else {
      this.client = new JsonRPC(config);
    }
  }

  /**
   * Send command to rpc server, get response
   * @param command
   * @param parameters
   */
  private call(command: string, ...parameters: Array<callParameters>): Promise<any> {
    const filteredParameters: Array<any> = filterParameters(parameters);
    return this.client.request(command, filteredParameters).then((result: any) => result.result);
  }

  /**
   * Test connection
   *
   * @throws {Error}
   * @returns bool
   * @memberof GridcoinRPC
   */
  public async testConnection() {
    assert.strictEqual(null, await this.call('nonExistsTestConnectionCommand'));
    return true;
  }

  /**
   * Add a nrequired-to-sign multisignature address to the wallet.
   * @description
   * Each key is a Gridcoin address or hex-encoded public key.
   * If [account] is specified, assign address to [account].
   *
   * @param {number} nrequired - The minimum (m) number of signatures required to spend this m-of-n multisig script.
   * @param {Array<string>} keys - A public key against which signatures will be checked.
   * @param {string} [account] - The account name in which the address should be stored. Leave blank for the default account.
   * @returns
   * @memberof GridcoinRPC
   */
  public addMultisigAddress(nrequired: number, keys: Array<string>, account?: string): Promise<string> {
    return this.call('addmultisigaddress', nrequired, keys, account);
  }

  /**
   * @todo not clear
   * @param redeemScript
   * @param account
   */
  public addRedeemScript(redeemScript: any, account?: string) {
    return this.call('addredeemscript');
  }

  /**
   * Backup wallet private keys to a file.
   * Requires unlocked wallet
   *
   * @param {string} [destination] - Destination path
   * @returns {Promise<IBackupPrivateKeys>}
   * @memberof GridcoinRPC
   */
  public backupPrivateKeys(destination?: string): Promise<IBackupPrivateKeys> {
    return this.call('backupprivatekeys', destination);
  }

  /**
   * Safely copies wallet.dat to destination, which can be a directory or a path with filename.
   * Requires unlocked wallet
   *
   * @param {string} [destination] - Destination path for data backup
   * @returns {Promise<IBackupWallet>}
   * @memberof GridcoinRPC
   */
  public backupWallet(destination?: string): Promise<IBackupWallet> {
    return this.call('backupwallet', destination);
  }

  /**
   * Burns coins to the network.
   * Requires unlocked wallet
   *
   * @param {number} amount - Amount to be burned down
   * @param {string} [hexString]
   * @returns {Promise<string>}
   * @memberof GridcoinRPC
   */
  public burn(amount: number, hexString?: string): Promise<string> {
    return this.call('burn', amount, hexString);
  }

  /**
   * @todo Unknown
   *
   * @param {string} burnAddress
   * @param {number} burnAmount
   * @param {*} burnKey
   * @param {*} burnDetail
   * @returns
   * @memberof GridcoinRPC
   */
  public burn2(burnAddress: string, burnAmount: number, burnKey: any, burnDetail: any) {
    return this.call('burn2', burnAddress, burnAmount, burnKey, burnDetail);
  }

  /**
   * Checks wallet.dat file to ensure it is not missing any coins.
   *
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public checkWallet(): Promise<Object> {
    return this.call('checkwallet');
  }

  /**
   * @todo Try this out
   * Create a transaction spending the given inputs and creating new outputs.
   * Outputs can be addresses or data.
   * Returns hex-encoded raw transaction.
   * Note that the transaction's inputs are not signed, and
   * it is not stored in the wallet or transmitted to the network.
   *
   * @param {Array<IInput>} inputs - A json array of json objects
   * @param {IOutput} output - a json object with outputs
   * @returns {Promise<string>} - hex string of the transaction
   * @memberof GridcoinRPC
   */
  public createRawTransaction(inputs: Array<IInput>, output: IOutput): Promise<string> {
    return this.call('createrawtransaction');
  }

  /**
   * Produces a human-readable JSON object for a raw transaction.
   *
   * @param {string} hexString
   * @returns {Promise<ITransaction>}
   * @memberof GridcoinRPC
   */
  public decodeRawTransaction(hex: string): Promise<ITransaction> {
    return this.call('decoderawtransaction', hex);
  }

  /**
   * Decode a hex-encoded script.
   *
   * @param {string} hex - HEX encoded script
   * @returns {Promise<IScript>}
   * @memberof GridcoinRPC
   */
  public decodeScript(hex: string): Promise<IScript> {
    return this.call('decodescript', hex);
  }

  /**
   * Reveals the private key corresponding to 'address'.
   * Then the importPrivKey can be used with this output
   *
   * @param {string} gridcoinAddress - The gridcoin address for the private key
   * @returns {Promise<string>} The private key
   * @memberof GridcoinRPC
   */
  public dumpPrivKey(gridcoinAddress: string): Promise<string> {
    return this.call('dumpprivkey', gridcoinAddress);
  }

  /**
   * Dumps wallet to a specified filename.
   * Requires unlocked wallet
   *
   * @param {string} filename
   * @returns {Promise<null>}
   * @memberof GridcoinRPC
   */
  public dumpWallet(filename: string): Promise<null> {
    return this.call('dumpwallet', filename);
  }

  /**
   * @todo later
   *
   * @param {string} walletPassPhrase
   * @returns
   * @memberof GridcoinRPC
   */
  public encrypt(walletPassPhrase: string) {
    return this.call('encrypt', walletPassPhrase);
  }

  /**
   * @todo later
   *
   * @param {string} walletPassPhrase
   * @returns
   * @memberof GridcoinRPC
   */
  public encryptWaller(walletPassPhrase: string) {
    return this.call('encryptwaller', walletPassPhrase);
  }

  /**
   * Returns the account associated with the given address.
   *
   * @param {string} gridcoinAddress
   * @returns {Promise<string>} - an account name
   * @memberof GridcoinRPC
   */
  public getAccount(gridcoinAddress: string): Promise<string> {
    return this.call('getaccount', gridcoinAddress);
  }

  /**
   * Returns the current Gridcoin address for receiving payments to this account.
   * @description
   * If <account> does not exist, it will be created along with an associated new address that will be returned.
   *
   * @param {string} account - an account name
   * @returns {Promise<string>} - GRC address
   * @memberof GridcoinRPC
   */
  public getAccountAddress(account: string): Promise<string> {
    return this.call('getaccountaddress', account);
  }

  /**
   * Returns the list of addresses for the given account.
   *
   * @param {string} account - the account name
   * @returns {Promise<Array<string>>} - a list of addresses
   * @memberof GridcoinRPC
   */
  public getAddressesByAccount(account: string): Promise<Array<string>> {
    return this.call('getaddressesbyaccount', account);
  }

  /**
   * If [account] is not specified, returns the server's total available balance.
   * If [account] is specified, returns the balance in the account.
   *
   * @param {string} [account]
   * @param {number} [minConf]
   * @param {boolean} [includeWatchonly]
   * @returns {Promise<number>}
   * @memberof GridcoinRPC
   */
  public getBalance(account?: string, minConf?: number, includeWatchonly?: boolean): Promise<number> {
    return this.call('getbalance', account, minConf, includeWatchonly);
  }

  /**
   * Returns a new Gridcoin address for receiving payments.
   * @description
   * If [account] is specified payments received with the address will be credited to [account].
   *
   * @param {string} [account]
   * @returns {Promise<string>}
   * @memberof GridcoinRPC
   */
  public getNewAddress(account?: string): Promise<string> {
    return this.call('getnewaddress', account);
  }

  /**
   * @todo clarify
   *
   * @param {string} [account]
   * @returns {Promise<string>}
   * @memberof GridcoinRPC
   */
  public getNewPubkey(account?: string): Promise<string> {
    return this.call('getnewpubkey', account);
  }

  /**
   * Returns raw transaction representation for given transaction id.
   *
   * @param {string} txid
   * @param {boolean} [verbose=false]
   * @returns {(Promise<string|ITransaction>)}
   * @memberof GridcoinRPC
   */
  public getRawTransaction(txid: string, verbose: boolean = false): Promise<string | ITransaction> {
    return this.call('getrawtransaction', txid, verbose);
  }

  /**
   * Returns the total amount received by addresses with [account] in transactions with at least [minconf] confirmations.
   * If [account] not provided return will include all transactions to all accounts.
   *
   * @param {string} account - the account name
   * @param {number} [minconf=1] - the minimum number of confirmations
   * @returns {Promise<number>} - the number of coins received
   * @memberof GridcoinRPC
   */
  public getReceivedByAccount(account: string, minconf: number = 1): Promise<number> {
    return this.call('getreceivedbyaccount', account, minconf);
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
   * @memberof GridcoinRPC
   */
  public getReceivedByAddress(gridcoinAddress: string, minconf: number = 1): Promise<number> {
    return this.call('getreceivedbyaddress', gridcoinAddress, minconf);
  }

  /**
   * Adds signatures to a raw transaction and returns the resulting raw transaction.
   *
   * @param {string} txid - transaction identifier (TXID)
   * @returns {Promise<ITransaction>} - description of the transaction
   * @memberof GridcoinRPC
   */
  public getTransaction(txid: string): Promise<ITransaction> {
    return this.call('gettransaction', txid);
  }

  /**
   * Returns useful information about current wallet state.
   *
   * @returns {Promise<IWallerInfo>}
   * @memberof GridcoinRPC
   */
  public getWalletInfo(): Promise<IWalletInfo> {
    return this.call('getwalletinfo');
  }

  /**
   * @todo check
   *
   * @param {string} privKey
   * @param {string} [label]
   * @param {boolean} [rescan]
   * @returns
   * @memberof GridcoinRPC
   */
  public importPrivKey(privKey: string, label?: string, rescan?: boolean) {
    return this.call('importprivkey', privKey, label, rescan);
  }

  /**
   * @todo test
   *
   * @param {string} filename
   * @returns
   * @memberof GridcoinRPC
   */
  public importWallet(filename: string) {
    return this.call('importwallet', filename);
  }

  /**
   * @todo check
   * Fills the keypool, requires wallet passphrase to be set.
   *
   * @param {*} newSize
   * @returns
   * @memberof GridcoinRPC
   */
  public keyPoolRefill(newSize: number) {
    return this.call('keypoolrefill', newSize);
  }

  /**
   * @todo check
   *
   * @returns
   * @memberof GridcoinRPC
   */
  public listAccounts() {
    return this.call('listaccounts');
  }

  /**
   * Returns all addresses in the wallet and info used for coincontrol.
   *
   * @returns {(Promise<Array<Array<string|number>>>)}
   * @memberof GridcoinRPC
   */
  public listAddressGroupings(): Promise<Array<Array<string | number>>> {
    return this.call('listaddressgroupings');
  }

  /**
   * @todo check
   *
   * @param {number} [minconf=1]
   * @param {boolean} [includeEmpty=false]
   * @returns
   * @memberof GridcoinRPC
   */
  public listReceivedByAccount(minconf: number = 1, includeEmpty: boolean = false) {
    return this.call('listreceivedbyaccount', minconf, includeEmpty);
  }

  /**
   * Returns an array of objects containing: address, account, amount, confirmations.
   * @description
   * To get a list of accounts on the system, gridcoind listreceivedbyaddress 0 true.
   *
   * @param {number} [minConf=1] - The minimum number of confirmations before payments are included.
   * @param {boolean} [includeEmpty=false] - Whether to include addresses that haven't received any payments.
   * @returns {Promise<IReceivement>}
   * @memberof GridcoinRPC
   */
  public listReceivedByAddress(minConf: number = 1, includeEmpty: boolean = false): Promise<IReceivement> {
    return this.call('listreceivedbyaddress', minConf, includeEmpty);
  }

  /**
   * Get all transactions in blocks since block [blockhash], or all transactions if omitted
   *
   * @param {string} [blockHash]
   * @param {number} [targetConfirmations]
   * @param {boolean} [includeWatchonly]
   * @returns {Promise<IListSinceBlock>}
   * @memberof GridcoinRPC
   */
  public listSinceBlock(
    blockHash?: string,
    targetConfirmations?: number,
    includeWatchonly?: boolean,
  ): Promise<IListSinceBlock> {
    return this.call('listsinceblock', blockHash, targetConfirmations, includeWatchonly);
  }

  /**
   * returns the most recent transactions that affect the wallet
   *
   * @param {string} [account]
   * @param {*} [count]
   * @param {*} [from]
   * @param {boolean} [includeWatchonly]
   * @returns {Promise<ITransactionShort>}
   * @memberof GridcoinRPC
   */
  public listTransactions(
    account?: string,
    count?: any,
    from?: any,
    includeWatchonly?: boolean,
  ): Promise<Array<ITransactionShort>> {
    return this.call('listtransactions', account, count, from, includeWatchonly);
  }

  /**
   *
   *
   * @param {number} [minConf]
   * @param {number} [maxConf]
   * @param {...Array<string>} addresses
   * @returns {Promise<Array<ITransactionUnspent>>}
   * @memberof GridcoinRPC
   */
  public listUnspent(
    minConf?: number,
    maxConf?: number,
    ...addresses: Array<string>
  ): Promise<Array<ITransactionUnspent>> {
    return this.call('listunspent', minConf, maxConf, ...addresses);
  }

  /**
   * Make a public/private key pair.
   *
   * @param {string} [prefix]
   * @returns {Promise<IKeysPair>}
   * @memberof GridcoinRPC
   */
  public makeKeyPair(prefix?: string): Promise<IKeysPair> {
    return this.call('makekeypair', prefix);
  }

  /**
   * @deprecated
   *
   * @param {number} fromAccount
   * @param {number} toAccount
   * @param {number} amount
   * @param {number} [minConf]
   * @param {string} [comment]
   * @returns
   * @memberof GridcoinRPC
   */
  public move(fromAccount: number, toAccount: number, amount: number, minConf?: number, comment?: string) {
    return this.call('move', fromAccount, toAccount, amount, minConf, comment);
  }

  /**
   * @todo document
   *
   * @param {string} [burntemplate]
   * @returns {Promise<IBurnAddress>}
   * @memberof GridcoinRPC
   */
  public newBurnAddress(burntemplate?: string): Promise<IBurnAddress> {
    return this.call('newburnaddress', burntemplate);
  }

  /**
   * Rain on specific addresses with specific amounts.
   * @todo: Failing
   * Requires unlocked wallet
   *
   * @param {IRain} targets
   * @returns
   * @memberof GridcoinRPC
   */
  public rain(targets: IRain) {
    return this.call('rain', JSON.stringify(targets));
  }

  /**
   * Check wallet.dat for missing coins. If any are found, attempt recovery.
   *
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public repairWallet(): Promise<Object> {
    return this.call('repairwallet');
  }

  /**
   * Resend any failed or unsent transactions.
   * Requires unlocked wallet
   *
   * @returns {Promise<null>}
   * @memberof GridcoinRPC
   */
  public resendTx(): Promise<null> {
    return this.call('resendtx');
  }

  /**
   * Reserve an amount of coins that do not participate in staking.
   *
   * @param {boolean} reserve
   * @param {number} [amount]
   * @returns {Promise<IReserve>}
   * @memberof GridcoinRPC
   */
  public reserveBalance(reserve: boolean, amount?: number): Promise<IReserve> {
    return this.call('reservebalance', reserve, amount);
  }

  public sendFrom(
    fromAccount: string,
    toGridcoinaddress: string,
    amount: number,
    minConf?: number,
    comment?: string,
    commentTo?: string,
  ) {
    return this.call('sendfrom', fromAccount, toGridcoinaddress, amount, minConf, comment, commentTo);
  }

  // sendmany <fromaccount> {address:amount,...} [minconf=1] [comment]
  public sendMany(fromAccount: string) {
    return this.call('sendmany');
  }

  /**
   * Submits raw transaction (serialized, hex-encoded) to local node and network.
   *
   * @param {string} hex - serialized transaction to broadcast
   * @returns {Promise<string>} - TXID or error message
   * @memberof GridcoinRPC
   */
  public sendRawTransaction(hex: string): Promise<string> {
    return this.call('sendrawtransaction', hex);
  }

  /**
   * Spend an amount to a given address.
   * Requires unlocked wallet
   *
   * @param {string} gridcoinAddress - target gridcoin address
   * @param {number} amount - amount to spend, real number and is rounded to 8 decimal places.
   * @param {string} [comment] - comment
   * @param {string} [commentTo] - comment about who the payment was sent to
   * @returns {Promise<string>} - TXID of the sent transaction
   * @memberof GridcoinRPC
   */
  public sendToAddress(gridcoinAddress: string, amount: number, comment?: string, commentTo?: string): Promise<string> {
    return this.call('sendtoaddress', gridcoinAddress, amount, comment, commentTo);
  }

  /**
   * Sets the account associated with the given address.
   * Assigning address that is already assigned to the same account will create a new address associated with that account.
   *
   * @param {string} gridcoinAddress
   * @param {string} account
   * @returns {Promise<null>}
   * @memberof GridcoinRPC
   */
  public setAccount(gridcoinAddress: string, account: string): Promise<null> {
    return this.call('setaccount', gridcoinAddress, account);
  }

  // signrawtransaction <hex string> [{"txid":txid,"vout":n,"scriptPubKey":hex},...] [<privatekey1>,...] [sighashtype="ALL"]
  // Adds signatures to a raw transaction and returns the resulting raw transaction.
  /**
   * @todo
   *
   * @param {string} hexString
   * @returns
   * @memberof GridcoinRPC
   */
  public signRawTransaction(hexString: string) {
    return this.call('signrawtransaction');
  }

  /**
   * Set the transaction fee per kilobyte paid by transactions created by this wallet.
   *
   * @param {number} amount - is a real and is rounded to the nearest 0.00000001
   * @returns {Promise<boolean>}
   * @memberof GridcoinRPC
   */
  public setTxFee(amount: number): Promise<boolean> {
    return this.call('settxfee', amount);
  }

  /**
   * Display a report on unspent coins in the wallet.
   *
   * @returns {Promise<Array<IUnspent>>}
   * @memberof GridcoinRPC
   */
  public unspentReport(): Promise<Array<IUnspent>> {
    return this.call('unspentreport');
  }

  /**
   * Return information about <gridcoinaddress>.
   * @description
   * The validateaddress RPC accepts a block
   * verifies it is a valid addition to the block chain
   * and broadcasts it to the network.
   *
   * @param {string} gridcoinAddress
   * @returns {Promise<IAddress>}
   * @memberof GridcoinRPC
   */
  public validateAddress(gridcoinAddress: string): Promise<IAddress> {
    return this.call('validateaddress', gridcoinAddress);
  }

  /**
   * Return information about <gridcoinpubkey>.
   *
   * @param {string} gridcoinPubkey
   * @returns {Promise<IAddress>}
   * @memberof GridcoinRPC
   */
  public validatePubkey(gridcoinPubkey: string): Promise<IAddress> {
    return this.call('validatepubkey', gridcoinPubkey);
  }

  /**
   * Sign a message with the private key of an address.
   * Requires unlocked wallet
   *
   * @param {string} gridcoinAddress - the address corresponding to the private key to sign with
   * @param {string} message - the message to sign
   * @returns {Promise<string>} - message signature
   * @memberof GridcoinRPC
   */
  public signMessage(gridcoinAddress: string, message: string): Promise<string> {
    return this.call('signmessage', gridcoinAddress, message);
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
   * @param {string} gridcoinAddress - The gridcoin address to use for the signature.
   * @param {string} signature - The signature provided by the signer in base 64 encoding.
   * @param {string} message - The message that was signed.
   * @returns {Promise<boolean>}
   * @memberof GridcoinRPC
   * @see signmessage
   */
  public verifyMessage(gridcoinAddress: string, signature: string, message: string): Promise<boolean> {
    return this.call('verifymessage', gridcoinAddress, signature, message);
  }

  /********************************************
   *
   *          NETWORK
   *
   ********************************************/

  /**
   * Attempts add or remove <node> from the addnode list or try a connection to <node> once.
   * @todo Can throw error
   * @param {string} node hostname/IP address and port of node to add or remove.
   *  The node to add as a string in the form of <IP address>:<port>.
   *  The IP address may be a hostname resolvable through DNS,
   *  an IPv4 address, an IPv4-as-IPv6 address, or an IPv6 address.
   * @param {string} action whether to add or remove the node, or to try only once to connect
   *  What to do with the IP address above.
   *  Options are:
   *  - 'add' to add a node to the addnode list, this will not connect immediately if the outgoing connection slots are full.
   *  - 'remove' to remove a node from the list, if currently connected, this will disconnect immediately.
   *  - 'onetry' to immediately attempt connection to the node even if the outgoing connection slots are full; this will only attempt the connection once.
   * @example
   * rpc.addNode('192.168.2.1', 'onetry').then(res => console.log(res));
   */
  public addNode(node: string, action: 'add' | 'remove' | 'onetry'): Promise<Object> {
    return this.call('addnode', node, action);
  }

  /**
   * Add a poll to the network. Requires 100K GRC balance
   * Requires unlocked wallet
   * @todo implement
   */
  // tslint:disable-next-line
  public addPoll() {}

  /**
   * Force ask for outstandingblocks from network.
   *
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public askForOutstandingBlocks(): Promise<Object> {
    return this.call('askforoutstandingblocks');
  }

  /**
   * Displays UTC Unix time as well as date and time in UTC.
   *
   * @returns {Promise<ITime>}
   * @memberof GridcoinRPC
   */
  public currentTime(): Promise<ITime> {
    return this.call('currenttime');
  }

  /**
   * Decrypts phrase encrypted by encryptphrase.
   * @todo may introduce interface
   *
   * @param {string} phrase
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public decryptPhrase(phrase: string): Promise<Object> {
    return this.call('decryptphrase', phrase);
  }

  /**
   * Encrypts phrase to be decryptable by decryptphrase.
   * @todo may introduce interface
   *
   * @param {string} phrase
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public encryptPhrase(phrase: string): Promise<Object> {
    return this.call('encryptphrase', phrase);
  }

  /**
   * Returns information about the given added node, or all added nodes.
   * @description
   * (Note that onetry addnodes are not listed here) If dns is false,
   * only a list of added nodes will be provided,
   * otherwise connected information will also be available.
   *
   * @param {boolean} dns - Set to true to display detailed information about the added node.
   * @param {string} [node] - The node to get information about in the same <IP address>:<port> format as the addnode RPC.
   *  If this parameter is not provided, information about all added nodes will be returned.
   *
   * @param {boolean} dns
   * @param {string} [node]
   * @returns {Promise<INode>}
   * @memberof GridcoinRPC
   */
  public getaddednodeinfo(dns: boolean, node?: string): Promise<INode> {
    return this.call('getaddednodeinfo', dns, node);
  }

  /**
   *  Returns the hash of the best (tip) block in the longest block chain.
   *
   * @returns {Promise<string>}
   * @memberof GridcoinRPC
   */
  public getBestBlockHash(): Promise<string> {
    return this.call('getbestblockhash');
  }

  /**
   *  Returns information about the block with the given hash.
   *
   * @param {string} hash
   * @param {boolean} [txinfo]
   * @returns {Promise<IBlock>}
   * @memberof GridcoinRPC
   */
  public getBlock(hash: string, txinfo?: boolean): Promise<IBlock> {
    return this.call('getblock', hash, txinfo);
  }

  /**
   * Returns information related to the specified block
   *
   * @param {number} number
   * @param {boolean} [txinfo]
   * @returns {Promise<IBlock>}
   * @memberof GridcoinRPC
   */
  public getBlockByNumber(blockNumber: number, txinfo?: boolean): Promise<IBlock> {
    return this.call('getblockbynumber', blockNumber, txinfo);
  }

  /**
   * Displays current state of the blockchain
   *
   * @returns {Promise<IBlockChainInfo>}
   * @memberof GridcoinRPC
   */
  public getBlockChainInfo(): Promise<IBlockChainInfo> {
    return this.call('getblockchaininfo');
  }

  /**
   * Returns the number of blocks in the longest block chain.
   *
   * @returns {Promise<number>}
   * @memberof GridcoinRPC
   */
  public getBlockCount(): Promise<number> {
    return this.call('getblockcount');
  }

  /**
   * Returns hash of block in best-block-chain at <index>;
   * index 0 is the genesis block
   *
   * @param {number} index
   * @returns {Promise<string>}
   * @memberof GridcoinRPC
   */
  public getBlockHash(index: number): Promise<string> {
    return this.call('getblockhash', index);
  }

  /**
   * Show info of synchronized checkpoint.
   *
   * @returns {Promise<ICheckpoint>}
   * @memberof GridcoinRPC
   */
  public getCheckpoint(): Promise<ICheckpoint> {
    return this.call('getcheckpoint');
  }

  /**
   * Returns the number of connections to other nodes.
   *
   * @returns {Promise<number>}
   * @memberof GridcoinRPC
   */
  public getConnectionCount(): Promise<number> {
    return this.call('getconnectioncount');
  }

  /**
   * Returns the current network difficulty.
   *
   * @returns {Promise<IDifficulty>}
   * @memberof GridcoinRPC
   */
  public getDifficulty(): Promise<IDifficulty> {
    return this.call('getdifficulty');
  }

  /**
   * Returns an object containing various state info
   *
   * @returns {Promise<IInfo>}
   * @memberof GridcoinRPC
   */
  public getInfo(): Promise<IInfo> {
    return this.call('getinfo');
  }

  /**
   *  Returns information about network traffic, including bytes in, bytes out, and current time
   *
   * @returns {Promise<INetTotals>}
   * @memberof GridcoinRPC
   */
  public getNetTotals(): Promise<INetTotals> {
    return this.call('getnettotals');
  }

  /**
   * Displays network related information.
   *
   * @returns {Promise<INetworkInfo>}
   * @memberof GridcoinRPC
   */
  public getNetworkInfo(): Promise<INetworkInfo> {
    return this.call('getnetworkinfo');
  }

  /**
   * Returns data about each connected node.
   *
   * @returns {Promise<Array<IPeer>>}
   * @memberof GridcoinRPC
   */
  public getPeerInfo(): Promise<Array<IPeer>> {
    return this.call('getpeerinfo');
  }

  /**
   * Returns all transaction ids in memory pool
   * @todo Unknown
   *
   * @returns {Promise<Array<any>>}
   * @memberof GridcoinRPC
   */
  public getRawMemPool(): Promise<Array<any>> {
    return this.call('getrawmempool');
  }

  /**
   * Lists all polls with details.
   *
   * @returns {Promise<Array<IPollDetails>>}
   * @memberof GridcoinRPC
   */
  public listAllPollDetails(): Promise<Array<IPollDetails>> {
    return this.call('listallpolldetails');
  }

  /**
   * Lists all polls.
   *
   * @returns {Promise<Array<IPoll>>}
   * @memberof GridcoinRPC
   */
  public listAllPolls(): Promise<Array<IPoll>> {
    return this.call('listallpolls');
  }

  /**
   *  Lists poll details.
   *
   * @returns {Promise<Array<IPollDetails>>}
   * @memberof GridcoinRPC
   */
  public listPollDetails(): Promise<Array<IPollDetails>> {
    return this.call('listpolldetails');
  }

  /**
   * Displays results for specified poll.
   *
   * @param {string} pollName - Poll name
   * @param {boolean} [showExpired]
   * @returns {Promise<Array<Array<IPollDetails>>>}
   * @memberof GridcoinRPC
   */
  public listPollResults(pollName: string, showExpired?: boolean): Promise<Array<Array<IPollDetails>>> {
    return this.call('listpollresults', pollName, showExpired);
  }

  /**
   *  Lists all polls.
   *
   * @returns {Promise<Array<IPoll>>}
   * @memberof GridcoinRPC
   */
  public listPolls(): Promise<Array<IPoll>> {
    return this.call('listpolls');
  }

  /**
   * Displays included and excluded memory pool transactions.
   *
   * @returns {Promise<IMemoryPool>}
   * @memberof GridcoinRPC
   */
  public memoryPool(): Promise<IMemoryPool> {
    return this.call('memorypool');
  }

  /**
   * Displays current network time.
   *
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public networkTime(): Promise<Object> {
    return this.call('networktime');
  }

  /**
   * Requests that a ping be sent to all other nodes, to measure ping time.
   * @description
   * Results provided in getpeerinfo, pingtime and pingwait fields are decimal seconds.
   * Ping command is handled in queue with all other commands, so it measures processing backlog,
   * not just network ping.
   *
   * @returns {Promise<null>}
   * @memberof GridcoinRPC
   */
  public ping(): Promise<null> {
    return this.call('ping');
  }

  /**
   * Returns all information about the block at <index>.
   *
   * @param {number} index - block index, 0 for superblock
   * @returns {Promise<IBlock>}
   * @memberof GridcoinRPC
   */
  public showBlock(index: number): Promise<IBlock> {
    return this.call('showblock', index);
  }

  /**
   * Terminate the Gridcoin client.
   *
   * @returns {Promise<string>}
   * @memberof GridcoinRPC
   */
  public stop(): Promise<string> {
    return this.call('stop');
  }

  /**
   * Vote on a specific poll with specified answers.
   * @todo implement
   * Requires unlocked wallet
   *
   * @param {string} title
   * @param {string} answers
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public vote(title: string, answers: string): Promise<Object> {
    return this.call('vote', title, answers);
  }

  /**
   * Displays vote details of a specified poll.
   *
   * @param {string} pollName - Poll name
   * @returns {Promise<Array<Array<Object>>>}
   * @memberof GridcoinRPC
   */
  public voteDetails(pollName: string): Promise<Array<Array<Object>>> {
    return this.call('votedetails', pollName);
  }

  /********************************************
   *
   *          MINING
   *
   ********************************************/

  /**
   * Send a beacon to the Neural Network for your CPID to claim POR rewards.
   * Requires unlocked wallet
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public advertiseBeacon(): Promise<Object> {
    return this.call('advertisebeacon');
  }

  /**
   * Displays beacons and associated addresses.
   *
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public beaconReport(): Promise<Object> {
    return this.call('beaconreport');
  }

  /**
   * Display beaconstatus on own or specified beacon.
   *
   * @param {string} cpId
   * @returns {Promise<IBeaconStatus>}
   * @memberof GridcoinRPC
   */
  public beaconStatus(cpId: string): Promise<IBeaconStatus> {
    return this.call('beaconstatus', cpId);
  }

  /**
   * Display project CPIDs for your BOINC account.
   *
   * @returns {Promise<Array<ICpid>>}
   * @memberof GridcoinRPC
   */
  public cpids(): Promise<Array<ICpid>> {
    return this.call('cpids');
  }

  /**
   * Displays current Neural Network contract hash.
   *
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public currentNeuralHash(): Promise<Object> {
    return this.call('currentneuralhash');
  }

  /**
   * Displays current Neural Network quorum hashes.
   *
   * @returns {Promise<Array<Object>>}
   * @memberof GridcoinRPC
   */
  public currentNeuralReport(): Promise<Array<Object>> {
    return this.call('currentneuralreport');
  }

  /**
   * Request current information from the Neural Network about your magnitude by project.
   *
   * @param {boolean} [force]
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public explainMagnitude(force?: boolean): Promise<Object> {
    return this.call('explainmagnitude', force);
  }

  /**
   * Lists Information on the current block, mining settings, and network difficulty.
   * @description
   * Documentation of Stake Miner and "getmininginfo" explanation.
   * https://github.com/gridcoin/Gridcoin-Research/blob/master/doc/stake-miner.txt
   *
   * @returns {Promise<IMiningInfo>}
   * @memberof GridcoinRPC
   */
  public getMiningInfo(): Promise<IMiningInfo> {
    return this.call('getmininginfo');
  }

  /**
   * Display lifetime payments for CPID as well as lifetime average magnitude.
   *
   * @returns {Promise<Array<Object>>}
   * @memberof GridcoinRPC
   */
  public lifeTime(): Promise<Array<Object>> {
    return this.call('lifetime');
  }

  /**
   * Displays information for the magnitude of all cpids or the one specified.
   *
   * @param {string} cpid
   * @returns {Promise<Array<Object>>}
   * @memberof GridcoinRPC
   */
  public magnitude(cpid: string): Promise<Array<Object>> {
    return this.call('magnitude', cpid);
  }

  /**
   * mymagnitude
   *
   * @returns {Promise<Array<Object>>}
   * @memberof GridcoinRPC
   */
  public myMagnitude(): Promise<Array<Object>> {
    return this.call('mymagnitude');
  }

  /**
   * Displays neural report for the network.
   *
   * @returns {Promise<Array<Object>>}
   * @memberof GridcoinRPC
   */
  public neuralReport(): Promise<Array<Object>> {
    return this.call('neuralreport');
  }

  /**
   * proveownership
   *
   * @returns {Promise<IOwnership>}
   * @memberof GridcoinRPC
   */
  public proveOwnership(): Promise<IOwnership> {
    return this.call('proveownership');
  }

  /**
   * Gridcoin will reload CPIDs from the local BOINC client.
   * @description
   * If any new projects are detected, they will then be looked up in the Netsoft XML.
   * This happens automatically after about 25 minutes, but this can speed up the process.
   *
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public resetCpids(): Promise<Object> {
    return this.call('resetcpids');
  }

  /**
   * Displays RSA (Research Savings Account) report for your CPID
   * @todo
   * @returns {Promise<Array<Object>>}
   * @memberof GridcoinRPC
   */
  public rsa(): Promise<Array<Object>> {
    return this.call('rsa');
  }

  /**
   * retrieve "RSA Weight", "Remote Magnitude", "RSA Owed"
   *
   * @returns {Promise<IRsaWeight>}
   * @memberof GridcoinRPC
   */
  public rsaWeight(): Promise<IRsaWeight> {
    return this.call('rsaweight');
  }

  /**
   * Display estimated time to stake.
   *
   * @returns {Promise<IStakeTime>}
   * @memberof GridcoinRPC
   */
  public stakeTime(): Promise<IStakeTime> {
    return this.call('staketime');
  }

  /**
   * Display time since last superblock.
   *
   * @returns {Promise<ISuperBlockAge>}
   * @memberof GridcoinRPC
   */
  public superBlockAge(): Promise<ISuperBlockAge> {
    return this.call('superblockage');
  }

  /**
   * Display data on recent superblocks. Optional: Shows magnitude for a cpid for recent superblocks.
   * @todo
   * @param {string} [cpid] - cpid
   * @returns {Promise<Array<Object>>}
   * @memberof GridcoinRPC
   */
  public superBlocks(cpid?: string): Promise<Array<Object>> {
    return this.call('superblocks', cpid);
  }

  /**
   * Synchronize with the neural network
   *
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public syncDpor2(): Promise<Object> {
    return this.call('syncdpor2');
  }

  /**
   * Display upgraded beacon report of the network.
   * @todo
   * @returns {Promise<Array<Object>>}
   * @memberof GridcoinRPC
   */
  public upgradedBeaconReport(): Promise<Array<Object>> {
    return this.call('upgradedbeaconreport');
  }

  /**
   * Displays information about valid CPIDs (on team Gridcoin, same CPID) collected from BOINC.
   *
   * @returns {Promise<Array<Object>>}
   * @memberof GridcoinRPC
   */
  public validCpids(): Promise<Array<Object>> {
    return this.call('validcpids');
  }
}

export { GridcoinRPC };
