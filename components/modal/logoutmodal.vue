<template>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-outline-danger d-flex justify-content-between w-100 rounded-0"
        data-bs-toggle="modal" data-bs-target="#exampleModal">
        <div class="font">Logout</div>
        <div><i class="fa-solid fa-right-from-bracket"></i></div>
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Logout</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="fs-6">are you sure want to logout?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn rounded-0 btn-outline-dark" data-bs-dismiss="modal">Cancle</button>
                    <button type="button" class="btn btn-dark rounded-0" data-bs-dismiss="modal"
                        @click="$emit('logout')">Logout</button>
                </div>
            </div>
        </div>
    </div>


</template>