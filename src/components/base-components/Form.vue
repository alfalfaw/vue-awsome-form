<template>
  <div class="lyl-form">
    <!-- 允许插槽 -->
    <form ref="form" @submit.prevent="submit">
      <div v-for="(item, index) in option.column" :key="index">
        <div v-if="item.type === 'text'">
          <label v-if="item.label" :for="'field#' + item.prop">{{ item.label }}</label>
          <input :id="'field#' + item.prop" type="text" :value="value[item.prop]" @input="value[item.prop] = $event.target.value" />
          <!-- 默认值如果从model中获取，使用 :value="value[item.prop]" -->
        </div>

        <div v-else-if="item.type === 'password'">
          <label v-if="item.label" :for="'field#' + item.prop">{{ item.label }}</label>
          <input :id="'field#' + item.prop" type="password" :value="value[item.prop]" @input="value[item.prop] = $event.target.value" />
        </div>
        <div v-else-if="item.type === 'select'">
          <label v-if="item.label" :for="'field#' + item.prop">{{ item.label }}</label>
          <select :id="'field#' + item.prop" :value="value[item.prop]" @change="value[item.prop] = $event.target.value">
            <option v-for="(data, index) in item.dicData" :value="data.value" :key="item.prop + index">{{ data.label }}</option>
          </select>
        </div>
        <div v-else-if="item.type === 'checkbox'">
          <label v-if="item.label" :for="'field#' + item.prop">{{ item.label }}</label>
          <input
            type="checkbox"
            :id="'field#' + item.prop"
            :checked="value[item.prop] === item.value"
            :value="value[item.prop]"
            @change="value[item.prop] = $event.target.checked ? item.value : item.value2"
          />
        </div>
        <div v-else-if="item.type === 'radio'">
          <span>{{ item.label }}</span>
          <div v-for="(data, index) in item.dicData" :key="'radio' + index" style="display:inline-block;">
            <input
              type="radio"
              :id="item.prop + index"
              :name="item.prop"
              :checked="value[item.prop] === data.value"
              @change="$event.target.checked && (value[item.prop] = data.value)"
            />
            <label :for="item.prop + index">{{ data.label }}</label>
          </div>
        </div>
        <div v-else-if="item.type === 'textarea'">
          <label v-if="item.label" :for="'field#' + item.prop">{{ item.label }}</label>
          <textarea
            :id="'field#' + item.prop"
            :rows="item.row"
            style="vertical-align:text-top;"
            :value="value[item.prop]"
            @input="value[item.prop] = $event.target.value"
          ></textarea>
        </div>
      </div>
      <!-- 默认表单操作栏 -->
      <slot name="menuForm">
        <button type="submit">提交</button>
        <button type="button" @click="reset">重置</button>
      </slot>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props: {
    option: {
      type: Object
    },
    value: {
      type: Object
    }
  },
  data() {
    return {}
  },
  methods: {
    submit() {
      this.$emit('submit')
    },
    reset() {
      this.$emit('reset', this.value)
    },
    createForm() {
      let div
      this.option.column.forEach((item, index) => {
        div = document.createElement('div')
        if (item.label) {
          div.innerHTML += `<label for="field${index}">${item.label}</label>`
        }
        switch (this.option.column[index].type) {
          case 'text':
            console.log('文本框')

            div.innerHTML += `<input type="text" id="field${index}"></input>`
            this.form.insertBefore(div, this.form.firstChild)
            break

          case 'password':
            console.log('密码框')

            div.innerHTML += `<input type="password" id="field${index}"></input>`
            this.form.insertBefore(div, this.form.firstChild)
            break

          case 'checkbox':
            console.log('多选')

            div.innerHTML += `<checkbox type="password" id="field${index}"></checkbox>`
            this.form.insertBefore(div, this.form.firstChild)
            break
          case 'radio':
            // radio只能选中一个，name相同，value值不同
            console.log('单选')
            break
          case 'select':
            console.log('选择')
            break
          case 'textarea':
            console.log('文本域')
            break
          default:
            console.log('未知类型')
            break
        }
      })

      // for (let index = 0; index < this.option.column.length; index++) {}
    }
  },
  created() {
    console.log('in created')
    console.log(this.value)
    console.log(this.option.column)
  },
  computed: {
    form() {
      return this.$refs.form
    }
  },
  mounted() {
    //  渲染表单
    // this.createForm()
  }
}
</script>

<style lang="scss" scoped></style>
