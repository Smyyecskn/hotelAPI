"use strict";
const { mongoose } = require("../configs/dbConnection");

const ReservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    roomId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],

    arrival_date: {
      type: Date,
      required: true,
    },

    departure_date: {
      type: Date,
      required: true,
      validate: {
        validator: function (departure_date) {
          return departure_date > this.arrival_date;
        },
        message: (props) => `Çıkış tarihi giriş tarihinden önce olmalıdır.!`,
      },
    },
    quest_number: {
      type: Date,
    },
    night: {
      type: Number,
      default: function () {
        let time = this.departure_date - this.arrival_date;
        let days = Math.floor(time / (1000 * 60 * 60 * 24));
        return days;
      },
      transform: function () {
        let time = this.departure_date - this.arrival_date;
        let days = Math.floor(time / (1000 * 60 * 60 * 24));
        return days;
      },
    },

    price: {
      type: Number,
      trim: true,
    },
    total_price: {
      type: Number,
      default: function () {
        return this.night * this.price;
      },
      transform: function () {
        return this.night * this.price;
      },
    },
  },

  {
    collection: "reservations",
    timestamps: true,
  }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
