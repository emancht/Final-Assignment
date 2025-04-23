import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      trim: true
    },
    image: {
      type: String,
      required: [true, 'Event image is required']
    },
    date: {
      type: Date,
      required: [true, 'Event date is required']
    },
    time: {
      type: String,
      required: [true, 'Event time is required']
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Event category is required'],
      enum: ['Conference', 'Workshop', 'Seminar', 'Meetup', 'Concert', 'Exhibition', 'Sports', 'Festival', 'Other']
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Event = mongoose.model('Event', eventSchema);
export default Event;