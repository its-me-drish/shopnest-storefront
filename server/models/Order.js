import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  lines: [{ product: mongoose.Schema.Types.ObjectId, name: String, qty: Number, lineCents: Number }],
  totalCents: Number,
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'cancelled'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
