import React from 'react';
import styled from 'styled-components';

const Card =  styled.div`
    flex: 1 0 21%; 
    border: 4px solid #7460E1;
    border-radius: 5px;
    padding: 20px;
    margin: 10px;
`
const CardBody =  styled.div`
     display: flex;
     flex-direction: row;
     justify-content: space-between;
`
const CardTitle =  styled.h1`
     font-size: 16px;
     font-weight: 600;
`
const CardFooter =  styled.div``

const Breach = ({breaches}) => (
    <React.Fragment>
      {breaches.map((breache, index) => {
        const { Title, BreachDate, LogoPath } = breache
        return (
          <Card key={index}>
            <CardBody>
              <CardTitle>{Title}</CardTitle>
              <img
                className="card-img-top"
                alt={Title}
                src={LogoPath}
                height="20"
              />
            </CardBody>
            <CardFooter>
              <p>Date: {BreachDate}</p>
            </CardFooter>
          </Card>
        )
      })}
   </React.Fragment>
  );

  export default Breach;
