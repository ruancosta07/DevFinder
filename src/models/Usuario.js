const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const Usuario = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

Usuario.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Usuario.method('compare', async (formPass, userPass) => { 
//     return bcrypt.compare(formPass, userPass)
// })

mongoose.model("usuarios", Usuario);
