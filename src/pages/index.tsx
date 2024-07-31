import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {io} from "socket.io-client";

export default function Home({ hasKey }: { hasKey: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (!hasKey) {
      router.replace('/404')
      return
    }
    const socket = io({path: '/api/socket'});

    socket.on('message', (message: string)=>{
      console.log(message)
    });

    socket.on('error', (error: Error) => {
      console.error('Socket error:', error);
    });
    return () => {
      socket.disconnect();
    };
  }, [hasKey, router]);

  return (
    <div>
      <h1>Главная страница</h1>
    </div>
  );
}

export async function getServerSideProps(context: { req: { headers: { cookie: string } } }) {
  const { req } = context;
  const cookies = req.headers.cookie || '';
  const hasKey = cookies.includes('key=');

  return {
    props: {
      hasKey: hasKey,
    },
  };
}
