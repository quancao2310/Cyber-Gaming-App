import { useEffect, useState } from "react";
import axios from "axios";
import DeviceTable from "../../components/DeviceManagement/DeviceTable";
import AddEventForm from "../../components/DiscountEventManager/AddForm";

function DeviceManagement() {
  const [data, setData] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/device`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, [fetchTrigger]);

  return (
    <div className="container">
      <h1 className="text-center m-4">Quản lý sự kiện giảm giá</h1>
      <AddEventForm trigger={[fetchTrigger, setFetchTrigger]} />
      <DeviceTable data={data} trigger={[fetchTrigger, setFetchTrigger]} />
    </div>
  );
}

export default DeviceManagement;
