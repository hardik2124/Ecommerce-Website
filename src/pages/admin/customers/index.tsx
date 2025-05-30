import React from 'react';
import { 
  Button, 
  Input, 
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Card,
  CardBody,
  Tabs,
  Tab,
  Avatar,
  Chip
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { mockCustomers } from '../../../data/mock-data';
import { Customer } from '../../../types/customer';

const AdminCustomers: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [customers, setCustomers] = React.useState<Customer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null);
  
  const customersPerPage = 10;
  
  // Filter customers based on search
  const filteredCustomers = React.useMemo(() => {
    return customers.filter(customer => {
      const searchLower = searchQuery.toLowerCase();
      return (
        customer.name.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        customer.phone.toLowerCase().includes(searchLower)
      );
    });
  }, [customers, searchQuery]);
  
  // Paginate customers
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  
  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    onOpen();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <Button 
          variant="flat" 
          startContent={<Icon icon="lucide:download" width={16} height={16} />}
        >
          Export Customers
        </Button>
      </div>
      
      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Search customers..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          startContent={<Icon icon="lucide:search" width={16} height={16} className="text-default-400" />}
          className="sm:max-w-xs"
        />
        
        <Button 
          variant="flat" 
          onPress={() => setSearchQuery('')}
        >
          Clear
        </Button>
      </div>
      
      {/* Customers Table */}
      <Table aria-label="Customers table">
        <TableHeader>
          <TableColumn>CUSTOMER</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>PHONE</TableColumn>
          <TableColumn>ORDERS</TableColumn>
          <TableColumn>TOTAL SPENT</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {currentCustomers.map(customer => (
            <TableRow key={customer.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar 
                    src={`https://img.heroui.chat/image/avatar?w=200&h=200&u=${customer.id}`} 
                    size="sm"
                  />
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-default-500 text-xs">
                      {customer.isVIP && (
                        <span className="text-warning">VIP Customer</span>
                      )}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.orderCount}</TableCell>
              <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="flat"
                    onPress={() => handleViewCustomer(customer)}
                    startContent={<Icon icon="lucide:eye" width={14} height={14} />}
                  >
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    variant="flat"
                    color="primary"
                    startContent={<Icon icon="lucide:mail" width={14} height={14} />}
                  >
                    Email
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-default-500 text-sm">
          Showing {indexOfFirstCustomer + 1} to {Math.min(indexOfLastCustomer, filteredCustomers.length)} of {filteredCustomers.length} customers
        </p>
        <Pagination
          total={totalPages}
          initialPage={currentPage}
          onChange={setCurrentPage}
        />
      </div>
      
      {/* Customer Details Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="flex items-center gap-3">
                  <Avatar 
                    src={`https://img.heroui.chat/image/avatar?w=200&h=200&u=${selectedCustomer?.id}`} 
                    size="lg"
                  />
                  <div>
                    <h2 className="text-xl">{selectedCustomer?.name}</h2>
                    <p className="text-default-500">{selectedCustomer?.email}</p>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <Tabs aria-label="Customer details">
                  <Tab key="details" title="Details">
                    <Card>
                      <CardBody>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-default-500">Name:</span>
                                <span>{selectedCustomer?.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-default-500">Email:</span>
                                <span>{selectedCustomer?.email}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-default-500">Phone:</span>
                                <span>{selectedCustomer?.phone}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-default-500">Member Since:</span>
                                <span>{new Date(selectedCustomer?.joinDate || '').toLocaleDateString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-default-500">Status:</span>
                                <span>
                                  {selectedCustomer?.isVIP ? (
                                    <Chip color="warning" variant="flat" size="sm">VIP</Chip>
                                  ) : (
                                    <Chip color="success" variant="flat" size="sm">Active</Chip>
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                            <p>{selectedCustomer?.address?.street}</p>
                            <p>{selectedCustomer?.address?.city}, {selectedCustomer?.address?.state} {selectedCustomer?.address?.zip}</p>
                            <p>{selectedCustomer?.address?.country}</p>
                            
                            <h3 className="text-lg font-semibold mt-6 mb-4">Billing Address</h3>
                            <p>Same as shipping address</p>
                          </div>
                        </div>
                        
                        <div className="mt-8">
                          <h3 className="text-lg font-semibold mb-4">Customer Stats</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                              <CardBody className="text-center">
                                <p className="text-default-500">Total Orders</p>
                                <p className="text-3xl font-bold">{selectedCustomer?.orderCount}</p>
                              </CardBody>
                            </Card>
                            <Card>
                              <CardBody className="text-center">
                                <p className="text-default-500">Total Spent</p>
                                <p className="text-3xl font-bold">${selectedCustomer?.totalSpent.toFixed(2)}</p>
                              </CardBody>
                            </Card>
                            <Card>
                              <CardBody className="text-center">
                                <p className="text-default-500">Average Order Value</p>
                                <p className="text-3xl font-bold">
                                  ${(selectedCustomer?.totalSpent || 0) / (selectedCustomer?.orderCount || 1) > 0 
                                    ? ((selectedCustomer?.totalSpent || 0) / (selectedCustomer?.orderCount || 1)).toFixed(2) 
                                    : '0.00'}
                                </p>
                              </CardBody>
                            </Card>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>
                  
                  <Tab key="orders" title="Orders">
                    <Card>
                      <CardBody>
                        <Table aria-label="Customer orders">
                          <TableHeader>
                            <TableColumn>ORDER #</TableColumn>
                            <TableColumn>DATE</TableColumn>
                            <TableColumn>ITEMS</TableColumn>
                            <TableColumn>TOTAL</TableColumn>
                            <TableColumn>STATUS</TableColumn>
                          </TableHeader>
                          <TableBody>
                            {selectedCustomer?.orders?.map(order => (
                              <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                <TableCell>{order.items}</TableCell>
                                <TableCell>${order.total.toFixed(2)}</TableCell>
                                <TableCell>
                                  <Chip 
                                    color={
                                      order.status === 'Delivered' ? 'success' :
                                      order.status === 'Processing' ? 'primary' :
                                      order.status === 'Shipped' ? 'secondary' :
                                      'danger'
                                    }
                                    variant="flat"
                                    size="sm"
                                  >
                                    {order.status}
                                  </Chip>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardBody>
                    </Card>
                  </Tab>
                  
                  <Tab key="notes" title="Notes">
                    <Card>
                      <CardBody>
                        <div className="mb-4">
                          <Input
                            label="Add a note"
                            placeholder="Type your note here..."
                            endContent={
                              <Button color="primary" size="sm">Add</Button>
                            }
                          />
                        </div>
                        
                        <div className="space-y-4">
                          {selectedCustomer?.notes?.map((note, index) => (
                            <div key={index} className="p-3 border border-default-200 rounded-lg">
                              <div className="flex justify-between items-start">
                                <p className="font-medium">{note.author}</p>
                                <p className="text-default-500 text-sm">{new Date(note.date).toLocaleDateString()}</p>
                              </div>
                              <p className="mt-2">{note.content}</p>
                            </div>
                          ))}
                          
                          {(!selectedCustomer?.notes || selectedCustomer.notes.length === 0) && (
                            <div className="text-center py-8 text-default-500">
                              <Icon icon="lucide:file-text" className="mx-auto mb-2" width={32} height={32} />
                              <p>No notes for this customer yet</p>
                            </div>
                          )}
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button 
                  color="primary"
                  startContent={<Icon icon="lucide:mail" width={16} height={16} />}
                >
                  Email Customer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminCustomers;