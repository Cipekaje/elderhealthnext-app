import UserDataForm from '../components/UserDataForm';
import { GetSessionParams, getSession } from 'next-auth/react';

export default function AccountSettingsPage() {
  return (
    <div className="container">

      <UserDataForm />
    </div>
  );
}
//ar naudotojas prisijunges
export async function getServerSideProps(context: GetSessionParams | undefined) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // Pass any additional props here
  };
}