import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Card, CardBody, CardFooter, Button, Badge } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useCart } from '../contexts/cart-context';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Card 
      isPressable 
      className="overflow-visible"
      as={RouteLink}
      to={`/products/${product.id}`}
    >
      <CardBody className="p-0 overflow-visible">
        <div className="relative">
          {product.discount > 0 && (
            <Badge 
              content={`-${product.discount}%`} 
              color="danger"
              className="absolute top-2 right-2 z-10"
            />
          )}
          {product.isNew && (
            <Badge 
              content="NEW" 
              color="primary"
              className="absolute top-2 left-2 z-10"
            />
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-60 object-cover rounded-t-lg"
          />
        </div>
      </CardBody>
      <CardFooter className="flex flex-col items-start text-left">
        <div className="flex justify-between w-full">
          <h3 className="font-medium text-foreground">{product.name}</h3>
          <div className="flex items-center gap-1">
            <Icon icon="lucide:star" className="text-warning" width={16} height={16} />
            <span className="text-sm">{product.rating}</span>
          </div>
        </div>
        <p className="text-default-500 text-sm">{product.category}</p>
        <div className="flex justify-between items-center w-full mt-2">
          <div className="flex items-center gap-2">
            {product.discount > 0 ? (
              <>
                <span className="font-semibold text-danger">${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                <span className="text-default-500 text-sm line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-semibold">${product.price.toFixed(2)}</span>
            )}
          </div>
          <Button 
            isIconOnly 
            size="sm" 
            color="primary" 
            variant="flat"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <Icon icon="lucide:shopping-cart" width={16} height={16} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;