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
  // ── Ooty ──────────────────────────────────────────────────────────────────
  {
    _id: 'mock-001',
    title: 'The Glass Pavilion',
    location: 'Ooty, Tamil Nadu',
    price: 12500000,
    image: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],
    beds: 6, baths: 5, sqft: 8200,
    type: 'Villa', availability: 'sale',
    description: 'A stunning glass-walled pavilion nestled in the Nilgiris with panoramic valley views and lush landscaped gardens.',
    amenities: ['Swimming Pool', 'Garden', 'Parking', 'Security'],
    phone: '+91 98765 43210',
  },
  {
    _id: 'mock-002',
    title: 'Nilgiri Skyline Penthouse',
    location: 'Ooty Hills, Tamil Nadu',
    price: 8950000,
    image: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800'],
    beds: 4, baths: 4, sqft: 5500,
    type: 'Apartment', availability: 'sale',
    description: 'Premium top-floor penthouse with breathtaking 270° views of the Nilgiri hills, designer interiors and private terrace.',
    amenities: ['Terrace', 'Gym', 'Parking', 'Security', 'Lift'],
    phone: '+91 98765 43210',
  },
  {
    _id: 'mock-003',
    title: 'Nilgiri Heritage Home',
    location: 'Ooty, Tamil Nadu',
    price: 5500000,
    image: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'],
    beds: 4, baths: 3, sqft: 3800,
    type: 'House', availability: 'sale',
    description: 'A lovingly restored heritage bungalow blending colonial architecture with modern comforts in the heart of Ooty.',
    amenities: ['Garden', 'Fireplace', 'Parking', 'Security'],
    phone: '+91 98765 43210',
  },
  {
    _id: 'mock-004',
    title: 'Tea Garden Cottage',
    location: 'Ooty, Tamil Nadu',
    price: 35000,
    image: ['https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800'],
    beds: 2, baths: 1, sqft: 1200,
    type: 'House', availability: 'rent',
    description: 'A cosy stone cottage at the edge of a working tea garden with stunning sunrise views and fresh mountain air.',
    amenities: ['Garden', 'Parking', 'Fireplace'],
    phone: '+91 98765 43210',
  },
  {
    _id: 'mock-005',
    title: 'Botanical Garden View Apartment',
    location: 'Ooty, Tamil Nadu',
    price: 4200000,
    image: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'],
    beds: 3, baths: 2, sqft: 2100,
    type: 'Apartment', availability: 'sale',
    description: 'Bright modern apartment overlooking the famous Ooty Botanical Garden, walking distance to the lake and market.',
    amenities: ['Lift', 'Parking', 'Security', 'Power Backup'],
    phone: '+91 98765 43210',
  },
  {
    _id: 'mock-006',
    title: 'Elk Hill Luxury Villa',
    location: 'Elk Hill, Ooty, Tamil Nadu',
    price: 22000000,
    image: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
    beds: 7, baths: 6, sqft: 11000,
    type: 'Villa', availability: 'sale',
    description: 'An architectural masterpiece perched on Elk Hill with infinity pool, home theatre, and unobstructed Nilgiri panoramas.',
    amenities: ['Swimming Pool', 'Garden', 'Parking', 'Security', 'Gym', 'Home Theatre', 'Staff Quarters'],
    phone: '+91 98765 43210',
  },
  {
    _id: 'mock-007',
    title: 'Charring Cross Studio',
    location: 'Charring Cross, Ooty, Tamil Nadu',
    price: 22000,
    image: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'],
    beds: 1, baths: 1, sqft: 650,
    type: 'Apartment', availability: 'rent',
    description: 'Compact and stylish studio in the prime Charring Cross area — ideal for professionals or couples seeking a hill-station retreat.',
    amenities: ['Lift', 'Security', 'Power Backup'],
    phone: '+91 98765 43210',
  },
  // ── Coonoor ───────────────────────────────────────────────────────────────
  {
    _id: 'mock-008',
    title: 'Forest Retreat Bungalow',
    location: 'Coonoor, Tamil Nadu',
    price: 3200000,
    image: ['https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800'],
    beds: 3, baths: 2, sqft: 2800,
    type: 'House', availability: 'sale',
    description: 'A charming colonial-era bungalow surrounded by eucalyptus forests and rolling tea estates in serene Coonoor.',
    amenities: ['Garden', 'Fireplace', 'Parking'],
    phone: '+91 98765 43210',
  },
  {
    _id: 'mock-009',
    title: 'Sim's Park View Residence',
    location: 'Coonoor, Tamil Nadu',
    price: 6800000,
    image: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800'],
    beds: 4, baths: 3, sqft: 4200,
    type: 'Villa', availability: 'sale',
    description: 'Elegant villa adjacent to the famous Sim\'s Park, featuring a wraparound veranda with misty morning views.',
    amenities: ['Garden', 'Parking', 'Security', 'Fireplace', 'CCTV'],
    phone: '+91 98765 43210',
  },
  {
    _id: 'mock-010',
    title: 'Coonoor Tea Estate Cottage',
    location: 'Coonoor, Tamil Nadu',
    price: 28000,
    image: ['https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800'],
    beds: 2, baths: 2, sqft: 1500,
    type: 'House', availability: 'rent',
    description: 'A whitewashed planter\'s cottage set within a working tea estate — tranquil, private and picture-perfect.',
    amenities: ['Garden', 'Parking', 'Fireplace'],
    phone: '+91 98765 43210',
  },
  // ── Kotagiri ──────────────────────────────────────────────────────────────
  {
    _id: 'mock-011',
    title: 'Kotagiri Valley Estate',
    location: 'Kotagiri, Tamil Nadu',
    price: 15000000,
    image: ['https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=800'],
    beds: 7, baths: 6, sqft: 10500,
    type: 'Villa', availability: 'sale',
    description: 'A grand estate with sweeping views of the Kotagiri valley, manicured lawns and a private guest wing.',
    amenities: ['Swimming Pool', 'Garden', 'Parking', 'Security', 'Gym', 'Staff Quarters'],
    phone: '+91 98765 43210',
  },
  {
    _id: 'mock-012',
    title: 'Rangaswamy Peak Cottage',
    location: 'Kotagiri, Tamil Nadu',
    price: 2800000,
    image: ['https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800'],
    beds: 3, baths: 2, sqft: 2200,
    type: 'House', availability: 'sale',
    description: 'Quaint stone cottage with direct views of Rangaswamy Peak, surrounded by shola forests and rolling grasslands.',
    amenities: ['Garden', 'Parking', 'Fireplace'],
    phone: '+91 98765 43210',
  },
  // ── Lovedale ──────────────────────────────────────────────────────────────
  {
    _id: 'mock-013',
    title: 'Lovedale Green Manor',
    location: 'Lovedale, Ooty, Tamil Nadu',
    price: 9500000,
    image: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'],
    beds: 5, baths: 4, sqft: 6500,
    type: 'Villa', availability: 'sale',
    description: 'Sprawling manor in Lovedale\'s quiet green belt — generous lawns, a rose garden and complete privacy.',
    amenities: ['Garden', 'Swimming Pool', 'Parking', 'Security', 'Power Backup'],
    phone: '+91 98765 43210',
  },
  {
    _id: 'mock-014',
    title: 'Lovedale Hillside Flat',
    location: 'Lovedale, Ooty, Tamil Nadu',
    price: 18000,
    image: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
    beds: 2, baths: 1, sqft: 950,
    type: 'Apartment', availability: 'rent',
    description: 'Well-maintained hillside flat with valley-facing balcony, ideal for long-stay remote workers and nature lovers.',
    amenities: ['Parking', 'Power Backup', 'Security'],
    phone: '+91 98765 43210',
  },
  // ── Ketti Valley ──────────────────────────────────────────────────────────
  {
    _id: 'mock-015',
    title: 'Ketti Valley Farmhouse',
    location: 'Ketti Valley, Tamil Nadu',
    price: 7200000,
    image: ['https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800'],
    beds: 4, baths: 3, sqft: 4800,
    type: 'Villa', availability: 'sale',
    description: 'Secluded farmhouse set in the lush Ketti Valley with fruit orchards, vegetable garden and stunning sunset views.',
    amenities: ['Garden', 'Parking', 'Security', 'Fireplace', 'Power Backup'],
    phone: '+91 98765 43210',
  },
  // ── Gudalur ───────────────────────────────────────────────────────────────
  {
    _id: 'mock-016',
    title: 'Gudalur Plantation Home',
    location: 'Gudalur, Tamil Nadu',
    price: 4500000,
    image: ['https://images.unsplash.com/photo-1494526585095-c41746248156?w=800'],
    beds: 4, baths: 3, sqft: 3500,
    type: 'House', availability: 'sale',
    description: 'A spacious plantation bungalow on the outskirts of Gudalur, surrounded by cardamom and coffee estates.',
    amenities: ['Garden', 'Parking', 'Security', 'Power Backup'],
    phone: '+91 98765 43210',
  },
  // ── Udhagamandalam / Plots ─────────────────────────────────────────────────
  {
    _id: 'mock-017',
    title: 'Udhagamandalam Hill Plot',
    location: 'Udhagamandalam, Tamil Nadu',
    price: 3800000,
    image: ['https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800'],
    beds: 0, baths: 0, sqft: 5400,
    type: 'Plot', availability: 'sale',
    description: 'Prime residential plot in Udhagamandalam with DTCP approval, road access and commanding hill views — ideal to build your dream home.',
    amenities: ['Parking'],
    phone: '+91 98765 43210',
  },
  // ── Wellington ────────────────────────────────────────────────────────────
  {
    _id: 'mock-018',
    title: 'Wellington Cantonment Bungalow',
    location: 'Wellington, Nilgiris, Tamil Nadu',
    price: 11000000,
    image: ['https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800'],
    beds: 5, baths: 4, sqft: 7000,
    type: 'House', availability: 'sale',
    description: 'A graceful colonial bungalow in Wellington\'s cantonment area — wide verandas, old-growth trees and impeccable British-era craftsmanship.',
    amenities: ['Garden', 'Parking', 'Security', 'Fireplace', 'Staff Quarters'],
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
