import { Product } from '../types/product';
import { Order } from '../types/order';
import { Customer } from '../types/customer';

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'A comfortable and versatile white t-shirt made from 100% cotton.',
    price: 29.99,
    discount: 0,
    category: 'Men',
    image: 'https://img.heroui.chat/image/clothing?w=600&h=800&u=1',
    additionalImages: [
      'https://img.heroui.chat/image/clothing?w=600&h=800&u=2',
      'https://img.heroui.chat/image/clothing?w=600&h=800&u=3',
      'https://img.heroui.chat/image/clothing?w=600&h=800&u=4',
    ],
    rating: 4.5,
    reviews: 120,
    stock: 50,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Gray'],
    tags: ['t-shirt', 'casual', 'basics'],
    isNew: false,
    featured: true,
    sku: 'TS-WHT-001',
    sales: 89
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit jeans with a comfortable stretch fabric.',
    price: 59.99,
    discount: 10,
    category: 'Men',
    image: 'https://img.heroui.chat/image/clothing?w=600&h=800&u=5',
    additionalImages: [
      'https://img.heroui.chat/image/clothing?w=600&h=800&u=6',
      'https://img.heroui.chat/image/clothing?w=600&h=800&u=7',
    ],
    rating: 4.2,
    reviews: 85,
    stock: 30,
    sizes: ['30', '32', '34', '36'],
    colors: ['Blue', 'Black'],
    tags: ['jeans', 'denim', 'slim fit'],
    isNew: false,
    featured: false,
    sku: 'JN-SLM-001',
    sales: 64
  },
  {
    id: '3',
    name: 'Summer Floral Dress',
    description: 'Light and flowy floral dress perfect for summer days.',
    price: 49.99,
    discount: 0,
    category: 'Women',
    image: 'https://img.heroui.chat/image/clothing?w=600&h=800&u=8',
    additionalImages: [
      'https://img.heroui.chat/image/clothing?w=600&h=800&u=9',
      'https://img.heroui.chat/image/clothing?w=600&h=800&u=10',
    ],
    rating: 4.8,
    reviews: 156,
    stock: 25,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Blue', 'Pink', 'Yellow'],
    tags: ['dress', 'summer', 'floral'],
    isNew: true,
    featured: true,
    sku: 'DR-FLR-001',
    sales: 112
  },
  {
    id: '4',
    name: 'Leather Crossbody Bag',
    description: 'Stylish leather crossbody bag with multiple compartments.',
    price: 79.99,
    discount: 15,
    category: 'Accessories',
    image: 'https://img.heroui.chat/image/fashion?w=600&h=800&u=11',
    additionalImages: [
      'https://img.heroui.chat/image/fashion?w=600&h=800&u=12',
      'https://img.heroui.chat/image/fashion?w=600&h=800&u=13',
    ],
    rating: 4.6,
    reviews: 92,
    stock: 15,
    sizes: [],
    colors: ['Brown', 'Black', 'Tan'],
    tags: ['bag', 'leather', 'accessories'],
    isNew: false,
    featured: true,
    sku: 'BG-LTH-001',
    sales: 78
  },
  {
    id: '5',
    name: 'Running Sneakers',
    description: 'Lightweight and comfortable running shoes with cushioned soles.',
    price: 89.99,
    discount: 0,
    category: 'Shoes',
    image: 'https://img.heroui.chat/image/shoes?w=600&h=800&u=2',
    additionalImages: [
      'https://img.heroui.chat/image/shoes?w=600&h=800&u=3',
      'https://img.heroui.chat/image/shoes?w=600&h=800&u=4',
    ],
    rating: 4.4,
    reviews: 78,
    stock: 20,
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Black', 'White', 'Red'],
    tags: ['shoes', 'running', 'athletic'],
    isNew: true,
    featured: false,
    sku: 'SH-RUN-001',
    sales: 56
  },
  {
    id: '6',
    name: 'Oversized Hoodie',
    description: 'Cozy oversized hoodie with a kangaroo pocket and drawstring hood.',
    price: 45.99,
    discount: 0,
    category: 'Women',
    image: 'https://img.heroui.chat/image/clothing?w=600&h=800&u=11',
    additionalImages: [
      'https://img.heroui.chat/image/clothing?w=600&h=800&u=12',
      'https://img.heroui.chat/image/clothing?w=600&h=800&u=13',
    ],
    rating: 4.7,
    reviews: 103,
    stock: 40,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gray', 'Black', 'Pink'],
    tags: ['hoodie', 'casual', 'cozy'],
    isNew: false,
    featured: true,
    sku: 'HD-OVR-001',
    sales: 95
  },
  {
    id: '7',
    name: 'Aviator Sunglasses',
    description: 'Classic aviator sunglasses with UV protection.',
    price: 35.99,
    discount: 0,
    category: 'Accessories',
    image: 'https://img.heroui.chat/image/fashion?w=600&h=800&u=14',
    additionalImages: [
      'https://img.heroui.chat/image/fashion?w=600&h=800&u=15',
    ],
    rating: 4.3,
    reviews: 67,
    stock: 25,
    sizes: [],
    colors: ['Gold', 'Silver', 'Black'],
    tags: ['sunglasses', 'accessories', 'summer'],
    isNew: false,
    featured: false,
    sku: 'SG-AVT-001',
    sales: 42
  },
  {
    id: '8',
    name: 'Formal Blazer',
    description: 'Elegant formal blazer for professional settings.',
    price: 129.99,
    discount: 20,
    category: 'Men',
    image: 'https://img.heroui.chat/image/clothing?w=600&h=800&u=14',
    additionalImages: [
      'https://img.heroui.chat/image/clothing?w=600&h=800&u=15',
      'https://img.heroui.chat/image/clothing?w=600&h=800&u=16',
    ],
    rating: 4.6,
    reviews: 54,
    stock: 15,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'Black', 'Gray'],
    tags: ['blazer', 'formal', 'professional'],
    isNew: false,
    featured: true,
    sku: 'BZ-FRM-001',
    sales: 38
  },
  {
    id: '9',
    name: 'Leather Ankle Boots',
    description: 'Stylish leather ankle boots with a side zipper.',
    price: 119.99,
    discount: 0,
    category: 'Shoes',
    image: 'https://img.heroui.chat/image/shoes?w=600&h=800&u=5',
    additionalImages: [
      'https://img.heroui.chat/image/shoes?w=600&h=800&u=6',
      'https://img.heroui.chat/image/shoes?w=600&h=800&u=7',
    ],
    rating: 4.5,
    reviews: 89,
    stock: 12,
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['Brown', 'Black'],
    tags: ['boots', 'leather', 'ankle'],
    isNew: true,
    featured: false,
    sku: 'BT-ANK-001',
    sales: 67
  },
  {
    id: '10',
    name: 'Pleated Midi Skirt',
    description: 'Elegant pleated midi skirt with an elastic waistband.',
    price: 39.99,
    discount: 0,
    category: 'Women',
    image: 'https://img.heroui.chat/image/clothing?w=600&h=800&u=17',
    additionalImages: [
      'https://img.heroui.chat/image/clothing?w=600&h=800&u=18',
      'https://img.heroui.chat/image/clothing?w=600&h=800&u=19',
    ],
    rating: 4.4,
    reviews: 76,
    stock: 30,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Beige', 'Navy'],
    tags: ['skirt', 'midi', 'pleated'],
    isNew: false,
    featured: true,
    sku: 'SK-MID-001',
    sales: 58
  },
  {
    id: '11',
    name: 'Wireless Earbuds',
    description: 'High-quality wireless earbuds with noise cancellation.',
    price: 99.99,
    discount: 10,
    category: 'Accessories',
    image: 'https://img.heroui.chat/image/fashion?w=600&h=800&u=16',
    additionalImages: [
      'https://img.heroui.chat/image/fashion?w=600&h=800&u=17',
    ],
    rating: 4.7,
    reviews: 112,
    stock: 20,
    sizes: [],
    colors: ['White', 'Black'],
    tags: ['earbuds', 'wireless', 'audio'],
    isNew: true,
    featured: true,
    sku: 'EB-WRL-001',
    sales: 87
  },
  {
    id: '12',
    name: 'Denim Jacket',
    description: 'Classic denim jacket with button closure and multiple pockets.',
    price: 69.99,
    discount: 0,
    category: 'Men',
    image: 'https://img.heroui.chat/image/clothing?w=600&h=800&u=20',
    additionalImages: [
      'https://img.heroui.chat/image/clothing?w=600&h=800&u=21',
      'https://img.heroui.chat/image/clothing?w=600&h=800&u=22',
    ],
    rating: 4.5,
    reviews: 98,
    stock: 25,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Light Blue', 'Black'],
    tags: ['jacket', 'denim', 'casual'],
    isNew: false,
    featured: false,
    sku: 'JK-DNM-001',
    sales: 72
  }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    date: '2023-06-15T10:30:00',
    total: 129.97,
    status: 'Delivered',
    items: [
      {
        name: 'Classic White T-Shirt',
        price: 29.99,
        quantity: 2,
        image: 'https://img.heroui.chat/image/clothing?w=600&h=800&u=1',
        variant: 'White / M'
      },
      {
        name: 'Aviator Sunglasses',
        price: 35.99,
        quantity: 1,
        image: 'https://img.heroui.chat/image/fashion?w=600&h=800&u=14',
        variant: 'Gold'
      },
      {
        name: 'Leather Crossbody Bag',
        price: 79.99,
        quantity: 1,
        image: 'https://img.heroui.chat/image/fashion?w=600&h=800&u=11',
        variant: 'Brown'
      }
    ],
    shippingAddress: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'United States'
    },
    shippingMethod: 'Standard Shipping',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    date: '2023-06-18T14:45:00',
    total: 159.98,
    status: 'Shipped',
    items: [
      {
        name: 'Summer Floral Dress',
        price: 49.99,
        quantity: 1,
        image: 'https://img.heroui.chat/image/clothing?w=600&h=800&u=8',
        variant: 'Blue / S'
      },
      {
        name: 'Leather Ankle Boots',
        price: 119.99,
        quantity: 1,
        image: 'https://img.heroui.chat/image/shoes?w=600&h=800&u=5',
        variant: 'Brown / 7'
      }
    ],
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Somewhere',
      state: 'NY',
      zip: '67890',
      country: 'United States'
    },
    shippingMethod: 'Express Shipping',
    paymentMethod: 'PayPal'
  },
  {
    id: 'ORD-003',
    customer: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '(555) 456-7890',
    date: '2023-06-20T09:15:00',
    total: 89.99,
    status: 'Processing',
    items: [
      {
        name: 'Running Sneakers',
        price: 89.99,
        quantity: 1,
        image: 'https://img.heroui.chat/image/shoes?w=600&h=800&u=2',
        variant: 'Black / 10'
      }
    ],
    shippingAddress: {
      street: '789 Pine St',
      city: 'Elsewhere',
      state: 'TX',
      zip: '54321',
      country: 'United States'
    },
    shippingMethod: 'Standard Shipping',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-004',
    customer: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '(555) 234-5678',
    date: '2023-06-22T16:30:00',
    total: 91.98,
    status: 'Delivered',
    items: [
      {
        name: 'Oversized Hoodie',
        price: 45.99,
        quantity: 2,
        image: 'https://img.heroui.chat/image/clothing?w=600&h=800&u=11',
        variant: 'Gray / L'
      }
    ],
    shippingAddress: {
      street: '321 Maple Rd',
      city: 'Nowhere',
      state: 'FL',
      zip: '98765',
      country: 'United States'
    },
    shippingMethod: 'Standard Shipping',
    paymentMethod: 'Apple Pay'
  },
  {
    id: 'ORD-005',
    customer: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '(555) 876-5432',
    date: '2023-06-25T11:00:00',
    total: 103.99,
    status: 'Cancelled',
    items: [
      {
        name: 'Formal Blazer',
        price: 129.99,
        quantity: 1,
        image: 'https://img.heroui.chat/image/clothing?w=600&h=800&u=14',
        variant: 'Navy / M'
      }
    ],
    shippingAddress: {
      street: '654 Cedar Ln',
      city: 'Somewhere Else',
      state: 'WA',
      zip: '43210',
      country: 'United States'
    },
    shippingMethod: 'Express Shipping',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-006',
    customer: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phone: '(555) 345-6789',
    date: '2023-06-28T13:20:00',
    total: 119.97,
    status: 'Processing',
    items: [
      {
        name: 'Slim Fit Jeans',
        price: 59.99,
        quantity: 1,
        image: 'https://img.heroui.chat/image/clothing?w=600&h=800&u=5',
        variant: 'Blue / 32'
      },
      {
        name: 'Wireless Earbuds',
        price: 99.99,
        quantity: 1,
        image: 'https://img.heroui.chat/image/fashion?w=600&h=800&u=16',
        variant: 'White'
      }
    ],
    shippingAddress: {
      street: '987 Birch St',
      city: 'Anyplace',
      state: 'IL',
      zip: '56789',
      country: 'United States'
    },
    shippingMethod: 'Standard Shipping',
    paymentMethod: 'PayPal'
  }
];

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    joinDate: '2023-01-15T10:30:00',
    orderCount: 5,
    totalSpent: 429.95,
    isVIP: true,
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'United States'
    },
    orders: [
      {
        id: 'ORD-001',
        date: '2023-06-15T10:30:00',
        items: 3,
        total: 129.97,
        status: 'Delivered'
      },
      {
        id: 'ORD-008',
        date: '2023-05-20T14:15:00',
        items: 2,
        total: 89.98,
        status: 'Delivered'
      },
      {
        id: 'ORD-015',
        date: '2023-04-10T09:45:00',
        items: 1,
        total: 69.99,
        status: 'Delivered'
      }
    ],
    notes: [
      {
        author: 'Customer Support',
        date: '2023-06-16T11:30:00',
        content: 'Customer called about order ORD-001. Provided tracking information.'
      },
      {
        author: 'Sales Team',
        date: '2023-05-05T15:45:00',
        content: 'VIP customer. Offer 10% discount on next purchase.'
      }
    ]
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    joinDate: '2023-02-20T14:45:00',
    orderCount: 3,
    totalSpent: 259.96,
    isVIP: false,
    address: {
      street: '456 Oak Ave',
      city: 'Somewhere',
      state: 'NY',
      zip: '67890',
      country: 'United States'
    },
    orders: [
      {
        id: 'ORD-002',
        date: '2023-06-18T14:45:00',
        items: 2,
        total: 159.98,
        status: 'Shipped'
      },
      {
        id: 'ORD-012',
        date: '2023-04-25T10:30:00',
        items: 1,
        total: 99.98,
        status: 'Delivered'
      }
    ],
    notes: [
      {
        author: 'Customer Support',
        date: '2023-06-19T09:15:00',
        content: 'Customer inquired about return policy for order ORD-002.'
      }
    ]
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '(555) 456-7890',
    joinDate: '2023-03-10T09:15:00',
    orderCount: 2,
    totalSpent: 189.98,
    isVIP: false,
    address: {
      street: '789 Pine St',
      city: 'Elsewhere',
      state: 'TX',
      zip: '54321',
      country: 'United States'
    },
    orders: [
      {
        id: 'ORD-003',
        date: '2023-06-20T09:15:00',
        items: 1,
        total: 89.99,
        status: 'Processing'
      },
      {
        id: 'ORD-017',
        date: '2023-05-05T16:20:00',
        items: 1,
        total: 99.99,
        status: 'Delivered'
      }
    ],
    notes: []
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '(555) 234-5678',
    joinDate: '2023-02-05T16:30:00',
    orderCount: 4,
    totalSpent: 321.94,
    isVIP: true,
    address: {
      street: '321 Maple Rd',
      city: 'Nowhere',
      state: 'FL',
      zip: '98765',
      country: 'United States'
    },
    orders: [
      {
        id: 'ORD-004',
        date: '2023-06-22T16:30:00',
        items: 2,
        total: 91.98,
        status: 'Delivered'
      },
      {
        id: 'ORD-009',
        date: '2023-05-15T11:45:00',
        items: 3,
        total: 129.97,
        status: 'Delivered'
      },
      {
        id: 'ORD-020',
        date: '2023-04-02T14:10:00',
        items: 2,
        total: 99.99,
        status: 'Delivered'
      }
    ],
    notes: [
      {
        author: 'Sales Team',
        date: '2023-06-01T10:30:00',
        content: 'VIP customer. Sent birthday discount code.'
      }
    ]
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '(555) 876-5432',
    joinDate: '2023-04-15T11:00:00',
    orderCount: 1,
    totalSpent: 103.99,
    isVIP: false,
    address: {
      street: '654 Cedar Ln',
      city: 'Somewhere Else',
      state: 'WA',
      zip: '43210',
      country: 'United States'
    },
    orders: [
      {
        id: 'ORD-005',
        date: '2023-06-25T11:00:00',
        items: 1,
        total: 103.99,
        status: 'Cancelled'
      }
    ],
    notes: [
      {
        author: 'Customer Support',
        date: '2023-06-26T09:45:00',
        content: 'Customer requested cancellation of order ORD-005. Refund processed.'
      }
    ]
  },
  {
    id: '6',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phone: '(555) 345-6789',
    joinDate: '2023-03-25T13:20:00',
    orderCount: 3,
    totalSpent: 279.95,
    isVIP: false,
    address: {
      street: '987 Birch St',
      city: 'Anyplace',
      state: 'IL',
      zip: '56789',
      country: 'United States'
    },
    orders: [
      {
        id: 'ORD-006',
        date: '2023-06-28T13:20:00',
        items: 2,
        total: 119.97,
        status: 'Processing'
      },
      {
        id: 'ORD-013',
        date: '2023-05-10T15:30:00',
        items: 1,
        total: 79.99,
        status: 'Delivered'
      },
      {
        id: 'ORD-018',
        date: '2023-04-18T10:15:00',
        items: 2,
        total: 79.99,
        status: 'Delivered'
      }
    ],
    notes: []
  },
  {
    id: '7',
    name: 'David Miller',
    email: 'david.miller@example.com',
    phone: '(555) 567-8901',
    joinDate: '2023-01-30T10:15:00',
    orderCount: 5,
    totalSpent: 459.94,
    isVIP: true,
    address: {
      street: '753 Elm St',
      city: 'Othertown',
      state: 'OH',
      zip: '45678',
      country: 'United States'
    },
    orders: [
      {
        id: 'ORD-007',
        date: '2023-06-30T10:15:00',
        items: 3,
        total: 149.97,
        status: 'Processing'
      },
      {
        id: 'ORD-011',
        date: '2023-05-25T14:20:00',
        items: 2,
        total: 109.98,
        status: 'Delivered'
      },
      {
        id: 'ORD-016',
        date: '2023-04-15T11:30:00',
        items: 1,
        total: 99.99,
        status: 'Delivered'
      }
    ],
    notes: [
      {
        author: 'Sales Team',
        date: '2023-06-15T13:45:00',
        content: 'VIP customer. Frequent buyer, consider for loyalty program.'
      }
    ]
  },
  {
    id: '8',
    name: 'Jennifer Taylor',
    email: 'jennifer.taylor@example.com',
    phone: '(555) 678-9012',
    joinDate: '2023-02-10T15:30:00',
    orderCount: 2,
    totalSpent: 169.98,
    isVIP: false,
    address: {
      street: '159 Walnut Ave',
      city: 'Somecity',
      state: 'MI',
      zip: '23456',
      country: 'United States'
    },
    orders: [
      {
        id: 'ORD-010',
        date: '2023-06-05T15:30:00',
        items: 1,
        total: 89.99,
        status: 'Delivered'
      },
      {
        id: 'ORD-019',
        date: '2023-05-02T09:45:00',
        items: 1,
        total: 79.99,
        status: 'Delivered'
      }
    ],
    notes: []
  }
];
