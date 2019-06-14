import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/router.js'
import * as firebase from 'firebase'
Vue.use(Vuex)
export const store =new Vuex.Store({
    state:{
          user:null,
          loading:false,
          error:null
        },
    mutations:{
        registerUserMeetup(state,payload)
        {
            const id =payload.id
            if (state.user.registerMeetup.findIndex(meetup=>meetup.id ==id)>=0)
            {
                return
            }
            state.user.registerMeetup.push(id)
            state.user.fbkeys[id]=payload.fbkey
        },
        unregisterUserMeetup(state,payload)
        {
            const registerMeetup=state.user.registerMeetup
            registerMeetup.splice(registerMeetup.findIndex(meetup=>meetup.id == payload),1)
              Reflect.deleteProperty(state.user.fbkeys,payload)
        }
        ,
        setLoadMeetup(state,payload)
        {
            state.items=payload
        },
        storeMyData(state,mydata)
        {
           state.items.push(mydata)
        },
        setUser(state,payload)
        {
            state.user=payload
            
        },
        setLoading(state,payload)
        {
            state.loading=payload
        },
        setError(state,payload)
        {
            state.error=payload
        },
        clearError(state)
        {
            state.error=null
        },
        updateMeetup(state,payload)
        {
            const meetup =state.items.find(elem=>{
                return elem.id==payload.id
            })
            if(payload.title)
            {
                meetup.title =payload.title
            }
            if(payload.location)
            {
                meetup.location=payload.location
            }
            if (payload.date)
            {
                meetup.date=payload.date
            }
        }

    },
    getters:{
      
        userId(state)
        {
            return state.user
        },
        error(state)
        {
            return state.error
        },
        loading(state)
        {
            return state.loading
        }
    },
    actions:
    {
        fetchUser({commit,getters})
        {
            commit("setLoading",true)
            firebase.database().ref('/users/'+getters.userId.id+'/registrations/').once('value')
            .then(data=>{
                const values =data.val()
                let registerMeetup=[]
                let swapval={}
                for (let key in values)
                {
                    registerMeetup.push(values[key])
                    swapval[values[key]]=key
                }
                const updateuser =
                {
                    id:getters.userId.id,
                    registerMeetup:registerMeetup,
                    fbkey:swapval
                }
                commit("setLoading",false)
                commit("setUser",updateuser)
               
            })
        },
        registerUser({commit,getters},payload)
        {
            commit("setLoading",true)
            const user=getters.userId
            firebase.database().ref('/users/'+user.id).child("/registrations/")
            .push(payload)
            .then(data=>{
               commit("setLoading",false)
               commit("registerUserMeetup",{id:payload, fbkey:data.key})
            })
            .catch(error=>{
                console.log(error)
                commit("setLoading",false)
            })
        },
        unregisterUser({commit,getters},payload)
        {
            commit("setLoading",true)
            const user=getters.userId
            if (! user.fbkeys)
            {
                return
            }
            const fbkey =user.fbkeys[payload]
            firebase.database().ref('/users/'+user.id+'/registrations/').child(fbkey)
            .remove()
            .then(()=>{
                commit("setLoading",false)
                commit("unregisterUserMeetup",payload)
            })
              .catch(error=>{
                  console.log(error)
                  commit("setLoading",false)
              })
        },
       storeData({commit,getters},mydata)
       {
         const newData={
             title:mydata.title,
             location:mydata.location,
             src:mydata.src,
             description:mydata.description,
             date:mydata.date.toISOString(),
             createId:getters.userId.id
         }
        /*
        let key
        let imgurl */
          firebase.database().ref('meetup').push(newData)
          .then((data)=>{
              const key =data.key
             
            commit("storeMyData",{...newData,id:key})
           
          })
        /*  .then(key=>{
              const filename=mydata.src.filename
              const ext=filename.slice(filename.lastIndexOf('.'))
              return firebase.storage().ref('meetup/'+key+'.'+ext).put(mydata.src)
          })
          .then(fileData=>{
              imgurl=fileData.metaData.downloadURLs[0]
              return firebase.database().ref('meetup').child(key).update({src:imgurl})
          })
          .then(()=>{
           commit("storeMyData",{
            ...newData,
            src:imgurl,
            id:key})
          })*/
          .catch((error)=>
          {
              console.log(error)
          })
          router.push('/signIn')
          // commit("storeMyData",newData)
       },
       signUserUp ({commit},payload)
       {
           commit('setLoading',true)
           commit('clearError')
          firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
          .then(
              user=>
              {
                  commit('setLoading',false)
                  const newuser={
                   id:firebase.auth().currentUser.uid,
                     registerMeetup:[],
                     fbkeys:{}
                  }
                  console.log(newuser)
                  commit('setUser', newuser)
              }
              
          )
          .catch(
            error=>{
                commit('setLoading',false),
                commit('setError',error)
              
            }
              
          )
       },
       signIn({commit},payload)
       {
        commit('setLoading',true)
        commit('clearError')
           firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
           .then(
               user =>{
                commit('setLoading',false)
                const newuser={
                    id:firebase.auth().currentUser.uid,
                      registerMeetup:[],
                      fbkeys:{}
                   }
                   
                   commit('setUser', newuser)
               
               }
           )
               .catch(error=>
                {
                    commit('setLoading',false),
                    commit('setError',error)
                  
                })
       },
       loadMeetup({commit})
       {
           commit('setLoading',true)
           firebase.database().ref('meetup').once('value')
           .then((data)=>{
               const meetup=[]
               const obj =data.val()
               console.log(data.val())
               for(let key in obj)
               {
                   meetup.push({
                       id:key,
                       title:obj[key].title,
                       location:obj[key].location,
                       description:obj[key].description,
                       src:obj[key].src,
                       date:obj[key].date,
                       createId:obj[key].createId
                   })
               }
               commit('setLoading',false)
               commit('setLoadMeetup',meetup)
           })
           .catch(
               (error)=>{
                  console.log(error)
                  commit('setLoading',true)
               }
           )
       },
       autoSignIn({commit},payload)
       {
           commit("setUser",{id:payload.uid,registerMeetup:[],fbkeys:{}
        })
       },
     logout({commit})
       {
           firebase.auth().signOut()
           commit("setUser",null)
           router.push("/")
       },
       updateMeetup({commit},payload)
       {
           commit("setLoading",true)
           const updateObj={}
           if(payload.title)
           {
               updateObj.title=payload.title
           }
           if(payload.location)
           {
               updateObj.location=payload.location
           }
           if (payload.date)
           {
               updateObj.date=payload.date
           }
           firebase.database().ref('meetup').child(payload.id).update(updateObj)
            .then(()=>{
              commit("setLoading",false)
              commit ("updateMeetup",payload)
            })
            .catch(error=>{
                console.log(error)
                commit("setLoading",false)
            })
            
        }
    }
    
})