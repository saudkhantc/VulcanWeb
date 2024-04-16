import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";

const LearnerFaq = () => {
  return (
    <Box
      sx={{
        mx: {
          xs: 5,
          sm: 10,
          md: 20,
          lg: 30,
        },
        mb: 30,
      }}
    >
      <Typography variant="h1" align="center" sx={{ my: 5 }} component="h2">
        Learner FAQ
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="subtitle1">Where do classes happen?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="subtitle1">
            Do I have to apply to enroll in a course?Is there an admissions
            process?
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography variant="subtitle2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography variant="subtitle1">How much is tuition?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="subtitle1">
            Are there any requirements to enroll in acourse?
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography variant="subtitle2">
            Classes happen fully online / remotely.Students will be provided
            with a video conferencing link with which classes can be accessed?
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="subtitle1">
            Am I guaranteed a job after completing an advanced course?
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography variant="subtitle2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="subtitle1">
            Are career services offered?
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography variant="subtitle2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="subtitle1">
            What if I don't like the course and want to drop out?
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography variant="subtitle2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="subtitle1">Who are the instructors?</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography variant="subtitle2">
            Classes happen fully online / remotely.Students will be provided
            with a video conferencing link with which classes can be accessed?
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default LearnerFaq;
