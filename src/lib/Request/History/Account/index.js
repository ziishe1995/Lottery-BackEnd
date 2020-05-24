import BaseRequest from 'lib/Request/BaseRequest'
import _config from './config'

export default class AccountManage extends BaseRequest {
  get baseUrls () {
    return super.baseUrls.concat('/account/login/history')
  }

  constructor () {
    super()
    this.config = _config
  }

  async getList (data, options) {
    return await this.request('list', data, options)
  }

  async getTotal (data, options) {
    return await this.request('total', data, options)
  }

  async getOptions (data, options) {
    return await this.request('options', data, options)
  }
}
