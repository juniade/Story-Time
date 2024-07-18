<template>
    <div class="container-fluid mt-5 pt-5">
        <div class="d-flex justify-content-center align-item-center mt-5">
            <HomeInformation></HomeInformation>
        </div>
        <HomeSearchBar @search="cariHuruf" @sorting="sortingdata"></HomeSearchBar>
        <span v-if="allStory!==0">
            <ItemStoryList :data_item="allStory"></ItemStoryList>
        </span>
        <span v-if="allStory.length===0 && !loading">
            <div class=" d-flex justify-content-center ">
                <img src="/assets/empty-data.svg" style="width:20%">
            </div>
            <h5 class="mt-4 text-center">Data not found</h5>
        </span>

        <div class="row" v-if="!loading">
            <div class="col-lg-12 d-flex justify-content-center mt-3 " v-if="counterStore.data_search===0">
                <button class="btn btn-outline-dark" @click="loadmore">Load more</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStory } from '~/stores/story';

const counterStore = useStory();
const loading=ref(false)

const getDatapage = async (params,author,idx,edit,sort) => {
    loading.value=true
    await counterStore.fetchStoryList(params,author,idx,edit,sort)
    loading.value=false
}

onMounted(()=>{
    getDatapage("", "", index.value, "",data_sort.value)
    counterStore.loadBookmarks()
})
const allStory = computed(() => {
    return counterStore.storyList
})
const nilai = ref("")
const data_sort=ref('newest')
const index = ref(1)
// inisalisasi var nilai dengan data yang diperoleh dari emit serachItem
// input merupakan variabel yang beriskan data yang diperoleh dari emit serachItem
function cariHuruf(input) {
    counterStore.storyList = []
    nilai.value = input.trim()
    index.value = 1
    console.log('nilai.value: ',nilai.value)
    loading.value=true
    getDatapage(nilai.value,"",index.value,"",data_sort.value)
}

function sortingdata(data){
    counterStore.storyList=[]
    data_sort.value=data
    index.value=1
    console.log("ini adalah data sort",data_sort.value)
    getDatapage(nilai.value, "",index.value,"",data_sort.value)
    
}

function loadmore(){
    index.value++
    counterStore.fetchStoryList("","", index.value,"",data_sort.value);
    
}
</script>