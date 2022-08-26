const Post = require('../models/Post')
const router = require('express').Router()
const User = require('../models/User')

//create a poste
router.post('/',async(req,res)=>{
 const post = new Post(req.body)
 try{
  const savedPost = await post.save()
  res.status(200).json(savedPost)
 }catch(err){
  res.status(500).json(err)
 }
})

//update a post
router.put('/:id',async(req,res)=>{
 try{
  const post = await Post.findById(req.params.id)
  if(post.userId===req.body.userId){
     await post.updateOne({$set:req.body})
     res.status(200).json('post updated')
  }
  else{
     res.status(401).json('u can update only ur posts')
  }
 }catch(err){
     res.status(500).json(err)
 }
})

//delete a post
router.delete('/:id',async(req,res)=>{
   try{
     const post = await Post.findById(req.params.id)
     if(post.userId === req.body.userId){
      await post.deleteOne()
      res.status(200).json('post has been deleted')
     }
     else{
      res.status(401).json('u can delete only ur posts')
     }
   }catch(err){
    res.status(500).json(err)
   }
})

//like/dislike a post
router.put('/:id/like',async(req,res)=>{
   try{
    const post = await Post.findById(req.params.id)
    if(!post.likes.includes(req.body.userId)){
     await post.updateOne({$push : { likes:req.body.userId } } )
     res.status(200).json('ulike this post')
    }
    else{
     await post.updateOne({ $pull : {likes:req.body.userId}})
     res.status(200).json('u disliked this post')
    }
   }catch(err){
    res.status(500).json(err)
   }
})

//get a post
router.get('/:id',async(req,res)=>{
   try{
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
   }catch(err){
    res.status(500).json(err)
   }
})

//timeLine
router.get('/timeLine/:userId',async(req,res)=>{
 try{
  const currentUser = await User.findById(req.params.userId)
  const userPosts = await Post.find({userId:currentUser._id})
  const friendPosts = await Promise.all(
   currentUser.followings.map((friendId)=>{
      return  Post.find({userId:friendId})
      
   })
   )
   res.status(200).json(userPosts.concat(...friendPosts))
  }catch(err){
   res.status(500).json(err)
  }
 }
  )

  //get user's all posts
  router.get('/profile/:username',async(req,res)=>{
   try{
    const user = await User.findOne({username:req.params.username})
    const userPosts = await Post.find({userId:user._id})
    res.status(200).json(userPosts)
   }catch(err){
    res.status(500).json(err)
   }
  })
 
module.exports = router