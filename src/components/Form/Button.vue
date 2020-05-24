<template>
  <span
    v-if="hasPermission"
    :class="className"
    data-toggle="tooltip"
    data-trigger="hover"
    data-container="body"
    :data-title="name"
  >
    <a class="btn text-white" :class="{ [btnColor]: true, 'btn-control': action }" @click="$emit('click')">
      <i class="fas" :class="btnIcon" />
      <span v-if="!action">{{ name }}</span>
    </a>
  </span>
</template>

<script>
import { NodeType } from 'module/node'
import { mapGetters } from 'vuex'

export default {
  props: {
    type: {
      type: String,
      required: true
    },
    action: {
      type: Boolean,
      default: false
    },
    ignorePermission: {
      default: false
    },
    iName: '',
    iBtnColor: '',
    iBtnIcon: ''
  },
  data: () => ({
    hasPermission: false,
    className: '',
    name: '',
    btnColor: '',
    btnIcon: ''
  }),
  computed: {
    ...mapGetters({
      canRead: NodeType.canRead,
      canCreate: NodeType.canCreate,
      canUpdate: NodeType.canUpdate,
      canDelete: NodeType.canDelete,
      canPermission: NodeType.canPermission
    })
  },
  mounted () {
    switch (this.type) {
      case 'search':
        this.className = 'search-btn'
        this.name = this.iName || '搜寻'
        this.btnColor = this.iBtnColor || 'btn-warning'
        this.btnIcon = this.iBtnIcon || 'fa-search'
        this.hasPermission = this.canRead
        break
      case 'add':
        this.className = 'add-btn'
        this.name = this.iName || '新增'
        this.btnColor = this.iBtnColor || 'btn-primary'
        this.btnIcon = this.iBtnIcon || 'fa-plus'
        this.hasPermission = this.canCreate
        break
      case 'permission':
        this.name = this.iName || '权限'
        this.btnColor = this.iBtnColor || 'btn-green'
        this.btnIcon = this.iBtnIcon || 'fa-lock'
        this.hasPermission = this.canPermission
        break
      case 'edit':
        this.name = this.iName || '编辑'
        this.btnColor = this.iBtnColor || 'btn-info'
        this.btnIcon = this.iBtnIcon || 'fa-edit'
        this.hasPermission = this.canUpdate
        break
      case 'rule':
        this.name = this.iName || '规则'
        this.btnColor = this.iBtnColor || 'btn-green'
        this.btnIcon = this.iBtnIcon || 'fa-list-alt'
        this.hasPermission = this.canUpdate
        break
      case 'delete':
        this.name = this.iName || '删除'
        this.btnColor = this.iBtnColor || 'btn-danger'
        this.btnIcon = this.iBtnIcon || 'fa-trash-alt'
        this.hasPermission = this.ignorePermission || this.canDelete
        break
      // case 'upload':
      //   this.name = '上传档案'
      //   this.btnColor = 'btn-primary'
      //   this.btnIcon = 'fa-cloud-upload-alt'
      //   this.hasPermission = true
      //   break
      case 'episode':
        this.name = this.iName || '集数设定'
        this.btnColor = this.iBtnColor || 'btn-success'
        this.btnIcon = this.iBtnIcon || 'fa-video'
        this.hasPermission = this.canRead
        break
      case 'episode-img':
        this.name = this.iName || '集数设定'
        this.btnColor = this.iBtnColor || 'btn-success'
        this.btnIcon = this.iBtnIcon || 'fa-picture-o'
        this.hasPermission = this.canRead
        break
      case 'episode-audio':
        this.name = this.iName || '语音管理'
        this.btnColor = this.iBtnColor || 'btn-success'
        this.btnIcon = this.iBtnIcon || 'fas fa-file-code'
        this.hasPermission = this.canRead
        break
      case 'log':
        this.name = this.iName || '纪录'
        this.btnColor = this.iBtnColor || 'btn-green'
        this.btnIcon = this.iBtnIcon || 'fa-history'
        this.hasPermission = this.canRead
        break
    }
  }
}
</script>

<style lang="stylus">
.btn
  margin-right 3px
</style>
