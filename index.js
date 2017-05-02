const wasm2json = require('wasm-json-toolkit').wasm2json
const CID = require('cids')
const ipfs = new (require('ipfs'))()
module.exports = class ipfsLoader {
  static async loadImports (wasmCode) {
    const ret = {}
    const importSection = this.getImportSection(wasmCode)
    for (let i = 0; i < importSection.length; i++) {
      const e = importSection[i]
      ret[e.moduleStr] = {code: Buffer.from([]), imports: {}}

      if (this.isValidCID(e.moduleStr) && ipfs.isOnline()) {
        ret[e.moduleStr].code = (await this.IpfsGet(e.moduleStr)).value
        ret[e.moduleStr].imports = this.getImportSection(ret[e.moduleStr].code)
      }
    }

    return ret
  }

  static Instance (wasm, ipfsImports, localImports) {
    ipfsImports = Object.assign(ipfsImports, localImports)
  }

  static isValidCID (link) {
    try {
      CID.isCID(new CID(link))
    } catch (e) {
      return false
    }
    return true
  }

  static IpfsGet (hash) {
    return ipfs.dag.get(new CID(hash))
  }

  static getImportSection (code) {
    code = wasm2json(code)
    return code.filter((e) => e.name === 'import')[0].entries
  }
}
