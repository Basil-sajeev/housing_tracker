import { Card, CardContent } from "../components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Users } from "lucide-react";
import { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
}

const PropertyCard = ({ property, onViewDetails }: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 group">
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {property.available ? (
            <Badge className="bg-primary text-primary-foreground shadow-card">
              Available
            </Badge>
          ) : (
            <Badge variant="destructive">Booked</Badge>
          )}
          {property.billsIncluded && (
            <Badge className="bg-accent text-accent-foreground">
              Bills Included
            </Badge>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <Badge className="bg-background/90 text-foreground font-bold text-lg">
            £{property.price}/mo
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
          {property.title}
        </h3>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            {property.bedrooms} bed{property.bedrooms > 1 ? 's' : ''}
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            {property.bathrooms} bath{property.bathrooms > 1 ? 's' : ''}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {property.walkingDistance} to uni
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {property.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{property.amenities.length - 3} more
            </Badge>
          )}
        </div>

        <Button
          onClick={() => onViewDetails(property)}
          className="w-full"
          variant="card"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;