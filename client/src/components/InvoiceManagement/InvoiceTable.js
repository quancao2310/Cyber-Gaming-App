import { format } from 'date-fns';

function InvoiceTable({ data }) {

  const formatDate = (isoDateTime) => {
    const date = new Date(isoDateTime);
    
    const formattedDateTime = format(date, "MMMM dd, yyyy, HH:mm");
  
    return formattedDateTime;
  }

  return (
    <table className="table mt-4">
      <thead>
        <tr className="row">
          <th className="text-center col" scope="col">ID</th>
          <th className="text-center col" scope="col">ID khách hàng</th>
          <th className="text-center col" scope="col">Thời gian tạo</th>
          <th className="text-center col" scope="col">Tổng tiền</th>
          <th className="text-center col" scope="col">ID Nhân viên</th>
          <th className="text-center col" scope="col">Trạng thái</th>
          <th className="text-center col" scope="col">Thao tác</th>
        </tr>
      </thead>
      <tbody id="file-status">
        {data.map((item, index) => (
          <tr className="row" key={index}>
            <td className="text-center col">{item.id}</td>
            <td className="text-center col">{item.customer_id}</td>
            <td className="text-center col">{formatDate(item.created_at)}</td>
            <td className="text-center col">{item.total_order_value}</td>
            <td className="text-center col">{item.staff_id}</td>
            <td className="text-center col">{item.payment_status}</td>
            <td className="text-center col">{}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InvoiceTable;