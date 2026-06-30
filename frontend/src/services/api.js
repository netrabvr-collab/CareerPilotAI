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

export const analyzeSkillGap = async (file, jdText) => {
  const formData = new FormData();
  formData.append('resume',file);
  formData.append('jd_text',jdText);

  const response = await axios.post(`${BASE_URL}/skillgap/analyze`,formData,{
    headers:{ "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const generateQuestions = async (file, role) => {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("role", role);

  const response = await axios.post(`${BASE_URL}/interview/generate-questions`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const evaluateAnswer = async (question, answer) => {
  const response = await axios.post(`${BASE_URL}/interview/evaluate-answer`, {
    question,
    answer,
  });

  return response.data;
};