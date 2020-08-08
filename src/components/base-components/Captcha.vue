<template>
  <div class="captcha">
    <div class="captcha-content">
      <div class="input-wrapper">
        <input type="text" />
      </div>
      <button type="button" @click="sendCode" :disabled="disabled">{{ disabled ? `等待 ${remainTime} 秒` : '发送验证码' }}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 等待时间
      waitTime: 10,
      // 剩余等待时间
      remainTime: 0,
      disabled: false
    }
  },
  methods: {
    sendCode() {
      this.disabled = true
      this.remainTime = this.waitTime
      const timer = setInterval(() => {
        this.remainTime--
        if (this.remainTime === 0) {
          this.disabled = false
          clearInterval(timer)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.captcha {
  margin: 60px;
  .captcha-content {
    display: flex;
    .input-wrapper {
      border: 1px solid #ccc;
      border-right: none;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;

      input {
        height: 35px;
        outline: none;
        padding: 10px 0 10px 14px;
        border: none;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
    }
    button {
      width: 80px;
      color: white;
      border: 1px solid #409eff;
      outline: 0;
      padding: 0 5px;
      background: #409eff;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      cursor: pointer;
      &:focus {
        outline: 0;
      }
      &:hover,
      &:disabled {
        background: #66b1ff;
        border-color: #66b1ff;
      }
    }
  }
}
</style>
