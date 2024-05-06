// RadioGroupRating.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import Typography from '@mui/material/Typography';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
    fontSize: '2.5rem',
  },
  '& .MuiRating-iconFilled .MuiSvgIcon-root': {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
      fontSize: '1.5rem', // Adjusted size for smaller screens
    },
    '& .MuiRating-iconFilled .MuiSvgIcon-root': {
      fontSize: '1.5rem', // Adjusted size for smaller screens
    },

  },
}));

const customIcons = {
  5: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Labai stipriai',
  },
  4: {
    icon: <SentimentDissatisfiedIcon color="warning" />,
    label: 'Stipriai',
  },
  2: {
    icon: <SentimentSatisfiedIcon color="#aed581" />,
    label: 'Silpnai',
  },
  1: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Labai silpnai',
  },
  3: {
    icon: <SentimentNeutralIcon color="#ffea00" />,
    label: 'Vidutiniškai',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  const isSmallScreen = window.outerWidth <= 600; 
  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        textAlign: 'center', 
        alignItems: 'center', 
        marginLeft: isSmallScreen ? '10px' : '30px',
        fontSize: isSmallScreen ? '10px' : '16px',
        marginBottom: '30px', 
        marginTop: '15px',
    }} {...other}>
      {customIcons[value].icon}
      <Typography variant="body2" color="textSecondary" style={{fontSize: isSmallScreen ? '10px' : '16px',}}>
        {customIcons[value].label}
      </Typography>
    </div>
  );
}
IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const RadioGroupRating = ({ onSelect }) => {
  const [ratingValue, setRatingValue] = useState(3);

  const handleRatingChange = (event, newValue) => {
    setRatingValue(newValue);
    onSelect(newValue); // Call onSelect prop with the selected value
  };

  return (
    <StyledRating
      name="highlight-selected-only"
      value={ratingValue}
      onChange={handleRatingChange}
      IconContainerComponent={IconContainer}
      getLabelText={(value) => customIcons[value].label}
      highlightSelectedOnly
    />
  );
};

RadioGroupRating.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default RadioGroupRating;
