<template>
    <div class="col-lg-3 mt-3">
        <div class="border shadow">
            <NuxtLink to="/ProfilPages/WebProfil" class=" btn p-3 d-flex border-0 w-100 div_hover rounded-0">
                <div class="me-1"><i class="fa-regular fa-user"></i></div>
                <p class="m-0 font">My Profil</p>
            </NuxtLink>
            <hr class="m-0">
            <NuxtLink to="/ProfilPages/WebStory" class=" btn p-3 d-flex border-0 div_hover rounded-0 w-100">
                <div class="me-1"><i class="fa-solid fa-file-invoice"></i></div>
                <p class="m-0 font">StoryList</p>
            </NuxtLink>
            <hr class="m-0">
            <NuxtLink to="/ProfilPages/WebBookmark" class=" btn p-3 d-flex border-0 div_hover rounded-0 w-100">
                <div class="me-1"><i class="fa-regular fa-bookmark"></i></div>
                <p class="m-0 font">Bookmark</p>
            </NuxtLink>
            <hr class="m-0">
            <div class="p-3 rounded-0">
                <ModalLogoutmodal @logout="logout"></ModalLogoutmodal>
            </div>
        </div>

    </div>
</template>

<script setup>
import {useAuth} from "~/stores/auth"
const store=useAuth()
const router=useRouter()

const logout = async () => {
    await store.logout();
    router.push('/'); // Redirect to login page or any other page after logout
};
</script>