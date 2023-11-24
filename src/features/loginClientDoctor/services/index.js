import axios from 'axios'

const BASE_URL = 'https://meso.poatech.com.br:450/user/api/1.0'

export const putActiveClientDoctor = ({ params }) => {
  return axios({
    method: 'PUT',
    //headers: { 'content-type': 'multipart/form-data' },
    url: `${BASE_URL}/client-doctor-activation/${params.activeToken}`,
    data: {
      email: params.email,
      password: params.password
    }
  })
}
