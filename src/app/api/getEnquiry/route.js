import { connectMongo } from "../../../../utils/connectMongo";
import getEnquiryModel from "../../../../models/getEnquiryModel";

export async function GET() {
  try {
    await connectMongo()
    const enquiries = await getEnquiryModel.find({})
    return Response.json(enquiries)
  } catch (err) {
    return Response.json({message:err.message})
  }
 
}
