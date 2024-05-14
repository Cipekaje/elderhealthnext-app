import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Box, Card, CardContent } from '@mui/material';
import Close from '@mui/icons-material/Close';
import dynamic from 'next/dynamic';
import moment from 'moment';

// Dynamic import of Chart component to be rendered client side
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// ==============================|| SUMMARY ||============================== //

const Summary = ({ open, userID, onClose }) => {

    //Charts
    const [hrSeries, setHrSeries] = useState([{ name: 'Vidutinis širdies ritmas (bpm)', data: [] }]);
    const [stepSeries, setStepSeries] = useState([{ name: 'Nueitų žingsnių skaičius', data: [] }]);
    const [distanceSeries, setDistanceSeries] = useState([{ name: 'Nueitas atstumas (km)', data: [] }]);

    const [journalEntries, setJournalEntries] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        if (open) {
            fetchHeartrateData();
            fetchUserData();
            fetchStepData();
            fetchDistanceData();
            fetchJournalEntries();
        }
    }, [open]);

    //Logic to set the chart x axis
    const getPastWeekDays = () => {
        const daysOfWeek = ['S', 'P', 'A', 'T', 'K', 'Pn', 'Š'];
        const currentDate = new Date();
        const pastWeekDays = [];

        for (let i = 8; i >= 0; i--) {
            const pastDate = new Date(currentDate);
            pastDate.setDate(currentDate.getDate() - i);
            const dayIndex = pastDate.getDay();
            const dayOfMonth = String(pastDate.getDate()).padStart(2, '0');
            const month = String(pastDate.getMonth() + 1).padStart(2, '0');
            const formattedDate = `${daysOfWeek[dayIndex]}(${month}-${dayOfMonth})`;
            pastWeekDays.push(formattedDate);
        }

        return pastWeekDays;
    };

    //Heartrate chart backend call
    const fetchHeartrateData = async () => {
        try {
            const response = await fetch('/api/heartrateChart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userID }),
            });
            if (response.ok) {
                const data = await response.json();
                setHrSeries([{ name: 'Vidutinis širdies ritmas (bpm)', data: data }]);
            } else {
                console.error('Failed to fetch data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    //Step chart backend call
    const fetchStepData = async () => {
        try {
            const response = await fetch('/api/stepChart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userID }),
            });
            if (response.ok) {
                const data = await response.json();

                const transformedStepData = data.map(item => parseInt(item.totalSteps));
                setStepSeries([{ name: 'Nueitų žingsnių skaičius', data: transformedStepData }]);
            } else {
                console.error('Failed to fetch data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    //Distance data backend call
    const fetchDistanceData = async () => {
        try {
            const response = await fetch('/api/distanceChart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userID }),
            });
            if (response.ok) {
                const data = await response.json();

                // Transform data if needed
                const transformedDistanceData = data.map(item => parseFloat(item.distance));
                setDistanceSeries([{ name: 'Nueitas atstumas (km)', data: transformedDistanceData }]);
            } else {
                console.error('Failed to fetch data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    //User data backend call
    const fetchUserData = async () => {
        try {
            // Fetch the doctor ID from your session or wherever it's available
            const response = await fetch(`/api/patient/getUserData?userID=${userID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const ud = await response.json();
            setUserData(ud);
        } catch (error) {
            console.error('Nepavyko paciento duomenų:', error);
        }
    };

    //Journal data backend call
    const fetchJournalEntries = async () => {
        try {
            const response = await fetch(`/api/patient/fetchJournal?userId=${userID}`);
            if (response.ok) {
                const data = await response.json();
                setJournalEntries(data);
            } else {
                console.error('Failed to fetch journal entries:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching journal entries:', error);
        }
    };

    //Heartrate chart options
    const heartrateChartOptions = {
        chart: {
            height: 350,
            width: '100%',
            type: 'line',
            toolbar: { show: false },
            redrawOnParentResize: true,
            redrawOnWindowResize: true,
        },
        title: {
            text: 'Širdies ritmas praėjusią savaitę',
            align: 'center',
            style: { fontSize: '16px', fontWeight: 600, fontFamily: 'Arial, sans-serif', color: '#333' },
        },
        xaxis: {
            categories: getPastWeekDays(),
            labels: { style: { fontSize: '18px', fontWeight: 400, fontFamily: 'Arial, sans-serif', colors: '#666' } },
        },
        yaxis: {
            title: { text: 'Širdies ritmas (bpm)', style: { fontSize: '18px', fontWeight: 400, fontFamily: 'Arial, sans-serif', color: '#666' } },
            labels: { style: { fontSize: '16px', fontWeight: 400, fontFamily: 'Arial, sans-serif', colors: '#666' } },
        },
        stroke: {
            curve: 'smooth',
        },
        markers: {
            size: 6,
        },
    };

    //Step chart options
    const stepChartOptions = {
        chart: {
            height: 350,
            width: '100%',
            type: 'bar',
            toolbar: { show: false },
            redrawOnParentResize: true,
            redrawOnWindowResize: true,
        },
        title: {
            text: 'Nueiti žingsniai praėjusią savaitę',
            align: 'center',
            style: { fontSize: '16px', fontWeight: 600, fontFamily: 'Arial, sans-serif', color: '#333' },
        },
        xaxis: {
            categories: getPastWeekDays().slice(-stepSeries[0].data.length),
            labels: { style: { fontSize: '18px', fontWeight: 400, fontFamily: 'Arial, sans-serif', colors: '#666' } },
        },
        yaxis: {
            title: { text: 'Žingsniai', style: { fontSize: '18px', fontWeight: 400, fontFamily: 'Arial, sans-serif', color: '#666' } },
            labels: { style: { fontSize: '16px', fontWeight: 400, fontFamily: 'Arial, sans-serif', colors: '#666' } },
        },
    };

    //Distance chart options
    const distanceChartOptions = {
        chart: {
            height: 350,
            width: '100%',
            type: 'bar',
            toolbar: { show: false },
            redrawOnParentResize: true,
            redrawOnWindowResize: true,
        },
        title: {
            text: 'Nueitas atstumas praėjusią savaitę',
            align: 'center',
            style: { fontSize: '16px', fontWeight: 600, fontFamily: 'Arial, sans-serif', color: '#333' },
        },
        xaxis: {
            categories: getPastWeekDays().slice(-distanceSeries[0].data.length),
            labels: { style: { fontSize: '18px', fontWeight: 400, fontFamily: 'Arial, sans-serif', colors: '#666' } },
        },
        yaxis: {
            title: { text: 'Atstumas (km)', style: { fontSize: '18px', fontWeight: 400, fontFamily: 'Arial, sans-serif', color: '#666' } },
            labels: { style: { fontSize: '16px', fontWeight: 400, fontFamily: 'Arial, sans-serif', colors: '#666' } },
        },
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xl" // Adjust the maxWidth property as needed
            fullWidth
            sx={{
                backdropFilter: "blur(5px)",
                //other styles here
            }}
        >
            <DialogTitle>
                Santrauka
                <IconButton onClick={onClose} sx={{ position: 'absolute', right: 0, top: 0, color: 'red' }}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ height: 'calc(100vh - 200px)', padding: '20px' }}>
                    {/* Content */}

                    {/* Paciento duomenys */}
                    <Typography variant="h6" sx={{ marginBottom: '10px', borderBottom: '1px solid #ccc' }}>Paciento duomenys</Typography>

                    {userData && userData.map((user) => (
                        <div key={user.id}>
                            <Typography variant="body1" sx={{ marginBottom: '8px' }}><strong>Vardas:</strong> {user.firstName}</Typography>
                            <Typography variant="body1" sx={{ marginBottom: '8px' }}><strong>Pavardė:</strong> {user.lastName}</Typography>
                            <Typography variant="body1" sx={{ marginBottom: '8px' }}><strong>El. paštas:</strong> {user.email}</Typography>
                            <Typography variant="body1" sx={{ marginBottom: '8px' }}><strong>Gimimo data:</strong> {moment(user.birthdate).format('YYYY-MM-DD')}</Typography>
                            <Typography variant="body1" sx={{ marginBottom: '8px' }}><strong>Lytis:</strong> {user.gender}</Typography>
                            <Typography variant="body1" sx={{ marginBottom: '8px' }}><strong>Svoris:</strong> {user.weight}</Typography>
                            <Typography variant="body1" sx={{ marginBottom: '8px' }}><strong>Ūgis:</strong> {user.height}</Typography>
                            <Typography variant="body1" sx={{ marginBottom: '8px' }}><strong>Liga:</strong> {user.disease}</Typography>
                        </div>
                    ))}

                    {/* Širdies ritmo diagrama */}
                    <Box sx={{ marginTop: '20px', borderTop: '1px solid #ccc' }}>
                        <Typography variant="h6" sx={{ marginTop: '20px' }}>Praėjusios savaitės širdies ritmo diagrama:</Typography>
                        <Chart options={heartrateChartOptions} series={hrSeries} type="line" height={370} width={'100%'} />
                    </Box>

                    {/* Žingsnių diagrama */}
                    <Box sx={{ marginTop: '20px', borderTop: '1px solid #ccc' }}>
                        <Typography variant="h6" sx={{ marginTop: '20px' }}>Praėjusios savaitės nueitų žingsnių diagrama:</Typography>
                        <Chart options={stepChartOptions} series={stepSeries} type="bar" height={370} width={'100%'} />
                    </Box>

                    {/* Nueito atstumo diagrama */}
                    <Box sx={{ marginTop: '20px', borderTop: '1px solid #ccc' }}>
                        <Typography variant="h6" sx={{ marginTop: '20px' }}>Praėjusios savaitės nueito atstumo diagrama:</Typography>
                        <Chart options={distanceChartOptions} series={distanceSeries} type="bar" height={370} width={'100%'} />
                    </Box>

                    {/* Auksciausias sirdies ritmas paskutine savaite */}

                    {/* Zonų grafikas */}

                    {/* Įvesti simptomai */}
                    <Typography variant="h6" sx={{ marginBottom: '10px', borderBottom: '1px solid #ccc' }}>Dienoraščio įrašai:</Typography>
                    {journalEntries.map((entry, index) => (
                        <Card key={index} sx={{
                            padding: '20px',
                            marginBottom: '10px',
                            '&:hover': {
                                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                                transform: 'translateY(-2px)',
                            }
                        }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>{moment(entry.date).format('YYYY-MM-DD')}</Typography>
                                <Typography variant="subtitle1" gutterBottom><strong>Simptomas:</strong> {entry.symptom}</Typography>
                                <Typography variant="body1" gutterBottom><strong>Paciento aprašymas:</strong> {entry.description}</Typography>
                                <Typography variant="body2" color="textSecondary"><strong>Skausmo lygis:</strong> {entry.severity}</Typography>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Footer */}
                    <Box sx={{ marginTop: '20px', borderTop: '1px solid #ccc', textAlign: 'left' }}>
                        <Typography variant="body2">Santraukos data: {moment().format('YYYY-MM-DD')}</Typography>
                        <Typography variant="body2">ElderHealth Companion</Typography>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default Summary;
