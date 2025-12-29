import {
  DatePicker,
  type DatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import {
  TimePicker,
  type TimePickerProps,
} from "@mui/x-date-pickers/TimePicker";
import type { RefAttributes } from "react";
import type { JSX } from "react/jsx-runtime";

export const StyledDatePicker = (
  props: JSX.IntrinsicAttributes &
    DatePickerProps<true> &
    RefAttributes<HTMLDivElement>,
) => (
  <DatePicker
    {...props}
    slotProps={{
      openPickerButton: {
        sx: {
          color: "white",
        },
      },
      popper: {
        sx: {
          "& *": {
            color: "white",
            fontFamily: "Segoe UI !important",
          },

          "& .MuiPickersDay-root": {
            color: "white",
          },

          "& .MuiPickersDay-root.Mui-selected": {
            backgroundColor: "white",
            color: "#824222",
          },

          "& .MuiPickersDay-root.MuiPickersDay-today": {
            borderColor: "white",
          },

          "& .MuiPickersCalendarHeader-label": {
            color: "white",
          },

          "& .MuiPickersArrowSwitcher-button": {
            color: "white",
          },

          "& .MuiDayCalendar-weekDayLabel": {
            color: "white",
          },
        },
      },
      mobilePaper: {
        sx: {
          "& *": {
            color: "white",
            fontFamily: "Segoe UI !important",
          },
          "& .MuiTypography-root": {
            color: "white",
            textTransform: "none",
          },
          "& .MuiPickersCalendarHeader-switchViewButton": {
            color: "white !important",
          },
          "& .MuiPickersCalendarHeader-label, & .MuiPickersArrowSwitcher-button":
            {
              color: "white !important",
            },
          "& .MuiPickersToolbar-root *": {
            color: "white",
          },
          "& .MuiPickersDay-root": {
            color: "white",
          },
          "& .MuiPickersDay-root.Mui-selected": {
            backgroundColor: "white",
            color: "#824222 !important",
          },
          "& .MuiPickersDay-root.MuiPickersDay-today": {
            borderColor: "white",
          },
          "& .MuiButton-root": {
            color: "white",
            textTransform: "none",
          },
        },
      },
      textField: {
        sx: {
          width: "100%",
          "& *": {
            fontFamily: "Segoe UI !important",
          },
          "& input": {
            color: "var(--mui-palette-text-primary)",
          },
          "& label": {
            color: "rgba(255,255,255,0.6)",
          },
          "& fieldset": {
            borderColor: "rgba(255,255,255,0.4)",
            borderRadius: "1rem",
          },
          "&:hover fieldset": {
            borderColor: "rgba(255,255,255,0.7)",
          },
          "& .Mui-focused fieldset": {
            borderColor: "#824222",
          },
        },
      },
    }}
  />
);

export const StyledTimePicker = (
  props: JSX.IntrinsicAttributes &
    TimePickerProps<true> &
    RefAttributes<HTMLDivElement>,
) => (
  <TimePicker
    {...props}
    slotProps={{
      openPickerButton: {
        sx: {
          color: "white",
        },
      },
      popper: {
        sx: {
          "& *": {
            color: "white",
            fontFamily: "Segoe UI !important",
          },
          "& .MuiPickersClockNumber-root": {
            color: "white",
            fontFamily: "Segoe UI !important",
          },
          "& .MuiPickersClock-pin, & .MuiPickersClockPointer-root": {
            backgroundColor: "white",
          },
          "& .MuiPickersClockPointer-thumb": {
            backgroundColor: "white",
            borderColor: "white",
          },
          "& .MuiMenuItem-root.Mui-selected": {
            backgroundColor: "white !important",
            color: "#824222 !important",
          },
          "& .MuiButton-root": {
            color: "white",
            textTransform: "none",
          },
        },
      },
      mobilePaper: {
        sx: {
          "& *": {
            color: "white",
            fontFamily: "Segoe UI !important",
            textTransform: "none",
          },
          "& .MuiPickersToolbar-root *": {
            color: "white !important",
          },
          "& .MuiPickersClock-clock": {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
          },
          "& .MuiPickersClockNumber-root": {
            color: "white",
          },
          "& .MuiPickersClock-pin, & .MuiPickersClockPointer-root": {
            backgroundColor: "white",
          },
          "& .MuiPickersClockPointer-thumb": {
            backgroundColor: "white",
            borderColor: "#824222",
          },
          "& .MuiPickersToolbar-ampmSelection .MuiTypography-root": {
            color: "white",
          },
          "& .MuiButton-root": {
            color: "white",
            textTransform: "none",
          },
        },
      },
      textField: {
        sx: {
          width: "100%",
          "& *": {
            fontFamily: "Segoe UI !important",
          },
          "& input": {
            color: "var(--mui-palette-text-primary)",
            fontFamily: "Segoe UI !important",
          },
          "& label": {
            color: "rgba(255,255,255,0.6)",
            fontFamily: "Segoe UI !important",
          },
          "& fieldset": {
            borderColor: "rgba(255,255,255,0.4)",
            borderRadius: "1rem",
          },
          "&:hover fieldset": {
            borderColor: "rgba(255,255,255,0.7)",
          },
          "& .Mui-focused fieldset": {
            borderColor: "#824222",
          },
        },
      },
    }}
  />
);
