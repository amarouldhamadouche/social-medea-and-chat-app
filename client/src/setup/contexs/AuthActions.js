export const LoginStart = (userCrendetial)=>(
 {
 type : "LOGIN_START"
}

)
export const LoginSuccess = (user) =>(
 {
  type : "LOGIN_SUCCESS",
  payload : user
 }
)

export const LoginFailure = (error)=>(
 {
  type:"LOGIN_FAILURE",
  

 })
 export const Follow = (userId)=>(
 {type : "follow",
  payload : userId
 })
 export const unFollow = (userId)=>(
  {type : "unFollow",
  payload : userId
 })
export const update = (updatedUser)=>(
 {type:"update",
payload:updatedUser}
)
export const logout = ()=>(
 {type:"logout"}
)

