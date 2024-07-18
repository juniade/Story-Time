export default defineNuxtRouteMiddleware((to,from)=>{
    const auth=useAuth()
    if(!auth.token){
        return navigateTo("/AuthPages/WebLogin")
    }
})

