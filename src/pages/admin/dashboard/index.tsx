import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { mockOrders, mockProducts } from '../../../data/mock-data';

const AdminDashboard: React.FC = () => {
  // Calculate dashboard metrics
  const totalSales = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = mockOrders.length;
  const totalProducts = mockProducts.length;
  const pendingOrders = mockOrders.filter(order => 
    order.status === 'Processing' || order.status === 'Shipped'
  ).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button 
            variant="flat" 
            startContent={<Icon icon="lucide:download" width={16} height={16} />}
          >
            Export
          </Button>
          <Button 
            color="primary"
            startContent={<Icon icon="lucide:plus" width={16} height={16} />}
          >
            New Report
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardBody className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-default-500">Total Sales</p>
                <p className="text-2xl font-bold">${totalSales.toFixed(2)}</p>
                <p className="text-success text-sm flex items-center gap-1 mt-1">
                  <Icon icon="lucide:trending-up" width={14} height={14} />
                  <span>12% from last month</span>
                </p>
              </div>
              <div className="p-3 bg-primary/10 h-fit rounded-lg">
                <Icon icon="lucide:dollar-sign" className="text-primary" width={24} height={24} />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-default-500">Total Orders</p>
                <p className="text-2xl font-bold">{totalOrders}</p>
                <p className="text-success text-sm flex items-center gap-1 mt-1">
                  <Icon icon="lucide:trending-up" width={14} height={14} />
                  <span>5% from last month</span>
                </p>
              </div>
              <div className="p-3 bg-secondary/10 h-fit rounded-lg">
                <Icon icon="lucide:shopping-bag" className="text-secondary" width={24} height={24} />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-default-500">Total Products</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
                <p className="text-success text-sm flex items-center gap-1 mt-1">
                  <Icon icon="lucide:trending-up" width={14} height={14} />
                  <span>3% from last month</span>
                </p>
              </div>
              <div className="p-3 bg-success/10 h-fit rounded-lg">
                <Icon icon="lucide:package" className="text-success" width={24} height={24} />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-default-500">Pending Orders</p>
                <p className="text-2xl font-bold">{pendingOrders}</p>
                <p className="text-danger text-sm flex items-center gap-1 mt-1">
                  <Icon icon="lucide:trending-down" width={14} height={14} />
                  <span>2% from last month</span>
                </p>
              </div>
              <div className="p-3 bg-warning/10 h-fit rounded-lg">
                <Icon icon="lucide:clock" className="text-warning" width={24} height={24} />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <Button 
                variant="light" 
                color="primary"
                endContent={<Icon icon="lucide:arrow-right" width={16} height={16} />}
                as="a"
                href="/admin/orders"
              >
                View All
              </Button>
            </CardHeader>
            <Divider />
            <CardBody>
              <Table aria-label="Recent orders table">
                <TableHeader>
                  <TableColumn>ORDER #</TableColumn>
                  <TableColumn>CUSTOMER</TableColumn>
                  <TableColumn>DATE</TableColumn>
                  <TableColumn>AMOUNT</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                  {mockOrders.slice(0, 5).map(order => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
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
        </div>
        
        {/* Top Selling Products */}
        <div>
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Top Selling Products</h2>
              <Button 
                variant="light" 
                color="primary"
                endContent={<Icon icon="lucide:arrow-right" width={16} height={16} />}
                as="a"
                href="/admin/products"
              >
                View All
              </Button>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="space-y-4">
                {mockProducts
                  .sort((a, b) => b.sales - a.sales)
                  .slice(0, 5)
                  .map(product => (
                    <div key={product.id} className="flex items-center gap-3">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-default-500 text-sm">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${product.price.toFixed(2)}</p>
                        <p className="text-success text-sm">{product.sales} sold</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      
      {/* Sales Overview */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Sales Overview</h2>
          </CardHeader>
          <Divider />
          <CardBody className="p-6">
            <div className="h-80 flex items-center justify-center">
              <p className="text-default-500">
                Chart would be displayed here (using Chart.js or Recharts)
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;