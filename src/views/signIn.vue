<template>
    <div
        class="lg:h-[600px] lg:w-[600px] md:mx-auto md:w-[500px] min-w-[280px] h-[500px] mx-2 border rounded-xl overflow-auto p-6 my-auto"
    >
        <div
            class="text-3xl lg:text-4xl font-bold mb-2 text-white md:text-slate-300"
        >
            Sign In
        </div>

        <!-- <form @submit.prevent="login"> -->
        <div class="flex flex-col items-center py-8">
            <div
                class="flex flex-col items-start justify-between w-1/2"
                v-if="!twoFactorPopup"
            >
                <div
                    class="text-md md:text-lg font-bold text-white md:text-slate-300"
                >
                    Email
                </div>
                <input
                    class="w-full text-black text-sm md:text-md py-2 pl-2 border-b border-slate-700"
                    type="email"
                    v-model="email"
                    placeholder="name@gmail.com"
                    required
                    autocomplete="email"
                />
            </div>

            <div
                class="flex flex-col items-start justify-between w-1/2"
                v-if="twoFactorPopup"
            >
                <span
                    class="text-green-400 text-sm font-display font-semibold pt-2"
                    >The code has been sent on your email address.</span
                >
                <div
                    class="text-md md:text-lg font-bold text-white md:text-slate-300"
                >
                    Code:
                </div>
                <input
                    class="w-full text-black text-sm md:text-md py-2 pl-2 border-b border-slate-700"
                    v-model="twoFactorCode"
                    required
                    autocomplete="code"
                />
                <span
                    v-if="wrongCode"
                    class="text-red-400 text-sm font-display font-semibold pt-2"
                    >Invalid code.</span
                >
            </div>
            <div
                class="flex flex-col items-start justify-between w-1/2"
                v-if="!twoFactorPopup"
            >
                <div
                    class="text-md md:text-lg font-bold text-white md:text-slate-300"
                >
                    Password
                </div>
            </div>
            <input
                v-if="!twoFactorPopup"
                class="text-black text-sm md:text-md py-2 pl-2 border-b border-slate-700 w-1/2"
                type="password"
                v-model="password"
                placeholder="Enter your password"
                required
                autocomplete="current-password"
            />
            <span
                v-if="wrongPassword"
                class="text-red-400 text-sm font-display font-semibold pt-2"
                >Wrong email or password</span
            >

            <div class="mt-12">
                <button
                    @click.prevent="login"
                    v-if="!twoFactorPopup"
                    :disabled="clickedLogin"
                    class="bg-gradient-to-r from-indigo-600 to-violet-300 hover:from-indigo-700 hover:to-violet-400 text-white p-4 font-semibold font-display hover:bg-[#244B8E] rounded-full cursor-pointer"
                >
                    Sign In
                </button>
            </div>
            <div class="mt-12">
                <button
                    @click.prevent="twoFactor"
                    v-if="twoFactorPopup"
                    class="bg-gradient-to-r from-indigo-600 to-violet-300 hover:from-indigo-700 hover:to-violet-400 text-white p-4 font-semibold font-display hover:bg-[#244B8E] rounded-full cursor-pointer"
                >
                    Sign in
                </button>
            </div>
        </div>
        <!-- </form> -->
    </div>
</template>

<script>
import { Auth } from '../services'

export default {
    name: 'signIn',
    data() {
        return {
            open: false,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            wrongPassword: false,
            twoFactorPopup: false,
            twoFactorCode: '',
            wrongCode: false,
            clickedLogin: false,
        }
    },
    methods: {
        async login() {
            this.clickedLogin = true
            try {
                console.log('clicked')
                let success = await Auth.loginUser(this.email, this.password)
                if (success) {
                    console.log(success)
                    this.$router.push('/')
                    console.log('sucess')
                } else {
                    console.log(success)
                    this.twoFactorPopup = true
                }
            } catch (e) {
                this.clikedLogin = false
                console.log('catch')
                this.wrongPassword = true
                throw new Error('Wrong email or password.')
            }
        },
        async twoFactor() {
            try {
                console.log(this.twoFactorCode)
                let success = await Auth.twoFactor(this.twoFactorCode)
                if (success) {
                    this.$router.push('/')
                }
            } catch (e) {
                this.wrongCode = true
                throw new Error('Invalid code.')
            }
        },
    },
}
</script>
