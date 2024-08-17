
exports.responseHelper = (res, value, error) => {
    if (!error) {
      res.status(200).send({ success: true, value: value });
    } else {
      res.status(500).send({ success: false, error: error.message });
    }
};