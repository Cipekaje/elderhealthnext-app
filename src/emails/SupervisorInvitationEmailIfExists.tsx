import React from "react";
import { Html } from "@react-email/html";
import { Heading } from "@react-email/heading";
import { Text } from "@react-email/text";
import { Hr } from "@react-email/hr";

interface SupervisorInvitationEmailProps {
  email: string;
  registerLink: string;
}

const SupervisorInvitationEmail: React.FC<SupervisorInvitationEmailProps> = ({ email, registerLink }) => {
  return (
    <Html>
      <Heading as="h2">Sveiki</Heading>
      <Text>
        Jūs buvote pakviestas tapti prižiūrėtoju. Prašome paspausti nuorodą žemiau, kad patvirtintumėte:
      </Text>
      <Text>
        <a href={registerLink}>{registerLink}</a>
      </Text>
      <Hr />
      <Text>Linkėjimai nuo,</Text>
      <Heading as="h3">ElderHealth-Companion</Heading>
    </Html>
  );
};

export default SupervisorInvitationEmail;
