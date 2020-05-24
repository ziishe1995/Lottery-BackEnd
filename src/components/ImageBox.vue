<template>
  <section>
    <img class="pointer" :src="src" @click="show">
    <image-container ref="box" :src="src" size="auto" />
  </section>
</template>

<script>
export default {
  components: {
    ImageContainer: require('@/Container/Image').default
  },
  props: ['src'],
  methods: {
    show () {
      this.$refs.box.show()
    }
  }
}
</script>
