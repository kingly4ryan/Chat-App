import React from 'react';

function Header() {
  return (
    <header>
      <h1>Chat App</h1>
      <nav>
        <ul>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
