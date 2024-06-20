import mongoose from "mongoose";

const urlValidator = function (url) {
  const urlPattern = /^(https?:\/\/)?([a-z\d-]+\.)+[a-z]{2,6}(:\d+)?(\/\S*)?$/i;
  return urlPattern.test(url);
};

const { Schema } = mongoose;
const placeSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: {
    type: String,
    required: true,
    validate: {
      validator: urlValidator,
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  mapURL: {
    type: String,
    required: true,
    validate: {
      validator: urlValidator,
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  description: { type: String, required: true },
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;
