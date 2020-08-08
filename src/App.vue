<template>
  <div id="app">
    <captcha></captcha>
    <router-view></router-view>
  </div>
</template>

<script>
// import Cascader from '@/components/base-components/Cascader'
import Captcha from '@/components/base-components/Captcha'
export default {
  name: 'app',
  components: {
    // Cascader
    Captcha
  }
}
</script>

<style></style>
