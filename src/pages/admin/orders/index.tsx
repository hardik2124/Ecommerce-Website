import React from 'react';
import { 
  Button, 
  Input, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Card,
  CardBody,
  Divider
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { mockOrders } from '../../../data/mock-data';
import { Order } from '../../../types/order';

const AdminOrders: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [orders, setOrders] = React.useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState<string>('all');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  
  const ordersPerPage = 10;
  
  // Filter orders based on search and status
  const filteredOrders = React.useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, selectedStatus]);
  
  // Paginate orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    onOpen();
  };
  
  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };
  
  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'success';
      case 'Processing':
        return 'primary';
      case 'Shipped':
        return 'secondary';
      case 'Cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Button 
          variant="flat" 
          startContent={<Icon icon="lucide:download" width={16} height={16} />}
        >
          Export Orders
        </Button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Search orders..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          startContent={<Icon icon="lucide:search" width={16} height={16} className="text-default-400" />}
          className="sm:max-w-xs"
        />
        
        <div className="flex gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="flat" 
                endContent={<Icon icon="lucide:chevron-down" width={16} height={16} />}
              >
                Status: {selectedStatus === 'all' ? 'All' : selectedStatus}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Status"
              selectionMode="single"
              selectedKeys={[selectedStatus]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                if (selected) setSelectedStatus(selected);
              }}
            >
              <DropdownItem key="all">All Statuses</DropdownItem>
              <DropdownItem key="Processing">Processing</DropdownItem>
              <DropdownItem key="Shipped">Shipped</DropdownItem>
              <DropdownItem key="Delivered">Delivered</DropdownItem>
              <DropdownItem key="Cancelled">Cancelled</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          
          <Button 
            variant="flat" 
            onPress={() => {
              setSearchQuery('');
              setSelectedStatus('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      </div>
      
      {/* Orders Table */}
      <Table aria-label="Orders table">
        <TableHeader>
          <TableColumn>ORDER #</TableColumn>
          <TableColumn>CUSTOMER</TableColumn>
          <TableColumn>DATE</TableColumn>
          <TableColumn>TOTAL</TableColumn>
          <TableColumn>ITEMS</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {currentOrders.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>{order.items.length}</TableCell>
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
                    onPress={() => handleViewOrder(order)}
                    startContent={<Icon icon="lucide:eye" width={14} height={14} />}
                  >
                    View
                  </Button>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button 
                        size="sm" 
                        variant="flat"
                        endContent={<Icon icon="lucide:chevron-down" width={14} height={14} />}
                      >
                        Update
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Update status">
                      <DropdownItem 
                        key="processing" 
                        onPress={() => handleUpdateStatus(order.id, 'Processing')}
                      >
                        Processing
                      </DropdownItem>
                      <DropdownItem 
                        key="shipped" 
                        onPress={() => handleUpdateStatus(order.id, 'Shipped')}
                      >
                        Shipped
                      </DropdownItem>
                      <DropdownItem 
                        key="delivered" 
                        onPress={() => handleUpdateStatus(order.id, 'Delivered')}
                      >
                        Delivered
                      </DropdownItem>
                      <DropdownItem 
                        key="cancelled" 
                        color="danger"
                        onPress={() => handleUpdateStatus(order.id, 'Cancelled')}
                      >
                        Cancelled
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-default-500 text-sm">
          Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
        </p>
        <Pagination
          total={totalPages}
          initialPage={currentPage}
          onChange={setCurrentPage}
        />
      </div>
      
      {/* Order Details Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="flex justify-between items-center w-full">
                  <span>Order #{selectedOrder?.id}</span>
                  <Chip 
                    color={getOrderStatusColor(selectedOrder?.status || '') as any}
                    variant="flat"
                  >
                    {selectedOrder?.status}
                  </Chip>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Customer Info */}
                  <Card>
                    <CardBody>
                      <h3 className="text-lg font-semibold mb-2">Customer</h3>
                      <p className="font-medium">{selectedOrder?.customer}</p>
                      <p className="text-default-500">{selectedOrder?.email}</p>
                      <p className="text-default-500">{selectedOrder?.phone}</p>
                    </CardBody>
                  </Card>
                  
                  {/* Shipping Info */}
                  <Card>
                    <CardBody>
                      <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                      <p>{selectedOrder?.shippingAddress?.street}</p>
                      <p>{selectedOrder?.shippingAddress?.city}, {selectedOrder?.shippingAddress?.state} {selectedOrder?.shippingAddress?.zip}</p>
                      <p>{selectedOrder?.shippingAddress?.country}</p>
                    </CardBody>
                  </Card>
                  
                  {/* Order Info */}
                  <Card>
                    <CardBody>
                      <h3 className="text-lg font-semibold mb-2">Order Info</h3>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-default-500">Date:</span>
                          <span>{new Date(selectedOrder?.date || '').toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-default-500">Payment:</span>
                          <span>{selectedOrder?.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-default-500">Shipping:</span>
                          <span>{selectedOrder?.shippingMethod}</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  
                  {/* Order Items */}
                  <div className="md:col-span-3">
                    <h3 className="text-lg font-semibold mb-2">Order Items</h3>
                    <Table aria-label="Order items">
                      <TableHeader>
                        <TableColumn>PRODUCT</TableColumn>
                        <TableColumn>PRICE</TableColumn>
                        <TableColumn>QUANTITY</TableColumn>
                        <TableColumn>TOTAL</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder?.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-10 h-10 object-cover rounded"
                                />
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  {item.variant && <p className="text-default-500 text-xs">{item.variant}</p>}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {/* Order Summary */}
                  <div className="md:col-span-3">
                    <Card>
                      <CardBody>
                        <div className="flex flex-col items-end">
                          <div className="w-full max-w-xs space-y-2">
                            <div className="flex justify-between">
                              <span className="text-default-500">Subtotal:</span>
                              <span>${(selectedOrder?.total || 0) * 0.9.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-default-500">Shipping:</span>
                              <span>${(selectedOrder?.total || 0) * 0.05.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-default-500">Tax:</span>
                              <span>${(selectedOrder?.total || 0) * 0.05.toFixed(2)}</span>
                            </div>
                            <Divider />
                            <div className="flex justify-between font-semibold">
                              <span>Total:</span>
                              <span>${selectedOrder?.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Dropdown>
                  <DropdownTrigger>
                    <Button 
                      color="primary"
                      endContent={<Icon icon="lucide:chevron-down" width={16} height={16} />}
                    >
                      Update Status
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Update status">
                    <DropdownItem 
                      key="processing" 
                      onPress={() => handleUpdateStatus(selectedOrder?.id || '', 'Processing')}
                    >
                      Processing
                    </DropdownItem>
                    <DropdownItem 
                      key="shipped" 
                      onPress={() => handleUpdateStatus(selectedOrder?.id || '', 'Shipped')}
                    >
                      Shipped
                    </DropdownItem>
                    <DropdownItem 
                      key="delivered" 
                      onPress={() => handleUpdateStatus(selectedOrder?.id || '', 'Delivered')}
                    >
                      Delivered
                    </DropdownItem>
                    <DropdownItem 
                      key="cancelled" 
                      color="danger"
                      onPress={() => handleUpdateStatus(selectedOrder?.id || '', 'Cancelled')}
                    >
                      Cancelled
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminOrders;