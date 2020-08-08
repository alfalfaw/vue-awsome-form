<template>
  <div class="date-picker">
    Month: <input type="number" :value="month" @input="$emit('update:month', $event.target.value)" /> Year:
    <input type="number" :value="year" @input="$emit('update:year', $event.target.value)" />
  </div>
</template>
// $emit('change', { year: $event.target.value })
<script>
export default {
  props: ['month', 'year'],
  methods: {
    // updateDate(newVal) {
    //   this.$emit('input', Object.assign({}, this.value, newVal))
    // }
  }
}
</script>

<style></style>
