<template>
    <v-dialog  persistent width="350px" v-model="editDateDialog">
      <template slot="activator">
        <v-btn color="primary"   dark >
         Edit date
        </v-btn>
      </template>
      <v-card>
        <v-container>
            <v-layout row wrap>
                <v-flex>
        <v-card-title class="headline">edit meet up</v-card-title>
            
            </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout>
            <v-flex xs12 >
       <!-- <v-date-picker v-model="editDate " style="width:100%">
            <template >
      
            </template>    
        </v-date-picker>  --> 
           <v-date-picker v-model="picker" >
             <template > 
                  <v-btn class="blue--text darken-1" 
                    flat
                    @click.native="editDateDialog=false">cancel</v-btn>
                
                <v-btn class="blue--text darken-1" 
                flat
                @click.native="onsaveChange">save</v-btn>
             </template> 
             </v-date-picker>
        </v-flex>
            </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
 
</template>
<script>
export default {
    props:['meetup'],
    data ()    {
        return {
            editDateDialog:false,
            picker:null
        }
    },
    methods:
    {
       onsaveChange()
       { 
           const newDate=new Date(this.meetup.date)
           const newDay=new Date(this.picker).getUTCDate()
           const newMonth=new Date(this.picker).getUTCMonth()
           const newYear=new Date(this.picker).getUTCFullYear()
            
            newDate.setUTCDate(newDay)
            newDate.setUTCMonth(newMonth)
            newDate.setUTCFullYear(newYear)
            this.$store.dispatch("updateMeetup",
            {id:this.meetup.id,date:newDate})
       }
    },
 
}
</script>
