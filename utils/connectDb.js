import mongoose from "mongoose";
import { connect } from "mongodb";
const connection = {};

async function connectDb() {
  if (connect.isConnected) {
    //use existing databse connection
    console.log("Using existing connection");
    return;
  }
  //use new database connection
  const db = await mongoose.connect(process.env.MONGO_SRV, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("DB Connected");
  connection.isConnected = db.connection[0].readyState;
}

export default connectDb;
