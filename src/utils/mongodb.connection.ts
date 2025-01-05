import mongoose, { Connection } from "mongoose"

const Conexiondb = async () => {
  try {

    await mongoose
      .connect(
        `${process.env.MONGODB_URI}${process.env.MONGODB_URI_config}`,
        {
          serverSelectionTimeoutMS: 10000, 
          socketTimeoutMS: 45000,
        }
      )
    console.log("Database is connected");
  } catch (error: any) { console.error("Connection error:", error) }

  mongoose.set("strictQuery", true);
};

export default Conexiondb