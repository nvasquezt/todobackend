const mongooose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongooose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    last: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: String
}, {
    timestamps: true,
    versionKey: false,
});

UserSchema.pre('save', async function (next) {
    const user = this;
    try {
        if (!user.isModified('password')) {
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        return next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this;
    try {
        const isMatch = await bcrypt.compare(candidatePassword, user.password);
        return isMatch;
    } catch (error) {
        throw new Error(error);
    }
};

UserSchema.virtual('profile').get(function () {
    const { name, last, username, email, role } = this;
    return {
        fullName: `${name} ${last}`,
        username,
        email,
        role
    };
});

module.exports = mongooose.model('User', UserSchema);
