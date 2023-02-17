import axios from 'axios'
import $router from '../router/index.js'
const baseApi = axios.create({
    // baseURL: import.meta.env.VITE_SERVER,
    baseURL: 'http://localhost:4000/',
    timeout: 10000,
})

let Auth = {
    async registerUser(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        twoFactor,
        acceptTerms
    ) {
        let response = await baseApi.post('accounts/register', {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            twoFactor,
            acceptTerms,
        })
        let user = response.data
        return true
    },
    async loginUser(email, password) {
        let response = await baseApi.post('accounts/authenticate', {
            email,
            password,
        })
        let user = response.data
        console.log('user:', user.jwtToken)
        if (user['message']) {
            return false
        }
        console.log(user.twoFactor)
        localStorage.setItem('user', JSON.stringify(user))
        return true
    },
    async twoFactor(code) {
        let res = await baseApi.post('accounts/two-factor', {
            code,
        })

        let user = res.data
        localStorage.setItem('user', JSON.stringify(user))
        return true
    },
    async deleteAccount(id) {
        let res = await baseApi.delete(`accounts/${id}`)

        let user = res.data

        return true
    },
    logout() {
        localStorage.removeItem('user')
    },
    getToken() {
        let user = Auth.getUser()
        if (user && user.jwtToken) {
            console.log('user token', user.jwtToken)
            return user.jwtToken
        }
    },
    getUser() {
        return JSON.parse(localStorage.getItem('user'))
    },
    authenticated() {
        let user = Auth.getUser()
        if (user && user.username) {
            return true
        }
        return false
    },
    state: {
        get user() {
            return Auth.getUser()
        },
        get authenticated() {
            return Auth.authenticated()
        },
    },
    async editProfile(userId, firstName, lastName, email, twoFactor) {
        // if (!firstName && !lastName && !username) {
        //     let response = await baseApi.put(`/users/${userId}`, {
        //         // twoFactor,
        //     })
        //     // let user = response.data
        //     return true
        // }
        let response = await baseApi.put(`/accounts/${userId}`, {
            firstName,
            lastName,
            email,
            twoFactor,
        })
        console.log('res data', response.data)
        return true

        // let editedUser = response.data

        // return true
    },
}

baseApi.interceptors.request.use((request) => {
    try {
        request.headers['Authorization'] = 'Bearer ' + Auth.getToken()
    } catch (e) {
        console.log(e)
    }
    return request
})

baseApi.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response.status == 401) {
            Auth.logout()
            // $router.go()
        }
    }
)

export { baseApi, Auth }
