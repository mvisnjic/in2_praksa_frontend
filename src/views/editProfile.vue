<template>
    <div
        class="lg:h-[600px] lg:w-[600px] md:mx-auto md:w-[500px] min-w-[280px] h-[500px] mx-2 border rounded-xl overflow-auto p-6 my-auto"
    >
        <div class="text-3xl lg:text-4xl font-bold mb-2 text-slate-300">
            Edit profile
        </div>
        <span class="text-sm font-display font-semibold pt-2 text-slate-300"
            >Last time edited:
            <p class="text-slate-400">{{ auth.user.updated }}</p></span
        >

        <!-- <form @submit.prevent="registerUser"> -->
        <div class="flex flex-col items-center py-8">
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
                    type="username"
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
                    Two factor
                </div>
                <select
                    class="w-full text-black text-sm md:text-md py-2 pl-2 border-b border-slate-300"
                    v-model="twoFactorSelect"
                    required
                    disabled
                >
                    <option value="Enabled">Enable</option>
                    <option value="Disabled">Disable</option>
                </select>
            </div>
            <div class="mt-12 space-x-6">
                <button
                    @click="updateUser"
                    class="bg-gradient-to-r from-indigo-600 to-violet-300 hover:from-indigo-700 hover:to-violet-400 text-white p-4 font-semibold font-display hover:bg-[#244B8E] rounded-full cursor-pointer"
                >
                    Edit profile
                </button>
                <button
                    @click="deleteUser"
                    class="bg-gradient-to-r from-red-600 to-red-300 hover:from-red-700 hover:to-red-400 text-white p-4 font-semibold font-display hover:bg-[#fc0101] rounded-full cursor-pointer"
                >
                    Delete profile
                </button>
            </div>
        </div>
        <!-- </form> -->
    </div>
</template>

<script>
import { Auth } from '../services'

export default {
    name: 'aboutPage',
    data() {
        return {
            open: false,
            auth: Auth.state,
            firstName: Auth.state.user.firstName,
            lastName: Auth.state.user.lastName,
            email: Auth.state.user.email,
            twoFactorSelect: Auth.state.user.twoFactor,
        }
    },
    methods: {
        async updateUser() {
            try {
                let success = await Auth.editProfile(
                    this.auth.user.id,
                    this.firstName,
                    this.lastName,
                    this.email,
                    this.twoFactorSelect
                )
                console.log('twofactor', this.twoFactorSelect)
                console.log(success)
                if (success) {
                    this.$router.push('/signin')
                    Auth.logout()
                }
            } catch (e) {
                console.log(e)
            }
        },
        async deleteUser() {
            try {
                let success = await Auth.deleteAccount(this.auth.user.id)

                if (success) {
                    this.$router.push('/signin')
                    Auth.logout()
                }
            } catch (e) {
                console.log(e)
            }
        },
    },
}
</script>
