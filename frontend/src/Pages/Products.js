import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Nav } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component
import './Products.css';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('Bags');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/get_products.php');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSelect = (selectedKey) => {
    setActiveCategory(selectedKey);
  };

  const filterProductsByCategory = (category) => {
    return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
  };

  return (
    <Container className="my-4">
      <h2 className="text-center">Our Products</h2>
      <Nav variant="tabs" activeKey={activeCategory} onSelect={handleSelect} className="justify-content-center mb-4">
        <Nav.Item>
          <Nav.Link eventKey="Bags">Bags</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Accessories">Accessories</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Shoes">Shoes</Nav.Link>
        </Nav.Item>
      </Nav>
      <Row>
        {filterProductsByCategory(activeCategory).map(product => (
          <Col md={4} className="mb-4" key={product.id}>
            {/* Wrap each product card in a Link component */}
            <Link to={`/products/${product.id}`} className="product-link">
              <Card className="product-card">
                <Card.Img variant="top" src={`http://localhost/Elite%20bags/${product.image}`} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.price}</Card.Text>
                  <Button variant="primary">View</Button>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
