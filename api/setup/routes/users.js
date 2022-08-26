const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt");
//update
 router.put("/:id",async(req,res)=>{
 if (req.body.userId === req.params.id || req.body.isAdmin){
   if(req.body.password){
    try{
    const user = await User.findById(req.params.id)
    const  validPassword = await bcrypt.compare(req.body.currentPassword,user.password)
    !validPassword && res.status(400).json('wrong password')
     const salt = await bcrypt.genSalt(10);
     req.body.password = await bcrypt.hash(req.body.password, salt); 
    }catch(err){
      res.status(500).json(req.body.currentPassword)
    }

   }
    try{
      await User.findByIdAndUpdate(req.params.id,{
      $set:req.body,})
      res.status(200).json("account has been updated") 
        }catch(err){
        res.status(500).json(err)
     }
  
   }
   else{
      res.status(403).json("u can update only ur account")
   }
})
//delete
router.delete('/:id',async(req,res)=>{
   if (req.body.userId === req.params.id || req.body.isAdmin){
   try{
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json("account has been deleted") 
        }catch(err){
        res.status(500).json(err)
     }
     }
     else{
        res.status(403).json("u can delete only ur account")
     }
})
//get a user
router.get('/',async(req,res)=>{
   const userId = req.query.id
   const username = req.query.username
   try{
     const user = userId ? await User.findById(userId) : await User.findOne({username:username})
     const {password, updatedAt, ...other }=user._doc
     res.status(200).json(other)
  }catch(err){
     res.status(500).json(err)
  }
})
//get a frind
router.get('/friend/:id', async(req,res)=>{
   try{
   const user = await User.findById(req.params.id)  
   const friends = await Promise.all(
      user.followings.map((friendId)=>{
         return User.findById(friendId)
         }))
   
   let friendList = []
   friends.map((friend)=>{
      const {_id,username,profileImg} = friend
      friendList.push({_id,username,profileImg})
   })
   res.status(200).json(friendList)
}catch(err){
   res.status(500).json(err)
}
})
//follow
router.put('/:id/follow', async(req,res)=>{
   if(req.body.userId !== req.params.id){
     try{ 
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if(!user.followers.includes(req.body.userId)){
         await user.updateOne({$push : {followers : req.body.userId}})
         await currentUser.updateOne({$push : {followings : req.params.id}})
         res.status(200).json('user followed')

      }
      else{
         res.status(401).json('u are alredy follow this user')
      }
   }catch(err){
      res.status(500).json(err)
   }
   }
   else{
      res.status(401).json('u can not follow urself')
   }
})
//unfollow
router.put("/:id/unfollow",async (req,res)=>{
   if(req.body.userId !== req.params.id){
      try{
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if (user.followers.includes(req.body.userId)){
       await user.updateOne({$pull : {followers : req.body.userId}})
       await currentUser.updateOne({$pull : {followings : req.params.id}})
       res.status(200).json('u unfollowed this user')
      }
      else{
         res.status(400).json('u dont follow this user')
      }
   }catch(err){
      res.status(500).json(err)
   }
}
else{
   res.status(400).json("u can't follow or unfollow urself")
}
})



module.exports = router;