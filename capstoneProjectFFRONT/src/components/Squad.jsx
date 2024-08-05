import { useEffect, useState } from "react";
import { Table, Form, Button, Modal, Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useNavigate, useParams } from "react-router-dom";

const Squad = () => {
  const [show, setShow] = useState(false);
  const [token, setToken] = useState(null);
  const [squads, setSquads] = useState([]);
  const [name, setName] = useState("");
  const [sponsor, setSponsor] = useState("");
  const { nationId } = useParams();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const localeToken = localStorage.getItem("token");
    setToken(localeToken);
  }, []);

  const getSquads = async () => {
    try {
      let url = `http://localhost:3002/api/squads?nationId=${nationId}`;
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
      setSquads(data);
      console.log("Squads: ", data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      getSquads();
    }
  }, [token, nationId]);

  const handleSquadSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = `http://localhost:3002/api/squads`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name,
          sponsor,
          nationId: parseInt(nationId),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "");
      }

      const data = await response.json();
      setSquads([...squads, data]);
      console.log("New Squad: ", data);
      handleClose();
      getSquads();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="centerMain">
      
      <Table>
        <tbody>
          {squads &&
            squads.map((squad, index) => (
              <tr
                key={index}
                onClick={() => navigate(`/squad/${squad.id}`)}
                style={{ cursor: "pointer" }}
              >
                <td>
                 {squad.name} 
                </td>
                <td>{squad.sponsor}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Squad;
