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
                <div class="gap-1 d-flex">
                    <NuxtLink to="/AuthPages/WebSignUp" class="mb-2 btn btn-dark me-2 rounded-0">Register</NuxtLink>
                    <NuxtLink to="/AuthPages/WebLogin" class="mb-2 btn btn-outline-dark rounded-0">Login</NuxtLink>
                </div>
            </div>
        </div>
            
    </nav>
    <!-- <div class="container py-3">
        <div class="row">
            <div class="col-8 col-sm-6">
                <NuxtLink to="/"><img src="/assets/logo.svg"></NuxtLink>
            </div>
            <div class="col-4 col-sm-6 d-flex justify-content-end">
                <div class="">
                    <NuxtLink to="/AuthPages/WebSignUp" class="mb-2 btn btn-dark me-2 rounded-0">Register</NuxtLink>
                    <NuxtLink to="/AuthPages/WebLogin" class="mb-2 btn btn-outline-dark rounded-0">Login</NuxtLink>
                </div>
            </div>
        </div>
    </div> -->
</template>