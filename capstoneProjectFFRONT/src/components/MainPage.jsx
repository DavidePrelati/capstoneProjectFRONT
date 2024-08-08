import { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [token, setToken] = useState(null);
  const [nations, setNations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const localeToken = localStorage.getItem("token");
    setToken(localeToken);
  }, []);

  const getNations = async () => {
    try {
      let url = `http://localhost:3002/api/nations`; // Assicurati che l'URL sia corretto
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "");
      }

      const data = await response.json();
      setNations(data);
      console.log("Nations: ", data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      getNations();
    }
  }, [token]);

  return (
    <Container className="centerMain">
      <Row className="d-flex align-items-center justify-content-center">
        {nations &&
          nations.map((nation, index) => (
            <Col
              key={index}
              className="d-flex align-items-center justify-content-center px-5"
              xs="auto"
            >
              <Button
                variant="link"
                onClick={() => navigate(`/nation/${nation.name}`)} // Passa il nome della nazione
                className="p-0"
              >
                <img
                  src={nation.url}
                  alt={nation.name}
                  style={{ width: "50px", cursor: "pointer" }}
                />
              </Button>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default MainPage;