import { Col, Container, Row, Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <Container>
      <Row>
        <Col>
          <Spinner />
        </Col>
      </Row>
    </Container>
  )
}
