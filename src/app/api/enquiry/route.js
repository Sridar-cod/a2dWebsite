// import { connectMongo } from "../../../../utils/connectMongo";
// import EnquiryModel from "../../../../models/enquiryModel";

// export async function POST(req) {
//   try {
//     const {
//       suggestions,
//       income,
//       timeline,
//       investment,
//       purpose,
//       occupation,
//       location,
//       whatsapp,
//       age,
//       name,
//     } = await req.json();
//     const enquiry = {
//       suggestions,
//       income,
//       timeline,
//       investment,
//       purpose,
//       occupation,
//       location,
//       whatsapp,
//       age,
//       name,
//     };
//     await connectMongo();
//     await EnquiryModel.create(enquiry);
//     return Response.json({ message: "Enquiry has beenaaaa send" });
//   } catch (err) {
//     return Response.json({ message: err.message });
//   }
// }import { connectMongo } from "../../../../utils/connectMongo";
import EnquiryModel from "../../../../models/enquiryModel";
 import { connectMongo } from "../../../../utils/connectMongo";

// The default export handles the incoming requests
export async function POST(req) {
  try {
    await connectMongo(); // Connect to MongoDB

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

    await EnquiryModel.create(enquiry); // Create a new enquiry entry
    return new Response(JSON.stringify({ message: "Enquiry has been sent" }), {
      status: 201, // Created status
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500, // Internal server error
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req) {
  try {
    await connectMongo(); // Connect to MongoDB

    const enquiries = await EnquiryModel.find({}); // Fetch all enquiries
    return new Response(JSON.stringify(enquiries), {
      status: 200, // Success
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // No caching
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500, // Internal server error
      headers: { "Content-Type": "application/json" },
    });
  }
}

