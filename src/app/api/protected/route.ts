import { getSession } from 'next-auth/react';

export async function GET(request: Request) {
  const session = await getSession({ req: request });

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  return new Response(JSON.stringify({ message: 'Protected Data' }));
}
