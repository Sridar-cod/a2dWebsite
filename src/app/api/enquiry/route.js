import { connectMongo } from "../../../../utils/connectMongo";
import EnquiryModel from "../../../../models/enquiryModel";

export async function POST(req) {
  try {
    const {
      suggestions,
      income,
      timeline,
      investment,
      purpose,
      occupation,
      location,
      whatsapp,
      age,
      name,
    } = await req.json();
    const enquiry = {
      suggestions,
      income,
      timeline,
      investment,
      purpose,
      occupation,
      location,
      whatsapp,
      age,
      name,
    };
    await connectMongo();
    await EnquiryModel.create(enquiry);
    return Response.json({ message: "Enquiry has beenaaaa send" });
  } catch (err) {
    return Response.json({ message: err.message });
  }
}
