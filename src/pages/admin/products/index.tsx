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
  Checkbox
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { mockProducts } from '../../../data/mock-data';
import { Product } from '../../../types/product';

const AdminProducts: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [products, setProducts] = React.useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  
  const productsPerPage = 10;
  
  // Filter products based on search and category
  const filteredProducts = React.useMemo(() => {
    return products.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);
  
  // Paginate products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    onOpen();
  };
  
  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };
  
  const confirmDeleteProduct = () => {
    if (selectedProduct) {
      setProducts(products.filter(p => p.id !== selectedProduct.id));
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    }
  };
  
  const handleAddNewProduct = () => {
    setSelectedProduct(null);
    onOpen();
  };
  
  const categories = ['Men', 'Women', 'Accessories', 'Shoes'];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button 
          color="primary"
          onPress={handleAddNewProduct}
          startContent={<Icon icon="lucide:plus" width={16} height={16} />}
        >
          Add New Product
        </Button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Search products..."
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
                Category: {selectedCategory === 'all' ? 'All' : selectedCategory}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Categories"
              selectionMode="single"
              selectedKeys={[selectedCategory]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                if (selected) setSelectedCategory(selected);
              }}
            >
              <DropdownItem key="all">All Categories</DropdownItem>
              {categories.map(category => (
                <DropdownItem key={category}>{category}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          
          <Button 
            variant="flat" 
            onPress={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      </div>
      
      {/* Products Table */}
      <Table aria-label="Products table">
        <TableHeader>
          <TableColumn>PRODUCT</TableColumn>
          <TableColumn>CATEGORY</TableColumn>
          <TableColumn>PRICE</TableColumn>
          <TableColumn>STOCK</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {currentProducts.map(product => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-default-500 text-xs">SKU: {product.sku || `SKU-${product.id}`}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                {product.discount > 0 ? (
                  <div>
                    <span className="font-semibold text-danger">
                      ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                    </span>
                    <span className="text-default-500 text-xs line-through ml-1">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="font-semibold">${product.price.toFixed(2)}</span>
                )}
              </TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Chip 
                  color={product.stock > 0 ? 'success' : 'danger'}
                  variant="flat"
                  size="sm"
                >
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    isIconOnly 
                    size="sm" 
                    variant="light"
                    onPress={() => handleEditProduct(product)}
                    aria-label="Edit product"
                  >
                    <Icon icon="lucide:edit" width={16} height={16} />
                  </Button>
                  <Button 
                    isIconOnly 
                    size="sm" 
                    variant="light"
                    color="danger"
                    onPress={() => handleDeleteProduct(product)}
                    aria-label="Delete product"
                  >
                    <Icon icon="lucide:trash-2" width={16} height={16} />
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
          Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
        </p>
        <Pagination
          total={totalPages}
          initialPage={currentPage}
          onChange={setCurrentPage}
        />
      </div>
      
      {/* Product Form Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {selectedProduct ? 'Edit Product' : 'Add New Product'}
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Product Name"
                    placeholder="Enter product name"
                    defaultValue={selectedProduct?.name}
                  />
                  <Input
                    label="SKU"
                    placeholder="Enter SKU"
                    defaultValue={selectedProduct?.sku || `SKU-${selectedProduct?.id || 'NEW'}`}
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="Description"
                      placeholder="Enter product description"
                      defaultValue={selectedProduct?.description}
                    />
                  </div>
                  <Input
                    label="Price"
                    placeholder="Enter price"
                    type="number"
                    startContent={<span className="text-default-400">$</span>}
                    defaultValue={selectedProduct?.price.toString()}
                  />
                  <Input
                    label="Discount (%)"
                    placeholder="Enter discount percentage"
                    type="number"
                    endContent={<span className="text-default-400">%</span>}
                    defaultValue={selectedProduct?.discount.toString()}
                  />
                  <Input
                    label="Stock"
                    placeholder="Enter stock quantity"
                    type="number"
                    defaultValue={selectedProduct?.stock.toString()}
                  />
                  <Dropdown>
                    <DropdownTrigger>
                      <Button 
                        variant="flat" 
                        className="w-full justify-start"
                        endContent={<Icon icon="lucide:chevron-down" width={16} height={16} />}
                      >
                        {selectedProduct?.category || 'Select Category'}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Categories">
                      {categories.map(category => (
                        <DropdownItem key={category}>{category}</DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                  
                  <div className="md:col-span-2">
                    <p className="mb-2 text-sm">Product Image</p>
                    <div className="border-2 border-dashed border-default-200 rounded-lg p-4 text-center">
                      {selectedProduct?.image ? (
                        <div className="relative w-40 h-40 mx-auto">
                          <img 
                            src={selectedProduct.image} 
                            alt={selectedProduct.name} 
                            className="w-full h-full object-cover rounded"
                          />
                          <Button 
                            isIconOnly 
                            size="sm" 
                            color="danger" 
                            variant="flat"
                            className="absolute top-1 right-1"
                          >
                            <Icon icon="lucide:x" width={14} height={14} />
                          </Button>
                        </div>
                      ) : (
                        <div className="py-8">
                          <Icon icon="lucide:upload" className="mx-auto mb-2 text-default-400" width={32} height={32} />
                          <p className="text-default-500">Drag and drop or click to upload</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <p className="mb-2 text-sm">Options</p>
                    <div className="flex flex-wrap gap-4">
                      <Checkbox defaultSelected={selectedProduct?.isNew}>
                        Mark as New
                      </Checkbox>
                      <Checkbox defaultSelected={selectedProduct?.featured}>
                        Featured Product
                      </Checkbox>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  {selectedProduct ? 'Save Changes' : 'Add Product'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirm Deletion</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={confirmDeleteProduct}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminProducts;