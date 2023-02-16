<template>
    <div
        class="flex flex-col space-y-6 w-full md:self-center lg:self-center text-white px-6 sm:px-12 md:px-24"
    >
        <div
            class="text-left md:text-left text-4xl md:text-5xl lg:text-6xl font-bold"
            v-if="auth.authenticated || auth.user"
        >
            Dobro došli,
            <p class="text-[24px] text-white pb-6">
                {{ auth.user.firstName }} {{ auth.user.lastName }} -
                {{ auth.user.role }}
            </p>

            <div class="text-2xl">
                <router-link
                    to="/editprofile"
                    class="hover:font-semibold"
                    v-if="auth.authenticated || auth.user"
                    >Go to settings</router-link
                >
            </div>
        </div>
        <div
            class="text-left md:text-left text-4xl md:text-5xl lg:text-6xl font-bold"
            v-else
        >
            Dobro došli
        </div>
    </div>
</template>

<script>
import { Auth } from '../services/index.js'

export default {
    name: 'indexPage',
    data() {
        return {
            auth: Auth.state,
        }
    },
}
</script>
