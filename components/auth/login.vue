<template>
    <div class="container mt-5 pt-5">
        <div class="row d-flex justify-content-center">
            <div class="col-lg-6 col-sm-12">
                <div class="border p-5">
                    <div>
                        <h3>Login</h3>
                    </div>
                    <form @submit.prevent="login" class="p-3">
                        <div class="my-4">
                            <UiBaseinput type="text" placeholder="Enter email/username" identity="text"
                                label="Email/Username" v-model="loginData.identifier">
                            </UiBaseinput>
                        </div>
                        <div class="my-4">
                            <div class="position-relative">
                                <UiBaseinput :type="passwordFieldType" placeholder="Enter password" identity="username"
                                    label="Password" v-model="loginData.password">
                                </UiBaseinput>
                                <span class="position-absolute top-50 end-0 mt-1 me-2 border-0"
                                    @click="togglePasswordVisibility"><i :class="passwordIcon"></i></span>
                            </div>
                        </div>
                        <button @click="login" class=" btn btn-dark w-100 text-decoration-none ">Login
                        </button>
                        <div></div>
                    </form>
                    <p>Don't have an account yet?<NuxtLink to="/AuthPages/WebSignUp" class="text-decoration-none"><b
                                style="color:black">Register</b></NuxtLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuth } from '~/stores/auth';

const Store = useAuth()
const router = useRouter()

const loginData = reactive({
    identifier: "",
    password: "",
    isLogin: true
})

const login = async () => {
    if(loginData.identifier===""||loginData.password==""){
        alert("Data belum lengkap")
    }else{
        console.log("login dijalankkan")
        await Store.getLoginData(loginData)
        console.log('login berhasil dijalnkan')
        router.push("/")
    }
  
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


