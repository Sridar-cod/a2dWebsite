import mongoose from "mongoose";

 export  const  connectMongo = async () => await mongoose.connect(process.env.MONGO_URI)
// export const connectMongo = async () => {
//   return(
//   mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.error("MongoDB connection error:", err)))
// }
