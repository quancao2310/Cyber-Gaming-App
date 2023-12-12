import { useState } from "react";
import { mockTransactions } from "../../data/mockData";
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Box } from '@mui/material';
function StaffHome() {
  const [opens, setOpens] = useState(mockTransactions.map(()=>false));

  const handleClick = (key) => {
    const newOpens = opens.map((open, index)=>{
      return key===index?!open:false
    })
    setOpens(newOpens)
  }
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="text-center bg-secondary p-3">
        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Danh sách các hóa đơn chưa thanh toán
            </ListSubheader>
          }
        >
          {mockTransactions.map((transaction, index)=>(
            transaction.status?<div></div>:<Box>
            <ListItemButton onClick={()=>handleClick(index)}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
              {opens[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={opens[index]} timeout="auto" unmountOnExit>
              User: {transaction.user}
            </Collapse>
          </Box>
          ))}
        </List>
      </div>
    </div>
  );
}

export default StaffHome;
