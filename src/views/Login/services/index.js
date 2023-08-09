import axios from 'axios'

const BASE_URL = 'https://meso.poatech.com.br:450/user/api/1.0'

// /**
//  * @see https://meso.poatech.com.br:450/user/api/1.0/users
//  */

// export const createUsers = () => {
//   return axios({
//     method: 'POST',
//     headers: { 'content-type': 'multipart/form-data' },
//     url: `${BASE_URL}/auth`
//   })
// }

/**
 * @see https://meso.poatech.com.br:450/user/api/1.0/auth
 **/

export const login = ({ email, password }) => {
  return axios({
    method: 'POST',
    headers: { 'content-type': 'multipart/form-data' },
    url: `${BASE_URL}/auth`,
    data: {
      email,
      password
    }
  })
}
