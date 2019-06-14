import {store} from '../store/store'
export default (to,from ,next)=>
{
  if (store.getters.userId)
  {
      next()
  }
  else
  {
      next('/signInIn')
  }
}