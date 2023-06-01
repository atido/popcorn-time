const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
    },
    avatar: {
      type: String,
      default: "/images/avatar.png",
    },
    watched: {
      type: [String],
    },
    watchList: {
      type: [String],
    },
    rates: {
      type: [{ movieId: String, rate: Number }],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, Number(process.env.BCRYPT_SALT));
  }
  next();
});

const User = model("User", userSchema);

module.exports = User;
