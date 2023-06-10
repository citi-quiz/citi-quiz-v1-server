const Pig = require("pigcolor");

exports.createNotification = (req, res) => {
  Pig.box("Create Notification");
};

exports.destroyNotification = (req, res) => {
  Pig.box("Destroy Notification");
};
