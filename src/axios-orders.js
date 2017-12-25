import axios from 'axios'

//use firebase
const instance = axios.create({
  baseURL: 'https://react-my-burger-899e3.firebaseio.com/'
})

export default instance