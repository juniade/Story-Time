<template>
    <div class="card position-relative h-100">
        <NuxtLink :to="'/DetailPages/' + items.id" class="text-decoration-none" style="height: 160px;">
            <img v-if="items.cover_image" :src="baseUrl + items.cover_image.url" class="card-img-top h-100 w-100"
                alt="Img" style="object-fit: cover;" />
        </NuxtLink>
        <div class="card-body px-2 py-4">
            <button class="position-absolute rounded-circle btn btn-light p-0 top-0 end-0 mx-2 my-2"
                @click="addToBookmark(items)">
                <i :class="['fa-bookmark rounded-circle p-3 m-0 p-0', isBookmarked(items.id) ? 'fa-solid' : 'fa-regular']"></i>
            </button>
            <NuxtLink :to="'/DetailPages/' + items.id" style="text-decoration-color:black">
                <h2 class=" text-black font">{{ items.title }}</h2>
            </NuxtLink>
            <p class="my-1 text-secondary line-clamp font">{{ items.content }}</p>
            <div class="mt-1 text-secondary">
                <p class="m-0 content" v-if="items.author">by {{ items.author.username }}</p>
                <p class="m-0 content">{{ formatDate(items.createdAt) }}</p>
            </div>
            <div class="text-black mt-1" >
                <span class="py-0 px-1  bg-secondary rounded content " v-if="items.author">{{ items.category.name }}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useStory } from '~/stores/story';
const store = useStory()
const auth=useAuth()
const router = useRouter()
const props=defineProps({
    items:Object,
})

const baseUrl = "https://storytime-api.strapi.timedoor-js.web.id/";

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('id-ID', options).format(date);
}

const addToBookmark = (data) => {
    if(!auth.token){
        router.push("/AuthPages/WebLogin")
    }else{
        store.bookmarkStory(data)
    }
}
const isBookmarked=(id)=>{
    return store.isBookmarked(id)
}



</script>
<style scoped>
.line-clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    line-height: 1.5em;
    /* Adjust the line height as needed */
    max-height: 3em;
    /* 2 lines * line-height */
}
</style>