import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';

function MyNavbar() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <Navbar expand="lg" className="bg-body-transparent fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/main" className="text-white">
          Denny-Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} className="text-white">
              Back
            </Nav.Link>

            <Nav.Link onClick={toggleCart} style={{ cursor: 'pointer' }} className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
              <span className="ms-1">Carrello</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {isCartOpen && (
          <div
            style={{
              position: 'absolute',
              background: 'white',
              border: '1px solid #ccc',
              padding: '10px',
              zIndex: 1000,
              width: '300px',
              right: '20px',
              top: '60px',
            }}
          >
            <ListGroup>
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col xs={4}>
                        <img src={item.urlImage} alt={item.name} style={{ width: '100%' }} />
                      </Col>
                      <Col xs={8}>
                        <div>{item.name}</div>
                        <div>{item.price}€</div>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeItem(index)}
                          style={{ marginTop: '10px' }}
                        >
                          Elimina
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))
              ) : (
                <div>Il carrello è vuoto</div>
              )}
            </ListGroup>
            <h4 className="mt-3">Totale: {calculateTotal()}€</h4>

            <Button variant="success" onClick={() => navigate('/payment')}>
              Vai al pagamento
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
