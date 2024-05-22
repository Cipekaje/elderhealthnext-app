import DoctorDashboardLayout from '@/layouts/DoctorDashboardLayout';
import { GetSessionParams, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function DoctorDashboardPage() {
  return (
    <DoctorDashboardLayout>

    </DoctorDashboardLayout>
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
