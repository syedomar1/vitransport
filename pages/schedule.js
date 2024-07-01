import React, { useState } from 'react';
import { Box, TextField, MenuItem, Tabs, Tab, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Navbar from '../components/Navbar';
import { useData } from '../context/DataContext';

const Schedule = () => {
  const { data } = useData();
  const busdata = data;
  const [busRoutesData, setBusRoutesData] = useState(busdata && busdata.length > 5 ? busdata[5] : []);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedTiming, setSelectedTiming] = useState('');
  const [selectedRouteStoppings, setSelectedRouteStoppings] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleRouteChange = (event) => {
    setSelectedRoute(event.target.value);
    setSelectedRouteStoppings(busRoutesData[event.target.value]);
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleStoppingChange = (event) => {
    setSelectedTiming(event.target.value);
    switch (event.target.value) {
      case 'MORNING':
        setBusRoutesData(busdata && busdata.length > 5 ? busdata[5] : []);
        break;
      case '1:45 PM':
        setBusRoutesData(busdata && busdata.length > 6 ? busdata[6] : []);
        break;
      case '5:00 PM':
        setBusRoutesData(busdata && busdata.length > 7 ? busdata[7] : []);
        break;
      case '6:00 PM':
        setBusRoutesData(busdata && busdata.length > 8 ? busdata[8] : []);
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

  const currentValue = getCalendarDates()[0];

  const dataTabs = getCalendarDates().map(date => ({
    label: date,
    value: date,
  }));

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Box className="container mx-auto px-4 py-8 md:py-12 md:w-4/5 lg:w-3/5 rounded-lg shadow-lg bg-white">
        <Tabs value={currentValue} textColor="primary" indicatorColor="primary" centered>
          {dataTabs.map(({ label, value }, index) => (
            <Tab
              key={value}
              value={value}
              label={label}
              className="text-sm md:text-lg"
              style={{
                backgroundColor: index === 0 ? '#71b1eb' : `rgb(0, ${index * 20 + 80}, ${index * 20 + 180})`,
                color: 'white',
              }}
            />
          ))}
        </Tabs>

        <Box mt={4} display="flex" justifyContent="space-between">
          <TextField
            id="outlined-select-bus-route"
            select
            label="Select Bus Number"
            value={selectedRoute}
            onChange={handleRouteChange}
            fullWidth
            variant="outlined"
            size="small"
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
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              },
            }}
          >
            {Object.keys(busRoutesData).map((routeName) => (
              <MenuItem key={routeName} value={routeName}>
                {routeName}
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
            variant="outlined"
            size="small"
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
              },
            }}
          >
            {['MORNING', '1:45 PM', '5:00 PM', '6:00 PM'].map((timing) => (
              <MenuItem key={timing} value={timing}>
                {timing}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Accordion
          expanded={activeAccordion === 0}
          onChange={() => toggleAccordion(0)}
          className="mt-4"
          style={{ backgroundColor: 'transparent' }}
        >
          <AccordionSummary
            expandIcon={activeAccordion === 0 ? <RemoveIcon /> : <AddIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="bg-gray-200"
          >
            <Typography variant="subtitle1" sx={{ flexBasis: '50.00%' }}>
              {selectedRoute} - {selectedTiming}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border p-2">Bus Route No</th>
                  <th className="border p-2">Stop Name</th>
                  <th className="border p-2">Timing</th>
                </tr>
              </thead>
              <tbody>
                {selectedRouteStoppings.map((stopping, index) => (
                  <tr key={index}>
                    <td className="border p-2">{selectedRoute}</td>
                    <td className="border p-2">{stopping["NAME OF THE STOPPING"]}</td>
                    <td className="border p-2">{stopping["TIME A.M"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
};

export default Schedule;
