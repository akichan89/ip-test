const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  deviceName: {
    type: String,
  },
  ipAddress: {
    type: String,
  },
  serialNumber: {
    type: String,
  },
  macAddress: {
    type: String,
  },
  agentId: {
    type: String,
  },
  notes: {
    type: String,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
