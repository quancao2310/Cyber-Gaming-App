import axios from "axios";
import { format } from 'date-fns';
// import UpdateEventForm from "./UpdateForm";

function DeviceTable({ data, trigger }) {
  const [fetchTrigger, setFetchTrigger] = trigger;
  
  const handleDelete = async (room_type, room_order, slot_order, device_order) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/device/${room_type}/${room_order}/${slot_order}/${device_order}`
      );
      console.log('Device deleted successfully');
      setFetchTrigger(!fetchTrigger);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };
  
  return (
    <table className="table mt-4">
      <thead>
        <tr className="row">
          <th className="text-center col" scope="col">Phòng</th>
          <th className="text-center col" scope="col">Slot</th>
          <th className="text-center col" scope="col">STT Thiết bị</th>
          <th className="text-center col" scope="col">Tên</th>
          <th className="text-center col" scope="col">Ngày bắt đầu sử dụng</th>
          <th className="text-center col" scope="col">Thời hạn bảo hành</th>
          <th className="text-center col" scope="col">Ngày bảo trì cuối</th>
          <th className="text-center col" scope="col">Hành động</th>
        </tr>
      </thead>
      <tbody id="file-status">
        {data.map((item, index) => (
          <tr className="row" key={index}>
            <td className="text-center col">{`${item.room_type} ${item.room_order}`}</td>
            <td className="text-center col">{item.slot_order}</td>
            <td className="text-center col">{item.device_order}</td>
            <td className="text-center col">{item.name}</td>
            <td className="text-center col">{new Date(item.start_date).toLocaleDateString('en-GB')}</td>
            <td className="text-center col">{new Date(item.expire_time).toLocaleDateString('en-GB')}</td>
            <td className="text-center col">{new Date(item.last_time_maintain).toLocaleDateString('en-GB')}</td>
            <td className="text-center col">
              {/* <UpdateEventForm eventId={item.id} trigger={trigger} /> */}
              <button
                className="btn btn-danger m-1"
                onClick={() => handleDelete(item.room_type, item.room_order, item.slot_order, item.device_order)}
              >
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DeviceTable;
