import { Link, Outlet } from "react-router-dom";

export function Root() {
  return (
    <div>
      <header>
        <h1>Mini App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
