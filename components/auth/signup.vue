<template>
    <div class="container mt-5 pt-5">
        <div class="row d-flex justify-content-center">
            <div class="col-lg-6 col-sm-12">
                <div class="border p-5">
                    <div>
                        <h3>Register</h3>
                    </div>
                    <form @submit.prevent="register">
                        <div class="my-4">
                            <UiBaseinput type="text" placeholder="Enter name" identity="text" label="Full Name"
                                v-model="signupData.name" @keyInput="nameCheck"></UiBaseinput>
                            <p class="text-danger mt-1 fw-medium" style="font-size: 11px" :style="{ display: name }">
                                name at leat 6 characters</p>
                        </div>
                        <div class="my-4">
                            <UiBaseinput type="username" placeholder="Enter username" identity="username"
                                label="Username" v-model="signupData.username" @keyInput="usernameCheck"></UiBaseinput>
                            <p class="text-danger mt-1 fw-medium" style="font-size: 11px"
                                :style="{ display: username }">
                                username at leat 6 characters</p>
                        </div>
                        <div class="my-4">
                            <UiBaseinput type="email" placeholder="Enter email" identity="email" label="Email"
                                v-model="signupData.email" @keyInput="emailCheck"></UiBaseinput>
                            <p class="text-danger mt-1 fw-medium" style="font-size: 11px" :style="{ display: email }">
                                Enter your email</p>
                        </div>
                        <div class="my-4">
                            <div class="position-relative">
                                <UiBaseinput :type="passwordFieldType" placeholder="Enter password" identity="password"
                                    label="Password" v-model="signupData.password" @keyInput="passwordCheck">
                                </UiBaseinput>
                                <span class="position-absolute top-50 end-0 mt-1 me-2 border-0"
                                    @click="togglePasswordVisibility"><i :class="passwordIcon"></i></span>
                            </div>
                            <p class="text-danger mt-1 fw-medium" style="font-size: 11px"
                                :style="{ display: passwordStatusDisplay }">The Password field must be at least 6
                                characters</p>
                        </div>
                        <div class="my-4">
                            <div class="position-relative">
                                <UiBaseinput :type="passwordFieldType" placeholder="Enter confirmation password "
                                    identity="confirmationPassword" label="Password confirmation"
                                    v-model="signupData.confirmationPassword" @keyInput="confirmationPasswordCheck">
                                </UiBaseinput>
                                <span class="position-absolute top-50 end-0 mt-1 me-2 border-0"
                                    @click="togglePasswordVisibility"><i :class="passwordIcon"></i></span>
                            </div>
                            <p class="text-danger mt-1 fw-medium" style="font-size:11px"
                                :style="{ display: confirmationPasswordDoesNotMacth }">The password confirmation does
                                not
                                macth</p>
                            <p class="text-success mt-1 fw-medium" style="font-size:11px"
                                :style="{ display: confirmationPasswordMacth }">The password confirmation does macth</p>
                        </div>
                        <ModalRegisterModal :temp="temp_val" @register="register" @login="login"></ModalRegisterModal>
                    </form>
                    <p>Already have an account?<NuxtLink to="/AuthPages/WebLogin" class="text-decoration-none"><b
                                style="color:black">Login</b></NuxtLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import { useAuth } from '~/stores/auth';
const Store = useAuth();

const name=ref('none')
const username=ref('none')
const email=ref('none')
const passwordStatusDisplay = ref("none")
const confirmationPasswordDoesNotMacth = ref("none")
const confirmationPasswordMacth = ref("none")

const signupData = reactive({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmationPassword: "",
    isLogin: false
})

const nameCheck=()=>{
    if(signupData.name.length<6){
        name.value="block"
    }else{
        name.value='none'
    }
}

const usernameCheck = () => {
    if (signupData.username.length <6) {
        username.value = "block"
    } else {
        username.value = 'none'
    }
}

const emailCheck = () => {
    if (signupData.email.length <= 0) {
        email.value = "block"
    } else {
        email.value = 'none'
    }
}
const passwordCheck = () => {
    if (signupData.password.length < 6 && signupData.password.length >0) {
        passwordStatusDisplay.value = "block";
    } else {
        passwordStatusDisplay.value = "none";
    }
}

const confirmationPasswordCheck = () => {
    if (signupData.confirmationPassword === "") {
        confirmationPasswordDoesNotMacth.value = "none";
        confirmationPasswordMacth.value = "none";
        return;
    }

    if (signupData.password !== signupData.confirmationPassword) {
        confirmationPasswordDoesNotMacth.value = "block";
        confirmationPasswordMacth.value = "none";
        return;
    }

    confirmationPasswordDoesNotMacth.value = "none";
    confirmationPasswordMacth.value = "block";
}

const router = useRouter()
const temp_val=ref(0)
const register = async () => {
    if(signupData.name ===""||signupData.username===""||signupData.email==""||signupData.password<6){
        alert("Data belum lengkap")
    }else{
        temp_val.value=1
        console.log("register dijalankan")
        console.log("ini aalah data signup", signupData)
        await Store.getRegisterData(signupData)
    }
    

}

const login = () => {
    router.push('/AuthPages/WebLogin')
}

// State to control password visibility
const isPasswordVisible = ref(false);

// Computed property to switch input type between 'password' and 'text'
const passwordFieldType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));

// Computed property to switch icon class between eye and eye-slash
const passwordIcon = computed(() => (isPasswordVisible.value ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'));

// Method to toggle password visibility
function togglePasswordVisibility() {
    isPasswordVisible.value = !isPasswordVisible.value;
}

</script>
