import React from 'react';
import { Link as RouteLink, useLocation, useHistory } from 'react-router-dom';
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Button,
  Link
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/auth-context';
import { ThemeSwitcher } from '../components/theme-switcher';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const history = useHistory();
  const { user, logout } = useAuth();
  
  React.useEffect(() => {
    // Redirect if not admin
    if (!user?.isAdmin) {
      history.push('/login');
    }
  }, [user, history]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-content1 border-r border-divider hidden md:block">
        <div className="p-4 border-b border-divider">
          <RouteLink to="/" className="flex items-center gap-2">
            <Icon icon="lucide:shopping-bag" width={24} height={24} className="text-primary" />
            <p className="font-bold text-inherit">STYLISH ADMIN</p>
          </RouteLink>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <Link 
                as={RouteLink} 
                to="/admin" 
                className={`flex items-center gap-2 p-2 rounded-md ${isActive('/admin') ? 'bg-primary/10 text-primary' : 'hover:bg-content2'}`}
              >
                <Icon icon="lucide:layout-dashboard" width={20} height={20} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                as={RouteLink} 
                to="/admin/products" 
                className={`flex items-center gap-2 p-2 rounded-md ${isActive('/admin/products') ? 'bg-primary/10 text-primary' : 'hover:bg-content2'}`}
              >
                <Icon icon="lucide:package" width={20} height={20} />
                Products
              </Link>
            </li>
            <li>
              <Link 
                as={RouteLink} 
                to="/admin/orders" 
                className={`flex items-center gap-2 p-2 rounded-md ${isActive('/admin/orders') ? 'bg-primary/10 text-primary' : 'hover:bg-content2'}`}
              >
                <Icon icon="lucide:shopping-bag" width={20} height={20} />
                Orders
              </Link>
            </li>
            <li>
              <Link 
                as={RouteLink} 
                to="/admin/customers" 
                className={`flex items-center gap-2 p-2 rounded-md ${isActive('/admin/customers') ? 'bg-primary/10 text-primary' : 'hover:bg-content2'}`}
              >
                <Icon icon="lucide:users" width={20} height={20} />
                Customers
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Navbar isBordered>
          <NavbarContent className="md:hidden">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly variant="light">
                  <Icon icon="lucide:menu" width={24} height={24} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Navigation">
                <DropdownItem key="dashboard" as={RouteLink} to="/admin">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:layout-dashboard" width={20} height={20} />
                    Dashboard
                  </div>
                </DropdownItem>
                <DropdownItem key="products" as={RouteLink} to="/admin/products">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:package" width={20} height={20} />
                    Products
                  </div>
                </DropdownItem>
                <DropdownItem key="orders" as={RouteLink} to="/admin/orders">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:shopping-bag" width={20} height={20} />
                    Orders
                  </div>
                </DropdownItem>
                <DropdownItem key="customers" as={RouteLink} to="/admin/customers">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:users" width={20} height={20} />
                    Customers
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>

          <NavbarContent justify="end">
            <NavbarItem>
              <ThemeSwitcher />
            </NavbarItem>
            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    color="primary"
                    size="sm"
                    src={user?.avatar || `https://img.heroui.chat/image/avatar?w=200&h=200&u=${user?.id || 1}`}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User menu actions">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{user?.email}</p>
                  </DropdownItem>
                  <DropdownItem key="store" as={RouteLink} to="/">Go to Store</DropdownItem>
                  <DropdownItem key="logout" color="danger" onClick={logout}>Log Out</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        <div className="p-6 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;