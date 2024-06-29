import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategorySelection = () => {
  const [webCategories, setWebCategories] = useState([]);
  const [CatChoices, setCatChoices] = useState({
    header: "",
    category: "",
    subCategory: "",
  });
  const [choosedCategories, setChoosedCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/get-cats");
      const webcats = response.data.webcats;
      console.log("Fetched categories:", webcats); // Debugging log
      setWebCategories(webcats);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const categoryOnChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`); // Debugging log
    setCatChoices((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "header") {
      setCatChoices((prev) => ({
        ...prev,
        category: "",
        subCategory: "",
      }));
    }
  };

  const onAddCategoryHandler = () => {
    if (CatChoices.category !== "") {
      const existItem = choosedCategories.find(
        (item) => item.Categoryid === CatChoices.category
      );

      if (!existItem) {
        const selectedCategory = webCategories.find(
          (category) => category.CategoryID === CatChoices.category
        );

        if (selectedCategory) {
          setChoosedCategories((prev) => [
            ...prev,
            {
              Categoryid: selectedCategory.CategoryID,
              label: selectedCategory.EnglishName,
            },
          ]);
          setCatChoices({
            header: "",
            category: "",
            subCategory: "",
          });
        }
      } else {
        alert(`You already chose ${existItem.label} before`);
        setCatChoices({
          header: "",
          category: "",
          subCategory: "",
        });
      }
    }
  };

  const removeExistCat = (index) => {
    const list = [...choosedCategories];
    list.splice(index, 1);
    setChoosedCategories(list);
  };

  return (
    <form>
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-12 row justify-content-between g-4 mb-3">
              {/* Start */}
              <div className="col-4">
                <label htmlFor="webHeader" className="ms-2 my-1 fs-5 text-dark">
                  Website Header <span className="text-danger">*</span>
                </label>
                <select
                  id="webHeader"
                  name="header"
                  type="text"
                  className="form-control"
                  style={{ overflowY: "scroll" }}
                  value={CatChoices.header}
                  onChange={categoryOnChangeHandler}
                >
                  <option value="">Select Header</option>
                  {webCategories.map((option, index) =>
                    option.ParentCategoryID === 0 ? ( // Ensure numerical comparison
                      <option key={index} value={option.CategoryID}>
                        {option.EnglishName}
                      </option>
                    ) : null
                  )}
                </select>
              </div>
              <div className="col-4">
                <label htmlFor="webCat" className="ms-2 my-1 fs-5 text-dark">
                  Website Category <span className="text-danger">*</span>
                </label>
                <select
                  id="webCat"
                  name="category"
                  type="text"
                  className="form-control"
                  value={CatChoices.category}
                  onChange={categoryOnChangeHandler}
                >
                  <option value="">Select Category</option>
                  {webCategories.map((option, index) =>
                    option.ParentCategoryID === parseInt(CatChoices.header) ? ( // Ensure numerical comparison
                      <option key={index} value={option.CategoryID}>
                        {option.EnglishName}
                      </option>
                    ) : null
                  )}
                </select>
              </div>
              <div className="col-4">
                <label htmlFor="webSubCat" className="ms-2 my-1 fs-5 text-dark">
                  Website SubCategory <span className="text-danger">*</span>
                </label>
                <select
                  id="webSubCat"
                  name="subCategory"
                  type="text"
                  className="form-control"
                  onChange={categoryOnChangeHandler}
                >
                  <option value="">Select Category</option>
                  {webCategories.map((option, index) =>
                    option.ParentCategoryID === parseInt(CatChoices.category) ? ( // Ensure numerical comparison
                      <option key={index} value={option.CategoryID}>
                        {option.EnglishName}
                      </option>
                    ) : null
                  )}
                </select>
              </div>
              <div className="col-12 row g-4"></div>
              <div className="col-12">
                <button
                  type="button"
                  onClick={onAddCategoryHandler}
                  className="btn btn-primary px-3 my-3"
                >
                  Add
                </button>
              </div>
              <div className="col-12">
                <div className="row m-0 p-0">
                  {choosedCategories.map((category, index) => (
                    <div key={index} className="col-4">
                      <button
                        onClick={() => removeExistCat(index)}
                        type="button"
                        className="badge bg-success border-0"
                      >
                        {category.label} <i className="fa-solid fa-trash ms-2"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {/* End */}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CategorySelection;
