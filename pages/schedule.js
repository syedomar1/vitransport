import React, { useState, useEffect } from 'react';
import { Box, TextField, MenuItem, Tabs, Tab, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useData } from '../context/DataContext'; // Import the useData hook

const Schedule = () => {
  const { busRoutes, loading, error } = useData(); // Call the useData hook to access context values
  const [busRoutesData, setBusRoutesData] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedTiming, setSelectedTiming] = useState('');
  const [selectedRouteStoppings, setSelectedRouteStoppings] = useState([]);

  const [activeAccordion, setActiveAccordion] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (busRoutes) {
      setBusRoutesData(busRoutes);
    }
  }, [busRoutes]);

  const handleRouteChange = (event) => {
    const route = event.target.value;
    setSelectedRoute(route);
    const selectedRouteData = busRoutesData.find(r => r.routeNumber === route);
    setSelectedRouteStoppings(selectedRouteData ? selectedRouteData.stoppings : []);
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleStoppingChange = (event) => {
    const timing = event.target.value;
    setSelectedTiming(timing);
    switch (event.target.value) {
      case 'MORNING':
        setBusRoutesData(busdata[5]);
        break;
      case '1:45 PM':
        setBusRoutesData(busdata[6]);
        break;
      case '5:00 PM':
        setBusRoutesData(busdata[7]);
        break;
      case '6:00 PM':
        setBusRoutesData(busdata[8]);
        break;
    }
  };

  const getCalendarDates = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDate = new Date();
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const nextDate = new Date();
      nextDate.setDate(currentDate.getDate() + i);
      const dateNumber = nextDate.getDate();
      const dayOfWeek = daysOfWeek[nextDate.getDay()];
      const formattedDate = `${dateNumber}${getOrdinalSuffix(dateNumber)} ${dayOfWeek}`;
      dates.push(formattedDate);
    }

    return dates;
  };

  const getOrdinalSuffix = (number) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = number % 100;
    return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
  };

  const calendarDates = getCalendarDates();

  if (!busRoutes || busRoutes.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="min-h-screen bg-darkBlue text-white">
      <div className="container mx-auto py-8 max-w-min">
        <div className="bg-lightBlue rounded-2xl p-6">
          <Tabs
            value={tabIndex}
            onChange={(event, newValue) => setTabIndex(newValue)}
            aria-label="scrollable force tabs example"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              marginBottom: 2,
              '& .MuiTab-root': {
                fontWeight: 'bold',
                border: '1px dotted white',
                borderRadius: '8px',
                paddingInline: '25px',
                marginInline: '10px'
              },
              '& .Mui-selected': {
                backgroundColor: 'lightblue',
                color: 'black',
              },
            }}
          >
            {calendarDates.map((date, index) => (
              <Tab
                key={index}
                label={date}
                sx={{ textFont: "bold", fontSize: '1rem', color: 'white', backgroundColor: index === tabIndex ? 'lightblue' : 'inherit' }}
              />
            ))}
          </Tabs>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
            }}
            noValidate
            autoComplete="off"
          >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                id="outlined-select-bus-route"
                select
                label="Select Bus Number"
                value={selectedRoute}
                onChange={handleRouteChange}
                fullWidth
                sx={{
                  mr: 2,
                  width: '40vw',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                      borderWidth: '2px',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
                SelectProps={{
                  MenuProps: {
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'left',
                    },
                    sx: { maxHeight: "50vh", maxWidth: '50vw' },
                  },
                }}
                InputProps={{
                  style: { textAlign: 'center', color: 'white' },
                }}
              >
                {busRoutes && busRoutes.map((route, index) => (
                  <MenuItem key={index} value={route.routeNumber}>
                    {route.routeNumber}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-select-stoppings"
                select
                label="Timing"
                value={selectedTiming}
                onChange={handleStoppingChange}
                fullWidth
                sx={{
                  width: '25vw',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                      borderWidth: '2px',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
                InputProps={{
                  style: { textAlign: 'center', color: 'white' },
                }}
              >
                <MenuItem value="MORNING">Morning</MenuItem>
                <MenuItem value="1:45PM">1:45 PM</MenuItem>
                <MenuItem value="5:00PM">5:00 PM</MenuItem>
                <MenuItem value="6:00PM">6:00 PM</MenuItem>
              </TextField>
            </Box>
            <hr style={{ width: '80%', margin: '3% 0', left: '10%' }} />
          </Box>
          <Accordion style={{ margin: '0% 5%', width: '90%', marginBottom: '2rem' }}>
            <AccordionSummary
              expandIcon={activeAccordion === 0 ? <RemoveIcon /> : <AddIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              sx={{ backgroundColor: '#71b1eb', color: 'black' }}
              onClick={() => toggleAccordion(0)}
            >
              <Typography style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '0rem' }}>
                <span>{selectedRoute}</span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ color: '#71b1eb', marginBottom: '2rem' }}>
              <table className="table-fixed w-full text" style={{ textColor: "#71b1eb" }}>
                <thead>
                  <tr>
                    <th className="w-1/3 p-3 text-center">BUS ROUTE NO</th>
                    <th className="w-1/3 p-3 text-center">STOP_NAME</th>
                    <th className="w-1/3 p-3 text-center">TIMING</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(selectedRouteStoppings) && selectedRouteStoppings.length > 0 ? (
                    selectedRouteStoppings.map((stopping, index) => (
                      <tr key={index}>
                        <td className="p-3 text-center">{selectedRoute}</td>
                        <td className="p-3 text-center">{stopping.name}</td>
                        <td className="p-3 text-center">{selectedTiming}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="p-3 text-center">No stoppings available for this route.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
