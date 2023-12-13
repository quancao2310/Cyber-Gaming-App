import { format } from 'date-fns';

function TransactionTable({ data }) {

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
          <th className="text-center col" scope="col">Số tiền</th>
          <th className="text-center col" scope="col">Ngày tạo</th>
          <th className="text-center col" scope="col">ID tài khoản</th>
          <th className="text-center col" scope="col">Nội dung</th>
          <th className="text-center col" scope="col">Trạng thái</th>
          <th className="text-center col" scope="col">ID hóa đơn</th>
        </tr>
      </thead>
      <tbody id="file-status">
        {data.map((item, index) => (
          <tr className="row" key={index}>
            <td className="text-center col">{item.id}</td>
            <td className="text-center col">{item.amount}</td>
            <td className="text-center col">{formatDate(item.created_at)}</td>
            <td className="text-center col">{item.account_id}</td>
            <td className="text-center col">{item.content}</td>
            <td className="text-center col">{item.status}</td>
            <td className="text-center col">{item.invoice_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;