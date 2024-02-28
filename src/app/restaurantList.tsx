'use client'
// RestaurantList.js
import React from 'react';

const RestaurantList = ({ restaurants }) => {
  return (
    <div>
      <h2>Restaurant List</h2>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.business_id}>
            <h3>{restaurant.name}</h3>
            <p>Address: {restaurant.address}</p>
            <p>Rating: {restaurant.rating}</p>
            {/* Add other details you want to display */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
