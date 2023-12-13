import { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionTable from "../../components/TransactionManager/TransactionTable";


function Transaction() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/transaction`);
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
            <h1 className="text-center m-4">Quản lý giao dịch</h1>
            <TransactionTable data={data} />
        </div>
    );
}

export default Transaction;
