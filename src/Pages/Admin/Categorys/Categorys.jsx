import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../../Components/loader/Loader";

export default function Categorys() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://ecommercent.runasp.net/api/Category`
      );
      console.log(response);
      setCategories(response.data.categories);
    } catch (error) {
      setCategories([]);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 sidebar-section bg-light p-4 rounded shadow-sm">
          <h5 className="mb-4 font-weight-bold text-primary">Categories</h5>
          <ul className="list-group">
            <Link
              to="/admin/categorys"
              className="list-group-item list-group-item-action text-decoration-none"
            >
              All Categories
            </Link>
            <Link
              to="/admin/category/add"
              className="list-group-item list-group-item-action text-decoration-none"
            >
              Add Categorie
            </Link>
            <Link
              to="/admin/category/update"
              className="list-group-item list-group-item-action text-decoration-none"
            >
              Update Categorie
            </Link>
            <Link
              to="/admin/category/delete"
              className="list-group-item list-group-item-action text-decoration-none"
            >
              Delete Categorie
            </Link>
          </ul>
        </div>

        <div className="col-md-9 categories-section">
          {isLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "100%", minHeight: "400px" }}
            >
              <Loader />
            </div>
          ) : (
            <>
              <div className="row">
                {Array.isArray(categories) &&
                  categories.map((P) => (
                    <div className="col-md-4 mt-3 pb-4" key={P.productId}>
                      <div className="card h-100 position-relative shadow-sm">
                        <Link
                          to={`/admin/category/products/${P.name}`}
                          className="text-decoration-none"
                        >
                          <img
                            src={P.imageUrl}
                            alt={P.name}
                            className="card-img-top"
                            style={{ height: "300px", objectFit: "cover" }}
                          />
                          <div className="card-body">
                            <h5>{P.name}</h5>
                          </div>
                        </Link>
                        <span className="badge bg-primary position-absolute bottom-0 start-0 m-2">
                          {P.categoryName}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
