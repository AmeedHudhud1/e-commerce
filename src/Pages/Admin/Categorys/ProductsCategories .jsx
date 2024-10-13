import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../../Components/loader/Loader";

export default function ProductsCategories() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [ascendingOrder, setAscendingOrder] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { Name } = useParams();
  const fetchData = async (
    pageNumber,
    priceFilter,
    sortOptionFilter,
    orderFilter
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://ecommercent.runasp.net/api/Product`,
        {
          params: {
            Name: name,
            PageNumber: pageNumber,
            PageSize: 6,
            Price: priceFilter || null,
            Category: Name || null,
            SortBy: sortOptionFilter || null,
            IsDesc: orderFilter || null,
          },
        }
      );
      console.log(response);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages || 3);
    } catch (error) {
      setProducts([]);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, price, sortOption, ascendingOrder);
  }, [currentPage, name]);

  const handleApplyFilters = () => {
    fetchData(1, price, sortOption, ascendingOrder);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 sidebar-section bg-light p-4 rounded shadow-sm">
          <h5 className="mb-4 font-weight-bold text-primary">Filter</h5>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control mb-3"
              placeholder="Enter a name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="text"
              id="price"
              className="form-control mb-3"
              placeholder="Enter a price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <small className="text-muted">
              Enter a price to display products that are equal to or less than
              this value.
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="sortOptions" className="form-label">
              Sorted By
            </label>
            <select
              id="sortOptions"
              className="form-select mb-3"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">--</option>
              <option value="Name">Name</option>
              <option value="Price">Price</option>
              <option value="Rating">Rating</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="order" className="form-label">
              Descending order
            </label>
            <select
              id="order"
              className="form-select mb-3"
              value={ascendingOrder}
              onChange={(e) => setAscendingOrder(e.target.value)}
            >
              <option value="">--</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>

          <button className="btn btn-primary" onClick={handleApplyFilters}>
            Apply Filters
          </button>
        </div>

        <div className="col-md-9 products-section">
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
                {Array.isArray(products) &&
                  products.map((P) => (
                    <div className="col-md-4 mt-3" key={P.productId}>
                      <div className="card h-100 position-relative shadow-sm">
                        <img
                          src={P.imageUrl}
                          alt={P.name}
                          className="card-img-top"
                          style={{ height: "300px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h5>{P.name}</h5>
                        </div>

                        <div className="card-body">
                          <p>{P.description}</p>
                          <p className="fw-bold">${P.price}</p>
                          <p className="fw-bold">Rating: {P.rating}</p>
                        </div>
                        <span className="badge bg-primary position-absolute bottom-0 start-0 m-2">
                          {P.categoryName}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>

              {products.length > 0 && (
                <nav aria-label="Page navigation example">
                  <ul className="pagination mt-4 justify-content-center">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>

                    {[...Array(totalPages)].map((_, page) => (
                      <li
                        key={page + 1}
                        className={`page-item ${
                          currentPage === page + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(page + 1)}
                        >
                          {page + 1}
                        </button>
                      </li>
                    ))}

                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
