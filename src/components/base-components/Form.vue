<template>
  <div class="lyl-form">
    <!-- 允许插槽 -->
    <form @submit.prevent="submit" v-if="option.column">
      <div v-for="(item, index) in option.column" :key="index">
        <div v-if="item.type === 'text'">
          <label v-if="item.label" :for="'field#' + item.prop">{{ item.label }}</label>
          <input
            :id="'field#' + item.prop"
            type="text"
            :value="value[item.prop]"
            @input="value[item.prop] = $event.target.value"
            @blur="item.rule && validate($event.target.value, item.rule, $refs['error#' + item.prop][0])"
          />
          <span v-if="item.rule" class="hide" :ref="'error#' + item.prop"></span>
          <!-- 默认值如果从model中获取，使用 :value="value[item.prop]" -->
        </div>

        <div v-else-if="item.type === 'password'">
          <label v-if="item.label" :for="'field#' + item.prop">{{ item.label }}</label>
          <input
            :id="'field#' + item.prop"
            type="password"
            :value="value[item.prop]"
            @input="value[item.prop] = $event.target.value"
            @blur="item.rule && validate($event.target.value, item.rule, $refs['error#' + item.prop][0])"
          />
          <span v-if="item.rule" class="hide" :ref="'error#' + item.prop"></span>
        </div>
        <div v-else-if="item.type === 'select'">
          <label v-if="item.label" :for="'field#' + item.prop">{{ item.label }}</label>
          <select :id="'field#' + item.prop" :value="value[item.prop]" @change="value[item.prop] = $event.target.value">
            <option v-for="(data, index) in item.dicData" :value="data.value" :key="item.prop + index">{{ data.label }}</option>
          </select>
          <span v-if="item.rule" class="hide" :ref="'error#' + item.prop"></span>
        </div>
        <div v-else-if="item.type === 'checkbox'">
          <label v-if="item.label" :for="'field#' + item.prop">{{ item.label }}</label>
          <input
            type="checkbox"
            :id="'field#' + item.prop"
            :checked="value[item.prop] === item.value"
            :value="value[item.prop]"
            @change="
              value[item.prop] = $event.target.checked ? item.value : item.value2
              showTips(item)
            "
          />
          <span v-if="item.rule" class="hide" :ref="'error#' + item.prop"></span>
        </div>
        <div v-else-if="item.type === 'radio'">
          <span>{{ item.label }}</span>

          <div v-for="(data, index) in item.dicData" :key="'radio' + index" style="display:inline-block;">
            <input
              type="radio"
              :id="item.prop + index"
              :name="item.prop"
              :checked="value[item.prop] === data.value"
              :value="data.value"
              @change="$event.target.checked && (value[item.prop] = data.value)"
            />
            <label :for="item.prop + index">{{ data.label }}</label>
          </div>
          <span v-if="item.rule" class="hide" :ref="'error#' + item.prop"></span>
        </div>
        <div v-else-if="item.type === 'textarea'">
          <label v-if="item.label" :for="'field#' + item.prop">{{ item.label }}</label>
          <textarea
            :id="'field#' + item.prop"
            :rows="item.row"
            style="vertical-align:text-top;"
            :value="value[item.prop]"
            @input="value[item.prop] = $event.target.value"
            @blur="item.rule && validate($event.target.value, item.rule, $refs['error#' + item.prop][0])"
          ></textarea>
          <span v-if="item.rule" class="hide" :ref="'error#' + item.prop"></span>
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
  watch: {},
  methods: {
    /**
     * 字段验证
     * @param String 值
     * @param Object 规则
     * @param errRef 错误框
     */
    validate(value, rule, errRef) {
      // console.log('-----start-------')
      // console.log(value, rule, errRef)
      // console.log('-----end-----')
      // 空值判断:值为空、值不等于指定值返回 false
      if (rule.required && (value === undefined || value.trim() === '' || (rule.value && value !== rule.value))) {
        errRef.innerHTML = rule.message
        errRef.style.display = 'inline'
        return false
      }

      // 合法性判断:正则存在，值不存在或不符合正则则返回 false
      if (rule.regex && (!value || !value.trim().match(rule.regex))) {
        errRef.innerHTML = rule.message2
        errRef.style.display = 'inline'
        return false
      }

      // 隐藏错误提示
      errRef.style.display = 'none'
      errRef.innerHTML = ''
      return true
    },
    submit() {
      // 计算不合法输入个数
      let cnt = 0

      // 文本域有regex判断，其他域有空值判断required
      this.option.column.forEach((item, index) => {
        // 如果有 rule 字段才会验证
        console.log('in submit')

        if (item.rule && !this.validate(this.value[item.prop], item.rule, this.$refs['error#' + item.prop][0])) {
          cnt++
        }
      })
      if (cnt <= 0) {
        this.$emit('submit')
      }
    },
    reset() {
      this.$emit('reset', this.value)
    },
    showTips(item) {
      if (item.rule && item.rule.value) {
        if (item.rule.value === this.value[item.prop]) {
          this.$refs['error#' + item.prop][0].style.display = 'none'
        } else {
          this.$refs['error#' + item.prop][0].innerHTML = item.rule.message
          this.$refs['error#' + item.prop][0].style.display = 'inline'
        }
      }
    }
  },
  created() {
    console.log(this.value)
  },
  computed: {},
  mounted() {}
}
</script>

<style lang="scss" scoped></style>
