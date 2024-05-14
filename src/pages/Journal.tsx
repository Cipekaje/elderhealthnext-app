import UserJournalLayout from '@/layouts/UserJournalLayout';
import { GetSessionParams, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function JournalPage() {
  const router = useRouter();
  const { userId } = router.query;
  // console.log("journal id page", userId);
  return (
    <div className="container" style={{ maxHeight: '100vh', overflow: 'auto'}}>
       <UserJournalLayout userId={userId} />
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