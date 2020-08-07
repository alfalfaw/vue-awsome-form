<template>
  <div class="date-picker">
    Month: <input type="number" ref="monthPicker" :value="value.month" @input="updateDate()" /> Year:
    <input type="number" ref="yearPicker" :value="value.year" @input="updateDate()" />
  </div>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    updateDate() {
      this.$emit('input', {
        // 字段名必须是v-model中的字段
        month: this.$refs.monthPicker.value,
        year: this.$refs.yearPicker.value
      })
    }
  }
}
</script>

<style></style>
