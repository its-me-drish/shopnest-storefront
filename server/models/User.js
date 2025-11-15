import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

userSchema.methods.verify = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

userSchema.statics.hash = (password) => bcrypt.hash(password, 10);

export default mongoose.model('User', userSchema);
