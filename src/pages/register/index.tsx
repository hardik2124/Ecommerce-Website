import React from 'react';
import { Link as RouteLink, useHistory } from 'react-router-dom';
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

const Register: React.FC = () => {
  const history = useHistory();
  const { register, isLoading, error } = useAuth();
  
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [agreeTerms, setAgreeTerms] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState('');
  
  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword() || !agreeTerms) {
      return;
    }
    
    const success = await register(email, password, name);
    if (success) {
      history.push('/');
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
          <h1 className="mt-6 text-3xl font-bold">Create an account</h1>
          <p className="mt-2 text-default-500">Join our community of fashion enthusiasts</p>
        </div>
        
        <Card>
          <CardBody className="p-6">
            <form onSubmit={handleRegister}>
              {error && (
                <div className="mb-4 p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={name}
                  onValueChange={setName}
                  placeholder="Enter your full name"
                  isRequired
                />
                
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
                  placeholder="Create a password"
                  isRequired
                />
                
                <Input
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onValueChange={setConfirmPassword}
                  placeholder="Confirm your password"
                  isInvalid={!!passwordError}
                  errorMessage={passwordError}
                  isRequired
                />
                
                <Checkbox 
                  isSelected={agreeTerms}
                  onValueChange={setAgreeTerms}
                  isRequired
                >
                  I agree to the{' '}
                  <Link href="#" size="sm">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="#" size="sm">Privacy Policy</Link>
                </Checkbox>
              </div>
              
              <Button 
                type="submit" 
                color="primary" 
                fullWidth 
                className="mt-6"
                isLoading={isLoading}
                isDisabled={!agreeTerms}
              >
                Create Account
              </Button>
              
              <Divider className="my-6">or sign up with</Divider>
              
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
              Already have an account?{' '}
              <Link as={RouteLink} to="/login" color="primary">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;