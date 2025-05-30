import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Tabs, 
  Tab, 
  Card, 
  CardBody, 
  Button, 
  Input,
  Avatar,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Chip
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../../contexts/auth-context';
import { mockOrders } from '../../data/mock-data';

const Account: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get('tab');
  
  const [selectedTab, setSelectedTab] = React.useState(tabParam || 'profile');
  const [profileForm, setProfileForm] = React.useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save profile changes
    alert('Profile updated successfully!');
  };
  
  const getOrderStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'processing':
        return 'primary';
      case 'shipped':
        return 'secondary';
      case 'cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <Tabs 
        selectedKey={selectedTab} 
        onSelectionChange={key => setSelectedTab(key as string)}
        aria-label="Account tabs"
      >
        <Tab key="profile" title="Profile">
          <Card>
            <CardBody className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="flex flex-col items-center">
                    <Avatar 
                      src={`https://img.heroui.chat/image/avatar?w=200&h=200&u=${user?.id || 1}`}
                      className="w-32 h-32"
                    />
                    <h2 className="text-xl font-semibold mt-4">{user?.name}</h2>
                    <p className="text-default-500">{user?.email}</p>
                    <Button 
                      color="primary" 
                      variant="flat" 
                      className="mt-4"
                      startContent={<Icon icon="lucide:upload" width={16} height={16} />}
                    >
                      Change Photo
                    </Button>
                  </div>
                  
                  <Divider className="my-6" />
                  
                  <div>
                    <h3 className="font-semibold mb-2">Account Info</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-default-500">Member since</span>
                        <span>June 2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-default-500">Account type</span>
                        <span>{user?.isAdmin ? 'Admin' : 'Customer'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                  
                  <form onSubmit={handleProfileSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <Input
                        label="Full Name"
                        name="name"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                      />
                      <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                      />
                      <Input
                        label="Phone"
                        name="phone"
                        value={profileForm.phone}
                        onChange={handleProfileChange}
                      />
                      <div className="md:col-span-2">
                        <Divider className="my-4" />
                        <h3 className="font-semibold mb-4">Address</h3>
                      </div>
                      <Input
                        label="Address"
                        name="address"
                        value={profileForm.address}
                        onChange={handleProfileChange}
                        className="md:col-span-2"
                      />
                      <Input
                        label="City"
                        name="city"
                        value={profileForm.city}
                        onChange={handleProfileChange}
                      />
                      <Input
                        label="State/Province"
                        name="state"
                        value={profileForm.state}
                        onChange={handleProfileChange}
                      />
                      <Input
                        label="ZIP/Postal Code"
                        name="zipCode"
                        value={profileForm.zipCode}
                        onChange={handleProfileChange}
                      />
                      <Input
                        label="Country"
                        name="country"
                        value={profileForm.country}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        color="primary" 
                        type="submit"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="orders" title="Orders">
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold mb-6">Order History</h2>
              
              <Table aria-label="Order history table">
                <TableHeader>
                  <TableColumn>ORDER #</TableColumn>
                  <TableColumn>DATE</TableColumn>
                  <TableColumn>ITEMS</TableColumn>
                  <TableColumn>TOTAL</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {mockOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>{order.items.length} items</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip 
                          color={getOrderStatusColor(order.status) as any}
                          variant="flat"
                          size="sm"
                        >
                          {order.status}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="flat"
                            startContent={<Icon icon="lucide:eye" width={14} height={14} />}
                          >
                            View
                          </Button>
                          {order.status === 'Delivered' && (
                            <Button 
                              size="sm" 
                              variant="flat"
                              color="primary"
                              startContent={<Icon icon="lucide:repeat" width={14} height={14} />}
                            >
                              Reorder
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="wishlist" title="Wishlist">
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="overflow-hidden">
                    <CardBody className="p-0">
                      <img 
                        src={`https://img.heroui.chat/image/fashion?w=400&h=300&u=${i + 10}`} 
                        alt={`Wishlist item ${i}`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold">Product Name {i}</h3>
                        <p className="text-default-500 text-sm">Category</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-semibold">${(49.99 + i * 10).toFixed(2)}</span>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              color="primary" 
                              variant="flat"
                              isIconOnly
                              aria-label="Add to cart"
                            >
                              <Icon icon="lucide:shopping-cart" width={16} height={16} />
                            </Button>
                            <Button 
                              size="sm" 
                              color="danger" 
                              variant="flat"
                              isIconOnly
                              aria-label="Remove from wishlist"
                            >
                              <Icon icon="lucide:trash-2" width={16} height={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="security" title="Security">
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold mb-4">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <Input
                      label="Current Password"
                      type="password"
                      placeholder="Enter current password"
                    />
                    <Input
                      label="New Password"
                      type="password"
                      placeholder="Enter new password"
                    />
                    <Input
                      label="Confirm New Password"
                      type="password"
                      placeholder="Confirm new password"
                    />
                    <Button color="primary">Update Password</Button>
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <h3 className="font-semibold mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Protect your account with 2FA</p>
                      <p className="text-default-500 text-sm">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button color="primary" variant="flat">Enable 2FA</Button>
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <h3 className="font-semibold mb-4">Login Sessions</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border border-default-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Icon icon="lucide:monitor" className="text-primary" width={20} height={20} />
                        </div>
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-default-500 text-sm">
                            {navigator.userAgent.includes('Windows') ? 'Windows' : 
                             navigator.userAgent.includes('Mac') ? 'Mac OS' : 'Unknown OS'} • 
                            {navigator.userAgent.includes('Chrome') ? ' Chrome' : 
                             navigator.userAgent.includes('Firefox') ? ' Firefox' : 
                             navigator.userAgent.includes('Safari') ? ' Safari' : ' Unknown Browser'}
                          </p>
                        </div>
                      </div>
                      <Badge color="success">Active</Badge>
                    </div>
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <h3 className="font-semibold mb-4">Delete Account</h3>
                  <div>
                    <p className="text-default-500 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button color="danger" variant="flat">Delete Account</Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Account;