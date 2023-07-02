import { useEffect, useState } from "react";
import { request } from "../util/axiosHelper";

function Dashboard() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request("GET", "/message", {});
        setData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <p>{data}</p>;
}

export default Dashboard;
