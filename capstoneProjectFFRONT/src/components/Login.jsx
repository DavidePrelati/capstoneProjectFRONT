import { useState } from "react";
import { Button, Col, Form, Container, Row, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let errorMessage = "Errore durante il login";
        if (response.status === 403) {
          errorMessage = "Accesso negato. Verifica le tue credenziali.";
        } else {
          const responseText = await response.text();
          let errorData;
          try {
            errorData = JSON.parse(responseText);
            errorMessage = errorData.message || errorMessage;
          } catch (err) {
            // Se la risposta non è JSON valido, mantieni il messaggio di errore generico
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      localStorage.setItem("token", data.tokenId);
      console.log("Login effettuato: " + data.tokenId);
      navigate("/main");
    } catch (err) {
      console.error(err.message);
      setAlertMessage(err.message);
      setShowAlert(true);
    }
  };

  return (
    <div className="d-flex align-items-center vh-100 ">
      <Container className="mb-5 pb-5 centerLogin">
        <Row className="justify-content-md-center">
          <Col md="4" lg="12">
            <h2 className="text-center text-primary">Login</h2>
            {showAlert && (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                {alertMessage}
              </Alert>
            )}
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="text-center text-white bg-primary py-1 px-1 my-2">
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Inserisci email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="text-center text-white bg-primary py-1 px-1 my-2">
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-2">
                Accedi
              </Button>
            </Form>
            <div className="text-center">
              <small className="d-block text-white">oppure</small>
              <Button variant="light" className="px-5">
                <Link to={"/register"}>Registrati</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
