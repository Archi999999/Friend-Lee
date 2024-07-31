import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home({ hasKey }: { hasKey: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (!hasKey) {
      router.replace('/404').then(()=>{console.log('No key found, redirecting to 404');})
    } else {
      console.log('Key found, user is authenticated');
    }
  }, [hasKey, router]);

  return (
    <div>
      <h1>Главная страница</h1>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { req } = context;
  const cookies = req.headers.cookie || '';
  const hasKey = cookies.includes('key=');

  return {
    props: {
      hasKey: hasKey,
    },
  };
}
