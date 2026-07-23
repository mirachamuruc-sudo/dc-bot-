import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    discordId: { type: String, required: true, unique: true },
    robloxId: { type: String, default: null },
    robloxUsername: { type: String, default: null },
    verified: { type: Boolean, default: false },
    coins: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    inventory: [{ type: String }],
    joinedAt: { type: Date, default: Date.now },
    locale: { type: String, default: 'de' } // German default per memory
});

export const UserModel = model('User', userSchema);
