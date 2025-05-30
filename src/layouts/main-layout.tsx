import React from 'react';
import { Link as RouteLink, useLocation } from 'react-router-dom';
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Link, 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Badge,
  Avatar
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/auth-context';
import { useCart } from '../contexts/cart-context';
import { ThemeSwitcher } from '../components/theme-switcher';
import Footer from '../components/footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems } = useCart();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar maxWidth="2xl" isBordered>
        <NavbarBrand>
          <RouteLink to="/" className="flex items-center gap-2">
            <Icon icon="lucide:shopping-bag" width={24} height={24} className="text-primary" />
            <p className="font-bold text-inherit">STYLISH</p>
          </RouteLink>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={isActive('/')}>
            <Link as={RouteLink} to="/" color={isActive('/') ? "primary" : "foreground"}>
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={isActive('/products')}>
            <Link as={RouteLink} to="/products" color={isActive('/products') ? "primary" : "foreground"}>
              Shop
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="light" 
                  className="p-0" 
                  endContent={<Icon icon="lucide:chevron-down" width={16} height={16} />}
                >
                  Categories
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Categories">
                <DropdownItem key="men" as={RouteLink} to="/products?category=men">Men</DropdownItem>
                <DropdownItem key="women" as={RouteLink} to="/products?category=women">Women</DropdownItem>
                <DropdownItem key="accessories" as={RouteLink} to="/products?category=accessories">Accessories</DropdownItem>
                <DropdownItem key="shoes" as={RouteLink} to="/products?category=shoes">Shoes</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
          <NavbarItem>
            <Badge content={cartItems.length} color="primary" isInvisible={cartItems.length === 0}>
              <Button 
                as={RouteLink} 
                to="/cart" 
                variant="light" 
                isIconOnly
                aria-label="Cart"
              >
                <Icon icon="lucide:shopping-cart" width={20} height={20} />
              </Button>
            </Badge>
          </NavbarItem>
          <NavbarItem>
            {isAuthenticated ? (
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
                  <DropdownItem key="account" as={RouteLink} to="/account">My Account</DropdownItem>
                  <DropdownItem key="orders" as={RouteLink} to="/account?tab=orders">My Orders</DropdownItem>
                  {user?.isAdmin && (
                    <DropdownItem key="admin" as={RouteLink} to="/admin">Admin Dashboard</DropdownItem>
                  )}
                  <DropdownItem key="logout" color="danger" onClick={logout}>Log Out</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Button as={RouteLink} to="/login" color="primary" variant="flat">
                Sign In
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;