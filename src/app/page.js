"use client";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const formFields = [
  { label: "What's your name?", placeholder: "linga..", name: "name", type: "text" },
  { label: "What's your exact age?", placeholder: "22", name: "age", type: "number" },
  { label: "Provide your WhatsApp number", placeholder: "(884848484)", name: "whatsapp", type: "text" },
  { label: "Where are you located at?", name: "location", type: "text", placeholder: "Mention the City or Town" },
  { label: "What do you do for living?", name: "occupation", type: "text", placeholder: "E.g. Developer, Student, etc." },
  { label: "For what purpose does this PC serve you?", name: "purpose", type: "text", placeholder: "E.g. Video Editing, Gaming etc." },
  { label: "The best investment you are planning for this PC?", name: "investment", type: "select", options: ["Rs 30,000 - Rs 50,000", "Rs 50,000 - Rs 75,000", "Rs 75,000 - Rs 100,000", "More than 1 Lakh", "Other"] },
  { label: "When do you need the PC by?", name: "timeline", type: "select", options: ["Right now", "In few days", "In a month", "Other"] },
  { label: "What is your monthly income?", name: "income", type: "text", placeholder: "*This will help us suggest a best Investment for you*" },
  { label: "If you have any suggestions or recommendations regarding this PC build, kindly mention it in detail.", name: "suggestions", type: "textarea" },
];

export default function Home() {
  const [formData, setFormData] = useState({});
  const [isModelVisible, setIsModelVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsModelVisible(window.innerWidth >= 1000); 
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
        console.error("Error:", error);
      });
  };

  return (
    <>
      <main className="main">
        <div className="animi d-flex justify-content-end">
          {isModelVisible && (
            <model-viewer
              src="/images/computer.glb"
              alt="3D model of a black hole"
              auto-rotate
              camera-controls
              style={{ height: "60vh", width: "30%", zIndex: 1 }}
            ></model-viewer>
          )}
        </div>

        <div className="d-flex flex-column justify-content-center align-items-center form-outter">
          <form onSubmit={handleSubmit} className="p-4 mt-5 mb-5 form rounded shadow">
            <h2 className="mb-4 text-center">PC Customization Form</h2>
            {formFields.map((field, index) => (
              <div key={index} className="mb-3">
                <label htmlFor={field.name} className="form-label custom-label">
                  {field.label}
                </label>
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
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </div>

        <div className="animi-bottom ">
          {isModelVisible && (
            <model-viewer
              src="/images/computerBot.glb"
              alt="3D model of a black hole"
              auto-rotate
              camera-controls
              style={{ height: "50vh", width: "100%", zIndex: 1 }}
            ></model-viewer>
          )}
        </div>
      </main>
    </>
  );
}
