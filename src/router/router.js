import Vue from 'vue'
import VueRouter from 'vue-router'
import signIn from '../components/signIn'
import signUp from '../components/signUp'
import meetup from '../components/meetup'
import home from '../components/home'
import signInUser from '../components/signInUser'
import newMeetUp from '../components/newMeetUp'
import auth from './auth'
Vue.use(VueRouter)
export const routes=[
    {path:"/",component:home },
    {path:"/signIn",component:signIn},
    { path:"/signUp",component:signUp},
    {path:"/signIn/:id",component:meetup,props:true},
    {path:"/newMeetUp",component:newMeetUp,
      beforeEnter:auth},
    {path:'/signInIn',component:signInUser}
]
export default new VueRouter({
    routes,
    mode:"history"
})