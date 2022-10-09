import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "can't be blank"],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },
    contact: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
    },
    password: {
      type: String,
      trim: true,
      minlength: 6,
      maxlength: 60,
    },
    department: String,
    joiningDate: Date,
    role: { type: String, default: 'employee' },
    tasks: [{
      description: String,
      taskType: {
        type: String,
        enum: ['break', 'meeting', 'work'],
      },
      startTime: Date,
      duration: Number,
    }],
  },
  { timestamps: true },
);

userSchema.methods.toJSON = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    contact: this.contact,
    department: this.department,
    joiningDate: this.joiningDate,
    role: this.role,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const isProduction = process.env.NODE_ENV === 'production';
const secretOrKey = isProduction ? process.env.JWT_SECRET_PROD : process.env.JWT_SECRET_DEV;

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      expiresIn: '12h',
      id: this._id,
      type: this.role,
      email: this.email,
    },
    secretOrKey,
  );
  return token;
};

userSchema.methods.registerUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        console.log(err);
      }
      // set pasword to hash
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

userSchema.methods.addTask = function (task, callback) {
  this.tasks.push(task);
  this.save(callback);
};

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

export async function hashPassword(password) {
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      else resolve(hash);
    });
  });

  return hashedPassword;
}

export const validateUser = (user) => {
  const schema = {
    name: Joi.string().trim().min(2).max(30).required(),
    email: Joi.string().trim().email().required(),
    contact: Joi.string().trim().required(),
    password: Joi.string().min(6).max(20).allow('').allow(null),
  };

  return Joi.validate(user, schema);
};

const User = mongoose.model('User', userSchema);

export default User;
