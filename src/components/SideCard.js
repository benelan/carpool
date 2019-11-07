import React, { Fragment } from 'react';

import {
  Button, UncontrolledAlert, Card, CardImg, CardBody,
  CardTitle, CardSubtitle, CardText
} from 'reactstrap';

const BANNER = 'https://i.imgur.com/CaKdFMq.jpg';

export const SideCard = () => (
  <Fragment>
    
    <Card>
      <CardImg top width="100%" src={BANNER} alt="banner" />
      <CardBody>
        <CardTitle className="h3 mb-2 pt-2 font-weight-bold text-secondary">Ben Elan</CardTitle>
        <CardSubtitle className="text-secondary mb-3 font-weight-light text-uppercase" style={{ fontSize: '0.8rem' }}>SDK Specialist, Esri</CardSubtitle>
        <CardText className="text-secondary mb-4" style={{ fontSize: '0.75rem' }}>Assist Esri customers with software development. Aspiring Full-stack web developer, blogging while I learn.</CardText>
        <Button color="success" className="font-weight-bold">View LinkedIn</Button>
      </CardBody>
    </Card>
    
  </Fragment>
);
