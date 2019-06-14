<template>
<v-container>
    <v-layout row v-if="loading" justify-center>
          <div class="text-xs-center">
    <v-progress-circular
      indeterminate
      color="primary"
      :width="5"
      :size="50"
      v-if="loading"
    ></v-progress-circular>
    </div>
    </v-layout>
    <v-layout row wrap v-else>
        <v-flex xs12>
            <v-card >
                <v-card-title>
                    <h5 class="primary--text">{{oneitem.title}}</h5>
                    <template v-if="userCreator">
                        <v-spacer></v-spacer>
                        <app-edit-meetup :meetup="oneitem"></app-edit-meetup>
                        <app-edit-date :meetup="oneitem" v-if="userCreator"></app-edit-date>
                    <app-edit-time :meetup="oneitem" v-if="userCreator"></app-edit-time>
                   
                    </template>
                </v-card-title>
                 <v-img
                :src="oneitem.src"
                 height="400px"></v-img>
                 <v-card-text>
                     <div class="info--text"></div>
                  <div> {{oneitem.date | date}}  Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.</div>
                   
                   
                 </v-card-text>
                 <v-card-actions>
                     <v-spacer></v-spacer>
                 <app-register :meetupId="oneitem.id" ></app-register>
                 </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>
<script>
export default {
  props:['id'],
  created()
  {
     
  },
   computed:{
        oneitem (){
                       return this.$store.getters.loadOneItem(this.id) // instade of this.$router.params.id
        },
        userisAuth ()
        {
            return this.$store.getters.userId.id !=null && this.$store.getters.userId.id !=undefined
        },
        userCreator ()
        {
            if (! this.userisAuth)
            {
                return false
            }
            return this.$store.getters.userId.id == this.oneitem.createId

        },
        loading()
        {
            return this.$store.getters.loading
        }
   }
}
</script>