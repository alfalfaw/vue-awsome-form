<template>
  <div class="cascader">
    <label for="select1">省份</label>
    <select id="select1" v-model="provinceCode">
      <option :value="province.code" v-for="province in provinceData" :key="province.code">{{ province.name }}</option>
    </select>
    <label for="select2">城市</label>
    <select id="select2" v-model="cityCode">
      <option :value="city.code" v-for="city in cityData" :key="city.code">{{ city.name }}</option>
    </select>
    <label for="select3">地区</label>
    <select id="select3" v-model="areaCode">
      <option :value="area.code" v-for="(area, index) in areaData" :key="area.code" :selected="index === 0">{{ area.name }}</option>
    </select>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Cascader',

  data() {
    return {
      provinceCode: null,
      cityCode: null,
      areaCode: null,
      provinceData: [
        {
          code: '110000',
          id: 1,
          name: '北京市'
        },
        {
          code: '120000',
          id: 2,
          name: '天津市'
        }
      ],
      cityData: [
        {
          code: '110100',
          id: 1,
          name: '北京市',
          provincecode: '110000'
        }
      ],
      areaData: [
        {
          id: 1,
          code: '110101',
          name: '东城区',
          citycode: '110100'
        },
        {
          id: 2,
          code: '110102',
          name: '西城区',
          citycode: '110100'
        }
      ]
    }
  },
  computed: {
    provinceUrl() {
      return 'https://cli.avuejs.com/api/area/getProvince'
    },
    cityUrl() {
      return `https://cli.avuejs.com/api/area/getCity/${this.provinceCode}`
    },
    areaUrl() {
      return `https://cli.avuejs.com/api/area/getArea/${this.cityCode}`
    }
  },
  watch: {
    async provinceCode() {
      await this.getCityData()
      await this.getAreaData()
    },
    async cityCode() {
      await this.getAreaData()
    }
  },

  created() {
    this.getProvinceData()
  },
  methods: {
    async getProvinceData() {
      const res = await axios.get(this.provinceUrl)
      this.provinceData = res.data.data
      this.provinceCode = this.provinceData[0].code
    },
    async getCityData() {
      const res = await axios.get(this.cityUrl)
      this.cityData = res.data.data
      this.cityCode = this.cityData[0].code
    },
    async getAreaData() {
      const res = await axios.get(this.areaUrl)

      this.areaData = res.data.data

      this.areaCode = this.areaData[0].code
    }
  }
}
</script>

<style></style>
