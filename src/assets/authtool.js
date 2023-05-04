/* eslint-disable no-unused-vars */
import { LocalStorage, SessionStorage } from 'quasar'
import axios from 'axios'

const verifyUser = async function () {
  let retcode = 1
  if (LocalStorage.has('sign') && LocalStorage.has('username')) {
    retcode = await axios.post('https://mesovortices.com/ua/verify', {
      sign: LocalStorage.getItem('sign'), username: LocalStorage.getItem('username')
    }).then(x => x.data.code)
    if (retcode === 0) {
      return true
    } else {
      LocalStorage.remove('sign')
      return false
    }
  } else {
    return false
  }
}

export default verifyUser
