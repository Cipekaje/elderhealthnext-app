import UserJournalLayout from '@/layouts/UserJournalLayout';
import { GetSessionParams, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function JournalPage() {
  return (
    <div className="container" style={{ maxHeight: '100vh', overflow: 'auto'}}>
      <UserJournalLayout />
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