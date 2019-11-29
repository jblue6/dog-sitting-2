import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { InformationContext } from '../../context/InformationContext';

function Home() {
  const { information, setInformtion } = useContext(InformationContext);

  return <Container> <h2>{information.title}</h2> <div>{information.about}</div> </Container>
}

export default Home;