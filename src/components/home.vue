<template>
<v-container>
    <v-layout  class="wrap">
       <v-flex xs12 sm3 text-xs-center offset-sm2 text-sm-right>
           <v-btn large router to="/signIn" color="primary" >organize</v-btn>
       </v-flex>
       <v-flex xs12 sm3 text-xs-center text-sm-center>
           <v-btn large router to="/newMeetUp" color="primary">new meetUp</v-btn>
       </v-flex>
        <v-flex xs12 sm3 text-xs-center text-sm-left>
           <v-btn large router to="/signUp" color="primary">signUp</v-btn>
       </v-flex>
    </v-layout>
    <v-layout>
        <v-flex>
    <div class="text-xs-center">
    <v-progress-circular
      indeterminate
      color="primary"
      :width="5"
      :size="50"
      v-if="loading"
    ></v-progress-circular>
    </div>
    </v-flex>
    </v-layout>
    <v-layout row wrap>
        <v-flex xs12>
      <v-carousel style="cursor:pointer" v-if="! loading">
        <v-carousel-item 
        v-for="item in items"
        :key="item.id"
        :src="item.src"
        @click="onload(item.id)">
        <div class="title " justify-center>{{ item.title}}</div>
        </v-carousel-item>
     </v-carousel>
        </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
        <v-flex xs12  class="text-xs-center">
        <p>join our awesom meetup</p>
        </v-flex>
    </v-layout>
</v-container>
</template>
<script>
export default {
  computed:
  {
      items()
      {
          return this.$store.getters.loadItem
      },
      loading()
      {
          return this.$store.getters.loading
      }
  }
  ,
    methods:
    {
       onload(id) {
        this.$router.push("/signIn/"+id)
       } 
    }
  }
</script>
<style>
.title
{
  position: absolute;
   bottom: 50px;
   left:45%;
   color: white;
   border-radius: 5px;
   padding: 10px 20px 10px 20px;
   background-color: rgba(65, 61, 61, 0.295);
   font-size: 20px;
}
</style>
