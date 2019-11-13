import React from 'react';
import { Col, Row } from "reactstrap";
import ResultTable from './ResultTable'

const Results = (props) => {
  return (
    <Row>
      <Col md={12}>
        <ResultTable />
      </Col>
    </Row>
  );

}

export default Results;