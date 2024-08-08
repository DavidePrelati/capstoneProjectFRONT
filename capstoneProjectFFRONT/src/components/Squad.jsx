import { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useNavigate, useParams } from "react-router-dom";

const Squad = () => {
  const [token, setToken] = useState(null);
  const [squads, setSquads] = useState([]);
  const { nationName } = useParams();
  const navigate = useNavigate();


  
  useEffect(() => {
    const localeToken = localStorage.getItem("token");
    console.log("Token:", localeToken); // Verifica il token
    setToken(localeToken);
  }, []);
  useEffect(() => {
    if (token) {
      const getSquads = async () => {
        try {
          console.log("Nation Name:", nationName);
          const response = await fetch(`http://localhost:3002/api/squads/${nationName}/squads`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Errore nel recupero delle squadre");
          }

          const data = await response.json();
          setSquads(data);
          console.log("Squads: ", data);
        } catch (err) {
          console.error(err);
          alert("Si è verificato un errore nel recupero delle squadre.");
        }
      };

      getSquads();
    }
  }, [token, nationName]);

  return (
    <Container className="px-5">
      <Row className="d-flex align-items-center justify-content-center px-5">
        {squads.map((squad, index) => (
          <Col
            key={index}
            className="d-flex align-items-center justify-content-center"
            xs="auto"
            ms={6}
            lg={3}
          >
            <Button
              variant="link"
              onClick={() => navigate(`/squad/${squad.name}`)}
              className="p-0"
            >
              <img
                src={squad.urlImage}
                alt={squad.name}
                style={{ width: "120px", height:"auto", cursor: "pointer" }}
              />
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Squad;