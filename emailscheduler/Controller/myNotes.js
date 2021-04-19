const emailModel = require('../Model/emailSchema');

exports.getallschedule = async (req, res) => {
  try {
    const email = await emailModel.find({}, { _id: 0, __v: 0 });
    if (email.length > 0) {
      res.status(200).json({
        status: 'success',
        results: email.length,
        data: {
          email,
        },
      });
    } else {
      res.status(400).json({
        status: 'success',
        data: {
          message: 'No schedule available',
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getfailedschedule = async (req, res) => {
  try {
    const email = await emailModel.find({ status: false});
    if (email.length > 0) {
      res.status(200).json({
        status: 'success',
        results: email.length,
        data: {
          email,
        },
      });
    } else {
      res.status(400).json({
        status: 'success',
        data: {
          message: 'No schedule available',
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createschedule = async (req, res) => {
  try {
      const newemail = await emailModel.create(req.body);
      res.status(201).json({
        message: 'Schedule added'
         });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.errmsg,
    });
  }
};

exports.updateschedule = async (req, res) => {
  try {
    const email = await emailModel.findOne(
      {subject:  req.body.subject}
    );
    if (email !== null) {
      const updateschedule = await emailModel.findOneAndUpdate(
        { subject: req.body.subject },
        req.body
      );
      res.status(201).json({
        message: "Schedule updated"
         });
    } else {
      res.status(201).json({
        message: "Schedule not available"
         });
      
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.errmsg,
    });
  }
};

exports.deleteschedule = async (req, res) => {
  const delDet = await emailModel.deleteOne({ subject: req.body.subject });
  if (delDet.deletedCount === 0) {
    res.status(404).json({
      message: "Schedule not available",
    });
  } else {
    res.status(200).json({
      message: "Schedule removed successfully",
    });
  }
};

exports.invalid = async (req, res) => {
  res.status(404).json({
    message: "Resource not found",
  });
};
