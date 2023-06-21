import { useEffect, useState } from "react";
import { request } from "../util/axiosHelper";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request("GET", "/", {});
        setData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((d) => (
        <p>{d}</p>
      ))}
    </div>
  );
}

export default Dashboard;
