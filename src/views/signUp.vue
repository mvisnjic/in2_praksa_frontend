<template>
    <div
        class="lg:h-[600px] lg:w-[600px] md:mx-auto md:w-[500px] min-w-[280px] h-[500px] mx-2 border rounded-xl overflow-auto p-6 my-auto"
    >
        <div
            class="text-3xl lg:text-4xl font-bold mb-2 text-white md:text-slate-300"
        >
            Sign up
        </div>

        <form @submit.prevent="registerUser">
            <div class="flex flex-col items-center py-6">
                <div class="flex flex-col items-start justify-between w-1/2">
                    <div
                        class="text-md md:text-lg font-bold text-white md:text-slate-300"
                    >
                        First name
                    </div>
                    <input
                        class="w-full text-black text-sm md:text-md py-2 pl-2 border-b border-slate-700"
                        type="name"
                        v-model="firstName"
                        placeholder="First name"
                        required
                        autocomplete="name"
                    />
                </div>
                <div class="flex flex-col items-start justify-between w-1/2">
                    <div
                        class="text-md md:text-lg font-bold text-white md:text-slate-300"
                    >
                        Last name
                    </div>
                    <input
                        class="w-full text-black text-sm md:text-md py-2 pl-2 border-b border-slate-700"
                        type="surname"
                        v-model="lastName"
                        placeholder="Surname"
                        required
                        autocomplete="surname"
                    />
                </div>
                <div class="flex flex-col items-start justify-between w-1/2">
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
                <div class="flex flex-col items-start justify-between w-1/2">
                    <div
                        class="text-md md:text-lg font-bold text-white md:text-slate-300"
                    >
                        Password
                    </div>
                </div>
                <input
                    class="text-black text-sm md:text-md py-2 pl-2 border-b border-slate-700 w-1/2"
                    type="password"
                    v-model="password"
                    placeholder="Enter your password"
                    required
                    autocomplete="current-password"
                />
                <div class="flex flex-col items-start justify-between w-1/2">
                    <div
                        class="text-md md:text-lg font-bold text-white md:text-slate-300"
                    >
                        Password Repeat
                    </div>
                </div>
                <input
                    class="text-black text-sm md:text-md py-2 pl-2 border-b border-slate-700 w-1/2"
                    type="password"
                    v-model="passwordRepeat"
                    placeholder="Repeat your password"
                    required
                    autocomplete=""
                />
                <span
                    v-if="password && passwordRepeat !== password"
                    class="text-red-400 text-sm font-display font-semibold pt-2"
                    >Password doesn't match</span
                >
                <div class="flex flex-row items-start w-1/2">
                    <div
                        class="text-md md:text-lg font-bold text-white md:text-slate-300"
                    >
                        Accept terms:
                    </div>
                    <input
                        class="text-black text-sm md:text-md py-2 pl-2 border-b border-slate-700 ml-4 self-center"
                        type="checkbox"
                        v-model="checkboxTerms"
                        required
                    />
                </div>
                <div class="mt-10">
                    <button
                        type="submit"
                        :disabled="password && passwordRepeat !== password"
                        class="bg-gradient-to-r from-indigo-600 to-violet-300 hover:from-indigo-700 hover:to-violet-400 text-white p-4 font-semibold font-display hover:bg-[#244B8E] rounded-full cursor-pointer"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { Auth } from '../services'

export default {
    name: 'aboutPage',
    data() {
        return {
            open: false,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordRepeat: '',
            wrongPassword: false,
            checkboxTerms: false,
        }
    },
    methods: {
        async registerUser() {
            let twoFactor = false // default is false
            console.log(this.checkboxTerms)
            try {
                let success = await Auth.registerUser(
                    this.firstName,
                    this.lastName,
                    this.email,
                    this.password,
                    this.passwordRepeat,
                    twoFactor,
                    this.checkboxTerms
                )
                if (success) {
                    this.$router.push({ name: 'signIn' })
                    // console.log('sucecss')
                }
            } catch (e) {
                this.wrongPassword = true
                this.wrongPasswordRetype = false
                throw new Error('Something went wrong.')
            }
        },
    },
}
</script>
