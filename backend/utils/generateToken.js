import jwt from 'jsonwebtoken'

const generateTokenAndsetCookie = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"15d"
    })
    res.cookie("jwt",token,{
        maxAge:15 * 24 * 60 * 1000,
        httpOnly:true,  //prevent XSS attacks cross-site scripting attacks
        sameSite:"strict",
        secure:process.env.NODE_ENV !=="development"
    } )
}

export default generateTokenAndsetCookie