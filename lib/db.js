import mongoose from 'mongoose';

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB bağlantısı başarılı!');
  } catch (error) {
    console.error('❌ MongoDB bağlantı hatası:', error.message);
  }
};

export default connectMongo;