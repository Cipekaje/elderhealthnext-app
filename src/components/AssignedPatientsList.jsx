import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Typography, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import SummaryIcon from '@mui/icons-material/Summarize';
import moment from 'moment';

// ==============================|| ASSIGNED PATIENTS LIST ||============================== //

const AssignedPatientsList = ({ patients, searchTerm, onRemovePatient, onGetSummary }) => {
    const filteredPatients = patients.filter((patient) => {
        const fullName = `${(patient.firstName || '').toLowerCase()} ${(patient.lastName || '').toLowerCase()}`;
        const email = patient.email.toLowerCase();
        const searchTermLowerCase = searchTerm.toLowerCase();

        return fullName.includes(searchTermLowerCase) || email.includes(searchTermLowerCase);
    });

    return (
        <List dense component="nav">
            {filteredPatients.map((patient) => (
                <ListItem
                    key={patient.id}
                    sx={{
                        padding: 1.5,
                        '&:hover': {
                            backgroundColor: alpha('#000', 0.04),
                            borderRadius: 10
                        },
                    }}
                >
                    <ListItemText
                        primary={
                            <>
                                <Typography variant="subtitle1">
                                    {patient.firstName} {patient.lastName}
                                </Typography>
                                <Typography variant="body2"> El. paštas: {patient.email}</Typography>
                                {patient.gender && <Typography variant="body2">Lytis: {patient.gender}</Typography>}
                                {patient.birthdate && (
                                        <Typography variant="body2">Gimimo data: {moment(patient.birthdate).format('YYYY-MM-DD')}</Typography>
                                )}
                            </>
                        }
                    />
                    {/* Secondary buttons */}
                    <ListItemSecondaryAction>
                        {/* Remove patient button */}
                        <IconButton
                            aria-label="Remove"
                            onClick={() => onRemovePatient(patient.id)}
                        >
                            <Typography variant="subtitle1"> Pašalinti  </Typography>
                            <DeleteIcon />
                        </IconButton>
                        {/* Get summary button */}
                        <IconButton
                            aria-label="Summary"
                            onClick={() => onGetSummary(patient.id)}
                        >
                            <Typography variant="subtitle1"> Santrauka  </Typography>
                            <SummaryIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    );
};

export default AssignedPatientsList;
