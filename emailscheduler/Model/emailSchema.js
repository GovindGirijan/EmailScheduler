const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/IntellectNotes', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

//Schema

const emailSchema = new mongoose.Schema(
  {
    to: {
      type: String,
    },
    from: {
      type: String,
    },
    subject: {
      type: String,
    },
    text: {
      type: String,
    },
    html: {
      type: String,
    },
    datetime: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true
    }

  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

//Model
const emailModel = mongoose.model('email', emailSchema);

module.exports = emailModel;