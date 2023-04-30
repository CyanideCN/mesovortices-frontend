/* eslint-disable no-unused-vars */
import { LocalStorage } from 'quasar'
import axios from 'axios'

const verifyUser = async function () {
  let retcode = 1
  if (LocalStorage.has('sign') && LocalStorage.has('username')) {
    retcode = await axios.post('http://127.0.0.1:5000/ua/verify', {
      sign: LocalStorage.getItem('sign'), username: LocalStorage.getItem('username')
    }).then(x => x.data.code)
    console.log(retcode)
    if (retcode === 0) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export default verifyUser
