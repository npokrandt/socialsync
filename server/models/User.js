const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new User({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    friends: [
        { type: Schema.Types.ObjectId, ref: 'User' }
    ],
    events: [
        { type: Schema.Types.ObjectId, ref: 'Event' }
    ]
});

//pre-save middleware to create password 
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
})

//compare incoming password w/ hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User; 