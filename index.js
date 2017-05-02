const wasm2json = require('wasm-json-toolkit').wasm2json
const CID = require('cids')
module.exports = class ipfsLoader {

  constructor(dagApi) {
    this.dagApi = dagApi
  }
  async loadImports (wasmCode) {
    const ret = {}
    let importSection = this.getImportSection(wasmCode)
    for (let i = 0; i < importSection.length; i++) {
      const e = importSection[i]
      ret[e.moduleStr] = {code: Buffer.from([]), imports: {}}

      if (this.isValidCID(e.moduleStr)) {
        console.log('resolving', e.moduleStr)
        ret[e.moduleStr].code = (await this.IpfsGet(e.moduleStr)).value
        ret[e.moduleStr].imports = this.getImportSection(ret[e.moduleStr].code)
        if(ret[e.moduleStr].imports == null) return ret
        importSection = importSection.concat(ret[e.moduleStr].imports)
        console.log('appended', importSection)
      }
    }

    return ret
  }


  Instance (wasm, ipfsImports, localImports) {
    ipfsImports = Object.assign(ipfsImports, localImports)
    return ipfsImports
  }

  isValidCID (link) {
    try {
      CID.isCID(new CID(link))
    } catch (e) {
      return false
    }
    return true
  }

  IpfsGet (hash) {
    return this.dagApi.get(new CID(hash))
  }

  getImportSection (code) {
    code = wasm2json(code)
    const imports = code.filter((e) => e.name === 'import')[0]
    if(!imports || !imports.entries) return null
    return imports.entries
  }
}
