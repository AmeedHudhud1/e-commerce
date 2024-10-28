import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductsDetails() {
  const [data, setData] = useState(null);
  const [showQuantityInput, setShowQuantityInput] = useState(false); // State to manage visibility of quantity input
  const [quantity, setQuantity] = useState(1); // State to hold the quantity
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://ecommercent.runasp.net/api/Product/${id}`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    setShowQuantityInput(true); // Show quantity input when "Add to Cart" is clicked
  };

  const handleConfirmAddToCart = () => {
    console.log(`Adding ${quantity} of ${data.product.name} to the cart.`);
    // Logic to add the product to the cart with the specified quantity goes here
    setShowQuantityInput(false); // Hide quantity input after adding to cart
  };

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row pb-4 pt-3">
        {/* Product Image Section */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img 
            src={data.product.imageUrl} 
            alt={data.product.name} 
            style={{ borderRadius: '8px', maxHeight: '400px'}} 
          />
        </div>

        {/* Product Details Section */}
        <div className="col-md-6 pb-5">
          <div className="card p-4 shadow-lg" style={{ border: '1px solid #e0e0e0', borderRadius: '10px' }}>
            <h2 className="text-primary mb-3">{data.product.name}</h2>
            <p className="text-muted"><strong>Category:</strong> {data.product.categoryName}</p>
            <p><strong>Description:</strong> {data.product.description}</p>
            <p><strong>Price:</strong> ${data.product.price}</p>
            <p><strong>Rating:</strong> {data.product.rating}</p>
            <p><strong>Stock:</strong> {data.product.stock} items available</p>

            {/* Quantity Input Section */}
            {showQuantityInput ? (
              <div className="d-flex align-items-center mt-3">
                <label htmlFor="quantity" className="me-2">Quantity:</label>
                <input 
                  type="number" 
                  id="quantity" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, e.target.value))} // Prevent negative values
                  min="1" 
                  className="form-control" 
                  style={{ width: '80px' }} 
                />
              </div>
            ) : null}

            {/* Buttons */}
            <div className="d-flex gap-3 mt-4">
              {!showQuantityInput ? (
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1 }} 
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              ) : (
                <>
                  <button 
                    className="btn btn-success" 
                    style={{ flex: 1 }} 
                    onClick={handleConfirmAddToCart}
                  >
                    Confirm Add to Cart
                  </button>
                  <button 
                    className="btn btn-secondary" 
                    style={{ flex: 1 }} 
                    onClick={() => setShowQuantityInput(false)} // Hide input if user cancels
                  >
                    Cancel
                  </button>
                </>
              )}
              <button className="btn btn-outline-danger" style={{ flex: 1 }}>
                Add to Favorites 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
