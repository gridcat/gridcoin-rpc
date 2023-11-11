## [4.0.1](https://github.com/gridcat/gridcoin-rpc/compare/v4.0.0...v4.0.1) (2023-11-11)


### Bug Fixes

* **deps:** dependencies update ([16d63ab](https://github.com/gridcat/gridcoin-rpc/commit/16d63ab64b40f79d236af748ac94a1e74a4175c4))

# [4.0.0](https://github.com/gridcat/gridcoin-rpc/compare/v3.0.2...v4.0.0) (2022-12-28)


### Bug Fixes

* **docs:** fix documents generation ([56f1308](https://github.com/gridcat/gridcoin-rpc/commit/56f1308c245cee4caac1bbcb51ff238b3c4a8459))


### chore

* **dependencies:** upgrade dependencies ([54d0b24](https://github.com/gridcat/gridcoin-rpc/commit/54d0b24d18b18594863b1f5424f723ad17371899))


### BREAKING CHANGES

* **dependencies:** The minimum node version is 16 from now on

## [3.0.2](https://github.com/gridcat/gridcoin-rpc/compare/v3.0.1...v3.0.2) (2021-07-16)


### Bug Fixes

* **declaration:** fix declaration file path ([043d93f](https://github.com/gridcat/gridcoin-rpc/commit/043d93faa2f2eea05cfa4743406a50b3eb21306b))

## [3.0.1](https://github.com/gridcat/gridcoin-rpc/compare/v3.0.0...v3.0.1) (2021-07-09)


### Bug Fixes

* **comments:** fix comments so <things> didn't get lost ([8cf47a4](https://github.com/gridcat/gridcoin-rpc/commit/8cf47a4aeb3de4aab5536f6266aebd9490beff02))

# [3.0.0](https://github.com/gridcat/gridcoin-rpc/compare/v2.0.0...v3.0.0) (2021-07-09)


### Bug Fixes

* **camelcase:** add deep flag so it transfor nested objects too ([ddeaadd](https://github.com/gridcat/gridcoin-rpc/commit/ddeaadd9639900bce76cf810db401dd158dde13c))
* fix contract ([a25886f](https://github.com/gridcat/gridcoin-rpc/commit/a25886fc57b2c42c9f791c15dbb5eb66ee6dcfb7))
* fix types to allow the objects ([0da4130](https://github.com/gridcat/gridcoin-rpc/commit/0da41303f9238c6434390b202fdb4ecbc52e91b0))
* return promise on getNewAddress ([01460a5](https://github.com/gridcat/gridcoin-rpc/commit/01460a50cf03b6b09807d00931f2c28c0aedc128))


### Features

* add addkey ([51f95ae](https://github.com/gridcat/gridcoin-rpc/commit/51f95ae7ef0b9067745de46b982802c54d9c6426))
* add archivelog ([b948dc2](https://github.com/gridcat/gridcoin-rpc/commit/b948dc20208b99c628f22c40e90d121ed3c12408))
* add auditsnapshotaccrual ([046c4c9](https://github.com/gridcat/gridcoin-rpc/commit/046c4c946c7cb1bf2be341789a4c50b70f4c171a))
* add auditsnapshotaccruals ([8834777](https://github.com/gridcat/gridcoin-rpc/commit/8834777a76cb05363dfa05bfb0ff419bf048e02d))
* add comparesnapshotaccrual ([e904d7e](https://github.com/gridcat/gridcoin-rpc/commit/e904d7e0cbf7cb3df7d58f72d46031946621a269))
* add createRawTransaction ([8cb09b8](https://github.com/gridcat/gridcoin-rpc/commit/8cb09b8ba4da4ccd0dac1353c8374ef93bc67cd7))
* add currentcontractaverage ([9d02f40](https://github.com/gridcat/gridcoin-rpc/commit/9d02f40d126d2beeb932f0491e58b109d8e80d93))
* add debug ([615255c](https://github.com/gridcat/gridcoin-rpc/commit/615255c7d924bb185f4159f9731d52308a39f3b1))
* add getbestblockhash ([90619f2](https://github.com/gridcat/gridcoin-rpc/commit/90619f2f0a11f910b7060515361c7bc4e3e8cd43))
* add getblock ([f340db5](https://github.com/gridcat/gridcoin-rpc/commit/f340db580f11d763bac355aacd2725fb99a310ce))
* add getblockbynumber ([9991c67](https://github.com/gridcat/gridcoin-rpc/commit/9991c67a42160493b08536f6b19e1ceac9bdfbce))
* add getblockchaininfo ([8891fb7](https://github.com/gridcat/gridcoin-rpc/commit/8891fb7bd8c69d2231ebdab85295c6223cdcbbc1))
* add getblockcount ([e04a65c](https://github.com/gridcat/gridcoin-rpc/commit/e04a65c506d0dc11ae81a203d95317814e45bddc))
* add getblockhash ([6c4f010](https://github.com/gridcat/gridcoin-rpc/commit/6c4f010ea123c10030a47478f2852b0798e34ffd))
* add getblockstats ([336db25](https://github.com/gridcat/gridcoin-rpc/commit/336db25424d384ad7ffee47a8253742bee4bb28f))
* add getburnreport ([e105996](https://github.com/gridcat/gridcoin-rpc/commit/e1059964ad63d4f9c2fe3a81bb9b711c537020aa))
* add getcheckpoint ([342a3ea](https://github.com/gridcat/gridcoin-rpc/commit/342a3ea2c542c8aec8e8804652eaba6f38d2cb1c))
* add getconnectioncount ([b97a942](https://github.com/gridcat/gridcoin-rpc/commit/b97a942a66c50ce5c83ff178d0a88650adc8bff5))
* add getdifficulty ([70eba29](https://github.com/gridcat/gridcoin-rpc/commit/70eba29c3050201fdf552889f39bc2b935db8137))
* add getinfo ([be474a1](https://github.com/gridcat/gridcoin-rpc/commit/be474a132452237634a79495e2a67444f1f86efd))
* add getnettotals ([9ab6dad](https://github.com/gridcat/gridcoin-rpc/commit/9ab6dad7d4afb0fb2b87e26707838e7480cfafe3))
* add getnetworkinfo ([6fd7c77](https://github.com/gridcat/gridcoin-rpc/commit/6fd7c77c389f5654c4d4965028438df1c6cb11b3))
* add getNewAddress, getBalanceDetail, getBalance and address related calls ([829e830](https://github.com/gridcat/gridcoin-rpc/commit/829e830db91af40361a5d0048b2796ba4f1e79ff))
* add getnewpubkey ([c9c2ed8](https://github.com/gridcat/gridcoin-rpc/commit/c9c2ed8e202f39b12ff71e596960731d4ad83979))
* add getpeerinfo ([2cc8ab2](https://github.com/gridcat/gridcoin-rpc/commit/2cc8ab2354a07e5d1dec3230b515feb01a801cce))
* add getrawmempool ([da8ce00](https://github.com/gridcat/gridcoin-rpc/commit/da8ce00e1c162f8d49dbc51ea166b0308c72a09d))
* add getrawtransaction ([a4b3ef7](https://github.com/gridcat/gridcoin-rpc/commit/a4b3ef7efc2f3d3a12ab344183e752b66f629d15))
* add getrawwallettransaction ([83207a2](https://github.com/gridcat/gridcoin-rpc/commit/83207a26bf30444815829894903b6ca05e89afd3))
* add getreceivedbyaccount ([41b3cfb](https://github.com/gridcat/gridcoin-rpc/commit/41b3cfbff0106f1a2c041c018f56909d7f59fae7))
* add getreceivedbyaddress ([9c64092](https://github.com/gridcat/gridcoin-rpc/commit/9c64092b01836a1dbac6c5a76eb8abd81db39209))
* add getsupervotes ([9a58ef7](https://github.com/gridcat/gridcoin-rpc/commit/9a58ef7d9c611eb66e80a3aafacbc15d861c4e34))
* add gettransaction ([9d2435d](https://github.com/gridcat/gridcoin-rpc/commit/9d2435d443de2eefb58f7fb2c8fe428be53664ca))
* add getunconfirmedbalance ([9e93d7d](https://github.com/gridcat/gridcoin-rpc/commit/9e93d7d407b028ad5a1580563a9be1cbbc738cbe))
* add getwalletinfo ([2f9f067](https://github.com/gridcat/gridcoin-rpc/commit/2f9f0677fc6639bc4015ed1946e4c9a975f3f950))
* add keypoolrefill ([345d81c](https://github.com/gridcat/gridcoin-rpc/commit/345d81cb3b38f00319633a5761adef8894f53a10))
* add listaccounts ([7c31c18](https://github.com/gridcat/gridcoin-rpc/commit/7c31c18844a5fc9e198852d44a002289a3a72b88))
* add listaddressgroupings ([2cd3e3d](https://github.com/gridcat/gridcoin-rpc/commit/2cd3e3d445c58d5e6903bf2e67d11c2a1dcdbd3f))
* add listbanned ([95dd7d4](https://github.com/gridcat/gridcoin-rpc/commit/95dd7d46f23e00ffbac74461d311c884eb75ff65))
* add listmanifests ([8c3da81](https://github.com/gridcat/gridcoin-rpc/commit/8c3da810b1a19aad511a642f4bb3cdec7a12c6a5))
* add listprojects ([e2c44ce](https://github.com/gridcat/gridcoin-rpc/commit/e2c44cee296bfa85378eb4f57af15282c95d1aa3))
* add listreceivedbyaddress ([0ffe63f](https://github.com/gridcat/gridcoin-rpc/commit/0ffe63fb8be388c4c0d511552781ac4df6205805))
* add listresearcheraccounts ([159f886](https://github.com/gridcat/gridcoin-rpc/commit/159f88608fc8bdb59dcd641a10ae9ebffcfbcd48))
* add listsinceblock ([f501a7b](https://github.com/gridcat/gridcoin-rpc/commit/f501a7b63ec706a6a5231ae5fd62832b6ba3720c))
* add liststakes ([9b4282d](https://github.com/gridcat/gridcoin-rpc/commit/9b4282d3717ba2f2e3b018074dc299581777736e))
* add listtransactions ([3f6a014](https://github.com/gridcat/gridcoin-rpc/commit/3f6a014aef67ac97a5176949a0a934f43d69382b))
* add listunspent ([d2777c5](https://github.com/gridcat/gridcoin-rpc/commit/d2777c5b97dc6ef9f8b5abcb9fe450a9a6d5087a))
* add logging ([e6b0a9a](https://github.com/gridcat/gridcoin-rpc/commit/e6b0a9a50c93eb5ebc0d991703165ccef67334f5))
* add makekeypair ([ef60508](https://github.com/gridcat/gridcoin-rpc/commit/ef605087773a14d8fec32411aeb12f654ef5f253))
* add memorypool ([83c4c5a](https://github.com/gridcat/gridcoin-rpc/commit/83c4c5a43bcfde4febb37b33e31180bf0044e48f))
* add network ([8204a17](https://github.com/gridcat/gridcoin-rpc/commit/8204a17ab6052addd12e4901dd8ffde612d4af94))
* add network and voting ([fd1ecfa](https://github.com/gridcat/gridcoin-rpc/commit/fd1ecfa1b3924da78262be45ef6020902575bb03))
* add networking commands ([871c413](https://github.com/gridcat/gridcoin-rpc/commit/871c413916637468ed4a766d387d97ae9bc06ab0))
* add networktime ([fec8647](https://github.com/gridcat/gridcoin-rpc/commit/fec864744cf5c9146807e41306c1b812de3f9c22))
* add ping ([03fefbf](https://github.com/gridcat/gridcoin-rpc/commit/03fefbf673e51bce58dcdecae2adc1707d29033d))
* add projects ([ed3b7c6](https://github.com/gridcat/gridcoin-rpc/commit/ed3b7c658f653043537fe5b1aa39b2d70e95b409))
* add rainbymagnitude ([8a315ba](https://github.com/gridcat/gridcoin-rpc/commit/8a315ba7840bd780c87246911bbed53f090d6100))
* add readconfig ([5a25d69](https://github.com/gridcat/gridcoin-rpc/commit/5a25d695ce4be82c2afcee2b2d276ff5d42e52cd))
* add repairwallet ([da530b0](https://github.com/gridcat/gridcoin-rpc/commit/da530b0c856ad8443d24e9baac30a2129990871d))
* add resendtx ([4fe51ce](https://github.com/gridcat/gridcoin-rpc/commit/4fe51ce878b034ace41376e844f19015b49aff4b))
* add reservebalance ([4214d9f](https://github.com/gridcat/gridcoin-rpc/commit/4214d9f88d38e0ed780d885b3a14057232d65304))
* add scanforunspent ([2947b2e](https://github.com/gridcat/gridcoin-rpc/commit/2947b2e14b6bff7c560a27c1321620dfb538bf67))
* add scraperreport ([d097ffb](https://github.com/gridcat/gridcoin-rpc/commit/d097ffb1d28ad27588b7347d4550479e0d05616b))
* add sendfrom ([151a2c3](https://github.com/gridcat/gridcoin-rpc/commit/151a2c3c1bb4d9fc6d3a932d25f325e7374315c3))
* add sendmany ([0af3517](https://github.com/gridcat/gridcoin-rpc/commit/0af3517861277745fb0bc1d67d3d7fb62113f85d))
* add sendrawtransaction ([7190743](https://github.com/gridcat/gridcoin-rpc/commit/7190743698630cbdd66aa1ff6ec392535e960c56))
* add sendtoaddress ([0ccf308](https://github.com/gridcat/gridcoin-rpc/commit/0ccf30864a93584fbeba6f19ff08cf3f931f8f1d))
* add setaccount ([eb26234](https://github.com/gridcat/gridcoin-rpc/commit/eb2623452a1d9d7f6aec42fc2ae4451aeade1eb6))
* add setban ([3b54fc1](https://github.com/gridcat/gridcoin-rpc/commit/3b54fc1af070a72c760370adb20ad9dd6dd682d9))
* add settxfee ([cdedb34](https://github.com/gridcat/gridcoin-rpc/commit/cdedb3499df3af1c5ddfb56dd29c77615f0fba0d))
* add showblock ([f203276](https://github.com/gridcat/gridcoin-rpc/commit/f2032765cff40ac35a5c0df9489ede49747249d0))
* add signmessage ([33e3741](https://github.com/gridcat/gridcoin-rpc/commit/33e3741e5c45c66688766e4593ae5fd59a0829b5))
* add signrawtransaction ([d532d40](https://github.com/gridcat/gridcoin-rpc/commit/d532d4000cf35e444559fd51d4d3ca8c1a598f49))
* add superblockaverage ([e170d40](https://github.com/gridcat/gridcoin-rpc/commit/e170d40c72346d9a499d4d55ae4e55e28e963d75))
* add validateaddress ([25a9147](https://github.com/gridcat/gridcoin-rpc/commit/25a91473213c236ca4e6fa82fba2bf4ac085f209))
* add validatepubkey ([c5beabc](https://github.com/gridcat/gridcoin-rpc/commit/c5beabc9e0c4e39c6ef44b97e0a4dcfae72f52b4))
* add verifymessage ([331c9fb](https://github.com/gridcat/gridcoin-rpc/commit/331c9fb9a3eb3675502476332db3d1fe5b9d035c))
* add versionreport ([5ffdce4](https://github.com/gridcat/gridcoin-rpc/commit/5ffdce4d1f911cba414a3081beeca120bb57b925))
* add walletlock ([77be1a0](https://github.com/gridcat/gridcoin-rpc/commit/77be1a0b358c2023a12848487c2b6cadcdf93cad))
* add walletpassphrase ([8e540a8](https://github.com/gridcat/gridcoin-rpc/commit/8e540a86920f5a0c3d2c74d313786000eba5a2d2))
* add walletpassphrasechange ([5cfc84c](https://github.com/gridcat/gridcoin-rpc/commit/5cfc84c268f593fc126fd1841c099c8a6edbe641))
* introduce error object ([3e75f6f](https://github.com/gridcat/gridcoin-rpc/commit/3e75f6fc42e998351c931d52069342e5dba79ef1))


### BREAKING CHANGES

* structure change, deprecation of some old rules

# [3.0.0-beta.10](https://github.com/gridcat/gridcoin-rpc/compare/v3.0.0-beta.9...v3.0.0-beta.10) (2021-07-07)


### Features

* add addkey ([51f95ae](https://github.com/gridcat/gridcoin-rpc/commit/51f95ae7ef0b9067745de46b982802c54d9c6426))
* add archivelog ([b948dc2](https://github.com/gridcat/gridcoin-rpc/commit/b948dc20208b99c628f22c40e90d121ed3c12408))
* add auditsnapshotaccrual ([046c4c9](https://github.com/gridcat/gridcoin-rpc/commit/046c4c946c7cb1bf2be341789a4c50b70f4c171a))
* add auditsnapshotaccruals ([8834777](https://github.com/gridcat/gridcoin-rpc/commit/8834777a76cb05363dfa05bfb0ff419bf048e02d))
* add comparesnapshotaccrual ([e904d7e](https://github.com/gridcat/gridcoin-rpc/commit/e904d7e0cbf7cb3df7d58f72d46031946621a269))
* add currentcontractaverage ([9d02f40](https://github.com/gridcat/gridcoin-rpc/commit/9d02f40d126d2beeb932f0491e58b109d8e80d93))
* add debug ([615255c](https://github.com/gridcat/gridcoin-rpc/commit/615255c7d924bb185f4159f9731d52308a39f3b1))
* add getblockstats ([336db25](https://github.com/gridcat/gridcoin-rpc/commit/336db25424d384ad7ffee47a8253742bee4bb28f))
* add getsupervotes ([9a58ef7](https://github.com/gridcat/gridcoin-rpc/commit/9a58ef7d9c611eb66e80a3aafacbc15d861c4e34))
* add listmanifests ([8c3da81](https://github.com/gridcat/gridcoin-rpc/commit/8c3da810b1a19aad511a642f4bb3cdec7a12c6a5))
* add listprojects ([e2c44ce](https://github.com/gridcat/gridcoin-rpc/commit/e2c44cee296bfa85378eb4f57af15282c95d1aa3))
* add listresearcheraccounts ([159f886](https://github.com/gridcat/gridcoin-rpc/commit/159f88608fc8bdb59dcd641a10ae9ebffcfbcd48))
* add logging ([e6b0a9a](https://github.com/gridcat/gridcoin-rpc/commit/e6b0a9a50c93eb5ebc0d991703165ccef67334f5))
* add network ([8204a17](https://github.com/gridcat/gridcoin-rpc/commit/8204a17ab6052addd12e4901dd8ffde612d4af94))
* add projects ([ed3b7c6](https://github.com/gridcat/gridcoin-rpc/commit/ed3b7c658f653043537fe5b1aa39b2d70e95b409))
* add readconfig ([5a25d69](https://github.com/gridcat/gridcoin-rpc/commit/5a25d695ce4be82c2afcee2b2d276ff5d42e52cd))
* add scraperreport ([d097ffb](https://github.com/gridcat/gridcoin-rpc/commit/d097ffb1d28ad27588b7347d4550479e0d05616b))
* add superblockaverage ([e170d40](https://github.com/gridcat/gridcoin-rpc/commit/e170d40c72346d9a499d4d55ae4e55e28e963d75))
* add versionreport ([5ffdce4](https://github.com/gridcat/gridcoin-rpc/commit/5ffdce4d1f911cba414a3081beeca120bb57b925))

# [3.0.0-beta.9](https://github.com/gridcat/gridcoin-rpc/compare/v3.0.0-beta.8...v3.0.0-beta.9) (2021-07-06)


### Features

* add getblockcount ([e04a65c](https://github.com/gridcat/gridcoin-rpc/commit/e04a65c506d0dc11ae81a203d95317814e45bddc))
* add getblockhash ([6c4f010](https://github.com/gridcat/gridcoin-rpc/commit/6c4f010ea123c10030a47478f2852b0798e34ffd))
* add getburnreport ([e105996](https://github.com/gridcat/gridcoin-rpc/commit/e1059964ad63d4f9c2fe3a81bb9b711c537020aa))
* add getcheckpoint ([342a3ea](https://github.com/gridcat/gridcoin-rpc/commit/342a3ea2c542c8aec8e8804652eaba6f38d2cb1c))
* add getconnectioncount ([b97a942](https://github.com/gridcat/gridcoin-rpc/commit/b97a942a66c50ce5c83ff178d0a88650adc8bff5))
* add getdifficulty ([70eba29](https://github.com/gridcat/gridcoin-rpc/commit/70eba29c3050201fdf552889f39bc2b935db8137))
* add getinfo ([be474a1](https://github.com/gridcat/gridcoin-rpc/commit/be474a132452237634a79495e2a67444f1f86efd))
* add getnettotals ([9ab6dad](https://github.com/gridcat/gridcoin-rpc/commit/9ab6dad7d4afb0fb2b87e26707838e7480cfafe3))
* add getnetworkinfo ([6fd7c77](https://github.com/gridcat/gridcoin-rpc/commit/6fd7c77c389f5654c4d4965028438df1c6cb11b3))
* add getpeerinfo ([2cc8ab2](https://github.com/gridcat/gridcoin-rpc/commit/2cc8ab2354a07e5d1dec3230b515feb01a801cce))
* add getrawmempool ([da8ce00](https://github.com/gridcat/gridcoin-rpc/commit/da8ce00e1c162f8d49dbc51ea166b0308c72a09d))
* add listbanned ([95dd7d4](https://github.com/gridcat/gridcoin-rpc/commit/95dd7d46f23e00ffbac74461d311c884eb75ff65))
* add memorypool ([83c4c5a](https://github.com/gridcat/gridcoin-rpc/commit/83c4c5a43bcfde4febb37b33e31180bf0044e48f))
* add networktime ([fec8647](https://github.com/gridcat/gridcoin-rpc/commit/fec864744cf5c9146807e41306c1b812de3f9c22))
* add ping ([03fefbf](https://github.com/gridcat/gridcoin-rpc/commit/03fefbf673e51bce58dcdecae2adc1707d29033d))
* add setban ([3b54fc1](https://github.com/gridcat/gridcoin-rpc/commit/3b54fc1af070a72c760370adb20ad9dd6dd682d9))
* add showblock ([f203276](https://github.com/gridcat/gridcoin-rpc/commit/f2032765cff40ac35a5c0df9489ede49747249d0))

# [3.0.0-beta.8](https://github.com/gridcat/gridcoin-rpc/compare/v3.0.0-beta.7...v3.0.0-beta.8) (2021-06-30)


### Bug Fixes

* **camelcase:** add deep flag so it transfor nested objects too ([ddeaadd](https://github.com/gridcat/gridcoin-rpc/commit/ddeaadd9639900bce76cf810db401dd158dde13c))


### Features

* add getbestblockhash ([90619f2](https://github.com/gridcat/gridcoin-rpc/commit/90619f2f0a11f910b7060515361c7bc4e3e8cd43))
* add getblock ([f340db5](https://github.com/gridcat/gridcoin-rpc/commit/f340db580f11d763bac355aacd2725fb99a310ce))
* add getblockbynumber ([9991c67](https://github.com/gridcat/gridcoin-rpc/commit/9991c67a42160493b08536f6b19e1ceac9bdfbce))
* add getblockchaininfo ([8891fb7](https://github.com/gridcat/gridcoin-rpc/commit/8891fb7bd8c69d2231ebdab85295c6223cdcbbc1))

# [3.0.0-beta.7](https://github.com/gridcat/gridcoin-rpc/compare/v3.0.0-beta.6...v3.0.0-beta.7) (2021-06-30)


### Features

* add validateaddress ([25a9147](https://github.com/gridcat/gridcoin-rpc/commit/25a91473213c236ca4e6fa82fba2bf4ac085f209))
* add validatepubkey ([c5beabc](https://github.com/gridcat/gridcoin-rpc/commit/c5beabc9e0c4e39c6ef44b97e0a4dcfae72f52b4))
* add verifymessage ([331c9fb](https://github.com/gridcat/gridcoin-rpc/commit/331c9fb9a3eb3675502476332db3d1fe5b9d035c))
* add walletlock ([77be1a0](https://github.com/gridcat/gridcoin-rpc/commit/77be1a0b358c2023a12848487c2b6cadcdf93cad))
* add walletpassphrase ([8e540a8](https://github.com/gridcat/gridcoin-rpc/commit/8e540a86920f5a0c3d2c74d313786000eba5a2d2))
* add walletpassphrasechange ([5cfc84c](https://github.com/gridcat/gridcoin-rpc/commit/5cfc84c268f593fc126fd1841c099c8a6edbe641))

# [3.0.0-beta.6](https://github.com/gridcat/gridcoin-rpc/compare/v3.0.0-beta.5...v3.0.0-beta.6) (2021-06-29)


### Features

* add setaccount ([eb26234](https://github.com/gridcat/gridcoin-rpc/commit/eb2623452a1d9d7f6aec42fc2ae4451aeade1eb6))
* add settxfee ([cdedb34](https://github.com/gridcat/gridcoin-rpc/commit/cdedb3499df3af1c5ddfb56dd29c77615f0fba0d))
* add signmessage ([33e3741](https://github.com/gridcat/gridcoin-rpc/commit/33e3741e5c45c66688766e4593ae5fd59a0829b5))
* add signrawtransaction ([d532d40](https://github.com/gridcat/gridcoin-rpc/commit/d532d4000cf35e444559fd51d4d3ca8c1a598f49))

# [3.0.0-beta.5](https://github.com/gridcat/gridcoin-rpc/compare/v3.0.0-beta.4...v3.0.0-beta.5) (2021-06-28)


### Bug Fixes

* fix types to allow the objects ([0da4130](https://github.com/gridcat/gridcoin-rpc/commit/0da41303f9238c6434390b202fdb4ecbc52e91b0))


### Features

* add sendmany ([0af3517](https://github.com/gridcat/gridcoin-rpc/commit/0af3517861277745fb0bc1d67d3d7fb62113f85d))
* add sendrawtransaction ([7190743](https://github.com/gridcat/gridcoin-rpc/commit/7190743698630cbdd66aa1ff6ec392535e960c56))
* add sendtoaddress ([0ccf308](https://github.com/gridcat/gridcoin-rpc/commit/0ccf30864a93584fbeba6f19ff08cf3f931f8f1d))

# [3.0.0-beta.4](https://github.com/gridcat/gridcoin-rpc/compare/v3.0.0-beta.3...v3.0.0-beta.4) (2021-06-27)


### Features

* add resendtx ([4fe51ce](https://github.com/gridcat/gridcoin-rpc/commit/4fe51ce878b034ace41376e844f19015b49aff4b))
* add reservebalance ([4214d9f](https://github.com/gridcat/gridcoin-rpc/commit/4214d9f88d38e0ed780d885b3a14057232d65304))
* add scanforunspent ([2947b2e](https://github.com/gridcat/gridcoin-rpc/commit/2947b2e14b6bff7c560a27c1321620dfb538bf67))
* add sendfrom ([151a2c3](https://github.com/gridcat/gridcoin-rpc/commit/151a2c3c1bb4d9fc6d3a932d25f325e7374315c3))

# [3.0.0-beta.3](https://github.com/gridcat/gridcoin-rpc/compare/v3.0.0-beta.2...v3.0.0-beta.3) (2021-06-27)


### Features

* add listaddressgroupings ([2cd3e3d](https://github.com/gridcat/gridcoin-rpc/commit/2cd3e3d445c58d5e6903bf2e67d11c2a1dcdbd3f))
* add listreceivedbyaddress ([0ffe63f](https://github.com/gridcat/gridcoin-rpc/commit/0ffe63fb8be388c4c0d511552781ac4df6205805))
* add listsinceblock ([f501a7b](https://github.com/gridcat/gridcoin-rpc/commit/f501a7b63ec706a6a5231ae5fd62832b6ba3720c))
* add liststakes ([9b4282d](https://github.com/gridcat/gridcoin-rpc/commit/9b4282d3717ba2f2e3b018074dc299581777736e))
* add listtransactions ([3f6a014](https://github.com/gridcat/gridcoin-rpc/commit/3f6a014aef67ac97a5176949a0a934f43d69382b))
* add listunspent ([d2777c5](https://github.com/gridcat/gridcoin-rpc/commit/d2777c5b97dc6ef9f8b5abcb9fe450a9a6d5087a))
* add makekeypair ([ef60508](https://github.com/gridcat/gridcoin-rpc/commit/ef605087773a14d8fec32411aeb12f654ef5f253))
* add rainbymagnitude ([8a315ba](https://github.com/gridcat/gridcoin-rpc/commit/8a315ba7840bd780c87246911bbed53f090d6100))
* add repairwallet ([da530b0](https://github.com/gridcat/gridcoin-rpc/commit/da530b0c856ad8443d24e9baac30a2129990871d))

# [3.0.0-beta.2](https://github.com/gridcat/gridcoin-rpc/compare/v3.0.0-beta.1...v3.0.0-beta.2) (2021-06-27)


### Bug Fixes

* fix contract ([a25886f](https://github.com/gridcat/gridcoin-rpc/commit/a25886fc57b2c42c9f791c15dbb5eb66ee6dcfb7))


### Features

* add getnewpubkey ([c9c2ed8](https://github.com/gridcat/gridcoin-rpc/commit/c9c2ed8e202f39b12ff71e596960731d4ad83979))
* add getrawtransaction ([a4b3ef7](https://github.com/gridcat/gridcoin-rpc/commit/a4b3ef7efc2f3d3a12ab344183e752b66f629d15))
* add getrawwallettransaction ([83207a2](https://github.com/gridcat/gridcoin-rpc/commit/83207a26bf30444815829894903b6ca05e89afd3))
* add getreceivedbyaccount ([41b3cfb](https://github.com/gridcat/gridcoin-rpc/commit/41b3cfbff0106f1a2c041c018f56909d7f59fae7))
* add getreceivedbyaddress ([9c64092](https://github.com/gridcat/gridcoin-rpc/commit/9c64092b01836a1dbac6c5a76eb8abd81db39209))
* add gettransaction ([9d2435d](https://github.com/gridcat/gridcoin-rpc/commit/9d2435d443de2eefb58f7fb2c8fe428be53664ca))
* add getunconfirmedbalance ([9e93d7d](https://github.com/gridcat/gridcoin-rpc/commit/9e93d7d407b028ad5a1580563a9be1cbbc738cbe))
* add getwalletinfo ([2f9f067](https://github.com/gridcat/gridcoin-rpc/commit/2f9f0677fc6639bc4015ed1946e4c9a975f3f950))
* add keypoolrefill ([345d81c](https://github.com/gridcat/gridcoin-rpc/commit/345d81cb3b38f00319633a5761adef8894f53a10))
* add listaccounts ([7c31c18](https://github.com/gridcat/gridcoin-rpc/commit/7c31c18844a5fc9e198852d44a002289a3a72b88))

# [3.0.0-beta.1](https://github.com/gridcat/gridcoin-rpc/compare/v2.1.0-beta.1...v3.0.0-beta.1) (2021-06-26)


### Features

* add createRawTransaction ([8cb09b8](https://github.com/gridcat/gridcoin-rpc/commit/8cb09b8ba4da4ccd0dac1353c8374ef93bc67cd7))
* add getNewAddress, getBalanceDetail, getBalance and address related calls ([829e830](https://github.com/gridcat/gridcoin-rpc/commit/829e830db91af40361a5d0048b2796ba4f1e79ff))
* add network and voting ([fd1ecfa](https://github.com/gridcat/gridcoin-rpc/commit/fd1ecfa1b3924da78262be45ef6020902575bb03))
* add networking commands ([871c413](https://github.com/gridcat/gridcoin-rpc/commit/871c413916637468ed4a766d387d97ae9bc06ab0))


### BREAKING CHANGES

* structure change, deprecation of some old rules

# [2.1.0-beta.1](https://github.com/gridcat/gridcoin-rpc/compare/v2.0.0...v2.1.0-beta.1) (2021-06-23)


### Bug Fixes

* return promise on getNewAddress ([01460a5](https://github.com/gridcat/gridcoin-rpc/commit/01460a50cf03b6b09807d00931f2c28c0aedc128))


### Features

* introduce error object ([3e75f6f](https://github.com/gridcat/gridcoin-rpc/commit/3e75f6fc42e998351c931d52069342e5dba79ef1))

# [2.0.0](https://github.com/gridcat/gridcoin-rpc/compare/v1.0.0...v2.0.0) (2019-09-09)


### Bug Fixes

* **dependencies:** fix security issues ([996d7e1](https://github.com/gridcat/gridcoin-rpc/commit/996d7e1))
* **rpc:** change function name ([af869a0](https://github.com/gridcat/gridcoin-rpc/commit/af869a0))


### BREAKING CHANGES

* **rpc:** function name has been changed

# 1.0.0 (2018-12-30)


### Bug Fixes

* **index:** oopsie doopsie ([ad4f9c4](https://github.com/gridcat/gridcoin-rpc/commit/ad4f9c4))


### Features

* add rest of the calls to the main client ([9037bd3](https://github.com/gridcat/gridcoin-rpc/commit/9037bd3))
* initial commit ([2bff809](https://github.com/gridcat/gridcoin-rpc/commit/2bff809))
* **connection:** add test connection command ([ae7a7d2](https://github.com/gridcat/gridcoin-rpc/commit/ae7a7d2))
* **contracts:** address contract ([1854527](https://github.com/gridcat/gridcoin-rpc/commit/1854527))
* **contracts:** burn address, rain and recievement ([9838684](https://github.com/gridcat/gridcoin-rpc/commit/9838684))
* **contracts:** key pairs, reserve ([446f1a6](https://github.com/gridcat/gridcoin-rpc/commit/446f1a6))
* **contracts:** transaction contracts ([41e55d8](https://github.com/gridcat/gridcoin-rpc/commit/41e55d8))
* **contracts:** unspent contract ([933ca90](https://github.com/gridcat/gridcoin-rpc/commit/933ca90))
* **contracts:** wallet info and main info refactoring ([c41b8d0](https://github.com/gridcat/gridcoin-rpc/commit/c41b8d0))
