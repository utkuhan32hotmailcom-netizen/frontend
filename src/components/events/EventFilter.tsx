import { CATEGORIES } from "../../types/campus-event";
import type { Category } from "../../types/campus-event";

interface Props {
  searchText: string;
  category: Category | "";
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: Category | "") => void;
}

export default function EventFilter({ searchText, category, onSearchChange, onCategoryChange }: Props) {
  return (
    <div className="filtre">
      <div className="alan">
        <label htmlFor="ara">Etkinlik ara</label>
        <input
          id="ara"
          type="search"
          placeholder="Örn. atölye, kariyer"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="alan">
        <label htmlFor="kategori-filtre">Kategori</label>
        <select
          id="kategori-filtre"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as Category | "")}
        >
          <option value="">Tümü</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
