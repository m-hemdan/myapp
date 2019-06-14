import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router/router'
import {store} from './store/store.js'
import dataFilter from './filter/date'
import * as firebase from 'firebase' // import all component of firebase
import Alertcomp from './components/share/alert.vue'
import edit from './components/edit/editmeetup.vue'
import editDate from './components/edit/editDate.vue'
import editTime from './components/edit/editTime.vue'
import register from './components/register/register.vue'
Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.component('app-alert',Alertcomp)
Vue.component("app-edit-meetup",edit)
Vue.component("app-edit-date",editDate)
Vue.component("app-edit-time",editTime)
Vue.component("app-register",register)
Vue.filter('date',dataFilter) //global filter by name 'date or currency
new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    firebase.initializeApp({          //backend
      apiKey: "AIzaSyAQpq92Pl2t2PJ162slWDYTBsAoDCFQiFg",
      authDomain: "meetupdatabase.firebaseapp.com",
      databaseURL: "https://meetupdatabase.firebaseio.com",
      projectId: "meetupdatabase",
      storageBucket: "gs://meetupdatabase.appspot.com",
    })
    firebase.auth().onAuthStateChanged((user)=>{   // if i enter again
       if(user)
       {
         this.$store.dispatch("autoSignIn",user)
         this.$store.dispatch("fetchUser")
       }
     })
    this.$store.dispatch('loadMeetup')
  },
}).$mount('#app')
