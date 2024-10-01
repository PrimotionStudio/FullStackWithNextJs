import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        mongoose.connect(process.env.DATABASE_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => console.log('Database Connected'));

        connection.on("error", () => {
            console.log('Database Connection Error');
            process.exit();
        });
    } catch (error) {
        console.log('Could not connect to database');
        console.log(error);
    }
};

export default dbConnect;