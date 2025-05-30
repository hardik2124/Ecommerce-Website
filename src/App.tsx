import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Spinner } from '@heroui/react';

// Layouts
import MainLayout from './layouts/main-layout';
import AdminLayout from './layouts/admin-layout';

// Lazy loaded pages
const Home = React.lazy(() => import('./pages/home'));
const ProductList = React.lazy(() => import('./pages/product-list'));
const ProductDetail = React.lazy(() => import('./pages/product-detail'));
const Cart = React.lazy(() => import('./pages/cart'));
const Checkout = React.lazy(() => import('./pages/checkout'));
const Account = React.lazy(() => import('./pages/account'));
const Login = React.lazy(() => import('./pages/login'));
const Register = React.lazy(() => import('./pages/register'));

// Admin pages
const AdminDashboard = React.lazy(() => import('./pages/admin/dashboard'));
const AdminProducts = React.lazy(() => import('./pages/admin/products'));
const AdminOrders = React.lazy(() => import('./pages/admin/orders'));
const AdminCustomers = React.lazy(() => import('./pages/admin/customers'));

// Context providers
import { CartProvider } from './contexts/cart-context';
import { AuthProvider } from './contexts/auth-context';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <React.Suspense fallback={
            <div className="h-screen w-screen flex items-center justify-center">
              <Spinner size="lg" color="primary" />
            </div>
          }>
            <Switch>
              {/* Admin Routes */}
              <Route path="/admin">
                <AdminLayout>
                  <Switch>
                    <Route exact path="/admin" component={AdminDashboard} />
                    <Route path="/admin/products" component={AdminProducts} />
                    <Route path="/admin/orders" component={AdminOrders} />
                    <Route path="/admin/customers" component={AdminCustomers} />
                  </Switch>
                </AdminLayout>
              </Route>
              
              {/* Auth Routes */}
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              
              {/* Main Routes */}
              <Route>
                <MainLayout>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/products" exact component={ProductList} />
                    <Route path="/products/:id" component={ProductDetail} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/account" component={Account} />
                  </Switch>
                </MainLayout>
              </Route>
            </Switch>
          </React.Suspense>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;