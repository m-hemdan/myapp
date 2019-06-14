import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/router.js'
import * as firebase from 'firebase'
Vue.use(Vuex)
export const store =new Vuex.Store({
    state:{
        items: [
            {
              id:1,
              src: 'https://i.ibb.co/qmK6LWw/img9.jpg',
              title:"shoes1",
              date:'2017-10-5'
           },
            {
              id:2,
              src: 'https://i.ibb.co/vHT7Wsx/img10.jpg',
              title:"shoes2",
              date:'2017-1-5'
            },
            {
              id:3,
              src: 'https://i.ibb.co/LxB35qs/img4.jpg',
              title:"shoes3",
              date:'2017-3-5'
            },
            {
              id:4,
              src: 'https://i.ibb.co/k5fyfC2/img5.jpg' ,
              title:"shoes4",
              date:'2017-4-5'
            }
          ],
        
          loading:false,
          error:null
        },
    mutations:{
     
        setLoadMeetup(state,payload)
        {
            state.items=payload
        },
        storeMyData(state,mydata)
        {
           state.items.push(mydata)
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
        loadItem(state)
        {
            return state.items.sort((m1,m2)=>{
                return m1.date >m2.date
            })
        },
        loadmyitem(state,getters)
        {
            return getters.loadItem.slice(0,5)
        },
        loadOneItem(state)        //send variable with getters return inside return 
        {
            return meetUpId=> {
                          return state.items.find(elem=>{
                    return elem.id == meetUpId
                })
            }

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