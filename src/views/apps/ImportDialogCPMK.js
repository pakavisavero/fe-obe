import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { read, utils } from "xlsx";
import FileUploaderSingleCustom from "src/views/apps/FileUploaderSingleCustom";
import axios from "src/configs/AxiosSetting";

const ImportDialog = ({
  openDialog,
  handleClose,
  callback,
  templateFile = "",
  id,
}) => {
  const [file, setFile] = useState(null);

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  }, []);
  return (
    <>
      <Dialog
        open={openDialog}
        onClose={() => {
          setFile(null);
          handleClose();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Import File</DialogTitle>
        <DialogContent>
          <FileUploaderSingleCustom
            file={file}
            accept={{
              "application/vnd.ms-excel": [".xls", ".xlsx", ".csv"],
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [".xlsx"],
            }}
            // accept='text/csv'
            onDrop={handleDropSingleFile}
          />
        </DialogContent>
        <DialogActions>
          {templateFile !== "" && (
            <a href={`/template/${templateFile}`} download>
              <Button>Download Excel Template</Button>
            </a>
          )}

          <Button
            onClick={() => {
              setFile(null);
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              const f = await file.arrayBuffer();
              const wb = read(f); // parse the array buffer

              const cpmk = wb.Sheets["CPMK-CPL"];
              const tugas = wb.Sheets["NILAI TUGAS"];
              const praktek = wb.Sheets["NILAI PRAKTEK"];
              const uts = wb.Sheets["NILAI UTS"];
              const uas = wb.Sheets["NILAI UAS"];
              const siap = wb.Sheets["FORM NILAI SIAP"];
              const cpmkMhs = wb.Sheets["CPMK"];
              const cplMhs = wb.Sheets["CPL"];
              const evaluasi = wb.Sheets["Evaluasi"];

              const dataCPMK = utils.sheet_to_json(cpmk, {
                header: 1,
                raw: true,
                rawNumbers: true,
              });

              const dataTugas = utils.sheet_to_json(tugas, {
                header: 1,
                raw: true,
                rawNumbers: true,
              });

              const dataPraktek = utils.sheet_to_json(praktek, {
                header: 1,
                raw: true,
                rawNumbers: true,
              });

              const dataUts = utils.sheet_to_json(uts, {
                header: 1,
                raw: true,
                rawNumbers: true,
              });

              const dataUas = utils.sheet_to_json(uas, {
                header: 1,
                raw: true,
                rawNumbers: true,
              });

              const dataSiap = utils.sheet_to_json(siap, {
                header: 1,
                raw: true,
                rawNumbers: true,
              });

              const dataCplMhs = utils.sheet_to_json(cplMhs, {
                header: 1,
                raw: true,
                rawNumbers: true,
              });

              const dataCpmkMhs = utils.sheet_to_json(cpmkMhs, {
                header: 1,
                raw: true,
                rawNumbers: true,
              });

              const dataEvaluasi = utils.sheet_to_json(evaluasi, {
                header: 1,
                raw: true,
                rawNumbers: true,
              });

              const data = [
                dataCPMK,
                dataTugas,
                dataPraktek,
                dataUts,
                dataUas,
                dataSiap,
                dataCpmkMhs,
                dataCplMhs,
                dataEvaluasi,
              ];

              var formData = new FormData();
              formData.append("file", file);
              formData.append("id", id);
              axios.post("/save-template", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });

              callback(data);
              setFile(null);
              handleClose();
            }}
            autoFocus
            disabled={file ? false : true}
          >
            Import
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ImportDialog.propTypes = {
  openDialog: PropTypes.bool,
  templateFile: PropTypes.string,
  callback: PropTypes.func,
  handleClose: PropTypes.func,
};

export default ImportDialog;
