import { Grid, Divider, Button, Box, Typography } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Accordion from "@mui/material/Accordion";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const DialogSelected = ({ open, close, data }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getColorNilai = (nilai) => {
    if (nilai > 69.9) {
      return "green";
    } else {
      return "red";
    }
  };

  const generateRow = (params) => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item width={150}>
            <Typography>{params[0]}</Typography>
          </Grid>
          <Grid item width={60}>
            <Typography>:</Typography>
          </Grid>
          <Grid
            item
            xs={8}
            sx={{ color: params[2] ? getColorNilai(params[1]) : "" }}
          >
            {params[1]}
          </Grid>
        </Grid>
        <Divider sx={{ mt: 4 }} />
      </>
    );
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={open}
      onClose={close}
      aria-labelledby="form-dialog-content"
    >
      <DialogTitle id="form-dialog-title">Informasi Mata Kuliah</DialogTitle>
      <DialogContent id="form-dialog-content">
        <Divider sx={{ mb: 4 }} />

        {generateRow([
          "Mata Kuliah",
          data.mataKuliah.kode_mk + " - " + data.mataKuliah.mata_kuliah,
        ])}
        {generateRow(["Kelas", data.kelas])}
        {generateRow(["Semester", data.semester])}
        {generateRow(["Tahun Ajaran", data.tahunAjaran.tahun_ajaran])}
        {generateRow(["Rerata CPL", data.rerataCpl, true])}

        <Grid sx={{ mb: 8 }}></Grid>

        {data.cpmk.map((item) => {
          return (
            <Accordion
              expanded={expanded === `panel-${item.id}`}
              onChange={handleChange(`panel-${item.id}`)}
              sx={{ width: "100%", mb: 3 }}
            >
              <AccordionSummary
                expandIcon={<ChevronDown />}
                id="controlled-panel-header-1"
                aria-controls="controlled-panel-content-1"
                sx={{ height: "70px" }}
              >
                <Typography>
                  <Box
                    component="div"
                    sx={{ display: "inline", fontWeight: "bold" }}
                  >
                    [{item.name}]
                  </Box>
                </Typography>
                <Typography
                  sx={{
                    isplay: "inline",
                    color: getColorNilai(item.value),
                    marginX: "5px",
                  }}
                >
                  [{item.value}]
                </Typography>
                - {item.statement}
              </AccordionSummary>

              <AccordionDetails>
                <Divider sx={{ mb: "25px", mt: "0px" }} />
                {item.cpl.map((cpl, id) => (
                  <>
                    <Box
                      component="div"
                      sx={{ display: "inline", color: "blue" }}
                    >
                      {cpl.name} ({cpl.value})
                    </Box>

                    <Typography sx={{ marginTop: "10px" }}>
                      {cpl.statement}
                    </Typography>

                    <Box component="div" sx={{ mt: 3 }}>
                      <Typography
                        sx={{ display: "inline", fontWeight: "bold" }}
                      >
                        Rerata CPL -
                      </Typography>{" "}
                      <Typography
                        sx={{
                          display: "inline",
                          color: getColorNilai(cpl.rerataOneCpl),
                        }}
                      >
                        {cpl.rerataOneCpl}
                      </Typography>
                    </Box>

                    {id + 1 != item.cpl.length && (
                      <Divider sx={{ mb: "10px", mt: "20px" }} />
                    )}
                  </>
                ))}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </DialogContent>

      <DialogActions className="dialog-actions-dense" sx={{ mt: "25px" }}>
        <Button onClick={close} size="medium" variant="outlined" sx={{ mr: 3 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogSelected;
