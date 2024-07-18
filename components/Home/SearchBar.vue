<template>
    <div class="container">
        <div class="row d-flex justify-content-between">
            <div class="col-4 col-xs-6">
                <div class="input-group align-items-center border border-black" style="background-color:black;">
                    <input type="text" class="form-control rounded-0 " placeholder="Search Product" v-model="text"
                        @keyup.enter="$emit('search',text)">
                    <span @click="$emit('search',text)">
                        <i style="color:white" class="fa-solid fa-magnifying-glass ms-2 me-3"></i>
                    </span>
                </div>
            </div>
            <div class="col-3 col-xs-6">
                <div class="w-100">
                    <select class="py-2 px-2 w-100 m-0 form-select rounded-0 " v-model="sortdata"
                        @change="$emit('sorting',sortdata)">
                        <option value="" disabled selected>sort</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                    </select>
                              
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const text=ref("")
const sortdata=ref("")

const list_sort=['Newest','Oldest','A-Z','Z-A']
</script>