<template>
  <validation-provider v-slot="{errors, invalid, validate}" :rules="rules" :vid="vid">
    <slot :errors="errors" :invalid="invalid" :validate="validate" />
    <span v-if="showError && invalid" v-show="errors[0]" class="parsley-errors-list filled">{{ errors[0] }}</span>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider
  },
  props: {
    rules: {
      type: String | Object,
      required: true
    },
    vid: {
      type: String
    },
    showError: {
      default: true
    }
  }
}
</script>
