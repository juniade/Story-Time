<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-8 col-sm-6">
                <h3><b>{{ data_id.title }}</b></h3>
                <p>{{ formatDate(data_id.createdAt)}}</p>
                <div style="width:100%;height:auto" class="position-relative">
                    <img v-if="data_id.cover_image" :src="baseUrl + data_id.cover_image?.url" class="img-fluid"
                        style=" width:100%;height:auto">
                    <button class="position-absolute rounded-circle btn btn-light p-0 top-0 end-0 mx-2 my-2"
                        @click="addToBookmark(data_id)">
                        <i
                            :class="['fa-bookmark rounded-circle p-3 m-0 p-0', isBookmarked(data_id.id) ? 'fa-solid' : 'fa-regular']"></i>
                    </button>
                </div>
                <div class="pt-2" v-html="data_id.content"></div>
            </div>
            <div class="col-lg-4 col-sm-6">
                <div class="p-3 border border-2">
                    <p class="d-flex justify-content-center ">Author</p>
                    <div class="d-flex justify-content-center">
                        <img v-if="data_id.author"
                            :src="data_id?.author.profile_picture?.formats?.thumbnail?.url ? baseUrl + data_id?.author.profile_picture?.formats?.thumbnail?.url : 'https://via.placeholder.com/150'"
                            class="rounded-circle" style="width:70px;height:70px">
                    </div>
                    <p class="d-flex justify-content-center pt-3 m-0 " v-if="data_id.author"><b>{{ data_id.author.name
                            }}</b></p>
                    <p class="d-flex justify-content-center text-center" style="font-size:12px" v-if="data_id.author">{{ data_id.author.biodata }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import {useStory} from"~/stores/story"
const store=useStory()
defineProps({
    data_id:Object
})

const baseUrl = "https://storytime-api.strapi.timedoor-js.web.id/";

function formatDate(dateStr) {
    // Parse the ISO 8601 date string into a Date object
    const date = new Date(dateStr);
    // Set the options for formatting the date
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    // Format the date to Indonesian locale
    return date.toLocaleDateString('id-ID', options);
}
const addToBookmark = (data) => {
    store.bookmarkStory(data)
}
const isBookmarked = (id) => {
    return store.isBookmarked(id)
}
</script>