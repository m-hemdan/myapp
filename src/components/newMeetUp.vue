<template>
<v-container>
    <v-layout row>
    <v-flex>
       <h3 class="primary--text">create new account</h3>
    </v-flex>
    </v-layout>
    <v-layout row wrap> 
  
      <v-flex xs12 sm6 offset-sm3>
       
         <v-text-field name="title"
         color="red"
         label="title"
         v-model="title"
         id="title"
         required
          ></v-text-field>
      
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
         <v-text-field name="location"
         color="red"
         label="location"
         v-model="location"
         id="location"
         required
          ></v-text-field>
      </v-flex>
   <v-flex xs12 sm6 offset-sm3>
         <v-text-field name="imageUrl"
         color="red"
         v-model="src"
         label="image Url"
         id="imageUrl"
         required
          ></v-text-field>
      </v-flex>
     <!-- <v-flex xs12 sm6 offset-sm3>
          <v-btn  class="primary" @click="onPickFile">upload image</v-btn>
          <input type="file" 
           style="display:none" 
           ref="fileInput"
            accept="image/*"
            @change="changefile">
      </v-flex>-->
      <v-flex xs12 sm6 offset-sm3>
      <img :src="src">
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
         <v-textarea name="descript"
         color="red"
         v-model="description"
         label="descript"
         multi-line
         required
         id="descript"
          ></v-textarea>
      </v-flex>
   
    </v-layout>
    <v-layout>
        <v-flex xs12 sm6 offset-sm3>
           <h3>choose date </h3>
        </v-flex>
    </v-layout>
    <v-layout>
        <v-flex xs12 sm6 offset-sm3>
           <v-date-picker v-model="date"></v-date-picker>
           <p>{{ date }}</p>
        </v-flex>
    </v-layout>

     <v-layout>
        <v-flex xs12 sm6 offset-sm3>
           <h3>choose time </h3>
        </v-flex>
    </v-layout>
    <v-layout>
        <v-flex xs12 sm6 offset-sm3>
            <v-time-picker v-model="time" format="24hr">  </v-time-picker>
            <p>{{time}}</p>
        </v-flex>
    </v-layout>
    <v-layout></v-layout>
    <v-layout>
        <v-flex xs12 sm6 offset-sm3>
        <v-btn class="primary" :disabled="! formIsValid" @click="storeMeetUp"> create meetup</v-btn>
      
        </v-flex>
  
    </v-layout>
</v-container>
  </template>
  <script>
  export default {
   
   data()
   {
       return {
           title:'',
           location:'',
           description:'',
           src:'',
           date:'',
           time:new Date()

       }
   },
   computed:
   {
       formIsValid()
       {
        return this.title !='' && this.description !='' && this.src !='' && this.location !=''
       },
       submitDateTime()
       {
           const date=new Date(this.date)
           if (typeof this.time==='string')
           {
              let hours=this.time.match(/^(\d+)/)[1]
              const minuts =this.time.match(/:(\d+)/)[1]
              date.setHours(hours)
              date.setMinutes(minuts)
           }
           else
           {
               date.setHours(this.time.getHourse())
               date.setMinutes(this.time.getMinutes())
           }
           return date
       }
   },
   methods:
   {
       storeMeetUp()
       {
           if (! this.src)
           {
               return
           }
           const data={
               title:this.title,
               location:this.location,
               description:this.description,
               src:this.src,
               date:this.submitDateTime
           }
           console.log(data)
           this.$store.dispatch("storeData",data)
           
       },
    /*   onPickFile ()
       {
           this.$refs.fileInput.click()
       },
       changefile (event)
       {
           const files=event.target.files
           let filename=files[0].name
           if (filename.lastIndexOf('.') <=0)
           {
               return alert("please enter valid file")
           }
           const fileReader =new FileReader()
           fileReader.addEventListener('load',()=>{
             this.src=fileReader.result
           })
           fileReader.readAsDataURL(files[0])
           this.src=files[0]

       }*/
   }
  }
  </script>
  
  <style>
  
  </style>
  