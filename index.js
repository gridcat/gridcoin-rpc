const GridcoinRPC = require('./dist/GridcoinRPC').default;

const rpc = new GridcoinRPC({
  port: 6553,
  host: '127.0.0.1',
  auth: 'gridcoinrpc:2ysbV5hx4UrNeF3rG9UsTgziXuoWyRZbymo88Sikq5u4',
  json: true,
});

// cpid
// 204d178f9b6d4de25297c99fed0ed
// hash
// 01000000d9d6ee5b01b66abd69c8c32dd7014d17e7fcec0b4f1dfde9de36f879bbc229bf89978a035c000000006a47304402207cf1bb578256ac4ef5b91e09e684276723435150fa0103710ae8bc67371b5c1a022041e93009cb2e8da6d72869595ac2e1cdc8304fcc68031f98523ac456a78b163d0121024ae90ccf5ba9222332003dd9085a833d92f840622bde98f5f381a0ec644d935dffffffff0220f40e00000000001976a9141f5f2813ab41cbf8f5e08925f689edb9ee23cf2c88ac1027000000000000016a0000000000

rpc.dumpWallet('SGuCTqt3WptL7uJTFWvCBNv6GfrVoxDCzy')
  .then(res => console.log(res));
  // .then(res => console.log(JSON.stringify(res, null, 2)));
