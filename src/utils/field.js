import {
  Autocomplete,
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";

import ChevronDown from "mdi-material-ui/ChevronDown";
import ChevronUp from "mdi-material-ui/ChevronUp";
import Link from "next/link";
import DatePicker from "react-datepicker";

import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import CustomInput, { CustomInputTwo } from "src/@core/components/CustomInput";
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import Translations from "src/layouts/components/Translations";

import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

import "react-datepicker/dist/react-datepicker.css";

const StyledLink = styled("a")(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

export const DrawField = (field, errors, control, key) => {
  if (["text", "email", "number", "password"].includes(field.type)) {
    const defaultValueNumber = () => (field.defaultQty ? 1 : "");

    const getType = () => {
      if (field.type === "password") {
        if (field.visibility) return "password";
        return "text";
      }

      return field.type;
    };

    return (
      !field.hidden && (
        <Grid item xs={field.xs} md={field.md} key={key}>
          <FormControl fullWidth>
            <Controller
              name={field.name}
              control={control}
              rules={{ required: true }}
              readOnly={field.readOnly}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label={<Translations text={field.label} />}
                  value={value ?? defaultValueNumber()}
                  type={getType()}
                  variant="outlined"
                  onChange={field.onChange ?? onChange}
                  error={Boolean(errors[field.name])}
                  disabled={field.disabled}
                  readOnly={field.readOnly}
                  rows={field.rows}
                  multiline={field.multiline}
                  helperText={field.helperText}
                  InputProps={{
                    ...field.typeParam,
                    autoComplete: "new-password",
                    endAdornment:
                      field.type == "password" ? (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => field.handleVisibility(field.name)}
                            aria-label="toggle password visibility"
                          >
                            {field.visibility ? (
                              <EyeOutline />
                            ) : (
                              <EyeOffOutline />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ) : (
                        <div></div>
                      ),
                  }}
                />
              )}
            />
            {field.helperText && (
              <FormHelperText>
                <Translations text={field.helperMessage} />
              </FormHelperText>
            )}
            {errors[field.name] && (
              <FormHelperText sx={{ color: "error.main" }}>
                <Translations text={errors[field.name].message} />
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
      )
    );
  } else if (["numberMax"].includes(field.type)) {
    return (
      !field.hidden && (
        <Grid item xs={field.xs} md={field.md} key={key}>
          <FormControl fullWidth>
            <Controller
              name={field.name}
              control={control}
              rules={{ required: true }}
              readOnly={field.readOnly}
              render={({ field: { value, onChange } }) => (
                <TextField
                  InputProps={field.typeParam}
                  label={<Translations text={field.label} />}
                  value={value ?? 1}
                  type={"number"}
                  variant="outlined"
                  onChange={field.onChange ?? onChange}
                  error={Boolean(errors[field.name])}
                  disabled={field.disabled}
                  readOnly={field.readOnly}
                  rows={field.rows}
                  multiline={field.multiline}
                  helperText={field.helperText}
                  inputProps={{ max: field.max }}
                />
              )}
            />
            {errors[field.name] && (
              <FormHelperText sx={{ color: "error.main" }}>
                <Translations text={errors[field.name].message} />
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
      )
    );
  } else if (field.type === "select") {
    return (
      !field.hidden && (
        <Grid item xs={field.xs} md={field.md} key={key}>
          <FormControl fullWidth>
            <Controller
              name={field.name}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <>
                  <InputLabel>
                    <Translations text={field.label} />
                  </InputLabel>
                  <Select
                    fullWidth
                    value={value}
                    readOnly={field.readOnly}
                    sx={{ mr: 4, mb: field.mb ?? 1 }}
                    label={<Translations text={field.label} />}
                    onChange={field.onChange ?? onChange}
                    error={Boolean(errors[field.name])}
                    disabled={field.disabled}
                  >
                    {field.opt.map((a, i) => (
                      <MenuItem value={a.value} key={i}>
                        {(a.color && (
                          <Stack
                            direction={"row"}
                            justifyContent="start"
                            alignItems="center"
                          >
                            <Box
                              sx={{
                                width: "20px",
                                height: "20px",
                                backgroundColor: a.color,
                                borderRadius: "50%",
                                marginRight: "10px",
                              }}
                            ></Box>
                            <Translations text={a.label} />
                          </Stack>
                        )) || <Translations text={a.label} />}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            />
            {errors[field.name] && (
              <FormHelperText sx={{ color: "error.main" }}>
                <Translations text={errors[field.name].message} />
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
      )
    );
  } else if (field.type === "autocomplete") {
    const getOptLabel = (option) => {
      if (field.optLabel2)
        return option[field.optLabel] + " - " + option[field.optLabel2];
      return option[field.optLabel];
    };

    return (
      !field.hidden && (
        <Grid item xs={field.xs} md={field.md} key={key}>
          <FormControl fullWidth>
            <Controller
              name={field.name}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormControl fullWidth error={Boolean(errors[field.key])}>
                  <Autocomplete
                    freeSolo
                    options={field.data}
                    getOptionLabel={(option) => getOptLabel(option)}
                    value={value ?? null}
                    onChange={field.onChange}
                    open={field.open}
                    onOpen={field.handleOpen}
                    onClose={field.handleClose}
                    disabled={field.disabled}
                    readOnly={field.readOnly}
                    renderInput={(params) => (
                      <>
                        <TextField
                          {...params}
                          onChange={field.changeSearch}
                          label={<Translations text={field.label} />}
                          InputProps={{
                            ...params.InputProps,

                            startAdornment: !field.disabled && (
                              <InputAdornment InputAdornment position="start">
                                {field.accessories}
                                <IconButton
                                  onClick={field.changeOpen}
                                  edge="end"
                                >
                                  {field.open ? (
                                    <ChevronUp color="inherit" size={20} />
                                  ) : (
                                    <ChevronDown color="inherit" size={20} />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <>
                                {field.loading ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                          }}
                          error={Boolean(errors[field.key])}
                        />
                      </>
                    )}
                    renderOption={field.renderOption}
                  />
                </FormControl>
              )}
            />
            {errors[field.key] && (
              <FormHelperText sx={{ color: "error.main" }}>
                <Translations text={errors[field.key].message} />
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
      )
    );
  } else if (field.type === "date") {
    return (
      !field.hidden && (
        <Grid item xs={field.xs} md={field.md} key={key}>
          <FormControl fullWidth>
            <Controller
              name={field.name}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <DatePickerWrapper>
                  <DatePicker
                    isClearable={!field.disabled}
                    selected={value ? new Date(value) : null}
                    dateFormat={field.typeDate ? field.typeDate : "dd/MM/yyyy"}
                    onChange={field.onChange ?? onChange}
                    error={Boolean(errors[field.name])}
                    shouldCloseOnSelect={false}
                    customInput={
                      <CustomInputTwo
                        error={Boolean(errors[field.name])}
                        label={<Translations text={field.label} />}
                      />
                    }
                    disabled={field.disabled}
                    readOnly={field.readOnly}
                    popperPlacement={
                      field.popperPlacement
                        ? field.popperPlacement
                        : "right-end"
                    }
                  />
                </DatePickerWrapper>
              )}
            />
            {errors[field.name] && (
              <FormHelperText sx={{ color: "error.main" }}>
                <Translations text={errors[field.name].message} />
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
      )
    );
  } else if (field.type === "checkbox") {
    return (
      !field.hidden && (
        <Grid item md={field.md} xs={field.xs} key={key}>
          <FormControl fullWidth>
            <Controller
              name={field.name}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormControlLabel
                  label={<Translations text={field.label} />}
                  disabled={field.disabled}
                  readOnly={field.readOnly}
                  control={
                    <Checkbox
                      checked={value}
                      onChange={onChange}
                      sx={field.sx}
                    />
                  }
                />
              )}
            />
            {errors[field.name] && (
              <FormHelperText sx={{ color: "error.main" }}>
                {errors[field.name].message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
      )
    );
  } else if (field.type === "datetime") {
    return (
      !field.hidden && (
        <Grid item xs={field.xs} md={field.md} key={key}>
          <FormControl fullWidth>
            <Controller
              name={field.name}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => {
                return (
                  <DatePickerWrapper>
                    <DatePicker
                      showTimeSelect
                      timeFormat={field.timeFormat ? field.timeFormat : "HH:mm"}
                      timeIntervals={
                        field.timeInterval ? field.timeInterval : 60
                      }
                      isClearable={!field.disabled}
                      selected={value ? new Date(value) : ""}
                      dateFormat={
                        field.typeDate ? field.typeDate : "dd/MM/yyyy HH:mm"
                      }
                      onChange={field.onChange ?? onChange}
                      error={Boolean(errors[field.name])}
                      shouldCloseOnSelect={false}
                      customInput={
                        <CustomInputTwo
                          error={Boolean(errors[field.name])}
                          label={<Translations text={field.label} />}
                        />
                      }
                      disabled={field.disabled}
                      readOnly={field.readOnly}
                      popperPlacement={
                        field.popperPlacement
                          ? field.popperPlacement
                          : "right-end"
                      }
                    />
                  </DatePickerWrapper>
                );
              }}
            />
            {errors[field.name] && (
              <FormHelperText sx={{ color: "error.main" }}>
                <Translations text={errors[field.name].message} />
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
      )
    );
  } else if (field.type === "value") {
    return (
      <Grid item xs={field.xs} md={field.md} key={key}>
        <FormControl fullWidth>
          <TextField
            label={<Translations text={field.label} />}
            value={field.value}
            variant="outlined"
            disabled
          />
        </FormControl>
      </Grid>
    );
  } else if (field.type === "autocompletes2") {
    return (
      <Grid item xs={field.xs} md={field.md} key={key}>
        <FormControl fullWidth>
          <Controller
            name={field.name}
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <FormControl fullWidth error={Boolean(errors[field.key])}>
                <Autocomplete
                  multiple
                  freeSolo
                  options={field.data}
                  filterSelectedOptions
                  value={value}
                  readOnly={field.readOnly}
                  disabled={field.disabled}
                  onChange={field.onChange}
                  getOptionLabel={(option) => option[field.optLabel] || ""}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={field.label}
                      placeholder={field.label}
                      error={Boolean(errors[field.key])}
                    />
                  )}
                />
              </FormControl>
            )}
          />
          {errors[field.key] && (
            <FormHelperText sx={{ color: "error.main" }}>
              <Translations text={errors[field.key].message} />
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
    );
  }
};

export const DrawColumn = (field) => {
  const { t } = useTranslation();

  let obj = {
    flex: field.flex,
    hide: field.hide,
    field: field.name,
    minWidth: field.minWidth,
    headerName: t(field.headerName),
  };
  
  if (field.type === "link") {
    obj.renderCell = ({ row }) => (
      <Link href={`${field.link}${field.valueLink(row)}`} passHref>
        <StyledLink>{`${field.value(row)}`}</StyledLink>
      </Link>
    );
  } else if (field.type === "custom") {
    obj.renderCell = field.renderCell;
  } else {
    obj.renderCell = ({ row }) => (
      <Typography variant="body2">{`${field.value(row) || ""}`}</Typography>
    );
  }

  return obj;
};

export const DrawFilter = (field, key) => {
  const { t } = useTranslation();
  if (["text", "email"].includes(field.type)) {
    return (
      <Grid key={key} item xs={field.xs} md={field.md}>
        <FormControl fullWidth>
          <TextField
            size="small"
            value={field.value}
            name={field.name}
            type={field.type}
            placeholder={`${t(`Seach By ${field.label}`)}..`}
            onChange={field.onChange}
            label={<Translations text={field.label} />}
            rows={field.rows}
            multiline={field.multiline}
          />
        </FormControl>
      </Grid>
    );
  } else if (["number"].includes(field.type)) {
    return (
      <Grid key={key} item xs={field.xs} md={field.md}>
        <FormControl fullWidth>
          <TextField
            size="small"
            value={field.value}
            name={field.name}
            type={"number"}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            placeholder={`${t(`Seach By ${field.label}`)}..`}
            onChange={field.onChange}
            label={<Translations text={field.label} />}
          />
        </FormControl>
      </Grid>
    );
  } else if (field.type === "select") {
    return (
      <Grid key={key} item xs={field.xs} md={field.md}>
        <FormControl fullWidth>
          <InputLabel size="small">
            <Translations text={field.label} />
          </InputLabel>
          <Select
            fullWidth
            size="small"
            name={field.name}
            value={field.value}
            sx={{ mr: 4 }}
            label={<Translations text={field.label} />}
            onChange={field.onChange}
          >
            {field.opt.map((a, i) => (
              <MenuItem value={a.value} key={i}>
                <Translations text={a.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    );
  } else if (field.type === "date") {
    return (
      <Grid key={key} item xs={field.xs} md={field.md}>
        <DatePickerWrapper>
          <DatePicker
            isClearable
            selectsRange
            monthsShown={2}
            endDate={field.endDateRange}
            selected={field.startDateRange}
            startDate={field.startDateRange}
            shouldCloseOnSelect={false}
            onChange={field.onChange}
            customInput={
              <CustomInput
                dates={field.dates}
                setDates={field.updateDate}
                label={<Translations text={field.label} />}
                end={field.endDateRange}
                start={field.startDateRange}
              />
            }
          />
        </DatePickerWrapper>
      </Grid>
    );
  } else if (field.type === "autocomplete") {
    const getOptLabel = (option) => {
      if (field.optLabel2)
        return option[field.optLabel] + " - " + option[field.optLabel2];
      return option[field.optLabel];
    };

    return (
      <Grid key={key} item xs={field.xs} md={field.md}>
        <FormControl fullWidth>
          <Autocomplete
            freeSolo
            options={field.data}
            getOptionLabel={(option) => getOptLabel(option)}
            value={field.value}
            name={field.name}
            onChange={field.onChange}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={field.changeSearch}
                size="small"
                label={<Translations text={field.label} />}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: <>{params.InputProps.endAdornment}</>,
                }}
              />
            )}
          />
        </FormControl>
      </Grid>
    );
  }
};

export const handleOnChangeRange =
  (
    setStartDateRange,
    setEndDateRange,
    setDates,
    dispatch,
    handleParams,
    name
  ) =>
  (dates) => {
    const [start, end] = dates;
    setStartDateRange(start);
    setEndDateRange(end);
    if (start === null && end === null) {
      setDates([]);
      dispatch(handleParams({ name, value: [] }));
    } else if (start !== null && end !== null) {
      setDates([start, end]);
      dispatch(handleParams({ name, value: dates }));
    }
  };

export const getColorPK = (value) => {
  if (value === 1) return "#669999";
  if (value === 2) return "#FFD93D";
  if (value === 3) return "#16FF00";
};

export const getColorCaseStatus = (value) => {
  if (value === 0) return "#ffff66"; //
  if (value === 1) return "#ff9900"; //
  if (value === 2) return "#33cccc"; //
  if (value === 3) return "#669999"; //
  if (value === 4) return "#6600cc"; //
  if (value === 5) return "#cc9900"; //
  if (value === 6) return "#999966";
  if (value === 7) return "#669999"; //
  if (value === 8) return "#3366ff"; //
  if (value === 9) return "#66ff66"; //
  if (value === 10) return "#ccff99";
  if (value === 11) return "#aea8bd";
};

export const getLabelCaseStatus = (value) => {
  if (value === 1) return "Progress";
  if (value === 2) return "Waiting Action (TTB)";
  if (value === 3) return "Quotation to Cust";
  if (value === 4) return "Waiting Cust Approval";
  if (value === 5) return "Ordering SparePart/STP";
  if (value === 6) return "Waiting SparePart/STP";
  if (value === 7) return "Repair";
  if (value === 8) return "Ready For Pickup";
  if (value === 9) return "Done";
  if (value === 10) return "STP";
  if (value === 11) return "Waiting From Principal";
};

export const getColorStockTransfer = (value) => {
  if (value === "OUT") return "#F45050";
  if (value === "IN") return "#00ff00";
};
