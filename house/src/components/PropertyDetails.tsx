import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Property } from "@/types/property";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Users, 
  Phone, 
  Mail, 
  Home,
  Check,
  X
} from "lucide-react";

interface PropertyDetailsProps {
  property: Property | null;
  open: boolean;
  onClose: () => void;
}

const PropertyDetails = ({ property, open, onClose }: PropertyDetailsProps) => {
  if (!property) return null;

  const handleContact = (type: 'phone' | 'email') => {
    if (type === 'phone') {
      window.open(`tel:${property.landlord.phone}`);
    } else {
      window.open(`mailto:${property.landlord.email}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{property.title}</DialogTitle>
        </DialogHeader>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {property.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${property.title} - Image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg shadow-card"
            />
          ))}
        </div>

        {/* Price and Status */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-primary">
              £{property.price}/month
            </span>
            <div className="flex gap-2">
              {property.available ? (
                <Badge className="bg-primary text-primary-foreground">
                  <Check className="w-3 h-3 mr-1" />
                  Available
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <X className="w-3 h-3 mr-1" />
                  Booked
                </Badge>
              )}
              {property.billsIncluded && (
                <Badge className="bg-accent text-accent-foreground">
                  Bills Included
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Location and Details */}
        <Card className="mb-6 shadow-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Property Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{property.bedrooms} bedroom{property.bedrooms > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{property.bathrooms} bathroom{property.bathrooms > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center">
                    <Home className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{property.furnished ? 'Fully furnished' : 'Unfurnished'}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4">University</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{property.university}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{property.walkingDistance} walking distance</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{property.description}</p>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((amenity, index) => (
              <Badge key={index} variant="secondary">
                {amenity}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Landlord Contact */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Contact Landlord</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium">{property.landlord.name}</p>
                <div className="flex flex-col sm:flex-row gap-3 mt-3">
                  <Button
                    onClick={() => handleContact('phone')}
                    variant="accent"
                    className="flex-1"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call: {property.landlord.phone}
                  </Button>
                  <Button
                    onClick={() => handleContact('email')}
                    variant="outline"
                    className="flex-1"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetails;