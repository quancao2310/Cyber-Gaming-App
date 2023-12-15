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
        return res.data.filter(t=>t.staff_id===null)
      })
      .then(data=>{
        console.log(data)
        setMyInvoices(data)
      })
  }, [])

  const handleExpand = (id) => {
    setExpandedItemId(id === expandedItemId ? null : id);
  };

  const handleApprove = (invoice) => {
    // Logic for handling approve action for the transaction with ID 'id'
    console.log(`Approve invoice ${invoice.id}`);

    axios.put(`http://localhost:5000/api/invoice/update/${invoice.invoice_id}`,{
      staff_id: localStorage.getItem('staffID')
    })
    .then((res)=>{
      console.log(res)
      console.log("succesful set staff id")
    })
    .catch((err)=>{
      console.log("Lỗi khi duyệt hóa đơn: ", err)
    })

    axios.post('http://localhost:5000/api/transaction', {
      amount: invoice.total_order_value,
      created_at: '2023-12-15',
      account_id: invoice.account_id,
      content: 'Transaction content',
      status: 'Payment',
      invoice_id: invoice.invoice_id,
    })
    .then(res=>{
      console.log("Created transaction", res)
    })
    .catch(err=>{
      console.log("error create transaction ", err)
    })
    setMyInvoices(myInvoices.filter((it)=>it.invoice_id!==invoice.invoice_id));
  };

  const handleDecline = (invoice) => {
    // Logic for handling decline action for the transaction with ID 'id'
    axios.delete(`http://localhost:5000/api/invoice/delete/${invoice.invoice_id}`)
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log("Lỗi khi xóa invoice ", err)
    })
    console.log(`Decline invoice ${invoice.id}`);
    setMyInvoices(myInvoices.filter((it)=>it.invoice_id!==invoice.invoice_id));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Button variant="contained" onClick={updateLoginStatus} style={{ position: 'absolute', left: '10px', top: '10px' }}>
        Change username
      </Button>
      {myInvoices.length === 0 ? <div>Hiện tại không có đơn cần duyệt</div> : myInvoices.map((invoice, index) => (
        <Accordion
          key={invoice.invoice_id}
          expanded={expandedItemId === invoice.invoice_id}
          onChange={() => handleExpand(invoice.invoice_id)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              {`invoice ID: ${invoice.invoice_id} -- Status: ${invoice.payment_status}`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ textAlign: 'left' }}>
              <Typography>{`Staff ID: ${invoice.staff_id}`}</Typography>
              <Typography>{`Customer ID: ${invoice.customer_id}`}</Typography>
              <Typography>{`Acount ID: ${invoice.account_id}`}</Typography>
              <Typography>{`Acount Name: ${invoice.account_name}`}</Typography>
              <Typography>{`Acount Balance: ${invoice.account_balance}`}</Typography>
              <Typography>{`Last Login: ${invoice.last_login}`}</Typography>
              <Typography>{`Account Status: ${invoice.account_status}`}</Typography>
              <Typography>{`Create At: ${invoice.created_at}`}</Typography>
              <Typography>{`Total order value: ${invoice.total_order_value}`}</Typography>
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
