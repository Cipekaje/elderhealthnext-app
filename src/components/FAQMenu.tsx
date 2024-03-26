import React from 'react';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQSection = () => {
    const faqs = [
        { question: 'Kodėl būtent naudotis mūsu paslaugomis?', answer: 'Todėl, kad labai gerai.' },
        { question: 'Kaip su jumis susisiekti?', answer: 'Viršuje pateikti kontaktų duomenys. Klientų aptarnavimui: +370 06061131, pagalba@gmail.com' },
        { question: 'Ar gaminiui suteikiama garantija ir ką ji apima?', answer: 'Taip, mūsų gaminiui suteikiama 1 metų garantija. Tai apima medžiagų ir gamybos defektus. Jei susiduriate su problemomis, kurioms taikoma garantija, kreipkitės pagalbos į mūsų klientų aptarnavimo skyrių..' },
    ];

    return (
        <>
            <Typography variant="h4" paddingLeft={1} gutterBottom>Dažnai užduodami klausimai</Typography>
            {faqs.map((faq, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        className="accordionSummary"
                    >
                        <Typography>{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{faq.answer}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    );
};

export default FAQSection;
