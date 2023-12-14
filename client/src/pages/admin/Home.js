import { Container, Navbar, Nav } from 'react-bootstrap';

const AdminHome = () => {
  return (
    <Container fluid>
      <Navbar bg="primary" variant="dark" fixed="top" className="ps-5">
        <Navbar.Brand href="/admin">Admin Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Về trang chính</Nav.Link>
          <Nav.Link href="/admin/product">Quản lý sản phẩm</Nav.Link>
          <Nav.Link href="/admin/transaction">Quản lý giao dịch</Nav.Link>
          <Nav.Link href="/admin/discount-event">Quản lý sự kiện khuyến mãi</Nav.Link>
          <Nav.Link href="/admin/device">Quản lý thiết bị</Nav.Link>
        </Nav>
      </Navbar>
      
      <Navbar bg="primary" variant="dark" fixed="bottom">
        <Container>
          <Navbar.Text>
            &copy; 2023 Admin Dashboard
          </Navbar.Text>
        </Container>
      </Navbar>
    </Container>
  );
};

export default AdminHome;