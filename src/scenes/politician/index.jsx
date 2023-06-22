import React from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from 'scenes/navbar';
import PoliticianWidget from 'scenes/widgets/PoliticianWidget';

const PoliticianScene = () => {
  return (
    <Box>
      <Navbar />
      <Box p={2}>
        <Typography variant="h3" gutterBottom>
          Politician Widget Scene
        </Typography>
        <PoliticianWidget />
      </Box>
    </Box>
  );
};

export default PoliticianScene;
