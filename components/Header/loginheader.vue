<template>
    <nav class="navbar bg-white navbar-expand-lg fixed-top shadow-sm">
        <div class="container">
            <NuxtLink to="/" class="navbar-brand">
                <img src="/assets/logo.svg" alt="" />
            </NuxtLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end p-0 m-0" id="navbarSupportedContent">
                <div class="gap-3 d-flex">
                    <NuxtLink to="/ProfilPages/WebProfil" class="btn btn-dark fs-6 rounded-0 px-4" type="submit">
                        <i class="fa-regular fa-user me-1"></i>
                        {{ data.name }}
                    </NuxtLink>
                </div>
            </div>
        </div>
            
    </nav>
    <!-- <div class="container py-3">
        <div>
            <div class="row">
                <div class="col-8 col-sm-6">
                    <NuxtLink to="/"><img src="/assets/logo.svg"></NuxtLink>
                </div>

                <div class="col-4 col-sm-6"> 
                    <div class="d-flex justify-content-end">
                        <div class="d-flex">
                            <NuxtLink to="/ProfilPages/WebProfil" class=" btn btn-dark me-2 rounded-0 font">
                                <i class="fa-regular fa-user"></i>
                                {{ data.name }}
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div> -->
</template>
<script setup>
import { useAuth } from "~/stores/auth"

const store = useAuth()

onMounted(async () => {
    await store.getProfile();
   
})
const data = computed(() => {
    return store.userProfile
})
</script>