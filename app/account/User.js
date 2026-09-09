import mongoose from 'mongoose';

const userRole = Object.freeze({
    CUSTOMER: 'customer',
    SELLER: 'seller',
    STAFF: 'staff',
    ADMIN: 'admin'
})

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    hashedPassword: { type: String, required: true, trim: true },
    isActive: { type: Boolean, required: true, default: false },
    userRole: { type: String, enum: Object.values(userRole), default: userRole.CUSTOMER },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, {
    timestamps: true
});

const UserModel = mongoose.model('userModel', userSchema)

export default UserModel