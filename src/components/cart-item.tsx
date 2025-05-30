import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Button, Card, CardBody, Image } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useCart } from '../contexts/cart-context';
import { CartItem as CartItemType } from '../types/cart';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      updateQuantity(item.product.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.product.id);
  };

  const price = item.product.discount > 0
    ? item.product.price * (1 - item.product.discount / 100)
    : item.product.price;
  
  const totalPrice = price * item.quantity;

  return (
    <Card className="mb-4">
      <CardBody>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-24 h-24">
            <Image
              removeWrapper
              src={item.product.image}
              alt={item.product.name}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between">
              <div>
                <h3 className="font-medium">
                  <RouteLink to={`/products/${item.product.id}`} className="hover:text-primary">
                    {item.product.name}
                  </RouteLink>
                </h3>
                <p className="text-default-500 text-sm">{item.product.category}</p>
                {item.size && <p className="text-sm">Size: {item.size}</p>}
                {item.color && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm">Color:</span>
                    <span 
                      className="inline-block w-4 h-4 rounded-full border border-default-200" 
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                )}
              </div>
              <div className="mt-2 sm:mt-0 text-right">
                {item.product.discount > 0 ? (
                  <div>
                    <span className="font-semibold text-danger">${price.toFixed(2)}</span>
                    <span className="text-default-500 text-sm line-through ml-2">${item.product.price.toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="font-semibold">${price.toFixed(2)}</span>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
              <div className="flex items-center border border-default-200 rounded-md">
                <Button 
                  isIconOnly 
                  size="sm" 
                  variant="light" 
                  onPress={() => handleQuantityChange(-1)}
                  aria-label="Decrease quantity"
                  isDisabled={item.quantity <= 1}
                >
                  <Icon icon="lucide:minus" width={16} height={16} />
                </Button>
                <span className="px-4">{item.quantity}</span>
                <Button 
                  isIconOnly 
                  size="sm" 
                  variant="light" 
                  onPress={() => handleQuantityChange(1)}
                  aria-label="Increase quantity"
                >
                  <Icon icon="lucide:plus" width={16} height={16} />
                </Button>
              </div>
              
              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                <Button 
                  isIconOnly 
                  size="sm" 
                  color="danger" 
                  variant="light" 
                  onPress={handleRemove}
                  aria-label="Remove item"
                >
                  <Icon icon="lucide:trash-2" width={16} height={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CartItem;