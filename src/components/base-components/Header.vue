<template>
  <div class="header">
    <div class="inner d-flex ai-center">
      <img src="@/assets/images/logo.png" alt="" />
      <span class="title fs-md ml-5 pt-1" v-if="title">{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      default: '测试标题'
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16);
  .inner {
    max-width: 960px;
    margin: 0 auto;
    height: 6rem;
  }
}
</style>
