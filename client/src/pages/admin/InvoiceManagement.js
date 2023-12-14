import { useEffect, useState } from 'react';
import axios from 'axios';
import InvoiceTable from "../../components/InvoiceManagement/InvoiceTable";


function Invoice() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/invoice`);
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <h1 className="text-center m-4">Quản lý hóa đơn</h1>
            <div className="row mt-3">
                <div className="col">
                    <InvoiceTable data={data} />
                </div>
            </div>
        </div>
    );
}

export default Invoice;
