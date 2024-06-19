import React, { useState } from 'react';
import { Box, TextField, MenuItem, Tabs, Tab, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Schedule = () => {
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedRouteStoppings, setSelectedRouteStoppings] = useState([]);
  const [selectedTiming, setSelectedTiming] = useState('');
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  const busData = {
    "1 PADI SARAVANA": [
      {
        "SL.NO.": 1,
        "NAME OF THE STOPPING": "PADI SARAVANA STORES",
        "TIME A.M": "06.00AM"
      },
      {
        "SL.NO.": 2,
        "NAME OF THE STOPPING": "DUNLOP",
        "TIME A.M": "06.05AM"
      },
      {
        "SL.NO.": 3,
        "NAME OF THE STOPPING": "AMBATTUR OT",
        "TIME A.M": "06.10AM"
      },
      {
        "SL.NO.": 4,
        "NAME OF THE STOPPING": "VANDALUR ",
        "TIME A.M": "07.30AM"
      },
      {
        "SL.NO.": 5,
        "NAME OF THE STOPPING": "VIT",
        "TIME A.M": "07.45AM"
      }
    ],
    "BUS ROUTE NO: 1A  THIRUMULLAIVAYAL": [
      {
        "SL.NO.": 1,
        "NAME OF THE STOPPING": "THIRUMULLAIVAYAL",
        "TIME A.M": "06.20AM"
      },
      {
        "SL.NO.": 2,
        "NAME OF THE STOPPING": "AVADI",
        "TIME A.M": "06.25AM"
      },
      {
        "SL.NO.": 3,
        "NAME OF THE STOPPING": "PATTABIRAM ",
        "TIME A.M": "06.35AM"
      },
      {
        "SL.NO.": 4,
        "NAME OF THE STOPPING": "NEMILICHERY ",
        "TIME A.M": "06.40AM"
      },
      {
        "SL.NO.": 5,
        "NAME OF THE STOPPING": "VANDALUR ",
        "TIME A.M": "07.25AM"
      },
      {
        "SL.NO.": 6,
        "NAME OF THE STOPPING": "VIT",
        "TIME A.M": "07.45AM"
      }
    ],
    "BUS ROUTE NO: 2   AYANAVARAM ": [
      {
        "SL.NO.": 1,
        "NAME OF THE STOPPING": "AYANAVARAM",
        "TIME A.M": "6.25AM"
      },
      {
        "SL.NO.": 2,
        "NAME OF THE STOPPING": "ESI HOSPITAL",
        "TIME A.M": "6.30AM"
      },
      {
        "SL.NO.": 3,
        "NAME OF THE STOPPING": "KILPAUK GARDEN",
        "TIME A.M": "6.40AM"
      },
      {
        "SL.NO.": 4,
        "NAME OF THE STOPPING": "ANNA NAGAR CHINTHAMANI",
        "TIME A.M": "6.45AM"
      },
      {
        "SL.NO.": 6,
        "NAME OF THE STOPPING": "SHANTHI  COLANY",
        "TIME A.M": "6.55AM"
      },
      {
        "SL.NO.": 7,
        "NAME OF THE STOPPING": "VANDALUR",
        "TIME A.M": "7.40AM"
      },
      {
        "SL.NO.": 8,
        "NAME OF THE STOPPING": "VIT ",
        "TIME A.M": "7.50AM"
      }
    ],
  };

  const handleRouteChange = (event) => {
    setSelectedRoute(event.target.value);
    setSelectedRouteStoppings(busData[event.target.value] || []);
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleStoppingChange = (event) => {
    setSelectedTiming(event.target.value);
    // Update busRoutesData based on selected timing
    // For now, this part is simplified and does not fetch different data based on timing.
    setSelectedRouteStoppings(busData[selectedRoute] || []);
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
                  marginInline:'10px'
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
                sx={{textFont:"bold", fontSize: '1rem', color: 'white', backgroundColor: index === tabIndex ? 'lightblue' : 'inherit' }}
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
                {Object.keys(busData).map((routeName) => (
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
                <MenuItem value="1:45 PM">1:45 PM</MenuItem>
                <MenuItem value="5:00 PM">5:00 PM</MenuItem>
                <MenuItem value="6:00 PM">6:00 PM</MenuItem>
              </TextField>
            </Box>
            <hr style={{ width: '80%', margin: '3% 0', left: '10%' }} />
          </Box>
          <Accordion style={{ margin: '0% 5%', width: '90%', marginBottom: '2rem' }}>
            <AccordionSummary
              expandIcon={activeAccordion === 0 ? <RemoveIcon /> : <AddIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              sx={{ backgroundColor: 'white', color: '#71b1eb', textAlign: 'center' }}
              onClick={() => toggleAccordion(0)}
            >
              <Typography variant="subtitle1" sx={{ flexBasis: '50.00%' }}>{selectedRoute}</Typography>
              <Typography variant="subtitle1" sx={{ flexBasis: '50.00%' }}>{selectedTiming}</Typography>
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
                  {selectedRouteStoppings.map((stopping, index) => (
                    <tr key={index}>
                      <td className="p-3 text-center">{stopping["SL.NO."]}</td>
                      <td className="p-3 text-center">{stopping["NAME OF THE STOPPING"]}</td>
                      <td className="p-3 text-center">{stopping["TIME A.M"]}</td>
                    </tr>
                  ))}
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
