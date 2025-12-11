// Governance Model
const mongoose = require('mongoose');

const hierarchyNodeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  experience: { type: String },
  image: { type: String },
  children: [this], // Recursive reference for hierarchy
});

const governanceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  hierarchy: [hierarchyNodeSchema], // Root level nodes of the organizational hierarchy
  ethicsTitle: { type: String, required: true },
  ethicsContent: { type: String, required: true },
  ethicsPoints: [{ type: String }],
});

module.exports = mongoose.model('Governance', governanceSchema);
