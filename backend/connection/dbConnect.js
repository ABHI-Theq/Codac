import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        mongoose.connect(`${process.env.CONN_STR}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(()=>{
            console.log("DB connected successfully");
        })
    }catch(e){
        console.log(e.message);
    }
}

export default connectDB