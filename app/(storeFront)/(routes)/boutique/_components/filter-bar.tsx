import React from "react";

type FilterBarProps = {
  categories: string[];
  sizes:string[];
  colors:string[]
  onFilterChange: (filterKey: string, value: string) => void;
};

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  colors,
  sizes,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Category Filter */}
      <select
        className="border p-2 rounded"
        onChange={(e) => onFilterChange("category", e.target.value)}
      >
        <option value="">Toutes les catégories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Color Filter */}
      <select
        className="border p-2 rounded"
        onChange={(e) => onFilterChange("color", e.target.value)}
      ><option value="">Toutes les Colors</option>

        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}

      </select>

      {/* Size Filter */}
      <select
        className="border p-2 rounded"
        onChange={(e) => onFilterChange("size", e.target.value)}
      >
        <option value="">Toutes les tailles</option>
         {sizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
