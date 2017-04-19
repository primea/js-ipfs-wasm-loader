/**
 * Refernace text
 * WASM's JS api http://webassembly.org/docs/js/ 
 * To compile .wast => wasm use wabit's wasm2wast https://github.com/WebAssembly/wabt
 * To parse .wasm files use wasm-json-toolkit https://github.com/ewasm/wasm-json-toolkit you will need this to extrat the ipfs hashes from the imports
 * the .wasm binary format documention https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md
 */

const tape = require('tape')
const fs = require('fs')
const ipfsLoader = require('../')

tape('testing ipfs loader', async t => {
  const wasm = fs.readFileSync('a.wasm')
  const importModules = await ipfsLoader.loaderImports(wasm)
  console.log(importModules)
  // >  {
  // >    c: {
  // >         code: <buffer that contains c.wasm, loaded from ipfs>,
  // >         imports {b: {code: <buffer that contains b.wasm, loaded from ipfs>}}
  // >      }
  // >   }
  //

  // create the wasm instance with the imports from ipfs and local imports
  const instance = ipfsLoader.Instance(wasm, importModules, {
    'NOT_A_IPFS_HASH': {
      'log': result => console.log(result)
    }
  })

  instance.addTwo(2, 10)
  // should print "12"
})
