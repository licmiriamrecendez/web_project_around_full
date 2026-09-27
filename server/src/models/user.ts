import moongoose from "mongoose";

const userSchema = new moongoose.Schema({
    email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
  type: String,
  required: true,
  select: false,
},
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
     required: true
    },
  about: {
    type: String,
    minlength: 2,
     maxlength: 30,
     required: true,
    },
  avatar: {
    type: String,
    required: true,
    validate: (value: string) => {
      return /^https?:\/\/(www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\/[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]*)?$/.test(
        value
      );
    },
    message: "El enlace del avatar no es válido",
  },
});

const User = moongoose.model("User", userSchema);

export default User;
