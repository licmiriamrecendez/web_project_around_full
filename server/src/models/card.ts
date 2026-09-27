import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => {
        return /^https?:\/\/(www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\/[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]*)?$/.test(
          value,
        );
      },
      message: "El enlace de la imagen no es válido",
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  default: [],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model("Card", CardSchema);

export default Card;