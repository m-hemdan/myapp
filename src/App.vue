<template>
  <v-app>
  <v-navigation-drawer
    class="blue lighten-3"
    dark
    v-model="show"
     absolute
     temporary
  >
    <v-list>
      <v-list-tile
        v-for="item in items"
        :key="item.title"
         router
        :to="item.link"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
        
      </v-list-tile>
  <v-list-tile v-if="userAuth" @click="onlogout" >
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>logout</v-list-tile-title>
        </v-list-tile-content>
     </v-list-tile> 
    </v-list>
  </v-navigation-drawer>
      <v-toolbar app>
      <v-toolbar-side-icon @click="show= !show" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title  class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items row >
      <v-btn
      v-for="item in items"
       :key="item.title"
        router
        :to="item.link"
        flat
       
      >
      <v-icon left>{{item.icon}}</v-icon>
        <span class="mr-2">{{item.title}}</span>
      </v-btn>
     <v-btn flat v-if="userAuth" 
     @click="onlogout">
        <v-icon>exit_to_app</v-icon>
        <span class="mr-2">logOut</span>

      </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
    <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
   data () {
    return {
      show:false,
    }
  },
  computed:
  {
    items()
    {
      let menu=[ 
        
        {title:"signup",icon:"home",link:"/signUp"},
        {title:"sign In",icon:"person",link:"/signInIn"}
      ]
      if (this.userAuth)
      {
        menu=[
         {title:"home" , icon:"home",link:"/home"},
        {title:"person",icon:"person",link:"/signIn"}
       
        ]
      }
      return menu
    },
    userAuth()
    {
      return this.$store.getters.userId !=null && this.$store.getters.userId !=undefined
    }
  },
  methods:
  {
    onlogout()
    {
      this.$store.dispatch("logout")
    }
  }

}
</script>
