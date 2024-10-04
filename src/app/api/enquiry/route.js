import EnquiryModel from "../../../../models/enquiryModel";
import { connectMongo } from "../../../../utils/connectMongo";
export async function POST(req) {
  try {
    await connectMongo(); 

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

    await EnquiryModel.create(enquiry);
    return new Response(JSON.stringify({ message: "Enquiry has been sent" }), {
      status: 201, 
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500, 
      headers: { "Content-Type": "application/json" },
    });
  }
}
export async function GET(req) {
  try {
    await connectMongo();  

    const enquiries = await EnquiryModel.find({});  
    return new Response(JSON.stringify(enquiries), {
      status: 200, 
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", 
        "Access-Control-Allow-Origin": "https://a2dadmin.onrender.com",  
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",  
        "Access-Control-Allow-Headers": "Content-Type",  
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500, 
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://a2dadmin.onrender.com",  
      },
    });
  }
}
