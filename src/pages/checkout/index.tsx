import React from 'react';
import { useHistory } from 'react-router-dom';
import { 
  Breadcrumbs, 
  BreadcrumbItem, 
  Button, 
  Card, 
  CardBody, 
  Input,
  Divider,
  RadioGroup,
  Radio,
  Checkbox
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useCart } from '../../contexts/cart-context';
import { useAuth } from '../../contexts/auth-context';

const Checkout: React.FC = () => {
  const history = useHistory();
  const { cartItems, subtotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  
  const [activeStep, setActiveStep] = React.useState(0);
  const [shippingInfo, setShippingInfo] = React.useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  const [shippingMethod, setShippingMethod] = React.useState('standard');
  const [paymentMethod, setPaymentMethod] = React.useState('credit_card');
  const [cardInfo, setCardInfo] = React.useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  const [sameAsShipping, setSameAsShipping] = React.useState(true);
  
  React.useEffect(() => {
    // Redirect to cart if cart is empty
    if (cartItems.length === 0) {
      history.push('/cart');
    }
  }, [cartItems, history]);
  
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNextStep = () => {
    setActiveStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setActiveStep(prev => prev - 1);
  };
  
  const handlePlaceOrder = () => {
    // Process order
    alert('Order placed successfully!');
    clearCart();
    history.push('/account?tab=orders');
  };
  
  const shipping = shippingMethod === 'express' ? 15 : shippingMethod === 'standard' ? 10 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  
  const steps = [
    { title: 'Shipping', icon: 'lucide:truck' },
    { title: 'Payment', icon: 'lucide:credit-card' },
    { title: 'Review', icon: 'lucide:check-circle' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/cart">Cart</BreadcrumbItem>
        <BreadcrumbItem>Checkout</BreadcrumbItem>
      </Breadcrumbs>
      
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center flex-1 ${
                index < activeStep ? 'text-success' : 
                index === activeStep ? 'text-primary' : 'text-default-400'
              }`}
            >
              <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                index < activeStep ? 'border-success bg-success/10' : 
                index === activeStep ? 'border-primary bg-primary/10' : 'border-default-300'
              }`}>
                <Icon 
                  icon={step.icon} 
                  width={20} 
                  height={20} 
                />
                {index < steps.length - 1 && (
                  <div className={`absolute top-1/2 w-full h-0.5 -right-1/2 ${
                    index < activeStep ? 'bg-success' : 'bg-default-300'
                  }`} />
                )}
              </div>
              <span className="mt-2 text-sm font-medium">{step.title}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Checkout Form */}
        <div className="flex-1">
          <Card>
            <CardBody className="p-6">
              {/* Step 1: Shipping */}
              {activeStep === 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Input
                      label="First Name"
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingInfoChange}
                      isRequired
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleShippingInfoChange}
                      isRequired
                    />
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingInfoChange}
                      isRequired
                    />
                    <Input
                      label="Phone"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingInfoChange}
                      isRequired
                    />
                    <Input
                      label="Address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingInfoChange}
                      className="md:col-span-2"
                      isRequired
                    />
                    <Input
                      label="City"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingInfoChange}
                      isRequired
                    />
                    <Input
                      label="State/Province"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingInfoChange}
                      isRequired
                    />
                    <Input
                      label="ZIP/Postal Code"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingInfoChange}
                      isRequired
                    />
                    <Input
                      label="Country"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingInfoChange}
                      isRequired
                    />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-4">Shipping Method</h3>
                  <RadioGroup 
                    value={shippingMethod} 
                    onValueChange={setShippingMethod}
                    className="mb-6"
                  >
                    <Radio value="standard" description="Delivery in 3-5 business days">
                      Standard Shipping ($10.00)
                    </Radio>
                    <Radio value="express" description="Delivery in 1-2 business days">
                      Express Shipping ($15.00)
                    </Radio>
                    <Radio value="free" description="Delivery in 5-7 business days">
                      Free Shipping (Orders over $50)
                    </Radio>
                  </RadioGroup>
                  
                  <div className="flex justify-end">
                    <Button 
                      color="primary" 
                      onPress={handleNextStep}
                      endContent={<Icon icon="lucide:arrow-right" width={16} height={16} />}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Payment */}
              {activeStep === 1 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                  
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                    className="mb-6"
                  >
                    <Radio 
                      value="credit_card" 
                      description="Pay with Visa, Mastercard, or American Express"
                      endContent={
                        <div className="flex gap-1">
                          <Icon icon="logos:visa" width={32} height={20} />
                          <Icon icon="logos:mastercard" width={32} height={20} />
                          <Icon icon="logos:amex" width={32} height={20} />
                        </div>
                      }
                    >
                      Credit Card
                    </Radio>
                    <Radio 
                      value="paypal" 
                      description="Fast, secure payment with PayPal"
                      endContent={<Icon icon="logos:paypal" width={64} height={20} />}
                    >
                      PayPal
                    </Radio>
                    <Radio 
                      value="apple_pay" 
                      description="Quick and secure payment with Apple Pay"
                      endContent={<Icon icon="logos:apple-pay" width={48} height={20} />}
                    >
                      Apple Pay
                    </Radio>
                  </RadioGroup>
                  
                  {paymentMethod === 'credit_card' && (
                    <div className="space-y-4 mb-6">
                      <Input
                        label="Card Number"
                        name="cardNumber"
                        value={cardInfo.cardNumber}
                        onChange={handleCardInfoChange}
                        placeholder="1234 5678 9012 3456"
                        isRequired
                      />
                      <Input
                        label="Cardholder Name"
                        name="cardName"
                        value={cardInfo.cardName}
                        onChange={handleCardInfoChange}
                        placeholder="John Doe"
                        isRequired
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Expiry Date"
                          name="expiry"
                          value={cardInfo.expiry}
                          onChange={handleCardInfoChange}
                          placeholder="MM/YY"
                          isRequired
                        />
                        <Input
                          label="CVV"
                          name="cvv"
                          value={cardInfo.cvv}
                          onChange={handleCardInfoChange}
                          placeholder="123"
                          isRequired
                        />
                      </div>
                    </div>
                  )}
                  
                  <Divider className="my-6" />
                  
                  <h3 className="text-lg font-semibold mb-4">Billing Address</h3>
                  <Checkbox 
                    isSelected={sameAsShipping}
                    onValueChange={setSameAsShipping}
                    className="mb-4"
                  >
                    Same as shipping address
                  </Checkbox>
                  
                  {!sameAsShipping && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <Input label="First Name" isRequired />
                      <Input label="Last Name" isRequired />
                      <Input label="Address" className="md:col-span-2" isRequired />
                      <Input label="City" isRequired />
                      <Input label="State/Province" isRequired />
                      <Input label="ZIP/Postal Code" isRequired />
                      <Input label="Country" isRequired />
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="flat" 
                      onPress={handlePrevStep}
                      startContent={<Icon icon="lucide:arrow-left" width={16} height={16} />}
                    >
                      Back to Shipping
                    </Button>
                    <Button 
                      color="primary" 
                      onPress={handleNextStep}
                      endContent={<Icon icon="lucide:arrow-right" width={16} height={16} />}
                    >
                      Review Order
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Review */}
              {activeStep === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
                      <Card>
                        <CardBody className="p-4">
                          <p className="font-medium">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                          <p>{shippingInfo.address}</p>
                          <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                          <p>{shippingInfo.country}</p>
                          <p className="mt-2">{shippingInfo.email}</p>
                          <p>{shippingInfo.phone}</p>
                        </CardBody>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Shipping Method</h3>
                      <Card>
                        <CardBody className="p-4">
                          <p>
                            {shippingMethod === 'standard' && 'Standard Shipping (3-5 business days)'}
                            {shippingMethod === 'express' && 'Express Shipping (1-2 business days)'}
                            {shippingMethod === 'free' && 'Free Shipping (5-7 business days)'}
                          </p>
                        </CardBody>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Payment Method</h3>
                      <Card>
                        <CardBody className="p-4">
                          <div className="flex items-center gap-2">
                            {paymentMethod === 'credit_card' && (
                              <>
                                <Icon icon="logos:visa" width={32} height={20} />
                                <p>•••• •••• •••• {cardInfo.cardNumber.slice(-4) || '1234'}</p>
                              </>
                            )}
                            {paymentMethod === 'paypal' && (
                              <>
                                <Icon icon="logos:paypal" width={64} height={20} />
                                <p>{shippingInfo.email}</p>
                              </>
                            )}
                            {paymentMethod === 'apple_pay' && (
                              <>
                                <Icon icon="logos:apple-pay" width={48} height={20} />
                                <p>Apple Pay</p>
                              </>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Order Items</h3>
                      <Card>
                        <CardBody className="p-4">
                          {cartItems.map(item => (
                            <div key={item.product.id} className="flex justify-between items-center py-2 border-b border-default-100 last:border-0">
                              <div className="flex items-center gap-2">
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.name} 
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                  <p className="font-medium">{item.product.name}</p>
                                  <p className="text-sm text-default-500">
                                    Qty: {item.quantity}
                                    {item.size && ` | Size: ${item.size}`}
                                    {item.color && ` | Color: ${item.color}`}
                                  </p>
                                </div>
                              </div>
                              <p className="font-medium">
                                ${((item.product.discount > 0 
                                  ? item.product.price * (1 - item.product.discount / 100) 
                                  : item.product.price) * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Button 
                      variant="flat" 
                      onPress={handlePrevStep}
                      startContent={<Icon icon="lucide:arrow-left" width={16} height={16} />}
                    >
                      Back to Payment
                    </Button>
                    <Button 
                      color="primary" 
                      onPress={handlePlaceOrder}
                      endContent={<Icon icon="lucide:check" width={16} height={16} />}
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-80">
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-default-600">Items ({cartItems.reduce((total, item) => total + item.quantity, 0)})</span>
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
              
              {/* Order Items Preview */}
              <div className="mt-4">
                <h3 className="font-medium mb-2">Items in Your Order</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {cartItems.map(item => (
                    <div key={item.product.id} className="flex gap-2">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-default-500">
                          Qty: {item.quantity}
                          {item.size && ` | ${item.size}`}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        ${((item.product.discount > 0 
                          ? item.product.price * (1 - item.product.discount / 100) 
                          : item.product.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* Secure Checkout */}
          <div className="mt-4 p-4 bg-content1 rounded-lg border border-default-200">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="lucide:lock" className="text-success" width={16} height={16} />
              <span className="font-medium">Secure Checkout</span>
            </div>
            <p className="text-sm text-default-500">
              Your payment information is processed securely. We do not store credit card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;