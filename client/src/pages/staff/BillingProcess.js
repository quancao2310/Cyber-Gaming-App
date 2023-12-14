import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Accordion, AccordionSummary, AccordionDetails, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
const BillingProcess = ({ updateLoginStatus }) => {
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [myInvoices, setMyInvoices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/invoice")
      .then((res) => {
        setMyInvoices(res.data.filter(t=>t.staff_id===null))
      })
    console.log("Called")
  }, [])

  const handleExpand = (id) => {
    setExpandedItemId(id === expandedItemId ? null : id);
  };

  const handleApprove = (invoice) => {
    // Logic for handling approve action for the transaction with ID 'id'
    console.log(`Approve invoice ${invoice.id}`);
    axios.put(`http://localhost:5000/api/invoice/update/${invoice.id}`,{
      staff_id: localStorage.getItem('username')
    })
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log("Lỗi khi duyệt hóa đơn: ", err)
    })
    setMyInvoices(myInvoices.filter((it)=>it.id!==invoice.id));
  };

  const handleDecline = (invoice) => {
    // Logic for handling decline action for the transaction with ID 'id'
    axios.delete(`http://localhost:5000/api/invoice/delete/${invoice.id}`)
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log("Lỗi khi xóa invoice ", err)
    })
    console.log(`Decline invoice ${invoice.id}`);
    setMyInvoices(myInvoices.filter((it)=>it.id!==invoice.id));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Button variant="contained" onClick={updateLoginStatus} style={{ position: 'absolute', left: '10px', top: '10px' }}>
        Change username
      </Button>
      {myInvoices.length === 0 ? <div>Hiện tại không có đơn cần duyệt</div> : myInvoices.map((invoice) => (
        <Accordion
          key={invoice.id}
          expanded={expandedItemId === invoice.id}
          onChange={() => handleExpand(invoice.id)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              {`invoice ID: ${invoice.id} -- Status: ${invoice.payment_status}`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ textAlign: 'left' }}>
              <Typography>{`Staff ID: ${invoice.staff_id}`}</Typography>
              <Typography>{`customer_id: ${invoice.customer_id}`}</Typography>
              <Typography>{`created_at: ${invoice.created_at}`}</Typography>
              <Typography>{`total_order_value: ${invoice.total_order_value}`}</Typography>
              <Button variant="contained" onClick={() => handleApprove(invoice)}>Approve</Button>
              <Button variant="contained" onClick={() => handleDecline(invoice)}>Decline</Button>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default BillingProcess;
