import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// NOTE: Mongoose Document Usage
export interface IUser extends Document{
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

// NOTE: userSchema.pre()
// Method that exec before or after save data
// Password encrypted!!!
userSchema.pre<IUser>('save', async function (next) {

    // this make reference to the userSchema defined!
    const user = this;
    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash;
    next();

});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export default model<IUser>('Users', userSchema);