import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.post["Content-Type"] = "application/json";

interface Headers {
  [key: string]: string;
}

export const request = async (
  method: string,
  url: string,
  data = {},
  headers: Headers = {},
  params = {}
) => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios({
      method,
      url,
      ...(method === "GET" || method === "DELETE" ? { params } : { data }),
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
