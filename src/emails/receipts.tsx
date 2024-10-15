import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  interface WaitlistEmailProps {
    name: string;
    number: number;
    mail: string;
  }
  
  export const WaitlistEmail: React.FC<Readonly<WaitlistEmailProps>> = ({
    name, mail, number
  }) => (
    <Html>
      <Head />
      <Preview>{name} agendou uma aula teste</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Aqui estão as informações:</Heading>
          <Text style={text}>
            Nome: {name} <br/>
            E-mail: {mail} <br/>
            Número: {number}
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
  export default WaitlistEmail;
  
  const main = {
    backgroundColor: '#000000',
    margin: '0 auto',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  };
  
  const container = {
    margin: 'auto',
    padding: '96px 20px 64px',
  };
  
  const h1 = {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '40px',
    margin: '0 0 20px',
  };
  
  const text = {
    color: '#aaaaaa',
    fontSize: '14px',
    lineHeight: '24px',
    margin: '0 0 40px',
  };