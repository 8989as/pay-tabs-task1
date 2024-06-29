import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategorySelection = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetchCategories(0).then((initialCategories) => setCategories(initialCategories));
  }, []);

  const fetchCategories = async (parentId = 0) => {
    try {
      const response = await axios.get(`/api/get-cats?parentId=${parentId}`);
      return response.data.webcats;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };

  const handleCategoryChange = async (index, selectedCategoryId) => {
    const newSelectedCategories = [...selectedCategories];
    newSelectedCategories[index] = selectedCategoryId;

    // Remove any subcategories beyond the current selection
    newSelectedCategories.splice(index + 1);

    // Fetch subcategories for the selected category
    const subcategories = await fetchCategories(selectedCategoryId);
    if (subcategories.length > 0) {
      newSelectedCategories.push("");
    }

    setSelectedCategories(newSelectedCategories);
  };

  return (
    <form>
      {selectedCategories.map((selectedCategory, index) => (
        <div key={index} className="mb-3">
          <select
            className="form-control"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(index, e.target.value)}
          >
            <option value="">Select Category</option>
            {categories
              .filter(cat => (index === 0 ? cat.ParentCategoryID === 0 : cat.ParentCategoryID === selectedCategories[index - 1]))
              .map((category) => (
                <option key={category.CategoryID} value={category.CategoryID}>
                  {category.EnglishName}
                </option>
              ))}
          </select>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleCategoryChange(selectedCategories.length, "")}
      >
        Add Subcategory
      </button>
    </form>
  );
};

export default CategorySelection;
