import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DeveloperTask from '../task';
import { useLocation } from 'react-router-dom';

export default function Status() {
  const [value, setValue] = React.useState('all');
  const location = useLocation();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box  sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width:'100%',
    }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
          width:'100%',
        }}
      >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="all" label="All" />
        <Tab value="notStarted" label="Not Started" />
        <Tab value="inProgress" label="inProgress" />
        <Tab value="completed" label="Completed" />
    </Tabs></Box>
    <Box sx={{ width: '100%' }}>
      
    {location.pathname === '/developer/task' ? (
         <DeveloperTask statustask={value} />
        ) : (
          <p>not found location</p>
        )}
  </Box>
    </Box>
  );
}