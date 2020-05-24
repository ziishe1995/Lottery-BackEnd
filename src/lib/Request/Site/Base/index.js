import BaseRequest from 'lib/Request/BaseRequest'
import _config from './config'

export default class Request extends BaseRequest {
  get baseUrls () {
    return super.baseUrls.concat('site/manage')
  }

  constructor () {
    super()
    this.config = _config
  }

  async getDetail (data, options) {
    return await this.request('detail', data, options)
  }

  async doUpdate (data, options) {
    return await this.request('update', data, options)
  }
}
