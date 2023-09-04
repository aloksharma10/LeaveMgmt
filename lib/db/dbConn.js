import moongoose from "mongoose";

const dbConn = async () => {
  try {
    await moongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("MongoDB not connected", error);
  }
};
export default dbConn;