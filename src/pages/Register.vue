<template>
  <div class="register">
    <page-header :title="title"></page-header>
    <!-- inner 设置最大宽度为960px -->
    <div class="inner mt-5">
      <div class="banner">
        <img :src="bannerUrl" alt="" />
      </div>
      <!-- <div class="date-picker mt-5">
        <date-picker v-model="date"></date-picker>
        Month:{{ date.month }} Year:{{ date.year }} Age:{{ date.age }}
      </div> -->

      <dir class="mt-5">
        <custom-form v-if="option.column" @submit="submit" @reset="reset()" :option="option" v-model="model">
          <!-- template加slot属性可以使用具名插槽 -->
          <!-- <template slot="menuForm">
            <button type="submit" @click="submit">提交</button>
          </template> -->
        </custom-form>
      </dir>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/base-components/Header'
// import DatePicker from '@/components/base-components/DatePicker'
import CustomForm from '@/components/base-components/Form'
import { getFormData } from '@/api/formApi'
export default {
  name: 'Register',
  components: {
    PageHeader,
    // DatePicker,
    CustomForm
  },
  data() {
    return {
      date: {
        month: 1,
        year: 2020
      },
      title: '测试标题2',
      bannerUrl: 'https://filecdn.issmart.com.cn/ftp/static//image/4b9aacbf-2ee6-4613-b365-028e1836e7e4.png',
      // 表单数据
      model: {},
      // 表单字段
      option: {}
    }
  },
  methods: {
    async fetchFormData() {
      try {
        // 请求成功处理
        const res = await getFormData()
        this.option = res.data
      } catch (error) {
        // 请求失败处理
      }
    },
    // 提交表单
    submit() {
      console.log(this.model)
    },
    // 重置表单
    reset() {
      this.model = {}
    }
    // submit(form, done) {
    //   this.$message.success(JSON.stringify(form))
    //   done()
    // },
    // error(err) {
    //   this.$message.success('请查看控制台')
    //   console.log(err)
    // }
  },
  created() {},
  mounted() {
    this.fetchFormData()
  }
}
</script>

<style lang="scss" scoped>
.register {
  .inner {
    max-width: 960px;
    margin-right: auto;
    margin-left: auto;
    .banner {
      img {
        width: 100%;
        max-width: 100%;
      }
    }
    .form {
      max-width: 450px;
      margin-right: auto;
      margin-left: auto;
    }
  }
}
.avue-form__row {
  width: 100%;
}
</style>
