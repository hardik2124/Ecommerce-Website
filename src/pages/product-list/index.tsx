import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Breadcrumbs, 
  BreadcrumbItem, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Button,
  Pagination,
  Input,
  Checkbox,
  CheckboxGroup,
  Slider,
  Card,
  CardBody
} from '@heroui/react';
import { Icon } from '@iconify/react';
import ProductCard from '../../components/product-card';
import { mockProducts } from '../../data/mock-data';
import { Product } from '../../types/product';

const ProductList: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  const saleParam = queryParams.get('sale') === 'true';
  
  const [products, setProducts] = React.useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [selectedSizes, setSelectedSizes] = React.useState<string[]>([]);
  const [selectedColors, setSelectedColors] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 200]);
  const [sortOption, setSortOption] = React.useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState(false);
  
  const productsPerPage = 12;
  
  // Initialize products based on URL params
  React.useEffect(() => {
    let filtered = [...mockProducts];
    
    if (categoryParam) {
      filtered = filtered.filter(p => p.category.toLowerCase() === categoryParam.toLowerCase());
    }
    
    if (saleParam) {
      filtered = filtered.filter(p => p.discount > 0);
    }
    
    setProducts(filtered);
    setFilteredProducts(filtered);
  }, [categoryParam, saleParam]);
  
  // Apply filters
  React.useEffect(() => {
    let filtered = [...products];
    
    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => 
        selectedCategories.some(cat => p.category.toLowerCase() === cat.toLowerCase())
      );
    }
    
    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => 
        p.sizes.some(size => selectedSizes.includes(size))
      );
    }
    
    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => 
        p.colors.some(color => selectedColors.includes(color))
      );
    }
    
    // Price range filter
    filtered = filtered.filter(p => {
      const finalPrice = p.discount > 0 
        ? p.price * (1 - p.discount / 100) 
        : p.price;
      return finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
    });
    
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => {
          const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        filtered.sort((a, b) => {
          const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price;
          return priceB - priceA;
        });
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured
        // Keep original order
        break;
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchQuery, selectedCategories, selectedSizes, selectedColors, priceRange, sortOption]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };
  
  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 200]);
    setSortOption('featured');
  };

  const categories = ['Men', 'Women', 'Accessories', 'Shoes'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow'];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Shop</BreadcrumbItem>
        {categoryParam && (
          <BreadcrumbItem>{categoryParam}</BreadcrumbItem>
        )}
      </Breadcrumbs>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <Button 
            onPress={toggleMobileFilter}
            variant="flat"
            startContent={<Icon icon="lucide:filter" width={18} height={18} />}
            fullWidth
          >
            {isMobileFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
        
        {/* Filters Sidebar */}
        <div className={`w-full md:w-64 ${isMobileFilterOpen ? 'block' : 'hidden md:block'}`}>
          <Card>
            <CardBody className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
                <Button 
                  size="sm" 
                  variant="light" 
                  onPress={clearAllFilters}
                >
                  Clear All
                </Button>
              </div>
              
              {/* Search */}
              <div className="mb-6">
                <Input
                  label="Search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  startContent={<Icon icon="lucide:search" width={18} height={18} className="text-default-400" />}
                />
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Categories</h3>
                <CheckboxGroup
                  value={selectedCategories}
                  onValueChange={setSelectedCategories}
                >
                  {categories.map(category => (
                    <Checkbox key={category} value={category.toLowerCase()}>
                      {category}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Price Range</h3>
                <Slider
                  label="Price"
                  step={10}
                  minValue={0}
                  maxValue={200}
                  value={priceRange}
                  onChange={setPriceRange as (value: number | number[]) => void}
                  formatOptions={{ style: 'currency', currency: 'USD' }}
                  className="max-w-md"
                />
              </div>
              
              {/* Sizes */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Sizes</h3>
                <CheckboxGroup
                  value={selectedSizes}
                  onValueChange={setSelectedSizes}
                  orientation="horizontal"
                >
                  {sizes.map(size => (
                    <Checkbox key={size} value={size}>
                      {size}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </div>
              
              {/* Colors */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => {
                        if (selectedColors.includes(color)) {
                          setSelectedColors(selectedColors.filter(c => c !== color));
                        } else {
                          setSelectedColors([...selectedColors, color]);
                        }
                      }}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColors.includes(color) ? 'border-primary ring-2 ring-primary/30' : 'border-default-200'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      aria-label={color}
                    />
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort and Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <p className="text-default-500 mb-2 sm:mb-0">
              Showing {Math.min(filteredProducts.length, productsPerPage)} of {filteredProducts.length} products
            </p>
            
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="flat" 
                  endContent={<Icon icon="lucide:chevron-down" width={16} height={16} />}
                >
                  Sort By: {sortOption === 'price-asc' ? 'Price: Low to High' : 
                           sortOption === 'price-desc' ? 'Price: High to Low' :
                           sortOption === 'newest' ? 'Newest' :
                           sortOption === 'rating' ? 'Top Rated' : 'Featured'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Sort options"
                selectionMode="single"
                selectedKeys={[sortOption]}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string;
                  if (selected) setSortOption(selected);
                }}
              >
                <DropdownItem key="featured">Featured</DropdownItem>
                <DropdownItem key="price-asc">Price: Low to High</DropdownItem>
                <DropdownItem key="price-desc">Price: High to Low</DropdownItem>
                <DropdownItem key="newest">Newest</DropdownItem>
                <DropdownItem key="rating">Top Rated</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          
          {/* Products Grid */}
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon icon="lucide:search-x" className="mx-auto mb-4 text-default-400" width={48} height={48} />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-default-500">Try adjusting your filters or search query.</p>
              <Button color="primary" variant="flat" className="mt-4" onPress={clearAllFilters}>
                Clear Filters
              </Button>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                total={totalPages}
                initialPage={currentPage}
                onChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;