import { Container, Navbar, Nav } from 'react-bootstrap';
import background from './background.jpg';

const AdminHome = () => {
  const backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: '100% auto',
    backgroundPosition: 'center',
    height: '100vh',
  };

  return (
    <Container fluid>
      <Navbar bg="primary" variant="dark" className="ps-5 rounded-top-4">
        <Navbar.Brand href="/admin">Admin Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Về trang chính</Nav.Link>
          <Nav.Link href="/admin/product">Sản phẩm</Nav.Link>
          <Nav.Link href="/admin/transaction">Giao dịch</Nav.Link>
          <Nav.Link href="/admin/invoice">Hóa đơn</Nav.Link>
          <Nav.Link href="/admin/device">Thiết bị</Nav.Link>
          <Nav.Link href="/admin/discount-event">Sự kiện khuyến mãi</Nav.Link>
        </Nav>
      </Navbar>

      <div style={backgroundStyle}></div>

      <Navbar bg="primary" variant="dark" className="ps-5 rounded-bottom-4">
        <Container>
          <Navbar.Text>&copy; 2023 Admin Dashboard</Navbar.Text>
        </Container>
      </Navbar>
    </Container>
  );
};

export default AdminHome;