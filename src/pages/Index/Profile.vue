<template>
  <validation v-slot="{invalid}">
    <div id="content" class="content">
      <!-- begin breadcrumb -->
      <ol class="breadcrumb pull-right m-b-20">
        <li class="breadcrumb-item">
          <a href="javascript:;">首页</a>
        </li>
        <li class="breadcrumb-item active">
          个人资料
        </li>
      </ol>
      <!-- end breadcrumb -->
      <!-- begin page-header -->
      <!-- <h1 class="page-header">帐号管理</h1> -->
      <!-- end page-header -->

      <!-- begin row -->
      <div class="">
        <!-- begin panel -->
        <div class="panel panel-inverse" style="clear:both;">
          <!-- begin panel-heading -->
          <div class="panel-heading p-t-10">
            <h4 class="text-white m-b-0">
              个人资料
            </h4>
          </div>
          <!-- end panel-heading -->
          <!-- begin panel-body -->
          <div class="panel-body">
            <alert />

            <div class="form-group row m-b-15">
              <label class="col-md-3 col-lg-2 col-form-label">帐号</label>
              <div class="col-md-6 col-lg-6">
                <div class="form-txt border-line">
                  {{ data.account }}
                </div>
              </div>
            </div>
            <div class="form-group row m-b-15">
              <label class="col-md-3 col-lg-2 col-form-label required">昵称</label>
              <div class="col-md-6 col-lg-6">
                <validate rules="required|min:4|max:32">
                  <input v-model="data.display_name" type="text" class="form-control">
                </validate>
              </div>
            </div>
            <div class="form-group row m-b-15">
              <label class="col-md-3 col-lg-2 col-form-label">角色名称</label>
              <div class="col-md-6 col-lg-6">
                <div class="form-txt border-line">
                  {{ _.map(data.roles, 'display_name').join(', ') }}
                </div>
              </div>
            </div>
            <div class="form-group row m-b-15">
              <label class="col-md-3 col-lg-2 col-form-label required">旧密码</label>
              <div class="col-md-6 col-lg-6">
                <validate rules="min:4|max:32" vid="old_password">
                  <input v-model="data.old_password" type="password" class="form-control">
                  <div class="m-t-1 form-txt text-red">
                    若不修改密码, 请保留空白
                  </div>
                </validate>
              </div>
            </div>
            <div class="form-group row m-b-15">
              <label class="col-md-3 col-lg-2 col-form-label required">新密码</label>
              <div class="col-md-6 col-lg-6">
                <validate rules="required_if:old_password|min:4|max:32" vid="new_password">
                  <input v-model="data.new_password" type="password" class="form-control">
                </validate>
              </div>
            </div>
            <div class="form-group row m-b-15">
              <label class="col-md-3 col-lg-2 col-form-label required">新密码确认</label>
              <div class="col-md-6 col-lg-6">
                <validate rules="confirmed:new_password">
                  <input v-model="data.new_password_confirmation" type="password" class="form-control">
                </validate>
              </div>
            </div>
            <div class="form-group row m-b-15">
              <label class="col-md-3 col-lg-2 col-form-label">最后登入时间</label>
              <div class="col-md-6 col-lg-6">
                <div class="form-txt border-line">
                  {{ data.updated_at }}
                </div>
              </div>
            </div>
            <div class="form-group row m-b-15">
              <label class="col-md-3 col-lg-2 col-form-label">图像</label>
              <div class="col-md-6 col-lg-6">
                <div class="upload-box">
                  <div class="custom-file">
                    <label for="file-upload" class="custom-file-upload">
                      选择档案
                    </label>
                    <input id="file-upload" type="file" @change="onFileChange">
                  </div>
                  <div class="text-red">
                    上传图片限制尺寸为260X260，档案大小256KB
                  </div>
                </div>
                <div v-if="photo.name" class="upload-info">
                  <div class="table-responsive m-t-5">
                    <table class="table table-bordered text-center">
                      <thead>
                        <tr>
                          <th>预览</th>
                          <th>档案资讯</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><img :src="photo.url"></td>
                          <td class="text-left">
                            档案名称: {{ photo.name }}<br>
                            档案大小: {{ photo.size }}
                          </td>
                          <td>
                            <!--<j-button type="upload" :action="true" />-->
                            <j-button type="delete" :action="true" :ignore-permission="true" @click="onDelete" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="m-t-30">
              <button class="btn btn-primary width-70" :disabled="invalid" @click="doSubmit()">
                储存
              </button>
              <!--<a class="btn btn-white width-70">取消</a>-->
            </div>
          </div>
          <!-- end panel-body -->
        </div>
        <!-- end panel -->
      </div>
      <!-- end row -->
    </div>
  </validation>
</template>

<script>
import IndexMixins from 'mixins/Index'
import ApiOptionMixins from 'mixins/ApiOption'
import bytes from 'bytes'

export default {
  mixins: [IndexMixins, ApiOptionMixins],
  data: () => ({
    data: {},
    photo: {}
  }),
  api: 'user.pilot',
  mounted () {
    this.data = Object.assign({}, this.data, _.omit(this.account, 'cover'))
  },
  methods: {
    async doSubmit () {
      await this.$thisApi.doUpdate(this.data, { formData: true }, {
        f: () => {
          this.$alert.danger('更新失败')
        }
      })
      this.getAccount()
      this.$alert.success('更新成功')
      this.data = _.omit(this.data, ['old_password', 'new_password', 'new_password_confirmation'])
    },
    async onFileChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.data = Object.assign({}, this.data, { cover: files[0] })
      this.photo = {
        name: files[0].name,
        size: bytes(files[0].size),
        file: files[0],
        url: await this.$jaclib.readImage(files[0])
      }
    },
    onDelete () {
      this.cover = null
      this.photo = {}
    }
  }
}
</script>

<style lang="stylus" scoped>
  .custom-file-label::after
    content: "上传" !important
</style>
