import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductTable from '../../components/ProductManagement/ProductTable';
import AddProductForm from '../../components/ProductManagement/AddForm';

function Product() {
  const [data, setData] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalIncome, setTotalIncome] = useState(null);

  const calculateTotalIncome = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/product/total-income/${startDate}/${endDate}`);
      setTotalIncome(response.data.totalIncome);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/product`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fetchTrigger]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Product Management</h1>

      <div className="card p-4">
        <h4 className="mb-3">Calculate Total Income</h4>
        <div className="row align-items-center">
            <div className="col-md-3 mb-3">
                <label className="form-label">Start Date</label>
                <input className="form-control" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="col-md-3 mb-3">
                <label className="form-label">End Date</label>
                <input className="form-control" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className="col-md-2 mb-3">
                <button className="btn btn-primary" onClick={calculateTotalIncome}>
                    Calculate
                </button>
            </div>
            <div className="col-md-4 mb-3">
                <label className="form-label">Total Income</label>
                <input className="fw-bold form-control" value={totalIncome} disabled/>
            </div>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-center mb-4">Product List</h2>
        <AddProductForm trigger={[fetchTrigger, setFetchTrigger]} />
        <ProductTable data={data} trigger={[fetchTrigger, setFetchTrigger]} />
      </div>
    </div>
  );
}

export default Product;