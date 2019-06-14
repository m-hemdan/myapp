<template>

    <v-dialog  persistent width="350px" v-model="dialog">
      <template slot="activator">
        <v-btn color="primary" fab accent dark >
          <v-icon>edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-container>
        <v-card-title class="headline">edit meet up</v-card-title>
        <v-flex xs12 >
         <v-text-field name="title"
         color="red"
         label="title"
         v-model="EditTitle"
         id="title"
         required
          ></v-text-field>
      
      </v-flex>
       <v-flex xs12>
         <v-text-field name="location"
         color="red"
         label="location"
         v-model="EditLocation"
         id="location"
         required
          >
         </v-text-field>
        </v-flex>
         <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">close</v-btn>
          <v-btn color="green darken-1" flat @click="onsaveChange">save</v-btn>
        </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
 
</template>
<script>
export default {
  props:["meetup"],
  data()
  {
    return {
      dialog:false,
      EditTitle:this.meetup.title,
      EditLocation:this.meetup.location
    }
  },
  methods: {
    onsaveChange()
    {
      if(this.EditTitle.trim() == '' || this.EditLocation.trim() == '' )
      { return }
      this.dialog=false;
      this.$store.dispatch("updateMeetup",{id:this.meetup.id,title:this.EditTitle,location:this.EditLocation})
    }
  },
}
</script>