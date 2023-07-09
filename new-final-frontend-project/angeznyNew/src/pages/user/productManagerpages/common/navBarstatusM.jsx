import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import ManagerProject from '../Managerproject';
import ManagerTask from '../tasks';
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
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="all" label="All" />
        <Tab value="notStarted" label="Not Started" />
        <Tab value="inProgress" label="inProgress" />
        <Tab value="completed" label="Completed" />
    </Tabs></Box>
    <Box sx={{ width: '100%' }}>
      
    {location.pathname === '/manager/project' ? (
          <ManagerProject status={value} />
        ) : (
          <ManagerTask statustask={value} />
        )}
  </Box>
    </Box>
  );
}