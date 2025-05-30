import React from 'react';
import { Link as RouteLink, useHistory, useLocation } from 'react-router-dom';
import { 
  Card, 
  CardBody, 
  CardFooter,
  Input,
  Button,
  Divider,
  Checkbox,
  Link
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../../contexts/auth-context';

const Login: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { login, isLoading, error } = useAuth();
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  
  // Get redirect path from query params or default to home
  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get('redirect') || '/';
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password);
    if (success) {
      history.push(redirectTo);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-content2">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <RouteLink to="/" className="inline-flex items-center gap-2">
            <Icon icon="lucide:shopping-bag" width={32} height={32} className="text-primary" />
            <span className="text-2xl font-bold">STYLISH</span>
          </RouteLink>
          <h1 className="mt-6 text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-default-500">Sign in to your account</p>
        </div>
        
        <Card>
          <CardBody className="p-6">
            <form onSubmit={handleLogin}>
              {error && (
                <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onValueChange={setEmail}
                  placeholder="Enter your email"
                  isRequired
                />
                
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onValueChange={setPassword}
                  placeholder="Enter your password"
                  isRequired
                />
                
                <div className="flex items-center justify-between">
                  <Checkbox 
                    isSelected={rememberMe}
                    onValueChange={setRememberMe}
                  >
                    Remember me
                  </Checkbox>
                  
                  <Link href="#" size="sm">Forgot password?</Link>
                </div>
              </div>
              
              <Button 
                type="submit" 
                color="primary" 
                fullWidth 
                className="mt-6"
                isLoading={isLoading}
              >
                Sign In
              </Button>
              
              <Divider className="my-6">or continue with</Divider>
              
              <div className="grid grid-cols-3 gap-3">
                <Button variant="bordered" className="w-full">
                  <Icon icon="logos:google-icon" width={20} height={20} />
                </Button>
                <Button variant="bordered" className="w-full">
                  <Icon icon="logos:facebook" width={20} height={20} />
                </Button>
                <Button variant="bordered" className="w-full">
                  <Icon icon="logos:apple" width={20} height={20} />
                </Button>
              </div>
            </form>
          </CardBody>
          <CardFooter className="justify-center p-6 pt-0">
            <p className="text-center text-default-500">
              Don't have an account?{' '}
              <Link as={RouteLink} to="/register" color="primary">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
        
        {/* Demo Accounts */}
        <div className="mt-6 p-4 bg-content1 rounded-lg border border-default-200">
          <h3 className="text-sm font-medium mb-2">Demo Accounts</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Admin:</span>
              <span className="text-default-500">admin@example.com / password</span>
            </div>
            <div className="flex justify-between">
              <span>Customer:</span>
              <span className="text-default-500">user@example.com / password</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;