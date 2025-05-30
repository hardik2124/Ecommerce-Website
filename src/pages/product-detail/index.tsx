import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { 
  Breadcrumbs, 
  BreadcrumbItem, 
  Button, 
  Tabs, 
  Tab, 
  Card, 
  CardBody,
  Divider,
  Image
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useCart } from '../../contexts/cart-context';
import { mockProducts } from '../../data/mock-data';
import ProductCard from '../../components/product-card';
import { Product } from '../../types/product';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { addToCart } = useCart();
  
  const [product, setProduct] = React.useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = React.useState<string>('');
  const [quantity, setQuantity] = React.useState(1);
  const [selectedSize, setSelectedSize] = React.useState<string>('');
  const [selectedColor, setSelectedColor] = React.useState<string>('');
  const [relatedProducts, setRelatedProducts] = React.useState<Product[]>([]);
  
  React.useEffect(() => {
    // Find product by ID
    const foundProduct = mockProducts.find(p => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.image);
      setSelectedSize(foundProduct.sizes[0] || '');
      setSelectedColor(foundProduct.colors[0] || '');
      
      // Find related products (same category)
      const related = mockProducts
        .filter(p => p.category === foundProduct.category && p.id !== id)
        .slice(0, 4);
      setRelatedProducts(related);
    } else {
      // Product not found, redirect to products page
      history.push('/products');
    }
  }, [id, history]);
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedSize, selectedColor);
      // Show success message or open cart drawer
    }
  };
  
  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading product...</p>
      </div>
    );
  }
  
  const discountedPrice = product.discount > 0
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Shop</BreadcrumbItem>
        <BreadcrumbItem href={`/products?category=${product.category.toLowerCase()}`}>
          {product.category}
        </BreadcrumbItem>
        <BreadcrumbItem>{product.name}</BreadcrumbItem>
      </Breadcrumbs>
      
      {/* Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div>
          <div className="mb-4 aspect-square overflow-hidden rounded-lg">
            <Image
              removeWrapper
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            <button 
              onClick={() => setSelectedImage(product.image)}
              className={`aspect-square rounded border-2 overflow-hidden ${
                selectedImage === product.image ? 'border-primary' : 'border-transparent'
              }`}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </button>
            {product.additionalImages?.map((img, index) => (
              <button 
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`aspect-square rounded border-2 overflow-hidden ${
                  selectedImage === img ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img 
                  src={img} 
                  alt={`${product.name} ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Icon 
                  key={i}
                  icon={i < Math.floor(product.rating) ? "lucide:star" : "lucide:star"}
                  className={i < Math.floor(product.rating) ? "text-warning" : "text-default-300"}
                  width={16}
                  height={16}
                />
              ))}
            </div>
            <span className="text-default-500">({product.reviews} reviews)</span>
          </div>
          
          <div className="mb-4">
            {product.discount > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-danger">${discountedPrice.toFixed(2)}</span>
                <span className="text-default-500 line-through">${product.price.toFixed(2)}</span>
                <span className="bg-danger/10 text-danger text-sm px-2 py-1 rounded">
                  {product.discount}% OFF
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <p className="text-default-600 mb-6">{product.description}</p>
          
          <Divider className="my-6" />
          
          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Color: <span className="font-normal">{selectedColor}</span></h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border ${
                      selectedColor === color ? 'border-primary ring-2 ring-primary/30' : 'border-default-200'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    aria-label={color}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Size Selection */}
          {product.sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium">Size: <span className="font-normal">{selectedSize}</span></h3>
                <button className="text-sm text-primary">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[3rem] h-10 px-3 rounded border ${
                      selectedSize === size 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-default-200 hover:border-default-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Quantity:</h3>
            <div className="flex items-center border border-default-200 rounded-md w-fit">
              <Button 
                isIconOnly 
                variant="light" 
                onPress={() => handleQuantityChange(-1)}
                aria-label="Decrease quantity"
                isDisabled={quantity <= 1}
              >
                <Icon icon="lucide:minus" width={16} height={16} />
              </Button>
              <span className="px-6">{quantity}</span>
              <Button 
                isIconOnly 
                variant="light" 
                onPress={() => handleQuantityChange(1)}
                aria-label="Increase quantity"
              >
                <Icon icon="lucide:plus" width={16} height={16} />
              </Button>
            </div>
          </div>
          
          {/* Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button 
              color="primary" 
              size="lg"
              onPress={handleAddToCart}
              startContent={<Icon icon="lucide:shopping-cart" width={20} height={20} />}
              className="flex-1"
            >
              Add to Cart
            </Button>
            <Button 
              variant="flat" 
              size="lg"
              isIconOnly
              aria-label="Add to wishlist"
            >
              <Icon icon="lucide:heart" width={20} height={20} />
            </Button>
          </div>
          
          {/* Product Meta */}
          <div className="space-y-2 text-sm text-default-500">
            <p>SKU: {product.sku || `SKU-${product.id}`}</p>
            <p>Category: {product.category}</p>
            <p>Tags: {product.tags?.join(', ') || 'Fashion, Clothing'}</p>
          </div>
        </div>
      </div>
      
      {/* Product Tabs */}
      <div className="mb-16">
        <Tabs aria-label="Product information">
          <Tab key="description" title="Description">
            <Card>
              <CardBody className="p-6">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                  <p>{product.description}</p>
                  <p className="mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, 
                    nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia,
                    nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                  </p>
                  <h4 className="text-lg font-semibold mt-6 mb-2">Features</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>High-quality fabric</li>
                    <li>Comfortable fit</li>
                    <li>Durable construction</li>
                    <li>Easy to care for</li>
                    <li>Versatile styling options</li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="specifications" title="Specifications">
            <Card>
              <CardBody className="p-6">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4">Product Specifications</h3>
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr className="border-b border-default-200">
                        <td className="py-2 font-medium">Material</td>
                        <td className="py-2">Cotton, Polyester</td>
                      </tr>
                      <tr className="border-b border-default-200">
                        <td className="py-2 font-medium">Weight</td>
                        <td className="py-2">0.5 kg</td>
                      </tr>
                      <tr className="border-b border-default-200">
                        <td className="py-2 font-medium">Dimensions</td>
                        <td className="py-2">Varies by size</td>
                      </tr>
                      <tr className="border-b border-default-200">
                        <td className="py-2 font-medium">Care Instructions</td>
                        <td className="py-2">Machine wash cold, tumble dry low</td>
                      </tr>
                      <tr className="border-b border-default-200">
                        <td className="py-2 font-medium">Country of Origin</td>
                        <td className="py-2">Imported</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="reviews" title={`Reviews (${product.reviews})`}>
            <Card>
              <CardBody className="p-6">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                  <div className="flex items-center gap-4 mb-6">
                    <div>
                      <div className="text-3xl font-bold">{product.rating.toFixed(1)}</div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Icon 
                            key={i}
                            icon={i < Math.floor(product.rating) ? "lucide:star" : "lucide:star"}
                            className={i < Math.floor(product.rating) ? "text-warning" : "text-default-300"}
                            width={16}
                            height={16}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-default-500 mt-1">{product.reviews} reviews</div>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-sm w-2">{star}</span>
                          <Icon icon="lucide:star" className="text-warning" width={14} height={14} />
                          <div className="flex-1 h-2 bg-default-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-warning" 
                              style={{ width: `${Math.random() * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button color="primary">Write a Review</Button>
                  
                  <Divider className="my-6" />
                  
                  {/* Sample Reviews */}
                  <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="border-b border-default-200 pb-6 last:border-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">John Doe</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, j) => (
                                  <Icon 
                                    key={j}
                                    icon="lucide:star"
                                    className={j < 4 + (i % 2) ? "text-warning" : "text-default-300"}
                                    width={14}
                                    height={14}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-default-500">
                                {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="text-sm text-default-500">Verified Purchase</div>
                        </div>
                        <p className="mt-2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, 
                          nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Great product, would buy again!
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
      
      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;