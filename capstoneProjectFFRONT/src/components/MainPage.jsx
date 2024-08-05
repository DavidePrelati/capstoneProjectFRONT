import { useEffect, useState } from "react";
import { Table, Form, Button, Modal, Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [show, setShow] = useState(false);
  const [token, setToken] = useState(null);
  const [nation, setNation] = useState([]);
  const [filter, setFilter] = useState("name");
  const navigate = useNavigate();
  const [name, setName] = useState("");

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
      <Row>
        <Col>
          <Button variant="success" onClick={() => setShow(true)}>Add Nation</Button>
        </Col>
      </Row>
      <Table>
        <tbody>
          {nation &&
            nation.map((nation, index) => (
              <tr
                key={index}
                onClick={() => navigate(`/nation/${nation.id}`)}
                style={{ cursor: "pointer" }}
              >
                <td className="px-5 py-5">
                 
                  <img
                  src=
                  {nation.name}
                  style={{width: "50px"}}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MainPage;