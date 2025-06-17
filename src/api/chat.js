// src/api/chat.js
import axios from 'axios';

export const sendToBackend = async (message, file) => {
  const formData = new FormData();
  formData.append("message", message);
  if (file) {
    formData.append("file", file);
  }

  try {
    const response = await axios.post("http://127.0.0.1:5000/chat", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("API error:", error);
    return { assistant_reply: "❌ Failed to get response from backend." };
  }
};
