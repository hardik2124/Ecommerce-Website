import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { 
  Breadcrumbs, 
  BreadcrumbItem, 
  Button, 
  Card, 
  CardBody, 
  CardFooter,
  Divider
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useCart } from '../../contexts/cart-context';
import CartItem from '../../components/cart-item';

const Cart: React.FC = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs className="mb-6">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem>Cart</BreadcrumbItem>
        </Breadcrumbs>
        
        <div className="text-center py-16">
          <Icon icon="lucide:shopping-cart" className="mx-auto mb-4 text-default-400" width={64} height={64} />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-default-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Button 
            as={RouteLink} 
            to="/products" 
            color="primary"
            size="lg"
            endContent={<Icon icon="lucide:arrow-right" width={16} height={16} />}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Cart</BreadcrumbItem>
      </Breadcrumbs>
      
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Cart Items ({cartItems.reduce((total, item) => total + item.quantity, 0)})
            </h2>
            <Button 
              variant="light" 
              color="danger" 
              onPress={clearCart}
              startContent={<Icon icon="lucide:trash-2" width={16} height={16} />}
            >
              Clear Cart
            </Button>
          </div>
          
          {cartItems.map(item => (
            <CartItem key={item.product.id} item={item} />
          ))}
          
          <div className="mt-6">
            <Button 
              as={RouteLink} 
              to="/products" 
              variant="flat" 
              startContent={<Icon icon="lucide:arrow-left" width={16} height={16} />}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-80">
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-default-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-600">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-success">Free</span>
                  ) : (
                    <span>${shipping.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-default-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <Divider />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              {shipping > 0 && (
                <p className="text-sm text-default-500 mt-2">
                  Add ${(50 - subtotal).toFixed(2)} more to get free shipping!
                </p>
              )}
            </CardBody>
            <CardFooter className="pt-0">
              <Button 
                as={RouteLink} 
                to="/checkout" 
                color="primary" 
                fullWidth
                size="lg"
              >
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
          
          {/* Promo Code */}
          <Card className="mt-4">
            <CardBody className="p-6">
              <h3 className="font-semibold mb-2">Promo Code</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 rounded-md border border-default-200 focus:outline-none focus:border-primary"
                />
                <Button color="primary" variant="flat">Apply</Button>
              </div>
            </CardBody>
          </Card>
          
          {/* Payment Methods */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <Icon icon="logos:visa" width={40} height={24} />
            <Icon icon="logos:mastercard" width={40} height={24} />
            <Icon icon="logos:paypal" width={40} height={24} />
            <Icon icon="logos:apple-pay" width={40} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;