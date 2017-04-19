const IPFS = require('ipfs')
const fs = require('fs')

const ipfs = new IPFS()
ipfs.on('error', err => {
  console.log(err)
})

ipfs.on('start', async () => {
  const c = fs.readFileSync('./c.wasm')
  const cCid = await ipfs.dag.put(c, {
    format: 'dag-cbor',
    hashAlg: 'sha2-256'
  })
  console.log(cCid.toBaseEncodedString())

  const b = fs.readFileSync('./b.wasm')
  const bCid = await ipfs.dag.put(b, {
    format: 'dag-cbor',
    hashAlg: 'sha2-256'
  })
  console.log(bCid.toBaseEncodedString())

  ipfs.stop(() => {
    process.exit()
  })
})
