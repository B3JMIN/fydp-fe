'use client'
import React, { useState } from 'react';
import { Card, Col, Row, Input } from 'antd';
import {APIProvider, AdvancedMarker, Map,Marker, Pin} from '@vis.gl/react-google-maps';

const { Search } = Input;
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:8000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          search_query: searchQuery,
        }),
      });

      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  const defaultProps = {
    center: {
      lat: 43.651070,
      lng: -79.347015
    },
    zoom: 11
  };
  return (
    <div style={{ height: '500px', width: '100%' }}>

        <APIProvider apiKey={''}>
      <Search
        type="text"
        addonBefore="Enter your search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Map defaultZoom={10} defaultCenter={{lat: 43.651070, lng: -79.347015}} mapId={'1234'}>
        {restaurants.map((res,index) =>(
            <AdvancedMarker key={res.business_id} draggable={false} position={{lat:res.lat, lng:res.lon}}>
                <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'}>{index+1}</Pin>
        {/* <p className='pin-class'>{index + 1}</p> */}
                </AdvancedMarker>
        ))}
        <Marker position={{lat: 53.54992, lng: -78.11}} />
    </Map>
      <div style={{ height: '500px', width: '100%' }}>
        <ul>
          {restaurants.map((restaurant,index) => (
            <>
            <Col span={24}>
            <Card title={`${index + 1}. ${restaurant.name}`} bordered={false}>
              {restaurant.address}
            </Card>
          </Col>
          </>
          ))}
        </ul>
      </div>
    </APIProvider>
    </div>
  );
};

export default SearchBar;
