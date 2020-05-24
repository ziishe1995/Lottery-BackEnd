<template>
  <div class="upload-box">
    <div id="imgupload-box" class="custom-file">
      <div>
        <label :for="id" class="custom-file-upload">
          {{ title }}
        </label>
        <input :id="id" ref="input" class="imgupload" type="file" @change="onFileChange">
      </div>
      <div v-if="mySrc" class="img-show">
        <i v-if="!required" class="fas fa-times" @click="onDelete" />
        <img alt="" class="OpenImgUpload" :src="mySrc">
      </div>
    </div>
    <div v-if="alert" class="text-red">
      {{ alert }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '选择档案'
    },
    alert: {
      type: String,
      default: ''
    },
    validate: {
      type: Function,
      default: () => ({ valid: true })
    },
    src: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    s3: {
      type: Boolean,
      default: true
    },
    imageRequired: {
      type: String
    },
    value: {
      type: Object
    }
  },
  data: () => ({
    id: '',
    mySrc: ''
  }),
  watch: {
    src () {
      this.updateSrc()
    }
  },
  mounted () {
    this.updateSrc()
    this.id = this.$jaclib.createID('imageUpload-')
  },
  methods: {
    async onFileChange (e) {
      const file = e.target.files[0]
      this.mySrc = await this.$jaclib.readImage(file)
      this.$emit('upload', file)
      this.validate(this.value)
    },
    onDelete () {
      this.mySrc = ''
      this.$emit('delete')
      this.$refs.input.value = ''
      this.validate(this.value)
    },
    updateSrc () {
      this.mySrc = this.src
        ? this.s3
          ? this.$s3Host + this.src
          : this.src
        : ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  .close
    position relative
    left 5px
    top 5px

  .upload-box .img-show::before
    content ''
    width 0
    height 0
    background-color transparent

  .img-show
    width max-content

  .slider-upload-box .img-show
    width auto
</style>
