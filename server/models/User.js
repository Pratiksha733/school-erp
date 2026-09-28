import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Set bufferCommands false BEFORE defining schema — prevents operation buffering
mongoose.set('bufferCommands', false);

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    password: { type: String, required: true, minlength: 4 },
    role: {
        type: String,
        enum: ['Principal / Administrator', 'Faculty Teacher', 'Office & Support Staff', 'Student / Guardian', 'Administrator'],
        default: 'Faculty Teacher',
    },
    phone: { type: String, default: '' },
    avatar: { type: String, default: 'SJP' },
}, {
    timestamps: true,
    // Disable buffering at schema level as well (belt-and-suspenders)
    bufferCommands: false,
    autoCreate: false,
    autoIndex: false,
});

// Hash password before save
userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function(entered) {
    return bcrypt.compare(entered, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;