import BaseRequest from 'lib/Request/BaseRequest'
import _config from './config'

export default class Request extends BaseRequest {
  get baseUrls () {
    return super.baseUrls.concat('site/resource_url')
  }

  constructor () {
    super()
    this.config = _config
  }

  async getS3Host (data, options) {
    return await this.request('s3', data, options)
  }
}
