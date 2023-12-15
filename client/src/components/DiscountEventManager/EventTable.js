import axios from "axios";
import { format } from 'date-fns';
import UpdateEventForm from "./UpdateForm";

function EventTable({ data, trigger }) {

  const formatDate = (isoDateTime) => {
    const date = new Date(isoDateTime);
    
    const formattedDateTime = format(date, "MMMM dd, yyyy, HH:mm");
  
    return formattedDateTime;
  }

  const [fetchTrigger, setFetchTrigger] = trigger;

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/event/delete/${eventId}`);
      console.log('Event deleted successfully');
      setFetchTrigger(!fetchTrigger);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <table className="table mt-4">
      <thead>
        <tr className="row">
          <th className="text-center col" scope="col">ID</th>
          <th className="text-center col" scope="col">Tên</th>
          <th className="text-center col" scope="col">Ngày bắt đầu</th>
          <th className="text-center col" scope="col">Ngày kết thúc</th>
          <th className="text-center col" scope="col">Mức giảm giá</th>
          <th className="text-center col" scope="col">Hành động</th>
        </tr>
      </thead>
      <tbody id="file-status">
        {data.map((item, index) => (
          <tr className="row" key={index}>
            <td className="text-center col">{item.id}</td>
            <td className="text-center col">{item.name}</td>
            <td className="text-center col">{formatDate(item.start_date)}</td>
            
            <td className="text-center col">{formatDate(item.end_date)}</td>
            <td className="text-center col">{item.discount_percent}</td>
            <td className="text-center col">
              <UpdateEventForm eventId={item.id} trigger={trigger} />              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EventTable;
