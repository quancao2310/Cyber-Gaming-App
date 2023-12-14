import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function ProductDetail() {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/product/${productId}`);
        setProductDetail(response.data[0]);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };

    fetchData();
  }, [productId]);

  if (!productDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <div className="d-flex justify-content-between">
            <h2 className="mb-0">{productDetail.name}</h2>
            <Link to="/admin/product" className="btn btn-light">Back</Link>
          </div>
        </div>
        <div className="card-body">
          <p className="lead"><strong>Description:</strong> {productDetail.description}</p>
          <p className="lead"><strong>Category:</strong> {productDetail.category}</p>
          <p className="lead"><strong>Price:</strong> ${productDetail.price}</p>
          <p className="lead"><strong>Item Sold:</strong> {productDetail.item_sold}</p>
          <div>
            <h4 className="mt-4 mb-3">Images</h4>
            <div className="row">
              {productDetail.images.map((image, index) => (
                <div key={index} className="col-md-4 mb-3">
                  <img src={image.url} alt={image.title} className="img-fluid rounded" />
                  <p className="mt-2"><strong>Title:</strong> {image.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;