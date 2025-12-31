import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import type { EventInput } from "@fullcalendar/core";
import { Box, Modal, Stack, useMediaQuery } from "@mui/material";
import "../styles/ClassSchedule.css";
import EmptyState from "./EmptyState";
import { AddCircleOutlined, CalendarMonthOutlined } from "@mui/icons-material";
import type { AccountState } from "./AccountContext";
import { useState } from "react";
import dayjs from "dayjs";
import { PopupButton, StyledPopupBox } from "./Settings";
import { motion } from "framer-motion";

const events: EventInput[] = [
  {
    title: "DEMO 1000",
    start: "2025-03-10T12:00:00",
    end: "2025-03-10T13:00:00",
  },
  {
    title: "DEMO 1000",
    start: "2025-03-12T12:00:00",
    end: "2025-03-12T13:00:00",
  },
  {
    title: "DEMO 1500",
    start: "2025-03-12T12:30:00",
    end: "2025-03-12T13:00:00",
  },
  {
    title: "DEMO 1000",
    start: "2025-03-14T12:00:00",
    end: "2025-03-14T13:00:00",
  },
  {
    title: "DEMO 2000",
    start: "2025-03-11T13:00:00",
    end: "2025-03-11T14:15:00",
  },
  {
    title: "DEMO 2000",
    start: "2025-03-13T13:00:00",
    end: "2025-03-13T14:15:00",
  },
];

export default function ClassSchedule({
  onEmpty,
  accountState,
}: {
  onEmpty: () => void;
  accountState: AccountState;
}) {
  const isPhone = useMediaQuery("(max-width:800px)");
  const [selectedEvent, setSelectedEvent] = useState<{
    title: string;
    start: string;
    end: string;
  } | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  return events.length === 0 ? (
    <EmptyState
      header="Get Started"
      height="100%"
      minHeight="20rem"
      icon={
        <AddCircleOutlined
          style={{
            fontSize: "4rem",
            color: "var(--mui-palette-background-button)",
          }}
        />
      }
      onClick={onEmpty}
    />
  ) : (
    <>
      <Box
        sx={{
          "& .fc": {
            "--calendar-accent":
              accountState.userDetails?.accentColour ?? "#f28c28",
          },
        }}
      >
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          initialDate="2025-03-10"
          height="auto"
          contentHeight="auto"
          headerToolbar={false}
          weekends={false}
          firstDay={1}
          allDaySlot={false}
          slotMinTime="11:00:00"
          slotMaxTime="15:00:00"
          slotDuration="00:15:00"
          snapDuration="00:15:00"
          eventMinHeight={10}
          slotLabelFormat={{
            hour: "numeric",
            minute: "2-digit",
            hour12: false,
          }}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            hour12: false,
          }}
          dayHeaderFormat={{ weekday: isPhone ? "narrow" : "short" }}
          events={events}
          eventClick={(info) => {
            setSelectedEvent({
              title: info.event.title,
              start: info.event.startStr,
              end: info.event.endStr,
            });
            setIsEventDialogOpen(true);
          }}
        />
      </Box>
      <Modal
        open={isEventDialogOpen}
        onClose={() => setIsEventDialogOpen(false)}
      >
        <StyledPopupBox
          sx={{
            fontFamily: "Segoe UI",
            backgroundColor: accountState.userDetails?.accentColour ?? "grey",
            bgcolor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "grey"}, black 20%)`,
            backgroundImage: "none !important",
          }}
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            gap={1}
            mt={4}
            mb={2}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <CalendarMonthOutlined
                sx={{ fontSize: "5rem", color: "white" }}
              />
            </motion.div>

            <h4
              style={{
                margin: "1.5rem 0 0 0",
                color: "white",
                fontSize: "1.5rem",
              }}
            >
              {selectedEvent?.title}
            </h4>

            <p
              style={{ margin: "0.5rem 0 0 0", color: "rgba(255,255,255,0.8)" }}
            >
              {selectedEvent?.start &&
                dayjs(selectedEvent.start).format("HH:mm")}{" "}
              - {selectedEvent?.end && dayjs(selectedEvent.end).format("HH:mm")}
            </p>

            <Stack width="100%" gap={1} alignItems="center" mt={2}>
              <PopupButton
                sx={{
                  backgroundColor:
                    accountState.userDetails?.accentColour ?? "unset",
                  bgcolor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "unset"}, black 30%)`,
                  "&:hover": {
                    backgroundColor:
                      accountState.userDetails?.accentColour ?? "unset",
                  },
                  color: "var(--mui-palette-text-primary)",
                }}
                variant="contained"
                disableElevation
                onClick={() => setIsEventDialogOpen(false)}
              >
                Done
              </PopupButton>
            </Stack>
          </Stack>
        </StyledPopupBox>
      </Modal>
    </>
  );
}
