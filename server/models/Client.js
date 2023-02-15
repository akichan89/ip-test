const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Client", ClientSchema);
