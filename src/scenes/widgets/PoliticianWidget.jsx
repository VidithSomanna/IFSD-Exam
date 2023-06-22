import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PoliticianWidget = () => {
  const [politicianData, setPoliticianData] = useState(null);

  useEffect(() => {
    axios.get('https://api.example.com/politicians')
      .then((response) => {
        setPoliticianData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {/* Render the politician data */}
    </div>
  );
};

export default PoliticianWidget;
