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
     required: true,
    default: "Jacques Cousteau",
    },
  about: {
    type: String,
    minlength: 2,
     maxlength: 30,
     required: true,
     default: "Explorador",
    },
  avatar: {
    type: String,
    required: true,
    default: "https://practicum-content.s3.us-west-1.amazonaws.com/web-lat/avatar.jpg",
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
