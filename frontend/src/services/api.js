import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const analyzeResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${BASE_URL}/resume/analyze`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};