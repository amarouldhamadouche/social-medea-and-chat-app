 const AuthReducer = (state,action)=>{
  // eslint-disable-next-line default-case
  switch(action.type){
   case "LOGIN_START" : 
    return {
      user :null,
      isFetshing : true,
      error:false
   }
   case "LOGIN_SUCCESS" : 
    return {
      user :action.payload,
      isFetshing : false,
      error:false
   }
   
   case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
      case "Follow":
        return{
          ...state,
          user:{...state.user,
          followings:[...state.user.followings,action.payload]}
        }
        case "unFollow":
          return{
            ...state,
            user:{...state.user,
            followings:state.user.followings.filter(userId=>userId!==action.payload)}
          }
        case "update":
          return{
            ...state,
            user:{
              ...state.user,
              username:action.payload.username,
              desc:action.payload.desc,
              city:action.payload.city,
              from:action.payload.from,
              relationship:action.payload.relationship,
              profileImg : action.payload.profileImg 
                 
                 ,
              coverImg : action.payload.coverImg
                       
          
      }
          }  
        case "logout" : 
        return{
          ...state,
          user:null
        }    
    }
 
}

export default AuthReducer