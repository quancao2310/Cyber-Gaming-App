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
        setMyInvoices(res.data)
      })
    console.log("Called")
  }, [])

  const handleExpand = (id) => {
    setExpandedItemId(id === expandedItemId ? null : id);
  };

  const handleApprove = (id) => {
    // Logic for handling approve action for the transaction with ID 'id'
    console.log(`Approve invoice ${id}`);
    setMyInvoices(myInvoices.filter((invoice)=>invoice.id!==id));
  };

  const handleDecline = (id) => {
    // Logic for handling decline action for the transaction with ID 'id'
    console.log(`Decline invoice ${id}`);
    setMyInvoices(myInvoices.filter((invoice)=>invoice.id!==id));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Button variant="contained" onClick={updateLoginStatus} style={{ position: 'absolute', left: '10px', top: '10px' }}>
        Change username
      </Button>
      {myInvoices.filter(t=>t.staff_id===null).map((invoice) => (
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
              <Button variant="contained" onClick={() => handleApprove(invoice.id)}>Approve</Button>
              <Button variant="contained" onClick={() => handleDecline(invoice.id)}>Decline</Button>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default BillingProcess;
