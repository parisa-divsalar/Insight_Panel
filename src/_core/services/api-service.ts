import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

const API_SERVICE = axios.create({
    baseURL: 'http://stage1-api.insight-clinic.com/controller/',
    timeout: 120_000,
})

API_SERVICE.interceptors.request.use(
    (request) => {
        request.params = { ...request.params }

        return request
    },
    (error) => {
        return Promise.reject(error)
    },
)

API_SERVICE.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        catcherServerApi(error)
        return Promise.reject(error)
    },
)

export default API_SERVICE

export const catcherServerApi = (error: unknown) => {
    if (error instanceof AxiosError) {
        const newCase = error?.response?.status || error.status

        switch (newCase) {
            case 401: {
                toast.error('An Error Occurred')
                window.location.replace('/')
                break
            }

            default: {
                // toast.error('An Error Occurred')
                // toast.error(error.message ?? 'An Error Occurred')
            }
        }
    } else return 'Internal Error'
}
