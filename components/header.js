import { useUser } from '@auth0/nextjs-auth0';

export default function Header() {
  const { user, error, isLoading } = useUser();
  if (user) {
    console.log(`User: ${JSON.stringify(user)}`);
  }

  return (
    <header>
      <ul>
        { user ? (
          <>
            <li>{user.name} ({user.email})</li>
            <li><a href="/api/auth/logout">Logout</a></li>
          </>
        ) : (
          <li><a href="/api/auth/login">Login</a></li>
        )}
      </ul>
      <style jsx>{`
        header {
          margin-top: 5px;
          padding: 5px;
          height: 40px;
          width: 100%;
          background-color: #20b2aa; // light sea green
          border-radius: 30px;
          display: flex;
          flex-direction: row-reverse;
          align-items: center; // Vertically align things.
        }

        header li {
          display: inline; // Display horizontally; remove bullets.
          margin: 20px;
          color: white;
        }

        header li a {
          text-decoration: none;
          color: white;
        }
      `}</style>
    </header>
  );
}
