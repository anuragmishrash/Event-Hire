import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:5000/api' })

export const submitRequirement = (category, data) =>
  api.post(`/requirements/${category}`, data)

export const getAllRequirements = () => api.get('/requirements/all')

export default api
