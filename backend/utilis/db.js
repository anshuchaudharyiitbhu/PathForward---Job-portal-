import mongoose from "mongoose";

const connectdb =async () => {
    try {
        await(mongoose.connect(process.env.MONGO_URL));
        
    } catch (error) {
    }
    
}
 export default connectdb;