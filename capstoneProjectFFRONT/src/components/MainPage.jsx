import { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [show, setShow] = useState(false);
  const [token, setToken] = useState(null);
  const [nation, setNation] = useState([]);
  const [filter, setFilter] = useState("name");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleClose = () => setShow(false);

  useEffect(() => {
    const localeToken = localStorage.getItem("token");
    setToken(localeToken);
  }, []);

  const getNation = async () => {
    try {
      let url = `http://localhost:3002/api/nations/${filter}`;
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
      setNation(data.content);
      console.log("Nations: ", data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      getNation();
    }
  }, [token, filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleNations = async (e) => {
    e.preventDefault();
    try {
      let url = `http://localhost:3002/api/nations`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name,
          url,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "");
      }

      const data = await response.json();
      setNation(data.content);
      console.log("Nations: ", data);
      getNation();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="centerMain">
    <Row className="d-flex align-items-center justify-content-center">
      {nation &&
        nation.map((nation, index) => (
          <Col
            key={index}
            className="d-flex align-items-center justify-content-center px-5"
            xs="auto"
          >
            <Button
              variant="link"
              onClick={() => navigate(`/nation/${nation.id}`)}
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
