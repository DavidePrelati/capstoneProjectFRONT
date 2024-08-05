import { useState } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const RegisterUser = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3002/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, surname, username, email, password }),
      });

      if (!response.ok) {
        const responseText = await response.text();
        let errorMessage = "Errore durante la registrazione";
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
        } catch (err) {
          // Se la risposta non è JSON valido, mantieni il messaggio di errore generico
        }
        throw new Error(errorMessage);
      }

      console.log("Registrazione effettuata");
      navigate("/");
    } catch (err) {
      console.error(err.message);
      setAlertMessage(err.message);
      setShowAlert(true);
    }
  };

  return (
    <div className="d-flex align-items-center vh-100">
      <Container className="mb-5 pb-5 centerLogin">
        <Row className="justify-content-md-center">
          <Col md="4" lg="12">
            <h2 className="text-center">Registrazione</h2>
            {showAlert && (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                {alertMessage}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label
                  className="text-center text-white bg-primary py-1 px-1 my-2"
                  style={{ borderRadius: "5px" }}
                >
                  Nome:
                </Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Inserisci il tuo nome"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label
                  className="text-center text-white bg-primary py-1 px-1 my-2"
                  style={{ borderRadius: "5px" }}
                >
                  Cognome:
                </Form.Label>
                <Form.Control
                  type="text"
                  value={surname}
                  placeholder="Inserisci il cognome"
                  onChange={(e) => setSurname(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label
                  className="text-center text-white bg-primary py-1 px-1 my-2"
                  style={{ borderRadius: "5px" }}
                >
                  Username:
                </Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  placeholder="Scegli un username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label
                  className="text-center text-white bg-primary py-1 px-1 my-2"
                  style={{ borderRadius: "5px" }}
                >
                  Email:
                </Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Inserisci email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label
                  className="text-center text-white bg-primary py-1 px-1 my-2"
                  style={{ borderRadius: "5px" }}
                >
                  Password:
                </Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Scegli una password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-2">
                Registrati
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterUser;
