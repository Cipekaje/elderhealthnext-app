import UserDashboardLayout from '@/layouts/UserDashboardLayout';
import { GetSessionParams, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function UserDashboardPage() {
  return (
    <UserDashboardLayout>
      {/* Your UserDashboard page content */}
    </UserDashboardLayout>
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
