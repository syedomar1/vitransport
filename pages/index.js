import { Button, Container, Typography, Card, CardContent, Grid } from '@mui/material';
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />
      <Container className="pt-24">
        <div className="text-center mb-12">
          <Typography variant="h2" component="h1" className="font-bold mb-4">
            Welcome to VIT Transport Service
          </Typography>
          <Typography variant="h5" component="p" className="mb-4">
            Your reliable solution for campus transportation
          </Typography>
          <Button variant="contained" color="primary" size="large" className="bg-blue-500 hover:bg-blue-700">
            Get Started
          </Button>
        </div>
        
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent className="text-center">
                <Typography variant="h5" component="h2" className="font-bold mb-4">
                  Schedule
                </Typography>
                <Typography variant="body1" component="p" className="mb-4">
                  View the bus schedules to plan your trips efficiently.
                </Typography>
                <Button variant="outlined" color="primary" href="/schedule">
                  View Schedule
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent className="text-center">
                <Typography variant="h5" component="h2" className="font-bold mb-4">
                  Timings
                </Typography>
                <Typography variant="body1" component="p" className="mb-4">
                  Check the timings for various routes and stops.
                </Typography>
                <Button variant="outlined" color="primary" href="/timings">
                  View Timings
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent className="text-center">
                <Typography variant="h5" component="h2" className="font-bold mb-4">
                  Track
                </Typography>
                <Typography variant="body1" component="p" className="mb-4">
                  Track the current location of the buses in real-time.
                </Typography>
                <Button variant="outlined" color="primary" href="/track">
                  Track Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
