import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import PropertyDetails from "@/components/PropertyDetails";
import { Property, PropertyFilter } from "@/types/property";
import propertiesData from "../data/PropertiesData.json";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const PropertyListings = () => {
  const [searchParams] = useSearchParams();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState<PropertyFilter>({
    city: searchParams.get("city") || undefined,
    available: true,
  });

  const properties = propertiesData as Property[];

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (filters.city && !property.city.toLowerCase().includes(filters.city.toLowerCase()) && 
          !property.location.toLowerCase().includes(filters.city.toLowerCase())) {
        return false;
      }
      if (filters.minPrice && property.price < filters.minPrice) return false;
      if (filters.maxPrice && property.price > filters.maxPrice) return false;
      if (filters.bedrooms && property.bedrooms !== filters.bedrooms) return false;
      if (filters.billsIncluded && !property.billsIncluded) return false;
      if (filters.available && !property.available) return false;
      return true;
    });
  }, [properties, filters]);

  const handleResetFilters = () => {
    setFilters({
      city: searchParams.get("city") || undefined,
      available: true,
    });
  };

  const searchCity = searchParams.get("city");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {searchCity ? `Student Housing in ${searchCity}` : "Student Housing Listings"}
          </h1>
          <p className="text-white/90">
            Found {filteredProperties.length} properties available for students
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <PropertyFilters
              filters={filters}
              onFiltersChange={setFilters}
              onReset={handleResetFilters}
            />
          </div>

          {/* Properties Grid */}
          <div className="lg:w-3/4">
            {filteredProperties.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Home className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No properties found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button onClick={handleResetFilters} variant="outline">
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onViewDetails={setSelectedProperty}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Property Details Modal */}
      <PropertyDetails
        property={selectedProperty}
        open={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </div>
  );
};

export default PropertyListings;