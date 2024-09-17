import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";

const ShirtDetail = () => {
  const { shirtName } = useParams();
  const decodedShirtName = decodeURIComponent(shirtName);
  const [shirt, setShirt] = useState(null);
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const localeToken = localStorage.getItem("token");
    setToken(localeToken);
  }, []);

  useEffect(() => {
    if (token) {
      const getShirtDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost:3002/api/shirts/${decodedShirtName}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.message ||
                "Errore nel recupero dei dettagli della maglietta"
            );
          }

          const data = await response.json();
          setShirt(data);
        } catch (err) {
          console.error(err);
          alert(
            "Si è verificato un errore nel recupero dei dettagli della maglietta."
          );
        }
      };

      getShirtDetails();
    }
  }, [token, decodedShirtName]);

  const addToCart = (shirt) => {
    const updatedCart = [...cart, shirt];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };



  if (!shirt) {
    return <div>Caricamento...</div>;
  }

  return (
    <Container className="text-center d-flex justify-content-center align-items-center">
      <Card style={{ width: "auto" }}>
        <Card.Body>
          <Row className="g-0">
            <Col md={4}>
              <Card.Img
                src={shirt.urlImage}
                className="px-auto mx-auto"
                style={{ height: "100%", objectFit: "cover" }}
              />
            </Col>
            <Col md={8}>
              <Card.Body className="text-start">
                <Card.Title className="text-center ">{shirt.name}</Card.Title>
                <Card.Text>
                  Scendi in campo con stile ed eleganza con la nostra maglietta
                  da calcio {shirt.name}! Progettata per i veri appassionati,
                  questa maglietta combina performance e comfort, assicurandoti
                  di rimanere fresco anche durante le partite più intense.
                  Realizzata con tessuti di alta qualità, traspiranti e leggeri,
                  ti offre una libertà di movimento senza pari.
                </Card.Text>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Anno uscita: {shirt.number}</ListGroup.Item>
                  <ListGroup.Item>Prezzo: {shirt.price}€</ListGroup.Item>
                </ListGroup>
                <Button
                  variant="success"
                  className="mt-3"
                  onClick={() => addToCart(shirt)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-cart"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                </Button>
              </Card.Body>
            </Col>
          </Row>
        </Card.Body>
      </Card>

     
    </Container>
  );
};

export default ShirtDetail;
