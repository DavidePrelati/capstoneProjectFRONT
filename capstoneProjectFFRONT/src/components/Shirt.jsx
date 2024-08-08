import { useEffect, useState } from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useNavigate, useParams } from "react-router-dom";

const Shirt = () => {
  const [token, setToken] = useState(null);
  const [shirts, setShirts] = useState([]);
  const { squadName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const localeToken = localStorage.getItem("token");
    console.log("Token:", localeToken); // Verifica il token
    setToken(localeToken);
  }, []);
  useEffect(() => {
    if (token) {
      const getShirts = async () => {
        try {
          console.log("Squad Name:", squadName);
          const response = await fetch(
            `http://localhost:3002/api/shirts/${squadName}/shirts`,
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
              errorData.message || "Errore nel recupero delle magliette"
            );
          }

          const data = await response.json();
          setShirts(data);
          console.log("Shirts: ", data);
        } catch (err) {
          console.error(err);
          alert("Si è verificato un errore nel recupero delle magliette.");
        }
      };

      getShirts();
    }
  }, [token, squadName]);

  return (
    <Container className="px-5">
      <Row className="d-flex align-items-center justify-content-center px-5">
        {shirts.map((shirt, index) => (
          <Col
            key={index}
            className="d-flex align-items-center justify-content-center"
            xs="auto"
            ms={6}
            lg={3}
          >
            <Button
              variant="link"
              onClick={() => navigate(`/shirt/${shirt.name}`)}
              className="p-0"
            >
              <Card style={{ width: "12rem" }}>
              <Card.Title>{shirt.name}</Card.Title>
                <Card.Img variant="top" src={shirt.urlImage} />
                <Card.Body>
                  
                  <Card.Text>
                    {shirt.price}€, {shirt.number}
                  </Card.Text>
                  <Button variant="success">Compra</Button>
                </Card.Body>
              </Card>
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Shirt;
