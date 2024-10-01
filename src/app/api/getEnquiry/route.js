import { connectMongo } from "./../../../../utils/connectMongo"
import EnquiryModel from "../../../../models/enquiryModel"; 

export async function GET() {
  try {
    await connectMongo();
    const enquiries = await EnquiryModel.find({});
    return new Response(JSON.stringify(enquiries), {
      headers: { "Cache-Control": "no-store" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }));
  }
}

