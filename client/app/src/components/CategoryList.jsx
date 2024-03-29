import React, { useContext, useEffect } from "react";
import categoryFinder from "../apis/categoryFinder";
import { CategoriesContext } from "../context/categoriesContext";
import { Navigate, useNavigate } from "react-router-dom";
import "./CategoryList.css";

const CategoryList = () => {
  const navigate = useNavigate();
  const { categories, setCategories } = useContext(CategoriesContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryFinder.get("/");
        setCategories(response.data.data.categories);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  function navigateToProducts(category) {
    navigate(`/productscategorywise/${category.categoryid}`);
  }

  return (
    <>
      <div className="category-heading-container">
        <h1 className="category-list-heading">Categories</h1>
        <p className="category-description">
          You can choose products from these categories:
        </p>
      </div>
      <div className="category-list-container">
        <ul className="list-group">
          {categories.map((category, index) => (
            <li
              key={index}
              className={
                index % 2 === 0
                  ? "list-group-item bg-secondary text-white"
                  : "list-group-item bg-dark text-white"
              }
            >
              <div className="category-info">
                <p className="category-name-extended">
                  {category.categoryname}
                </p>
              </div>
              <div className="button-container">
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigateToProducts(category)}
                >
                  Go
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CategoryList;
