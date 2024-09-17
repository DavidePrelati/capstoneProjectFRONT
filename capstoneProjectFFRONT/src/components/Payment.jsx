import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Container, ListGroup, Row, Col } from 'react-bootstrap';

const Payment = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const initialOptions = {
    clientId: "ASVhs4QbsasJNRKODzrN4s2QtEVSzb99TfjKqm_kj3mZI_BzzVHWENst88ljRC9fULx_4IAZ5trxJNx2",
    currency: "EUR" // Cambia la valuta se necessario
  };

  const styles = {
    shape: "rect",
    layout: "vertical",
  };

  return (
    <Container className='centered-container'>
      <div className='container-content'>
        <h1 className='text-dark'>Dettagli Carrello</h1>
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
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          ) : (
            <div>Il carrello è vuoto</div>
          )}
        </ListGroup>
        <h4 className="mt-3 text-dark">Totale: {calculateTotal()}€</h4>

        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={styles}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: calculateTotal() // Totale dell'ordine
                  }
                }]
              });
            }}
            onApprove={async (data, actions) => {
              return actions.order.capture().then(async (details) => {
                // Mostra un messaggio di conferma
                alert('Acquisto avvenuto con successo: ' + details.payer.name.given_name);

                // Pulire il carrello
                localStorage.removeItem('cart');
                setCart([]);

                // Reindirizza alla pagina principale o una pagina di conferma
                navigate('/main'); // Modifica il percorso se necessario
              });
            }}
            onError={(err) => {
              console.error('Errore durante il pagamento: ', err);
            }}
          />
        </PayPalScriptProvider>
      </div>
    </Container>
  );
};

export default Payment;
