"use strict";

const { mongoose } = require("../configs/dbConnection");

const RoomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    image: [
      {
        type: String,
        trim: true,
        required: true,
      },
    ],

    bedtype: {
      type: String,
      enum: ["king", "queen", "double", "single"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { collection: "rooms", timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
