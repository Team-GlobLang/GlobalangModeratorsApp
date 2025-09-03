import axios from 'axios'
import { envs } from '../config/env'

const api = axios.create({
  baseURL: envs.APIURL,
    headers: {
    'Content-Type': 'application/json',
  }
})

export default api
