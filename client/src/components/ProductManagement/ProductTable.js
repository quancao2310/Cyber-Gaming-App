import axios from "axios";
import { Link } from "react-router-dom";
import UpdateProductForm from "./UpdateForm";

function ProductTable({ data, trigger }) {

  const [fetchTrigger, setFetchTrigger] = trigger;

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/product/delete/${productId}`);
      console.log('Product deleted successfully');
      setFetchTrigger(!fetchTrigger);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <table className="table mt-4">
      <thead>
        <tr className="row">
          <th className="text-center col" scope="col">ID</th>
          <th className="text-center col" scope="col">Name</th>
          <th className="text-center col" scope="col">Description</th>
          <th className="text-center col" scope="col">Category</th>
          <th className="text-center col" scope="col">Price</th>
          <th className="text-center col" scope="col">Item Sold</th>
          <th className="text-center col" scope="col">Trạng thái</th>
          <th className="text-center col" scope="col">Hành động</th>
        </tr>
      </thead>
      <tbody id="file-status">
        {data.map((item, index) => (
          <tr className="row" key={index}>
            <td className="text-center col">{item.id}</td>
            <td className="text-center col">{item.name}</td>
            <td className="text-center col">{item.description}</td>
            
            <td className="text-center col">{item.category}</td>
            <td className="text-center col">{item.price}</td>
            <td className="text-center col">{item.item_sold}</td>
            <td className="text-center col">
              {item.item_sold > 0 ? 'Available' : 'Out of stock'}
            </td>
            <td className="text-center col">
              <Link className="btn btn-primary m-1" to={`${item.id}`}>Chi tiết</Link>
              <UpdateProductForm productId={item.id} trigger={trigger} />
              <button
                className="btn btn-danger m-1"
                onClick={() => handleDelete(item.id)}
              >
                Xóa
              </button>                
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
