import React, { useEffect } from 'react';
import Register from '../components/RegisterFormSupervisor';
import { useRouter } from 'next/router';

interface Props {
  registerLink: string; // Specify the type of registerLink
}

export default function SupervisorRegisterPage({ registerLink }: Props) {
  const router = useRouter();
  const { userID } = router.query; // Extract userID from the query string

  // Log userID to console when component mounts
  useEffect(() => {
    console.log('User ID PAGE DALYJE:', userID);
  }, [userID]);

  return (
    <div className="container" style={{ maxHeight: '100vh', overflow: 'auto', backgroundImage: `url(${"../public/ranger-4df6c1b6.png"})`}}>
      {/* Pass userID as a prop to Register */}
      <Register registerLink={registerLink} userID={userID as string} />
    </div>
  );
}

