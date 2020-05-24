import BaseRequest from 'lib/Request/BaseRequest'
import _config from './config'

export default class Request extends BaseRequest {
  get baseUrls () {
    return super.baseUrls.concat('lottery/manage')
  }

  constructor () {
    super()
    this.config = _config
  }

  async getList (data, options) {
    return await this.filterRequest('list', data, options)
  }

  async getTotal (data, options) {
    return await this.filterRequest('total', data, options)
  }

  async getOptions (data, options) {
    return await this.filterRequest('options', data, options)
  }

  async doUpdate (data, options) {
    return await this.filterRequest('update', data, options)
  }

  async doDelete (data, options) {
    return await this.filterRequest('delete', data, options)
  }

  async doUpdateRule (data, options) {
    return await this.filterRequest('updateRule', data, options)
  }

  async doUploadPic (data, options) {
    return await this.filterRequest('uploadPic', data, options)
  }
}
