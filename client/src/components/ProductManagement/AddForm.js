import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function AddProductForm({ trigger }) {
  const [show, setShow] = useState(false);
  const [fetchTrigger, setFetchTrigger] = trigger;

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    item_sold: '',
    images: [{ url: '', title: '' }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e, index) => {
    const { name, value } = e.target;
    const updatedImages = [...formData.images];
    updatedImages[index] = { ...updatedImages[index], [name]: value };
    setFormData((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));
  };

  const handleAddImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, { url: '', title: '' }],
    }));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/product/add`, formData);
      console.log('Product added successfully:', response.data);
      setFetchTrigger(!fetchTrigger);
      handleClose();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Thêm sản phẩm
      </Button>

      <Modal 
        className="text-secondary" 
        show={show} 
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="container mt-4">
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Description:</label>
              <input type="text" className="form-control" name="description" value={formData.description} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Category:</label>
              <input type="text" className="form-control" name="category" value={formData.category} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Price:</label>
              <input type="text" className="form-control" name="price" value={formData.price} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Item Sold:</label>
              <input type="text" className="form-control" name="item_sold" value={formData.item_sold} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label className="form-label col-12">Images:</label>
              {formData.images.map((image, index) => (
                <div key={index} className="mb-3 row">
                  <label className="form-label col-1">URL:</label>
                  <input
                    type="text"
                    className="form-control col"
                    name="url"
                    value={image.url}
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  <label className="form-label col-1">Title:</label>
                  <input
                    type="text"
                    className="form-control col"
                    name="title"
                    value={image.title}
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  <button
                    type="button"
                    className="btn btn-danger col-2 mx-2"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Remove Image
                  </button>
                </div>
              ))}
              <button type="button" className="btn btn-primary" onClick={handleAddImage}>
                Add Image
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProductForm;
