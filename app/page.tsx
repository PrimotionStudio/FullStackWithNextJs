import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      Hey
      <br />
      <Link href="/login">Login</Link>
      <br />
      <Link href="/register">Register</Link>
      <br />
      <Link href="/profile">Profile</Link>
    </div>
  );
};

export default Home;