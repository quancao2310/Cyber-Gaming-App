import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
const BillingProcess = ({ invoices, updateLoginStatus }) => {
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [myInvoices, setMyInvoices] = useState(invoices);
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
      {myInvoices.map((invoice) => (
        <Accordion
          key={invoice.id}
          expanded={expandedItemId === invoice.id}
          onChange={() => handleExpand(invoice.id)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              {`invoice ID: ${invoice.id}`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ textAlign: 'left' }}>
              <Typography>{`Name: $${invoice.name}`}</Typography>
              <Typography>{`Email: ${invoice.email}`}</Typography>
              <Typography>{`Cost: ${invoice.cost}`}</Typography>
              <Typography>{`phone: ${invoice.phone}`}</Typography>
              <Typography>{`date: ${invoice.date}`}</Typography>
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
