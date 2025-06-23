import bcrypt from "bcryptjs"
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import getDataUri from "../utilis/datauri.js";
import cloudinary from "../utilis/cloudinary.js";
import path from "path";


const emailRegex = /^\S+@\S+\.\S+$/;

export const register = async (req, res) => {
    try {
        const { name, email, contact, password, role } = req.body;
        const file = req.file;

        if (!name || !email || !contact || !password || !role) {

            return res.status(200).json
                (
                    {
                        message: "Something is missing",
                        success: false
                    }
                )
        }
         if(!emailRegex.test(email))
   return res.status(400).json( {
 message:"Enter correct email",
 success:false,
    })
        const fileUri=getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });


        if (user) {
            return res.status(200).json({
                message: "user already exist",
                success: false
            })
        }


        const hashedpassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            contact,
            password: hashedpassword,
            role,
            profile:
            {
                "profilephoto":cloudResponse.secure_url,
            }

        })
        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        })

    } catch (error) {
        console.log(error);

    }

}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json
                (
                    {
                        message: "Something is missing",
                        success: false
                    }
                )
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }


        const issamepassword = await bcrypt.compare(password, user.password);
        if (!issamepassword) {
            return res.status(400).json({
                message: "Incorrect password",
                success: false
            })
        }
        if (role != user.role) {
            return res.status(400).json({
                message: "Account does't exist with current role ",
                success: false
            })
        }

        const tokendata = {
            userId: user._id
        }
        const token = await jwt.sign(tokendata, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            contact: user.contact,
            role: user.role,
            profile: user.profile
        }




        return  res.status(200)
  .cookie("token", token, { 
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax', // 'lax' works better for local development
    secure: false
  })
  .json({
    message: `Welcome back ${user.name}`,
    user,
    success: true
  });



    } catch (error) {
        console.log(error);

    }

}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logged out successfully.",
            success: true,
        })

    } catch (error) {
        console.log(error);


    }
}
export const updateprofile = async (req, res) => {
  try {
    const { name, email, contact, bio, skills } = req.body;
    const userId = req.id; // from middleware
     const file = req.file;
        // cloudinary ayega idhar
        let cloudResponse=null
        if(file)
        {const fileUri = getDataUri(file);
         const originalName = path.parse(file.originalname).name;

cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
  resource_type: 'raw',
  folder: 'resumes',
  use_filename: true,
  public_id: originalName,
  access_mode: "public"
});}

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    if(!emailRegex.test(email))
   return res.status(400).json( {
 message:"Enter correct email",
 success:false,
    })


    if (name) user.name = name;
    if (email) user.email = email;
    if (contact) user.contact = contact;
    if (bio) user.profile.bio = bio;

    if (skills) {
      user.profile.skills = skills.split(',').map(s => s.trim());
    }
    

    if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalname = file.originalname // Save the original file name
        }

    await user.save();

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: userData,
      success: true,
    });

  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

