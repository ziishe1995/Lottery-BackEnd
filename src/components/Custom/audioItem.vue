<template>
  <div class="photo-item audio-item-width">
    <div class="audio-player-box">
      <div class="pcast-player">
        <div class="pcast-player-controls">
          <button class="pcast-play" style="margin-right:5px" @click="startPlayOrPause">
            <i :class="{ 'fa fa-play': !audio.playing, 'fa fa-pause': audio.playing }" />
          </button>
          <button class="pcast-rewind" @click="getRewind">
            <i class="fa fa-fast-backward" /><span>Rewind</span>
          </button>
          <span class="pcast-currenttime pcast-time">{{ audio.minTime }}</span>
          <progress class="pcast-progress" value="" />
          <span class="pcast-duration pcast-time">{{ audio.maxTime }}</span>
          <button class="pcast-speed" style="margin-right:5px" @click="getSpeed">
            {{ audio.speed }}x
          </button>
          <button class="pcast-mute" @click="getMuted((audio.muted = !audio.muted))">
            <i :class="{ 'fa fa-volume-up': !audio.muted, 'fa fa-volume-off': audio.muted }" />
          </button>
        </div>
        <audio
          id="audio-1"
          ref="audio"
          autoplay="autoplay"
          :src="item.file_url"
          @pause="onPause"
          @play="onPlay"
        />
      </div>
    </div>
    <div class="txt" style="position: relative;">
      <h5>{{ item.original_file_name }}</h5>
      <span class="" data-toggle="tooltip" data-trigger="hover" data-container="body" data-title="删除">
        <a id="" class="text-danger delete-dialog" @click="doDelete(item.id)">
          <i class="fas fa-trash-alt" />
        </a>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: { type: Object, default: () => ({}) }
  },

  data () {
    return {
      song: {},
      audio: {
        playing: false,
        maxTime: '00:00',
        minTime: '00:00',
        speed: 1,
        muted: false
      },
      sliderTime: 0,
      speeds: [1, 1.5, 2, 2.5, 3, 0.5],
      currentSpeedIdx: 0
    }
  },
  computed: {},
  mounted () {
    this.$refs.audio.load()
    this.$refs.audio.oncanplay = function () {
      this.$refs.audio.pause()
      this.audio.maxTime = this.realFormatSecond(this.$refs.audio.duration)
    }.bind(this)
  },
  async destroyed () {},
  methods: {
    realFormatSecond (second) {
      const secondType = typeof second
      if (secondType === 'number' || secondType === 'string') {
        second = parseInt(second)
        const mimute = Math.floor(second / 60)
        second = second - mimute * 60
        return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
      } else {
        return '00:00'
      }
    },
    startPlayOrPause () {
      return this.audio.playing ? this.pause() : this.play()
    },
    getRewind () {
      this.$refs.audio.currentTime -= 30
    },
    getSpeed () {
      this.currentSpeedIdx = this.currentSpeedIdx + 1 < this.speeds.length ? this.currentSpeedIdx + 1 : 0
      this.$refs.audio.playbackRate = this.speeds[this.currentSpeedIdx]
      this.audio.speed = this.speeds[this.currentSpeedIdx]
    },
    getMuted (muted) {
      this.$refs.audio.muted = muted
    },
    onStarTimeText () {
      const that = this
      clearInterval()
      setInterval(function () {
        that.audio.minTime = that.realFormatSecond(that.$refs.audio.currentTime)
      }, 1000)
    },
    play () {
      this.$refs.audio.play()
      this.onStarTimeText()
    },
    pause () {
      this.$refs.audio.pause()
    },
    onPlay () {
      this.audio.playing = true
    },
    onPause () {
      this.audio.playing = false
    },
    doDelete (id) {
      this.$emit('onDelete', id)
    }
  }
}
</script>
