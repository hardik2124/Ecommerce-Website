import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Link, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-content1 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon icon="lucide:shopping-bag" width={24} height={24} className="text-primary" />
              <span className="font-bold text-lg">STYLISH</span>
            </div>
            <p className="text-default-500 mb-4">
              Your one-stop destination for trendy and stylish clothing for all occasions.
            </p>
            <div className="flex gap-4">
              <Link href="#" isExternal aria-label="Facebook">
                <Icon icon="logos:facebook" width={24} height={24} />
              </Link>
              <Link href="#" isExternal aria-label="Instagram">
                <Icon icon="logos:instagram-icon" width={24} height={24} />
              </Link>
              <Link href="#" isExternal aria-label="Twitter">
                <Icon icon="logos:twitter" width={24} height={24} />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link as={RouteLink} to="/products?category=men" color="foreground">Men's Clothing</Link>
              </li>
              <li>
                <Link as={RouteLink} to="/products?category=women" color="foreground">Women's Clothing</Link>
              </li>
              <li>
                <Link as={RouteLink} to="/products?category=accessories" color="foreground">Accessories</Link>
              </li>
              <li>
                <Link as={RouteLink} to="/products?category=shoes" color="foreground">Shoes</Link>
              </li>
              <li>
                <Link as={RouteLink} to="/products?sale=true" color="foreground">Sale</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" color="foreground">Contact Us</Link>
              </li>
              <li>
                <Link href="#" color="foreground">FAQs</Link>
              </li>
              <li>
                <Link href="#" color="foreground">Shipping & Returns</Link>
              </li>
              <li>
                <Link href="#" color="foreground">Size Guide</Link>
              </li>
              <li>
                <Link href="#" color="foreground">Track Order</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" color="foreground">Our Story</Link>
              </li>
              <li>
                <Link href="#" color="foreground">Careers</Link>
              </li>
              <li>
                <Link href="#" color="foreground">Sustainability</Link>
              </li>
              <li>
                <Link href="#" color="foreground">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="#" color="foreground">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <Divider className="my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-default-500 text-sm">
            &copy; {new Date().getFullYear()} STYLISH. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Icon icon="logos:visa" width={32} height={20} />
            <Icon icon="logos:mastercard" width={32} height={20} />
            <Icon icon="logos:paypal" width={32} height={20} />
            <Icon icon="logos:apple-pay" width={32} height={20} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;