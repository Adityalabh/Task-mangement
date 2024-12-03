import mongoose from "mongoose";
export const connectionDb = async () => {
    try {
        await mongoose.connect(process.env.MongoUrl);
        console.log('database connected successfully');
    } catch (error) {
        console.log(error);
    }
}