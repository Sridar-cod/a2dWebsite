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
// }
import { connectMongo } from "../../../../utils/connectMongo";
import EnquiryModel from "../../../../models/enquiryModel";

export async function handler(req) {
  try {
    await connectMongo(); // Connect to MongoDB first

    if (req.method === "POST") {
      // Handle POST request
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

      await EnquiryModel.create(enquiry); // Create new entry
      return new Response(
        JSON.stringify({ message: "Enquiry has been sent" }),
        {
          status: 201, // Status for created
          headers: { "Content-Type": "application/json" },
        }
      );
    } else if (req.method === "GET") {
      // Handle GET request
      const enquiries = await EnquiryModel.find({}); // Fetch all entries
      return new Response(JSON.stringify(enquiries), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store", // No caching
        },
      });
    } else {
      // Handle unsupported methods
      return new Response(JSON.stringify({ message: "Method not allowed" }), {
        status: 405, // Method Not Allowed
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500, // Internal Server Error
      headers: { "Content-Type": "application/json" },
    });
  }
}

export default handler;
