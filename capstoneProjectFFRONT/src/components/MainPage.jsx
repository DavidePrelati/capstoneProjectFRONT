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
    <>
      <div className="backgroundYellow3">
        <Container>
          <div>
            <Button variant="outline-light">
              <Row>
                <Col className="d-flex justify-content-center align-items-center">
                  {nation &&
                    nation.map((nation, index) => (
                      <tr
                        key={index}
                        onClick={() => navigate(`/nation/${nation.id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <td className="px-5 py-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-globe-europe-africa"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M3.668 2.501l-.288.646a.847.847 0 0 0 1.479.815l.245-.368a.81.81 0 0 1 1.034-.275.81.81 0 0 0 .724 0l.261-.13a1 1 0 0 1 .775-.05l.984.34q.118.04.243.054c.784.093.855.377.694.801-.155.41-.616.617-1.035.487l-.01-.003C8.274 4.663 7.748 4.5 6 4.5 4.8 4.5 3.5 5.62 3.5 7c0 1.96.826 2.166 1.696 2.382.46.115.935.233 1.304.618.449.467.393 1.181.339 1.877C6.755 12.96 6.674 14 8.5 14c1.75 0 3-3.5 3-4.5 0-.262.208-.468.444-.7.396-.392.87-.86.556-1.8-.097-.291-.396-.568-.641-.756-.174-.133-.207-.396-.052-.551a.33.33 0 0 1 .42-.042l1.085.724c.11.072.255.058.348-.035.15-.15.415-.083.489.117.16.43.445 1.05.849 1.357L15 8A7 7 0 1 1 3.668 2.501" />
                          </svg>
                          {nation.name}
                        </td>
                      </tr>
                    ))}
                </Col>
              </Row>
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};
export default MainPage;
