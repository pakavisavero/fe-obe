import React from "react";
import { Breadcrumbs, Typography, styled, Stack, Box } from "@mui/material";
import Link from "next/link";
import { getColor, getColorPK, getLabel } from "src/utils/field";

const StyledLink = styled("a")(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
  fontSize: "14px",
}));

function getColorMultiple(id) {
  return getColorPK(id);
}

function Index({ data = [], withDocStatus = false, value = [] }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Breadcrumbs aria-label="breadcrumb">
        {data.map((e, i) => {
          if (e.link)
            return (
              <Link href={e.link} passHref key={i}>
                <StyledLink> {e.name}</StyledLink>
              </Link>
            );
          return (
            <Typography color="text.primary" fontSize="14px" key={i}>
              {e.name}
            </Typography>
          );
        })}
      </Breadcrumbs>
      {withDocStatus && (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: "15px",
              height: "15px",
              marginRight: "10px",
              backgroundColor: getColorMultiple(value.docstatus),
              borderRadius: "50%",
            }}
          ></Box>

          {value.doc_status_id_name.status}
        </Stack>
      )}
    </Stack>
  );
}

export default Index;
