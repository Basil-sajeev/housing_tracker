import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PropertyFilter } from "@/types/property";
import { Filter, X } from "lucide-react";

interface PropertyFiltersProps {
  filters: PropertyFilter;
  onFiltersChange: (filters: PropertyFilter) => void;
  onReset: () => void;
}

const PropertyFilters = ({ filters, onFiltersChange, onReset }: PropertyFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1],
    });
  };

  const handleBedroomsChange = (bedrooms: number) => {
    onFiltersChange({
      ...filters,
      bedrooms: filters.bedrooms === bedrooms ? undefined : bedrooms,
    });
  };

  const bedroomOptions = [1, 2, 3, 4, 5];

  return (
    <div className="w-full">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4 w-full md:w-auto"
      >
        <Filter className="w-4 h-4 mr-2" />
        Filters
        {(filters.bedrooms || filters.billsIncluded || filters.available) && (
          <Badge className="ml-2">Active</Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="mb-6 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Filter Properties</CardTitle>
            <Button variant="ghost" size="sm" onClick={onReset}>
              <X className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Price Range */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Price Range: £{filters.minPrice || 200} - £{filters.maxPrice || 1000}/month
              </Label>
              <Slider
                defaultValue={[filters.minPrice || 200, filters.maxPrice || 1000]}
                max={1000}
                min={200}
                step={25}
                onValueChange={handlePriceChange}
                className="mt-2"
              />
            </div>

            {/* Bedrooms */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Bedrooms</Label>
              <div className="flex gap-2 flex-wrap">
                {bedroomOptions.map((num) => (
                  <Button
                    key={num}
                    variant={filters.bedrooms === num ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleBedroomsChange(num)}
                  >
                    {num} bed{num > 1 ? 's' : ''}
                  </Button>
                ))}
              </div>
            </div>

            {/* Bills Included */}
            <div className="flex items-center space-x-2">
              <Switch
                id="bills-included"
                checked={filters.billsIncluded || false}
                onCheckedChange={(checked) =>
                  onFiltersChange({ ...filters, billsIncluded: checked || undefined })
                }
              />
              <Label htmlFor="bills-included">Bills included only</Label>
            </div>

            {/* Available Only */}
            <div className="flex items-center space-x-2">
              <Switch
                id="available-only"
                checked={filters.available || false}
                onCheckedChange={(checked) =>
                  onFiltersChange({ ...filters, available: checked || undefined })
                }
              />
              <Label htmlFor="available-only">Available properties only</Label>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PropertyFilters;