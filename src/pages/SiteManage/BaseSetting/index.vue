<template>
  <div id="content" class="content">
    <!-- begin breadcrumb -->
    <ol class="breadcrumb pull-right m-b-20">
      <li class="breadcrumb-item">
        <router-link :to="{ name: 'welcome' }">
          首页
        </router-link>
      </li>
      <li class="breadcrumb-item">
        <a href="javascript:;">网站管理</a>
      </li>
      <li class="breadcrumb-item active">
        基本设置
      </li>
    </ol>
    <!-- end breadcrumb -->

    <!-- begin row -->
    <div class="">
      <!-- begin panel -->
      <div class="panel panel-inverse" style="clear:both;">
        <!-- begin panel-heading -->
        <div class="panel-heading p-t-10">
          <h4 class="text-white m-b-0">
            基本设置
          </h4>
        </div>
        <!-- end panel-heading -->
        <!-- begin panel-body -->
        <validation v-slot="{invalid}">
          <div class="panel-body">
            <alert />
            <div class="form-group row m-b-15">
              <label class="col-md-3 col-lg-2 col-form-label required">网站名称</label>
              <div class="col-md-6 col-lg-6">
                <validate rules="required|max:50">
                  <input v-model="data.title" type="text" class="form-control">
                </validate>
              </div>
            </div>
            <div class="form-group row m-b-15">
              <label class="col-md-3 col-lg-2 col-form-label required">网站 LOGO</label>
              <div class="col-md-6 col-lg-6 web-setting-uploadimg">
                <validate
                  v-slot="{ validate }"
                  rules="img|img_width:logo,234|img_height:logo,74|img_required:logo_path,logo"
                >
                  <j-image
                    alert="上传图片限制尺寸为 234X74"
                    :validate="validate"
                    :src="data.logo_path"
                    :value="data"
                    required
                    @upload="file => {data.logo = file}"
                  />
                </validate>
              </div>
            </div>
            <div class="form-group row m-b-15">
              <label class="col-md-3 col-lg-2 col-form-label ">版权所有</label>
              <div class="col-md-6 col-lg-6">
                <validate rules="max:50">
                  <input v-model="data.copyright" type="text" class="form-control">
                </validate>
              </div>
            </div>
            <div class="form-group row m-b-15">
              <label class="col-md-3 col-lg-2 col-form-label">ICP备案编号</label>
              <div class="col-md-6 col-lg-6">
                <validate rules="max:30">
                  <input v-model="data.icp" type="text" class="form-control">
                </validate>
              </div>
            </div>
            <div class="form-group row m-b-15">
              <label class="col-md-3 col-lg-2 col-form-label">联系资讯</label>
              <div v-if="data.contact" class="col-md-6 col-lg-6 contact-list">
                <div class="contact-item">
                  <div class="title">
                    线上客服
                  </div>
                  <div class="input">
                    <input v-model="data.contact.customer_service" type="text" class="form-control">
                  </div>
                </div>
                <div class="contact-item">
                  <div class="title">
                    QQ
                  </div>
                  <div class="input">
                    <input v-model="data.contact.qq" type="text" class="form-control">
                  </div>
                </div>
                <div class="contact-item">
                  <div class="title">
                    Wechat
                  </div>
                  <div class="input">
                    <input v-model="data.contact.we_chat" type="text" class="form-control">
                  </div>
                </div>
                <div class="contact-item">
                  <div class="title">
                    Telegram
                  </div>
                  <div class="input">
                    <input v-model="data.contact.telegram" type="text" class="form-control">
                  </div>
                </div>
                <div class="contact-item">
                  <div class="title">
                    Potato
                  </div>
                  <div class="input">
                    <input v-model="data.contact.potato" type="text" class="form-control">
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row m-b-15">
              <label class="col-md-3 col-lg-2 col-form-label">QRCODE</label>
              <div class="col-md-6 col-lg-6 web-setting-uploadimg qrcode-box">
                <validate
                  v-slot="{ validate }"
                  class="col-md-6"
                  rules="img|img_width:ios_qr_code,88|img_height:ios_qr_code,88"
                >
                  <j-image
                    alert="iOS 上传图片限制尺寸为 88X88"
                    :validate="validate"
                    :src="data.ios_qr_path"
                    :value="data"
                    @upload="file => data.ios_qr_code = file"
                    @delete="data.del_ios_qr_code = Const.Y"
                  />
                </validate>
                <validate
                  v-slot="{ validate }"
                  class="col-md-6"
                  rules="img|img_width:android_qr_code,88|img_height:android_qr_code,88"
                >
                  <j-image
                    alert="Android 上传图片限制尺寸为 88X88"
                    :validate="validate"
                    :src="data.android_qr_path"
                    :value="data"
                    @upload="file => data.android_qr_code = file"
                    @delete="data.del_android_qr_code = Const.Y"
                  />
                </validate>
              </div>
            </div>
            <div class="m-t-30">
              <button class="btn btn-primary width-70" :disabled="invalid" @click="doSubmit">
                储存
              </button>
            </div>
          </div>
        </validation>
      </div>
    </div>
  </div>
</template>

<script>
import ApiMixins from 'mixins/ApiOption'

export default {
  components: {
    JImage: require('@/Form/Image').default
  },
  mixins: [ApiMixins],
  data: () => ({
    data: {}
  }),
  api: 'site.base',
  created () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      const res = await this.$thisApi.getDetail()
      this.data = { ...res.data, logo: null, del_logo: null }
    },
    async doSubmit () {
      await this.$thisApi.doUpdate(this.data, { formData: true })
      this.$alert.success('编辑成功')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .qrcode-box >>> .upload-box
    width 100%
</style>
