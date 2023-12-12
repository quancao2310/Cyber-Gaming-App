import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function AddEventForm({ trigger }) {
  const [show, setShow] = useState(false);
  const [fetchTrigger, setFetchTrigger] = trigger;

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [formData, setFormData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    discount_percent: '',
  });

  const convertToDatetimeLocalFormat = (isoDateTime) => {
    return isoDateTime ? isoDateTime.slice(0, -1) : '';
  };

  const convertToISOFormat = (datetimeLocal) => {
    return datetimeLocal ? `${datetimeLocal}:00.000Z` : '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      start_date: formData.start_date,
      end_date: formData.end_date,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/event/add`, updatedFormData);
      console.log('Event added successfully:', response.data);
      setFetchTrigger(!fetchTrigger);
      handleClose();
    } catch (error) {
      console.error('Error adding Event:', error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Thêm sự kiện
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
          <Modal.Title>Thêm sự kiện</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="container mt-4">
            <div className="mb-3">
              <label className="form-label">Tên</label>
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Ngày bắt đầu</label>
              <input
                type="datetime-local"
                className="form-control"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ngày kết thúc</label>
              <input
                type="datetime-local"
                className="form-control"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mức giảm giá</label>
              <input type="text" className="form-control" name="discount_percent" value={formData.discount_percent} onChange={handleInputChange} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Thêm sự kiện
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEventForm;
