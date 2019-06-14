<template>

    <v-dialog  persistent width="350px" v-model="dialog">
      <template slot="activator">
        <v-btn color="primary"  accent dark >
          {{ userIsRegister ? 'unRegister ':' Register'}}
        </v-btn>
      </template>
      <v-card>
        <v-container>
       <v-layout>
            <v-card-title class="headline" v-if="userIsRegister">unregister from meetup</v-card-title>
         <v-card-title class="headline" v-else>Register for meetup?</v-card-title>
       </v-layout>
        <v-flex xs12 >
            <v-card-text>you can change your decision later</v-card-text>
        </v-flex>
         <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click="dialog = false">close</v-btn>
          <v-btn color="green darken-1" flat 
          @click="onAgree">confirm</v-btn>
        </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
</template>
<script>
export default {
    data()
    {
        return {
            dialog:false
        }
    },
    props:["meetupId"],
    computed:
    {
        userIsRegister()
        {
            return this.$store.getters.userId.registerMeetup.findIndex(elem=>{
                return elem == this.meetupId
            })>=0
        }
    },
    methods:
    {
        onAgree()
        {
          if (this.userIsRegister)
          {
          this.$store.dispatch("unregisterUser",this.meetupId)
        }
        else
          {
              this.$store.dispatch("registerUser",this.meetupId)
      
          }
        }
    }
}
</script>

 