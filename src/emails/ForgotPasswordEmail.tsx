import React from "react";
import { Html } from "@react-email/html";
import { Heading } from "@react-email/heading";
import { Text } from "@react-email/text";
import { Hr } from "@react-email/hr";

interface ForgotPasswordEmailProps {
  name: string;
  newPassword: string;
  resetLink: string; // kolkas neveikia
}

const ForgotPasswordEmail: React.FC<ForgotPasswordEmailProps> = ({ name, newPassword, resetLink }) => {
  return (
    <Html>
      <Heading as="h2"> Sveiki {name} </Heading>
      <Text>
       Gavome slaptažodžio atkūrimo užklausą.
      </Text>
      <Text>
        Laikinas slaptažodis: <strong>{newPassword}</strong>
      </Text>
    
      <Hr />
      <Text>Linkėjimai nuo,</Text>
      <Heading as="h3">ElderHealth-Companion</Heading>
    </Html>
  );
}

export default ForgotPasswordEmail;
