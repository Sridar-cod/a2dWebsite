import { Schema, model, models } from "mongoose";

const enquirySchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  whatsapp: { type: Number },
  location: { type: String },
  occupation: { type: String },
  purpose: { type: String },
  investment: { type: String },
  timeline: { type: String },
  income: { type: String },
  suggestions: { type: String },
}, { timestamps: true });

// Check if model already exists in the cache, else create a new one
const EnquiryModel = models.Enquiry || model('Enquiry', enquirySchema);

export default EnquiryModel;
