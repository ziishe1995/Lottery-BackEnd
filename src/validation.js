import { extend, localize } from 'vee-validate'
import { confirmed, max, max_value, min, min_value, required, required_if } from 'vee-validate/dist/rules'
import locale from 'vee-validate/dist/locale/zh_CN'
import { JacLib } from 'jactools'

extend('required', {
  ...required
})
extend('min', {
  ...min
})
extend('max', {
  ...max
})
extend('min_value', {
  ...min_value
})
extend('max_value', {
  ...max_value
})
extend('confirmed', {
  ...confirmed
})
extend('url', {
  validate: value => /https?:\/\/.+\..+\..+/.test(value)
})
extend('email', {
  validate: value => /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(value)
})
extend('phone', {
  validate: value => /^\d{11}$/.test(value)
})
extend('difference', {
  params: ['target'],
  validate: (value, { target }) => value !== target
})
extend('required_if', {
  ...required_if
})
extend('img', {
  validate: files => Array.from(files).every(file => /\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(file.name))
})
extend('img_required', {
  params: ['sourceKey', 'targetKey'],
  message: '',
  validate: async (data, { sourceKey, targetKey }) => {
    return !!data[sourceKey] || !!data[targetKey]
  }
})
const convert2Array = (data, targetKey) => {
  return data && data[targetKey]
    ? data[targetKey].constructor != Array
      ? [data[targetKey]]
      : data[targetKey]
    : []
}
extend('img_width', {
  params: ['targetKey', 'value'],
  validate: async (data, { targetKey, value }) => {
    const files = convert2Array(data, targetKey)
    for (const file of Array.from(files)) { if ((await JacLib.readImageInstance(file)).width > +value) { return false } }
    return true
  }
})
extend('img_height', {
  params: ['targetKey', 'value'],
  validate: async (data, { targetKey, value }) => {
    const files = convert2Array(data, targetKey)
    for (const file of Array.from(files)) { if ((await JacLib.readImageInstance(file)).height > +value) { return false } }
    return true
  }
})
extend('img_size', {
  params: ['targetKey', 'value', 'unit'],
  validate: async (data, { targetKey, value, unit = 'KB' }) => {
    const files = convert2Array(data, targetKey)
    let size = 0
    switch (unit) {
      case 'KB':
        size = 1024
        break
      case 'MB':
        size = 1024 * 1024
        break
    }
    return [...files].every(file => file.size / size <= +value)
  }
})
extend('decimal', {
  params: ['len'],
  validate: (value, { len }) => {
    value = '' + value
    const isNumber = !isNaN(parseFloat(value)) && isFinite(value)
    if (!isNumber) { return false }
    const hasPoint = value.includes('.')
    const afterPoint = value.split('.')[1]
    return !afterPoint
      ? (!hasPoint)
      : afterPoint.length <= len
  }
})

extend('uppercase', {
  validate: value => /^[A-Z]*$/.test(value)
})

locale.messages = Object.assign(locale.messages, {
  required: () => '必填欄位',
  max: (filed, value) => `字數需小於${value.length}字元`,
  min: (filed, value) => `字數需大於${value.length}字元`,
  min_value: (filed, value) => `數字需大於${value.min}`,
  max_value: (filed, value) => `數字需小於${value.max}`,
  confirmed: () => '需与指定欄位相同',
  url: () => '非合法網址',
  email: () => '非合法Email',
  phone: () => '非合法手機號碼',
  difference: () => '需與指定欄位相異',
  required_if: () => '必填欄位',
  numeric: () => '欄位需為數字',
  decimal: (filed, value) => `必須是數字，且能夠保留${value.len}位小數`,
  img: () => '图片格式不符',
  img_required: () => '图片不得为空',
  img_width: (filed, value) => `图片宽度不符合规范，上限為${value.value}`,
  img_height: (filed, value) => `图片高度不符合规范，上限為${value.value}`,
  img_size: (filed, value) => `图片大小不符合规范，上限為${value.value}${value.unit || 'KB'}`,
  uppercase: () => '字母须为大写'
})

localize('cn', locale)
