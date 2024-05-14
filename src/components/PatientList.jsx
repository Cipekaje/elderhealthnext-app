import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Typography, IconButton, Dialog } from '@mui/material';
import { alpha } from '@mui/material/styles';
import moment from 'moment';

import ConfirmationDialog from "../components/ConfirmationDialog";
import AssignmentIcon from '@mui/icons-material/Assignment';

// ==============================|| PATIENT LIST ||============================== //
const PatientList = ({ patients, searchTerm, onAssignPatient }) => {
    const itemsPerPage = 10;
    const [page, setPage] = useState(1);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [selectedPatientID, setSelectedPatientID] = useState(null);

    const handleOpenConfirmation = (patientID) => {
        setSelectedPatientID(patientID);
        setOpenConfirmation(true);
    };

    const filteredPatients = patients.filter((patient) => {
        const fullName = `${(patient.firstName || '').toLowerCase()} ${(patient.lastName || '').toLowerCase()}`;
        const email = patient.email.toLowerCase();
        const searchTermLowerCase = searchTerm.toLowerCase();

        return fullName.includes(searchTermLowerCase) || email.includes(searchTermLowerCase);
    });

    const handleAssignPatient = () => {
        onAssignPatient(selectedPatientID);
        setOpenConfirmation(false);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const paginatedPatients = filteredPatients.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <>
            <List dense component="nav">
                {paginatedPatients.map((patient) => (
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
                        {/* Secondary button */}
                        <ListItemSecondaryAction>
                            <IconButton
                                aria-label="Assign"
                                onClick={() => handleOpenConfirmation(patient.id)}
                            >
                                <Typography variant="subtitle1"> Pridėti  </Typography>
                                <AssignmentIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
                {getPageNumbers().map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        style={{
                            marginRight: '8px',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            border: 'none',
                            backgroundColor: page === pageNumber ? '#1976D2' : '#FFFFFF',
                            color: page === pageNumber ? '#FFFFFF' : '#000000',
                        }}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>

            <ConfirmationDialog
                open={openConfirmation}
                onClose={() => setOpenConfirmation(false)}
                onConfirm={handleAssignPatient}
                title="Pridėti pacientą" // Optional custom title
                message={`Ar tikrai norite pridėti pacientą ${selectedPatientID && patients.find(p => p.id === selectedPatientID)?.firstName} ${selectedPatientID && patients.find(p => p.id === selectedPatientID)?.lastName} prie savo prižiūrimų pacientų sąrašo?`}
            />
        </>
    );
};

export default PatientList;
