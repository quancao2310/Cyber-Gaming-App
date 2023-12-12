import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductTable from "../../components/ProductManagement/ProductTable";
import AddProductForm from '../../components/ProductManagement/AddForm';
import UpdateProductForm from '../../components/ProductManagement/UpdateForm';

function Product() {
    const [data, setData] = useState([]);
    const [fetchTrigger, setFetchTrigger] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/product`);
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [fetchTrigger]);

    return (
        <div className="container">
            <h1 className="text-center m-4">Quản lý sản phẩm</h1>
            <AddProductForm trigger={[fetchTrigger, setFetchTrigger]} />
            <ProductTable data={data} trigger={[fetchTrigger, setFetchTrigger]} />
        </div>
    );
}

export default Product;
