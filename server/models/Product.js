import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    priceCents: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0 },
    tags: [String],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
