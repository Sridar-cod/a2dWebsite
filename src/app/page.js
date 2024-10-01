"use client"; // Add this at the top to mark the file as a Client Component

import { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const formFields = [
  { label: "What's your name?", name: "name", type: "text" },
  { label: "What's your exact age?", name: "age", type: "number" },
  { label: "Provide your WhatsApp number", name: "whatsapp", type: "text" },
  { label: "Where are you located at?", name: "location", type: "text", placeholder: "Mention the City or Town" },
  { label: "What do you do for living?", name: "occupation", type: "text", placeholder: "E.g. Developer, Student, Photographer etc." },
  { label: "For what purpose does this PC serve you?", name: "purpose", type: "text", placeholder: "E.g. Video Editing, Gaming etc." },
  {
    label: "The best investment you are planning for this PC?",
    name: "investment",
    type: "select",
    options: [
      "Rs 30,000 - Rs 50,000",
      "Rs 50,000 - Rs 75,000",
      "Rs 75,000 - Rs 100,000",
      "More than 1 Lakh",
      "Other"
    ]
  },
  {
    label: "When do you need the PC by?",
    name: "timeline",
    type: "select",
    options: ["Right now", "In few days", "In a month", "Other"]
  },
  {
    label: "What is your monthly income?",
    name: "income",
    type: "text",
    placeholder: "*This will help us suggest a best Investment for you*"
  },
  {
    label: "If you have any suggestions or recommendations regarding this PC build, kindly mention it in detail.",
    name: "suggestions",
    type: "textarea"
  }
];

export default function Home() {
  // const [enquiries, setEnquiries] = useState([]);

  // useEffect(() => {
  //   // Function to fetch data from the API
  //   const fetchEnquiries = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/api/getEnquiry");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch enquiries");
  //       }
  //       const data = await response.json(); // Assuming the API returns a JSON response
  //       console.log(await data)
  //       setEnquiries(data); // Update state with the fetched data
  //     } catch (error) {
  //       console.error("Error fetching enquiriessss:", error);
  //     }
  //   };

  //   // Call the fetch function
  //   fetchEnquiries();
  // }, []); 
  const [formData, setFormData] = useState({});


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    fetch("https://a2dwebsite.onrender.com/api/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Form submitted successfully!");
        } else {
          alert("Form submission failed.");
        }
      })
      .catch((error) => {
        console.error("Errorrrrr:", error);
      });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-black">
      <form onSubmit={handleSubmit} className="p-4 mt-5 mb-5 bg-white rounded shadow" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="mb-4 text-center">Hii Soldiers</h2>
        {formFields.map((field, index) => (
          <div key={index} className="mb-3">
            <label htmlFor={field.name} className="form-label">{field.label}</label>
            {field.type === "select" ? (
              <select
                name={field.name}
                onChange={handleInputChange}
                required
                className="form-select"
              >
                <option value="">Select an option</option>
                {field.options.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                name={field.name}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                required
                className="form-control"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                required
                className="form-control"
              />
            )}
          </div>
        ))}
        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
      {/* <div className="">
        <h1>data</h1>
        {enquiries.map((item) => {
          return (
            <li>{item.name}</li>
          )
        })}
      </div> */}
     
    </div>
  );
}
