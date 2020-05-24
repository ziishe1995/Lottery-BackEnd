import BaseRequest from 'lib/Request/BaseRequest'
import _config from './config'

export default class User extends BaseRequest {
  get baseUrls () {
    return super.baseUrls.concat('/account/pilot')
  }

  constructor () {
    super()
    this.config = _config
  }

  async getProfile (data, options) {
    return await this.request('profile', data, options)
  }

  async doUpdate (data, options) {
    return await this.request('update', data, options)
  }

  async getNodes (data, options) {
    return await this.request('nodes', data, options)
  }
}
