<template>
  <div :class="cls.container">
    <div :class="cls.area" @drop.prevent="onDrop" @dragover.prevent="dragOver = true" @dragleave.prevent="dragOver = false" @paste.prevent="onPaste">
      <div v-if="!imageList.length" :class="cls.tips">
        <div>请将档案拖曳至此,</div>
        <div>或是点击“+”选择档案</div>
        <!-- <div :class="cls.subtitle">{{ subtitle }}</div> -->
      </div>

      <div v-for="(item, index) of imageList" :key="index" :title="item.name" :class="cls.item" :data-title="item.name">
        <img :src="item.src">
        <span :class="cls.close" @click="doDelete(item.id)">&times;</span>
      </div>

      <label :for="nextId" :class="cls.img">
        <span :class="cls.choice">+</span>
      </label>
      <input :id="nextId" multiple style="display: none !important;" type="file" @change.prevent="onChoice">
    </div>
  </div>
</template>
<script>
import ImageMixins from 'mixins/Image'
const namespace = 'im'

function toClass (name) {
  if (namespace) {
    if (namespace[-1] === '-') {
      return namespace + name
    } else {
      return namespace + '-' + name
    }
  } else {
    return name
  }
}

toClass.useSubNS = function (ns) {
  let prefix = toClass(ns).trim()

  prefix = prefix ? (prefix[-1] === '-' ? prefix : prefix + '-') : prefix
  return function (name) {
    return name ? prefix + name : prefix.slice(0, -1)
  }
}

const creator = toClass.useSubNS('upload')

const classes = {
  container: creator('container'),
  area: creator('area'),
  item: creator('item'),
  img: creator('add'),
  choice: creator('sign'),
  foot: creator('foot'),
  close: creator('close'),
  tips: creator('tips'),
  subtitle: creator('subtitle')
}

// const megaByte = 1024 * 1024

export default {
  mixins: [ImageMixins],
  props: {
    dataImageIds: {
      type: Array,
      default: () => []
    },
    imageList: { type: Array, required: true },
    subtitle: { type: String, default: '' }
  },
  data () {
    return {
      dragOver: false
    }
  },
  computed: {
    nextId () {
      return (Math.random() + '').substring(2)
    },
    cls () {
      return classes
    }
  },
  destroyed () {
    this.$emit('doDelImageList')
  },
  methods: {
    onDrop (event) {
      const data = event.dataTransfer
      if (data) {
        this.uploadImage(data.files)
      }
    },
    onPaste (event) {
      const data = event.clipboardData
      if (data) {
        this.uploadImage(data.items)
      }
    },
    onChoice (event) {
      this.uploadImage(event.target.files)
    },
    uploadImage (file) {
      this.$emit('onImageUpload', [...file])
    },
    doDelete (id) {
      this.$emit('onImageDelete', id)
    }
  }
}
</script>

<style>
.im-upload-container {
  border: 1px solid #d2d2d2;
  border-radius: 0.3em;
  margin-bottom: 15px;
}

.im-upload-container .im-upload-foot {
  display: block;
  height: 46px;
  line-height: 46px;
  padding: 0 15px;
  border-top: 1px solid #d2d2d2;
}

.im-upload-tips {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
}

.im-upload-area {
  position: relative;
  display: block;
  padding: 15px 0 0 15px;
}

.im-upload-area:hover {
  box-shadow: 0 0 0 1px #d2d2d2 inset;
}

.im-upload-area > .im-upload-tips {
  color: #ddd;
  font-size: 22px;
  cursor: default;
  text-align: center;
}

.im-upload-area > .im-upload-tips > .im-upload-subtitle {
  font-size: 18px;
}

.im-upload-area > .im-upload-item {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  margin-bottom: 15px;
  margin-right: 15px;
  overflow: hidden;
  box-shadow: 0 0 0 0 #d2d2d2;
  transition-duration: 0.2s;
  border-radius: 0.3em;
}

.im-upload-area > .im-upload-item.im-uploaded {
  box-shadow: 0 0 0 3px #008b45;
}

.im-upload-area > .im-upload-item.im-uploaded:hover {
  box-shadow: 0 0 5px 5px #006231;
}

.im-upload-area > .im-upload-item::before {
  content: attr(data-title);
  display: block;
  width: 100%;
  height: 0;
  position: absolute;
  background: rgba(35, 35, 35, 0.6);
  line-height: 25px;
  text-align: center;
  color: #fefefe;
  overflow: hidden;
  transition-duration: 0.2s;
}

.im-upload-area > .im-upload-item:hover {
  box-shadow: 0 0 5px 5px #bebebe;
}

.im-upload-area > .im-upload-item:hover::before {
  height: 25px;
}

.im-upload-area > .im-upload-item > .im-upload-close {
  cursor: pointer;
  position: absolute;
  display: block;
  top: 3px;
  right: 3px;
  z-index: 1;
  background: #000;
  color: #ffffff;
  width: 18px;
  height: 18px;
  text-align: center;
  border-radius: 50%;
}

.im-upload-area > .im-upload-item > img {
  vertical-align: middle;
  height: 100%;
}

.im-upload-add {
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 3px dashed #d2d2d2;
  transition-duration: 0.2s;
  vertical-align: top;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 0.3em;
  cursor: pointer;
}

.im-upload-add > .im-upload-sign {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 100px;
  color: #d2d2d2;
  transition-duration: 0.2s;
}

.im-upload-add > .im-upload-sign:hover {
  color: #bebebe;
}

.im-upload-add:hover {
  border-color: #bebebe;
}

.float-right {
  float: right;
}
</style>
