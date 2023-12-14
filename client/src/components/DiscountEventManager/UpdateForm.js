import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function UpdateEventForm({ eventId, trigger }) {
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
    return isoDateTime ? isoDateTime.slice(0, -5) : '';
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/event/${eventId}`);
        const eventDetails = response.data;

        eventDetails.start_date = convertToDatetimeLocalFormat(eventDetails.start_date);
        eventDetails.end_date = convertToDatetimeLocalFormat(eventDetails.end_date);

        setFormData(eventDetails);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchData();
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/event/update/${eventId}`, formData);
      console.log('Event updated successfully:', response.data);
      setFetchTrigger(!fetchTrigger);
      handleClose();
    } catch (error) {
      console.error('Error updating Event:', error);
    }
  };
  

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Cập nhật
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
          <Modal.Title>Update Event</Modal.Title>
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
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update Event
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateEventForm;