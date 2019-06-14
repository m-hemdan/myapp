<template>
    <v-container>
        <v-layout v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-card >
                  <v-card-text >
                      <v-container>
                          <form @submit.prevent="signUpFun">
                              <v-layout row wrap>
                                  <v-flex xs12 >
                                      <v-text-field name="email" label="email" 
                                      v-model="email"
                                      type="email"
                                      id="email"
                                     required >
                                      </v-text-field>
                                  </v-flex>
                                   <v-flex xs12 >
                                      <v-text-field name="password" label="password" 
                                      v-model="password"
                                      type="password"
                                      id="password"
                                     required >
                                      </v-text-field>
                                  </v-flex>
                                   <v-flex xs12 >
                                      <v-text-field name="confirmPassword" label="confirm Password" 
                                      v-model="confirmPassword"
                                      type="password"
                                      :rules="[comparePassword]"
                                      id="confirmPassword"
                                      
                                     required >
                                      </v-text-field>
                                  </v-flex>
                                    <v-flex xs12 >
                                      <v-btn class="primary" type="submit" :disable="loading" :loading="loading" >submit
                                            <span slot="loader" class="custom-loader">
                                            <v-icon light>cached</v-icon>
                                           </span>
                                            
                                      </v-btn>
                                    </v-flex>
                              </v-layout>
                          </form>
                      </v-container>
                  </v-card-text>
              </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data(){
        return {
            password:'',
            confirmPassword:'',
            email:''
        }
    },
    computed:
    {
        comparePassword()
        {
            return this.password !== this.confirmPassword ? "password do not match":''
        },
        user()
        {
            return this.$store.getters.userId
        },
        error()
        {
            return this.$store.getters.error
        },
        loading()
        {
            return this.$store.getters.loading
        }
    },
    watch:
    {
      user(value)
      {
          if (value !=null && value !==undefined)
           {
               this.$router.push('/')
               }
      }
    },
    methods:
    {
        signUpFun()
        {
            
            this.$store.dispatch('signUserUp',{
                email:this.email,
                password:this.password
            })
        },
        onDismissed()
        {
           
            this.$store.commit("clearError")
        }
    }
}
</script>
<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>