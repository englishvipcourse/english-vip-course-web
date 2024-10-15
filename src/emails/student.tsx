import {
    Body,
    Column,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  interface StudentProps {
    name: string;
  }
  
  export const Student: React.FC<Readonly<StudentProps>> = ({
    name
  }) => (
    <Html>
      <Head />
      <Preview>Obrigado por entrar em contato!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section className="mt-[32px]">
            <Img
              src={`https://english-vip-course.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcropped-logo-english.a90e3305.png&w=256&q=75`}
              width="auto"
              height="auto"
              alt="FluencyLab"
              className="my-0 mx-auto mb-10"
            />
          </Section>
          <Heading style={h1}>{name} sua aula está sendo agendada.</Heading>
          <Text style={text}>
            Em breve, vamos entrar em contato para dar mais detalhes da sua aula teste e começar sua jornada no idioma! Obrigado por confiar na gente!
          </Text>

          <Section style={container}>
            <Text style={paragraph}>
            Grande Abraço, <br></br>
            Equipe English Vip Course. 
            </Text>
            <Text style={reportLink}>
            Por favor, pedimos que você não responda esse e-mail, pois se trata de uma mensagem automática e não é possível dar continuidade ao seu atendimento por aqui.
            </Text>
          </Section>

          <Section>
            Nossas redes sociais:
            <Column>
              <Link href="https://www.instagram.com/fluency.lab">
                <Img
                  src={`https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/150px-Instagram_logo_2022.svg.png`}
                  width="32"
                  height="32"
                  alt="Slack"
                />
              </Link>
            </Column>
          </Section>

        </Container>
      </Body>
    </Html>
  );
  
  export default Student;
  
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

  const paragraph = {
    margin: "0 0 15px",
    fontSize: "15px",
    lineHeight: "1.4",
    color: "#3c4149",
  };
  
  const reportLink = {
    fontSize: "14px",
    color: "#b4becc",
  };
  