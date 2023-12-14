import { useEffect, useState } from "react";
import axios from "axios";
import DeviceTable from "../../components/DeviceManagement/DeviceTable";
import FilterBar from "../../components/DeviceManagement/FilterBar";
// import AddEventForm from "../../components/DiscountEventManager/AddForm";

function DeviceManagement() {
  const [data, setData] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [minT, setMinT] = useState('');
  const [filtered, setFiltered] = useState(false);
  
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
  
  const handleSelectedDevice = (e) => {
    setSelectedDevice(e.target.value);
  }
  
  const handleMinT = (e) => {
    setMinT(e.target.value);
  }
  const submitFilter = async (e) => {
    if (selectedDevice === '' && minT === '') {
      setFetchTrigger(!fetchTrigger);
      setFiltered(false);
      return;
    }
    try {
      let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/device/filter?selectedDevice=${selectedDevice}&minT=${minT}`);
      setData(response.data);
      setFiltered(true);
    }
    catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="container">
      <h1 className="text-center m-4">Quản lý thiết bị</h1>
      {/* <AddEventForm trigger={[fetchTrigger, setFetchTrigger]} /> */}
      <FilterBar eventHandler={{handleSelectedDevice, handleMinT, submitFilter}} />
      <DeviceTable data={data} trigger={[fetchTrigger, setFetchTrigger]} filtered={filtered} />
    </div>
  );
}

export default DeviceManagement;