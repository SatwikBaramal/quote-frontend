import { useEffect, useState } from "react";
import { Container, Button, Card, Spinner } from "react-bootstrap";
import './App.css';
import { Analytics } from "@vercel/analytics/react"


function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://quote-backend-2vg0.onrender.com/api/quote");
      const data = await res.json();
      setQuote(data);
    } catch (err) {
      console.error("Failed to fetch quote:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote(); // load a quote when the app starts
  }, []);

  return (
    <Container  className="d-flex justify-content-center align-items-center flex-column text-center"
  style={{ height: "100vh" }}>
      <h1 className="mb-4 text-center playfair-font">📜 Random Quote Generator</h1>
      <h5 className="mb-4 text-center playfair-font">(to help you with your breakup)</h5>

      {loading ? (
        <Spinner animation="border" />
      ) : quote ? (
        <Card className="mb-4 w-100" style={{ maxWidth: "600px" }}>
          <Card.Body>
            <Card.Text className="tangerine-bold">"{quote.text}"</Card.Text>
            <Card.Subtitle className="tangerine-regular fs-3">— {quote.author}</Card.Subtitle>
          </Card.Body>
        </Card>
      ) : (
        <p>No quote loaded</p>
      )}

      <Button onClick={fetchQuote} className="bg-pink text-white border-0 playfair-font">New Quote</Button>
    </Container>
  );
}

export default App;
