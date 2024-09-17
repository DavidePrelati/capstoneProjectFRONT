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
    console.log("Token:", localeToken);
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
    <Row className="d-flex align-items-center justify-content-center g-4"> 
      {shirts.map((shirt, index) => (
        <Col
          key={index}
          className="d-flex align-items-center justify-content-center"
          xs={12} 
          sm={6}  
          md={4}  
          lg={4}  
          xl={4}  
        >
          <Button
            variant="link"
            onClick={() => navigate(`/shirt/${shirt.id}`)}
            className="p-0" 
          >
            <Card className="pt-2" style={{ width: '15rem' }}>
              <Card.Title className="text-center">{shirt.name}</Card.Title>
              <Card.Img variant="top" src={shirt.urlImage} style={{width:"200px", height:"200px"}}/>
              <Card.Body>
                <Card.Text className="text-center">
                  {shirt.price}€, {shirt.number}
                </Card.Text>
                <Button variant="warning text-white" className="w-100">Vedi dettagli</Button>
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
