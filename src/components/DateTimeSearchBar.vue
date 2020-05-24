<template>
  <div class="form-group">
    <div class="date-select m-r-10">
      <div class="input-group">
        <date-time-picker
          :value="startTime"
          placeholder="開始日期"
          @input="val => $emit('update:start', val)"
        />
        <div class="input-group-append">
          <span class="input-group-text"><i class="far fa-calendar-alt" /></span>
        </div>
      </div>
    </div>
    <div class="date-select m-r-10">
      <div class="input-group">
        <date-time-picker
          :value="endTime"
          placeholder="結束日期"
          @input="val => $emit('update:end', val)"
        />
        <div class="input-group-append">
          <span class="input-group-text"><i class="far fa-calendar-alt" /></span>
        </div>
      </div>
    </div>
    <div class="date-btn m-r-10">
      <button type="button" class="btn btn-day" data-toggle="button" @click="yesterday()">
        昨日
      </button>
      <button type="button" class="btn btn-day" data-toggle="button" @click="today()">
        今日
      </button>
      <button type="button" class="btn btn-day" data-toggle="button" @click="lastWeek()">
        上周
      </button>
      <button type="button" class="btn btn-day" data-toggle="button" @click="thisWeek()">
        本周
      </button>
      <button type="button" class="btn btn-month" data-toggle="button" @click="lastMonth()">
        上月
      </button>
      <button type="button" class="btn btn-month" data-toggle="button" @click="thisMonth()">
        本月
      </button>
    </div>
  </div>
</template>

<script>
import DateTimePicker from '@/DateTimePicker'

export default {
  components: { DateTimePicker },
  props: ['start', 'end'],
  data: () => ({
    startTime: null,
    endTime: null
  }),
  watch: {
    start () {
      this.startTime = this.start
    },
    end () {
      this.endTime = this.end
    }
  },
  mounted () {
    this.startTime = this.start
    this.endTime = this.end
  },
  methods: {
    yesterday () {
      this.startTime = moment().subtract(1, 'days').startOf('day')
      this.endTime = moment().subtract(1, 'days').endOf('day')
    },
    today () {
      this.startTime = moment().startOf('day')
      this.endTime = moment().endOf('day')
    },
    lastWeek () {
      this.startTime = moment().subtract(1, 'weeks').startOf('isoWeek')
      this.endTime = moment().subtract(1, 'weeks').endOf('isoWeek')
    },
    thisWeek () {
      this.startTime = moment().startOf('isoWeek')
      this.endTime = moment().endOf('isoWeek')
    },
    lastMonth () {
      this.startTime = moment().subtract(1, 'months').startOf('month')
      this.endTime = moment().subtract(1, 'months').endOf('month')
    },
    thisMonth () {
      this.startTime = moment().startOf('month')
      this.endTime = moment().endOf('month')
    }
  }
}
</script>
