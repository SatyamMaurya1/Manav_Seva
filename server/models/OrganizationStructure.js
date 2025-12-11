// OrganizationStructure Model
const mongoose = require('mongoose');

const organizationStructureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
});

module.exports = mongoose.model('OrganizationStructure', organizationStructureSchema);
