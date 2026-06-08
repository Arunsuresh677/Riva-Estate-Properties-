import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import FilterSidebar from '../components/properties/FilterSidebar';
import PropertiesHeader from '../components/properties/PropertiesHeader';
import PropertiesGrid from '../components/properties/PropertiesGrid';
import LoadingState from '../components/common/LoadingState';
import { propertiesAPI } from '../services/api';
import { useSEO } from '../hooks/useSEO';

export interface Property {
  _id: string;
  title: string;
  location: string;
  price: number;
  image: string[];
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  availability: string;
  description: string;
  amenities: string[];
  phone: string;
}

const MOCK_PROPERTIES: Property[] = [
  {
    _id: 'mock-001',
    title: 'The Glass Pavilion',
    location: 'Ooty, Tamil Nadu',
    price: 12500000,
    image: ['https://images.unsplash.com/photo-1622015663381-d2e05ae91b72?w=800'],
    beds: 6, baths: 5, sqft: 8200,
    type: 'Villa', availability: 'sale',
    description: 'A stunning glass-walled pavilion nestled in the Nilgiris with panoramic valley views.',
    amenities: ['Swimming Pool', 'Garden', 'Parking', 'Security'],
    phone: '+91 98765 43210',
  },
  {
    _id: 'mock-002',
    title: 'Skyline Penthouse',
    location: 'Ooty Hills, Tamil Nadu',
    price: 8950000,
    image: ['https://images.unsplash.com/photo-1695067440629-b5e513976100?w=800'],
    beds: 4, baths: 4, sqft: 5500,
    type: 'Apartment', availability: 'sale',
    description: 'Premium penthouse with breathtaking views of the Nilgiri hills and lush greenery.',
    amenities: ['Terrace', 'Gym', 'Parking', 'Security', 'Lift'],
    phone: '+91 98765 43210',
  },
  {
    _id: 'mock-003',
    title: 'Forest Retreat Bungalow',
    location: 'Coonoor, Tamil Nadu',
    price: 3200000,
    image: ['https://images.unsplash.com/photo-1738168279272-c08d6dd22002?w=800'],
    beds: 3, baths: 2, sqft: 2800,
    type: 'Bungalow', availability: 'sale',
    description: 'A charming colonial-era bungalow surrounded by eucalyptus and tea estates.',
    amenities: ['Garden', 'Fireplace', 'Parking'],
    phone: '+91 98765 43210',
  },
  {
    _id: 'mock-004',
    title: 'Coastal Retreat Estate',
    location: 'Kotagiri, Tamil Nadu',
    price: 15000000,
    image: ['https://images.unsplash.com/photo-1769428003672-296f923d19b2?w=800'],
    beds: 7, baths: 6, sqft: 10500,
    type: 'Villa', availability: 'sale',
    description: 'A grand estate with sweeping views of the Kotagiri valley and manicured lawns.',
    amenities: ['Swimming Pool', 'Garden', 'Parking', 'Security', 'Gym', 'Staff Quarters'],
    phone: '+91 98765 43210',
  },
  {
    _id: 'mock-005',
    title: 'Tea Garden Cottage',
    location: 'Ooty, Tamil Nadu',
    price: 1800000,
    image: ['https://images.unsplash.com/photo-1761509386107-9baefe0073f2?w=800'],
    beds: 2, baths: 1, sqft: 1200,
    type: 'House', availability: 'rent',
    description: 'A cosy cottage at the edge of a working tea garden with stunning sunrise views.',
    amenities: ['Garden', 'Parking'],
    phone: '+91 98765 43210',
  },
  {
    _id: 'mock-006',
    title: 'Nilgiri Heritage Home',
    location: 'Ooty, Tamil Nadu',
    price: 5500000,
    image: ['https://images.unsplash.com/photo-1762732793012-8bdab3af00b4?w=800'],
    beds: 4, baths: 3, sqft: 3800,
    type: 'House', availability: 'sale',
    description: 'A restored heritage bungalow blending colonial architecture with modern comforts.',
    amenities: ['Garden', 'Fireplace', 'Parking', 'Security'],
    phone: '+91 98765 43210',
  },
];

const PropertiesPage: React.FC = () => {
  useSEO({
    title: 'Properties - Browse Listings',
    description: 'Browse apartments, houses, villas, and more. Filter by location, price, bedrooms, and amenities.',
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState<{
    location?: string;
    propertyType?: string[];
    availability?: string;
    priceRange?: [number, number];
    bedrooms?: number;
    bathrooms?: number;
    amenities?: string[];
  }>({});

  // Fetch properties from backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await propertiesAPI.getAll();
        if (data.success && data.property) {
          setProperties(data.property.length > 0 ? data.property : MOCK_PROPERTIES);
        } else {
          setProperties(MOCK_PROPERTIES);
        }
      } catch (err: any) {
        console.error('Failed to fetch properties:', err);
        // Fall back to mock Ooty properties so the page is never empty
        setProperties(MOCK_PROPERTIES);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Apply filters and sorting
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Filter by location
    if (filters.location) {
      result = result.filter((p) =>
        p.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    // Filter by property type
    if (filters.propertyType && filters.propertyType.length > 0) {
      result = result.filter((p) =>
        filters.propertyType!.some(t => t.toLowerCase() === p.type.toLowerCase())
      );
    }

    // Filter by availability (rent / buy)
    if (filters.availability) {
      result = result.filter((p) =>
        p.availability.toLowerCase() === filters.availability!.toLowerCase()
      );
    }

    // Filter by price range
    // Slider uses 0–200 scale where each unit = 10 Lakhs (so 200 = ₹20 Cr)
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      const minPrice = min * 1000000;  // slider unit → ₹ (× 10L)
      const maxPrice = max * 1000000;
      result = result.filter((p) => {
        if (p.price < minPrice) return false;
        if (max >= 200) return true; // 200 = no upper cap
        return p.price <= maxPrice;
      });
    }

    // Filter by bedrooms (>= selected)
    if (filters.bedrooms && filters.bedrooms > 0) {
      result = result.filter(p => p.beds >= filters.bedrooms!);
    }

    // Filter by bathrooms (>= selected)
    if (filters.bathrooms && filters.bathrooms > 0) {
      result = result.filter(p => p.baths >= filters.bathrooms!);
    }

    // Filter by amenities (must have all selected)
    if (filters.amenities && filters.amenities.length > 0) {
      result = result.filter(p => 
        filters.amenities!.every(filterAmenity => 
          p.amenities.some(propertyAmenity => 
            propertyAmenity.toLowerCase() === filterAmenity.toLowerCase()
          )
        )
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'beds':
        result.sort((a, b) => b.beds - a.beds);
        break;
      case 'newest':
        // Assuming there is a date field, if not, use _id roughly? Or skip.
        // User asked for "Newest (by date added, default)". 
        // Component doesn't have date. I will try to sort by _id descending (implicit timestamp in Mongo ObjectId)
        result.sort((a, b) => b._id.localeCompare(a._id));
        break;
      case 'featured':
      default:
        // Featured could be a flag, or just default order.
        break;
    }

    return result;
  }, [properties, filters, sortBy]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleViewChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Sticky Navigation */}
      <Navbar />

      <div className="flex">
        {/* Left Sidebar - Filters */}
        <FilterSidebar onFilterChange={handleFilterChange} />

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 pb-24 md:pb-0">
          {/* Properties Header with Sort and View Controls */}
          <PropertiesHeader
            totalProperties={filteredProperties.length}
            onSortChange={handleSortChange}
            onViewChange={handleViewChange}
          />


          {/* Loading State */}
          {loading && <LoadingState message="Loading properties..." />}

          {/* Error State */}
          {error && !loading && (
            <div className="flex items-center justify-center py-24">
              <div className="text-center">
                <span className="material-icons text-4xl text-[#D4755B] mb-4">error_outline</span>
                <p className="font-manrope text-[#374151] mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-[#D4755B] text-white font-manrope font-bold px-6 py-2 rounded-lg hover:bg-[#B86851] transition-all"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredProperties.length === 0 && (
            <div className="flex items-center justify-center py-24">
              <div className="text-center">
                <span className="material-icons text-4xl text-[#9CA3AF] mb-4">search_off</span>
                <p className="font-manrope text-[#374151] mb-2">No properties found</p>
                <p className="font-manrope font-extralight text-sm text-[#6B7280]">Try adjusting your filters</p>
              </div>
            </div>
          )}

          {/* Properties Grid */}
          {!loading && !error && filteredProperties.length > 0 && (
            <PropertiesGrid properties={filteredProperties} viewMode={viewMode} />
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PropertiesPage;
