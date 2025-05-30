import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Button, Card, CardBody, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import ProductCard from '../../components/product-card';
import { mockProducts } from '../../data/mock-data';

const Home: React.FC = () => {
  const featuredProducts = mockProducts.slice(0, 4);
  const newArrivals = mockProducts.filter(p => p.isNew).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-primary-900 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://img.heroui.chat/image/fashion?w=1920&h=1080&u=1" 
            alt="Fashion background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-xl">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Summer Collection 2023</h1>
            <p className="text-white/80 text-lg mb-8">
              Discover the latest trends and styles for the summer season. 
              Refresh your wardrobe with our new arrivals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                as={RouteLink} 
                to="/products" 
                color="primary" 
                size="lg"
                endContent={<Icon icon="lucide:arrow-right" width={20} height={20} />}
              >
                Shop Now
              </Button>
              <Button 
                as={RouteLink} 
                to="/products?category=new" 
                variant="flat" 
                color="default" 
                size="lg"
              >
                New Arrivals
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card isPressable as={RouteLink} to="/products?category=men" className="h-64">
            <CardBody className="p-0 overflow-hidden">
              <div className="relative h-full">
                <img 
                  src="https://img.heroui.chat/image/fashion?w=600&h=800&u=2" 
                  alt="Men's Fashion" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">Men</h3>
                </div>
              </div>
            </CardBody>
          </Card>
          
          <Card isPressable as={RouteLink} to="/products?category=women" className="h-64">
            <CardBody className="p-0 overflow-hidden">
              <div className="relative h-full">
                <img 
                  src="https://img.heroui.chat/image/fashion?w=600&h=800&u=3" 
                  alt="Women's Fashion" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">Women</h3>
                </div>
              </div>
            </CardBody>
          </Card>
          
          <Card isPressable as={RouteLink} to="/products?category=accessories" className="h-64">
            <CardBody className="p-0 overflow-hidden">
              <div className="relative h-full">
                <img 
                  src="https://img.heroui.chat/image/fashion?w=600&h=800&u=4" 
                  alt="Accessories" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">Accessories</h3>
                </div>
              </div>
            </CardBody>
          </Card>
          
          <Card isPressable as={RouteLink} to="/products?category=shoes" className="h-64">
            <CardBody className="p-0 overflow-hidden">
              <div className="relative h-full">
                <img 
                  src="https://img.heroui.chat/image/shoes?w=600&h=800&u=1" 
                  alt="Shoes" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">Shoes</h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-content2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button 
              as={RouteLink} 
              to="/products" 
              variant="light" 
              color="primary"
              endContent={<Icon icon="lucide:arrow-right" width={16} height={16} />}
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="py-16 container mx-auto px-4">
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://img.heroui.chat/image/fashion?w=1920&h=600&u=5" 
              alt="Sale Banner" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative bg-black/50 py-16 px-8 md:py-24 md:px-16">
            <div className="max-w-lg">
              <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Summer Sale</h2>
              <p className="text-white/80 text-lg mb-6">
                Up to 50% off on selected items. Limited time offer.
              </p>
              <Button 
                as={RouteLink} 
                to="/products?sale=true" 
                color="danger" 
                size="lg"
              >
                Shop the Sale
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <Button 
              as={RouteLink} 
              to="/products?category=new" 
              variant="light" 
              color="primary"
              endContent={<Icon icon="lucide:arrow-right" width={16} height={16} />}
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-content2">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-3 bg-primary/10 rounded-full">
                <Icon icon="lucide:truck" className="text-primary" width={32} height={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-default-500">On all orders over $50</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-3 bg-primary/10 rounded-full">
                <Icon icon="lucide:repeat" className="text-primary" width={32} height={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-default-500">30-day return policy</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-3 bg-primary/10 rounded-full">
                <Icon icon="lucide:shield" className="text-primary" width={32} height={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-default-500">100% secure checkout</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-3 bg-primary/10 rounded-full">
                <Icon icon="lucide:headphones" className="text-primary" width={32} height={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-default-500">Dedicated customer service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-default-500 mb-8">
            Stay updated with the latest trends, new arrivals, and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-md border border-default-200 focus:outline-none focus:border-primary"
            />
            <Button color="primary">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;