import * as Avatar from '@radix-ui/react-avatar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">kanplan</Link>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Avatar.Root className="avatar">
            <Avatar.Image
              className="avatar__image"
              src={ <FaUserCircle size={30} />}
              alt="User Avatar"
            />
            <Avatar.Fallback className="avatar__fallback" delayMs={600}>
              <FaUserCircle size={30} />
            </Avatar.Fallback>
          </Avatar.Root>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="dropdown-content" align="end">
          <DropdownMenu.Item
            className="dropdown-item"
            onClick={() => {
              console.log('Logging out...');
            }}
          >
            Log out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </nav>
  );
}

export default NavBar;
