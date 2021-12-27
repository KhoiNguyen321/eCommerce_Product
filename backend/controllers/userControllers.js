import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'


// @desc Get user authentication
// @route Get /api/users/login
// @access Private

const authUser = asyncHandler(async(req, res) => {
    const {email, password} = await req.body
    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
     res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
     })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc Get user profile
// @route Get /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async(req, res) => {

    // console.log('reqreqreqreq', req.user._id)
    const user = await User.findById(req.user._id)
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})


// @desc Register user 
// @route Get /api/users/register
// @access Private

const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body
    const existedUser = await User.findOne({email})
    if(existedUser){
        res.status(400)
        throw new Error('User already existed')

    }
    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('User not found')
    }

})

export { authUser, getUserProfile, registerUser}