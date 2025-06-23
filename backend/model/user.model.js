import mongoose from "mongoose";
const Userschema=new  mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
         email:{
            type:String,
            required:true,
            unique:true,
            // match: [/^\S+@\S+\.\S+$/]
        },
         contact:{
            type:String,
            required:true,
        },
         password:{
            type:String,
            required:true,
        },
        role:
        {
            type:String,
            enum:['student','recruiter'],
            required: true,
        },
        // file:{
        //     type:String,
        //     required:false

        // },
         profile:{
            bio:{type:String},
            skills:{type:Array},
            resume:{type:String},
            resumeOriginalname:{type:String},
            company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
            profilephoto:{type:String,default:""},
        },
    },
{timestamps:true});
export const User=mongoose.model('User',Userschema)