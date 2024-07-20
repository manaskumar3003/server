const Users = require("../models/userModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');





const userCtrl = {
    register:async (req,res)=>{
        try{

            const{name,email,password}= req.body;

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg:"email registered already"})

            if(password.length < 6)
                return res.status(400).json({msg:"password should be atleast 6 character"})

            //password encryption
            const passwordHash = await bcrypt.hash(password,10)

            const newUser= new Users({
                name,email,password:passwordHash
            })

            //save to mongodb

            await newUser.save()

            //create jwt to authenticate
            const accesstoken = createAccessToken({id:newUser._id})
            const refreshtoken = createRefreshToken({id:newUser._id})

            res.cookie('refreshtoken',refreshtoken,{
                httpOnly:true,
                path:'/user/refresh_token'
            })

            res.json({accesstoken})

        }catch(err){
            return res.status(500).json({msg:err.message})

        }

    },
    refreshtoken:async(req,res)=>{
        try{
            const rf_token=req.cookies.refreshtoken;

        if(!rf_token) return res.status(400).json({msg:"please login or registers"});
        jwt.verify(rf_token,"REFRESHTOKEN",(err,user)=>{
            if(err) return res.status(400).json({msg:"please login or register"})
                const accesstoken = createAccessToken({id:user.id})
        })
        res.json({rf_token})


        }catch(err){
            return res.status(500).json({msg:err.message})

        }
        
    },


    login:async (req,res)=>{
        try{
            const {email,password}=req.body

            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg:"user doesn't exist"})

            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch) return res.status(400).json({msg:"incorrect pswd"})
            
                const accesstoken = createAccessToken({id:user._id})
                const refresh_token = createRefreshToken({id:user._id})
                res.cookie("refreshtoken",refresh_token,{
                    httpOnly:true,
                    path:'/user/refresh_token'
                })
            
                res.json({accesstoken}
        )
        }catch(err){
            return res.status(500).json({msg:err.message})

        }
    },

    logout:async(req,res)=>{
        try{
            res.clearCookie('refreshtoken',{path:'/user/refresh_token'})
            return res.json({msg:"log out"})

        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
   getUser:async(req,res)=>{
    try{
        const user = await Users.findById(req.user.id).select('-password')
        if(!user) return res.status(400).json({msg:"user not found"})
        res.json(user)

    }catch(err){
        return res.status(500).json({msg:err.message})

    }
   } 
}



const createAccessToken= (payLoad)=>{
    return jwt.sign(
        payLoad,"SECRETTOKEN",{expiresIn:'1d'}
    )
}

const createRefreshToken= (payLoad)=>{
    return jwt.sign(
        payLoad,"REFRESHTOKEN",{expiresIn:'7d'}
    )
}

module.exports = userCtrl