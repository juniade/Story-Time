<template>
    <div class="container mt-5 pt-5">
        <div class="row">
            <ProfilUserMenu></ProfilUserMenu>
            <div class="col-lg-9 mt-0 mt-3">
                <div class=" border shadow p-4">
                    <div class="d-flex justify-content-between">
                        <h5>My Profil</h5>
                        <button class="d-flex border-0 bg-white" @click="clickEditProfile"
                            :class="{'d-none':komponenEdit}">
                            <div class="me-1"><i class="fa-regular fa-pen-to-square"></i></div>
                            <div class="font">Edit Profile</div>
                        </button>
                    </div>
                    <div class="row mt-3">
                        <div class=" col-lg-4 col-sm-5">
                            <div class="mb-4" style="width:200px; height:200px">
                                <img class="w-100 h-100 object-fit-cover rounded-circle"
                                    :src="data.profile_picture?.formats?.thumbnail?.url ? urlBase + data.profile_picture?.formats?.thumbnail?.url :'https://via.placeholder.com/150'"
                                    alt="">
                            </div>
                            <!-- Button trigger modal -->
                            <div class="w-100">
                                <UiBaseinput class="d-none" type="file" label="" identity="inputImage" isImage="true"
                                    @input="checkImage" />
                                <label for="inputImage" class="py-1 px-3 btn btn-outline-dark rounded-0 w-100 "
                                    data-bs-toggle="modal" data-bs-target="#cropper" style="font-size: 16px;">
                                    <p class="m-0 p-0">Change Avatar</p>
                                </label>
                            </div>
                            <!-- Modal -->
                            <div class="modal fade" id="cropper" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Adjust Image</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <VueCropper v-if="imageUser.imageUrlCropper" ref="cropper"
                                                :aspect-ratio="16 / 16" :src="imageUser.imageUrlCropper"></VueCropper>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary" @click="saveCroppedImage">Save
                                                changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="!editProfil" class=" col-lg-8 col-sm-6 mt-3 mt-lg-0 d-flex gap-3">
                            <div>
                                <p><b>Nama</b></p>
                                <p><b>Email</b></p>
                                <p><b>Biodata</b></p>
                            </div>
                            <div>
                                <p>{{data.name }}</p>
                                <p>{{data.email }}</p>
                                <p>{{data.biodata }}</p>
                            </div>
                        </div>
                        <div v-else class=" col-lg-8 col-sm-6 mt-3 mt-lg-0">
                            <UiBaseinput type="text" label="Nama" identity="name" v-model="dataUser.name"></UiBaseinput>
                            <UiBaseinput type="email" label="Email" identity="email" v-model="dataUser.email"
                                disabled="1"></UiBaseinput>
                            <UiBasetextarea type="text" label="About me" identity="biodata" v-model="dataUser.biodata">
                            </UiBasetextarea>
                            <div class="d-flex justify-content-end mt-5">
                                <UiBasebutton class="btn-outline-dark px-4 me-2 rounded-0" @click="userEditProfile">
                                    Batal
                                </UiBasebutton>
                                <UiBasebutton class="btn-dark rounded-0 px-3" @click="updateProfile">Simpan
                                </UiBasebutton>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-3 shadow">
                    <div class="p-3 d-flex justify-content-between ">
                        <div>
                            <h5>Password</h5>
                        </div>
                        <div v-if="!komponenPass">
                            <UiBasebutton class="d-flex btn-outline-dark bg-white rounded-0 align-items-center"
                                @click="userEditPassword">
                                <div class="me-1"><i class="fa-regular fa-pen-to-square text-black"></i></div>
                                <div class="text-black">Change password</div>
                            </UiBasebutton>
                        </div>
                    </div>
                    <div v-if="editPassword" class="px-3 py-3">
                        <UiBaseinput type="password" label="Old password" placeholder="Enter old password" class="w-100"
                            v-model="dataUserPassword.currentPassword">
                        </UiBaseinput>
                        <UiBaseinput type="password" label="New password" placeholder="Enter new password"
                            v-model="dataUserPassword.newPassword">
                        </UiBaseinput>
                        <UiBaseinput type="password" label="Confirmation password" placeholder="Enter old password"
                            v-model="dataUserPassword.confirmpass">
                        </UiBaseinput>
                        <div class="d-flex justify-content-end my-4">
                            <UiBasebutton class="btn-outline-dark px-4 me-2 rounded-0" @click="userEditPassword">Batal
                            </UiBasebutton>
                            <UiBasebutton class="btn-dark rounded-0 px-3" @click="updatePass">Simpan</UiBasebutton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import { useAuth } from "~/stores/auth"

const store = useAuth()
const editProfil=ref(false)
const komponenEdit=ref(false)
const komponenPass=ref(false)
const editPassword=ref(false)
const urlBase ='https://storytime-api.strapi.timedoor-js.web.id'

const data = computed(() => {
    return store.userProfile
})

console.log('user profil:',data)
const dataUser=reactive({
    name:"",
    email:"",
    biodata:""
})

const dataUserPassword=reactive({
    currentPassword:"",
    newPassword:"",
    confirmpass:""
})

const imageUser=reactive({
    imageUrlCropper: "",
    imageshow:"",
    imageFiles:"",
    id:null
})
const clickEditProfile=()=>{
    userEditProfile()
    for(let key in store.userProfile){
        dataUser[key]=store.userProfile[key]
    }
}

const userEditProfile=()=>{
    editProfil.value = !editProfil.value
    komponenEdit.value = !komponenEdit.value

}
const userEditPassword=()=>{
    editPassword.value=!editPassword.value
    komponenPass.value=!komponenPass.value
}

const updateProfile=async()=>{
    await store.updateProfile(dataUser)
    userEditProfile()
}

const updatePass=async()=>{
    await store.updatePass(dataUserPassword)
    userEditPassword()
}

const checkImage = (e) => {
    const file = e.target.files[0];
    imageUser.imageshow = file
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener("load", () => {
        imageUser.imageUrlCropper = reader.result;
    });

};

const cropper=ref(null)
const saveCroppedImage = () => {
    if (cropper.value) {
        const croppedCanvas = cropper.value.getCroppedCanvas();
        croppedCanvas.toBlob(async (blob) => {
            if (blob) {
                imageUser.imageFiles=blob
                try {
                    await remove_image()
                    await uploadUserImage(imageUser)
                    await store.getProfile()
                } catch (err) {
                    console.error(err);
                }
            }
            imageUser.imageUrlCropper=""
            cropper.value = null
        });
    }
}
const remove_image = async () => {
    if (store.userProfile.profile_picture !== null) {
        const picture_id_user = store.userProfile.profile_picture.id
        console.log('ini adalah picture_id_user:', picture_id_user)
        await store.remove_Profile_Picture(picture_id_user)
        console.log('user picture berhasil dihapus')
    }
}

const uploadUserImage=async(data)=>{
    const user_id=store.userProfile.id
    console.log('upload image user id:',user_id)
    data.id=user_id
    await store.uploadProfilePicture(data)
}

</script>