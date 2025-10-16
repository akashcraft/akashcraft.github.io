import "./../styles/App.css";
import HolderBox from "../akash-commons/HolderBox";
import munLogo from "./../assets/img-education/mun.png";
import dpsLogo from "./../assets/img-education/dps.png";
import { Avatar, Box, Chip, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";

function Education() {
  return (
    <HolderBox label="Education">
      <br />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Paper
          elevation={0}
          sx={{ padding: "1rem", marginBottom: "1rem", borderRadius: "1rem" }}
        >
          <Typography variant="h6" gutterBottom>
            Bachelor of Engineering - Computer Engineering
          </Typography>
          <Chip
            label="Memorial University of Newfoundland"
            icon={
              <Avatar
                sx={{ width: "1.4rem", height: "1.4rem" }}
                src={munLogo}
              />
            }
          />
          <Box sx={{ margin: "0.25rem" }}>
            <Typography variant="body2">September 2021 - Present</Typography>
            <Typography variant="body2">GPA - 4.0/4.0</Typography>
          </Box>
        </Paper>
        <Paper elevation={0} sx={{ padding: "1rem", borderRadius: "1rem" }}>
          <Typography variant="h6" gutterBottom>
            High School Diploma - Science Stream
          </Typography>
          <Chip
            label="DPS Modern Indian School"
            icon={
              <Avatar
                sx={{ width: "1.4rem", height: "1.4rem" }}
                src={dpsLogo}
              />
            }
          />
          <Box sx={{ margin: "0.25rem" }}>
            <Typography variant="body2">Graduated - April 2021</Typography>
            <Typography variant="body2">Grade - 97%</Typography>
          </Box>
        </Paper>
      </motion.div>
    </HolderBox>
  );
}

export default Education;
