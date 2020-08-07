import axios from '../plugins/axios'

function getFormData() {
  return axios.get('forms/1')
}

export { getFormData }
