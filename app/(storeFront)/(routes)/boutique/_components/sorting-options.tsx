import React from "react";

type SortingOptionsProps = {
  onSortChange: (sortBy: string) => void;
};

const SortingOptions: React.FC<SortingOptionsProps> = ({ onSortChange }) => {
  return (
    <select
      className="border p-2 rounded"
      onChange={(e) => onSortChange(e.target.value)}
    >
      <option value="date">Trier par : Date</option>
      <option value="price">Trier par : Prix</option>
    </select>
  );
};

export default SortingOptions;
