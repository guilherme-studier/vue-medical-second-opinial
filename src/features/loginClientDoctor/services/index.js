import axios from 'axios'

const BASE_URL = 'https://meso.poatech.com.br:450/user/api'

export const putActiveClientDoctor = ({ email, password }) => {
  return axios({
    method: 'POST',
    //headers: { 'content-type': 'multipart/form-data' },
    url: `${BASE_URL}/client-doctor-activation`,
    data: {
      email,
      password
    }
  })
}
