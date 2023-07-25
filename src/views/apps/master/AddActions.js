import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";

import CircularProgress from "@mui/material/CircularProgress";

const AddActions = ({
  loading,
  actionSaveback,
  ActionSave,
  ActionBack,
  ActionSaveNew,
  withBack,
  withSave,
  isEdit,
}) => {
  return (
    <Box>
      <Card>
        <CardContent>
          <Stack direction={{ md: "row", xs: "column" }} spacing={5}>
            <Box sx={{ width: { md: "33.33%", xs: "100%" } }}>
              <Button
                fullWidth
                onClick={ActionBack}
                sx={{
                  backgroundColor: "rgb(236,236,236)",
                  color: "black",
                  outlineColor: "black",
                }}
              >
                Back
              </Button>
            </Box>

            {withSave && (
              <>
                <Box sx={{ width: { md: "33.33%", xs: "100%" } }}>
                  <Button
                    fullWidth
                    onClick={ActionSave}
                    sx={{
                      backgroundColor: "rgb(236,236,236)",
                      color: "black",
                      outlineColor: "black",
                    }}
                  >
                    {loading ? (
                      <CircularProgress
                        sx={{
                          color: "common.primary",
                          width: "25px !important",
                          height: "25px !important",
                          mr: (theme) => theme.spacing(2),
                        }}
                      />
                    ) : null}
                    {isEdit ? "Update" : "Save"}
                  </Button>
                </Box>
              </>
            )}

            {withBack && (
              <Box sx={{ width: { md: "33.33%", xs: "100%" } }}>
                <Button
                  fullWidth
                  // startIcon={<SendOutline />}
                  onClick={actionSaveback}
                  sx={{
                    backgroundColor: "rgb(236,236,236)",
                    color: "black",
                    outlineColor: "black",
                  }}
                >
                  {isEdit ? "Update  & Back" : "Save  & Back"}
                </Button>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddActions;
