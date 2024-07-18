<template>
    <div class="mt-5 pt-5">
        <detail-story :data_id="data"></detail-story>
    </div>
</template>
<script setup>
definePageMeta({
    middleware: ["auth"]
    // or middleware: 'auth'
})
import { useStory } from '~/stores/story';

const store = useStory()
const{id}=useRoute().params

const fetchData = async () => {
    await store.fetchStoryDetail(id);
};

onMounted(() => {
    fetchData();
});

const data = computed(() => {
    return store.storyDetail
})
</script>