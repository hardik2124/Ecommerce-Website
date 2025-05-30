import React from 'react';
import { User } from '../types/user';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isLoading: false,
  error: null,
});

export const useAuth = () => React.useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  // Check if user is logged in on initial render
  React.useEffect(() => {
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Failed to parse user from localStorage', error);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock API call - in a real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (email === 'admin@example.com' && password === 'password') {
        const userData: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          isAdmin: true,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsLoading(false);
        return true;
      } else if (email === 'user@example.com' && password === 'password') {
        const userData: User = {
          id: '2',
          name: 'Regular User',
          email: 'user@example.com',
          isAdmin: false,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsLoading(false);
        return true;
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      setError('An error occurred during login');
      setIsLoading(false);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock API call - in a real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        isAdmin: false,
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    } catch (error) {
      setError('An error occurred during registration');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    isAuthenticated: !!user,
    user,
    login,
    register,
    logout,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};