import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Businfo = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const searchInSheets = (selectedRoute) => {
    let foundData = [];
    const allData = []; // Add your data source here

    foundData = allData.filter(route => selectedRoute.includes(route.routeNo) && selectedRoute.includes(route.routeName));
    return foundData;
  };

  const handleRouteChange = (event) => {
    const selectedRoute = event.target.value;
    setSelectedRoute(selectedRoute);

    const foundData = searchInSheets(selectedRoute);
    setFilteredData(foundData);
  };

  return (
    <div className="min-h-screen bg-darkBlue flex justify-center items-center">
      <div className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-lightBlue p-6 rounded-xl overflow-y-auto">
        <div className="mb-10 border-l-8 border-white pl-4">
          <p className="text-4xl font-bold text-white">BUS DETAILS</p>
        </div>

        <div className="w-full mb-10">
          <form>
            <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: '2.5rem' }}>
              <TextField
                id="busNumber"
                select
                label="Select Route Number"
                value={selectedRoute}
                onChange={handleRouteChange}
                className="w-full mb-4"
                variant="outlined"
                placeholder="Select Route Number"
                sx={{
                  mr: 2,
                  width: '30vw',
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
                    sx: { maxHeight: '50vh', maxWidth: '30vw' },
                  },
                }}
                InputProps={{
                  style: { textAlign: 'center', color: 'white' },
                }}
              >
                {/* Add your MenuItem components here */}
              </TextField>
            </Box>
            <hr className="w-full my-4 border-white" />
          </form>
        </div>

        <Accordion className="w-full mb-4" expanded={activeAccordion === 0} onChange={() => toggleAccordion(0)}>
          <AccordionSummary
            expandIcon={activeAccordion === 0 ? <RemoveIcon /> : <AddIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="bg-white text-darkBlue"
          >
            <Typography className="w-full text-center font-semibold">Bus Incharge Info</Typography>
          </AccordionSummary>
          <AccordionDetails className="text-darkBlue">
            {/* Your Bus Incharge Info content goes here */}
          </AccordionDetails>
        </Accordion>

        <Accordion className="w-full mb-4" expanded={activeAccordion === 1} onChange={() => toggleAccordion(1)}>
          <AccordionSummary
            expandIcon={activeAccordion === 1 ? <RemoveIcon /> : <AddIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            className="bg-white text-darkBlue"
          >
            <Typography className="w-full text-center font-semibold">Bus Information</Typography>
          </AccordionSummary>
          <AccordionDetails className="text-darkBlue">
            {/* Your Bus Information content goes here */}
            {filteredData.map((route, index) => (
              <div key={index} className="mb-2">
                <Typography>Route Number: {route.routeNo}</Typography>
                <Typography>Route Name: {route.routeName}</Typography>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion className="w-full mb-4" expanded={activeAccordion === 2} onChange={() => toggleAccordion(2)}>
          <AccordionSummary
            expandIcon={activeAccordion === 2 ? <RemoveIcon /> : <AddIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
            className="bg-white text-darkBlue"
          >
            <Typography className="w-full text-center font-semibold">Route Information</Typography>
          </AccordionSummary>
          <AccordionDetails className="text-darkBlue">
            {/* Your Route Information content goes here */}
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Businfo;
