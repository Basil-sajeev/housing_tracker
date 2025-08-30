import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search by city or postcode..." }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const popularCities = ["Manchester", "London", "Birmingham", "Leeds", "Liverpool", "Bristol"];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-lg shadow-card border-border/50 focus:border-primary"
          />
        </div>
        <Button type="submit" size="lg" variant="hero" className="px-8">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </form>

      <div className="flex flex-wrap gap-2 justify-center">
        <span className="text-sm text-muted-foreground mr-2">Popular:</span>
        {popularCities.map((city) => (
          <Button
            key={city}
            variant="outline"
            size="sm"
            onClick={() => {
              setQuery(city);
              onSearch(city);
            }}
            className="text-xs"
          >
            {city}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;