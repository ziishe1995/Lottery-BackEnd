import env from 'src/../env'
import hosts from 'config/hosts'

export default class API {
  constructor () {
    this.user = {
      passport: new (require('./Request/User/Passport').default)(),
      pilot: new (require('./Request/User/Pilot').default)()
    }
    this.system = {
      manage: new (require('./Request/System/Manage').default)(),
      role: new (require('./Request/System/Role').default)()
    }
    this.history = {
      account: new (require('./Request/History/Account').default)()
    }
    this.site = {
      base: new (require('./Request/Site/Base').default)(),
      host: new (require('./Request/Site/Host').default)(),
      news: {
        category: new (require('./Request/Site/News/Category').default)(),
        manage: new (require('./Request/Site/News/Manage').default)()
      },
      adSlide: new (require('./Request/Site/ADSlide').default)(),
      announcement: new (require('./Request/Site/Announcement').default)(),
      friendship: new (require('./Request/Site/Friendship').default)(),
      page: new (require('./Request/Site/Page').default)()
    }
    this.lottery = {
      category: new (require('./Request/Lottery/Category').default)(),
      setting: new (require('./Request/Lottery/Setting').default)()
    }
    this.lotteryResults = {
      results: new (require('./Request/LotteryResults').default)()
    }
  }

  static get hosts () {
    return hosts
  }

  static get target () {
    let target = env.target
    const host = location.host
      .split('.')
      .splice(1)
      .join('.')
    if (!host) { return target }
    Object.keys(this.hosts).forEach((key) => {
      target = hosts[key].host === host
        ? key
        : target
    })
    return target
  }

  static get host () {
    return '//' + [this.hosts[this.target].prefix, this.hosts[this.target].host].join('.')
  }

  static async getPassport () {
    const res = await axios.create({ baseURL: '/' }).get('/resource/config/passport.json')
    return res.data[this.target]
  }
}
