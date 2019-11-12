import React from 'react';
import { Col, Row } from "reactstrap";
import Settings from './Settings'
import ResultTable from './ResultTable'

const Results = (props) => {
  return (
    <Row>
      
      <Col md={6}>
        <Settings />
      </Col>
      <Col md={6}>
        <ResultTable />
      </Col>
    </Row>
  );

}

export default Results;