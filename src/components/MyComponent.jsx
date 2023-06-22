import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPolitician, updatePolitician, deletePolitician, readPolitician } from '../actions/politicianActions';

const MyComponent = () => {
  const dispatch = useDispatch();
  const [politicianData, setPoliticianData] = useState({ name: '', party: '' });
  const politician = useSelector((state) => state.politician);

  useEffect(() => {
    dispatch(readPolitician());
  }, [dispatch]);

  const handleCreatePolitician = () => {
    dispatch(createPolitician(politicianData));
  };

  const handleUpdatePolitician = () => {
    dispatch(updatePolitician(politicianData));
  };

  const handleDeletePolitician = () => {
    dispatch(deletePolitician());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPoliticianData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>My Component</h1>
      <div>
        <label>Name: </label>
        <input type="text" name="name" value={politicianData.name} onChange={handleChange} />
      </div>
      <div>
        <label>Party: </label>
        <input type="text" name="party" value={politicianData.party} onChange={handleChange} />
      </div>
      <button onClick={handleCreatePolitician}>Create Politician</button>
      <button onClick={handleUpdatePolitician}>Update Politician</button>
      <button onClick={handleDeletePolitician}>Delete Politician</button>
      <div>
        <h2>Politician Details</h2>
        <p>Name: {politician.name}</p>
        <p>Party: {politician.party}</p>
      </div>
      {/* Rest of your component JSX */}
    </div>
  );
};

export default MyComponent;
