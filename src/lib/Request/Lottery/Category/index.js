import BaseRequest from 'lib/Request/BaseRequest'
import _config from './config'

export default class Request extends BaseRequest {
  get baseUrls () {
    return super.baseUrls.concat('lottery_classified/manage')
  }

  constructor () {
    super()
    this.config = _config
  }

  async getList (data, options) {
    return await this.request('list', data, options)
  }

  async getOptions (data, options) {
    return await this.request('option', data, options)
  }

  async doCreate (data, options) {
    return await this.request('create', data, options)
  }

  async doUpdate (data, options) {
    return await this.request('update', data, options)
  }

  async doUpdateSequence (data, options) {
    return await this.request('updateSequence', data, options)
  }

  async doDelete (data, options) {
    return await this.request('delete', data, options)
  }
}
