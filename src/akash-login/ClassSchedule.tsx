import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import type { EventInput } from "@fullcalendar/core";
import { Box, Modal, Stack, useMediaQuery } from "@mui/material";
import "../styles/ClassSchedule.css";
import EmptyState from "./EmptyState";
import {
  CalendarMonthOutlined,
  CoPresentOutlined,
  Delete,
} from "@mui/icons-material";
import type { AccountState } from "./AccountContext";
import { useState } from "react";
import dayjs from "dayjs";
import { PopupButton, StyledPopupBox } from "./Settings";
import { motion } from "framer-motion";

const getTimeBounds = (events: EventInput[]) => {
  if (!events || events.length === 0) {
    return { min: "08:00:00", max: "18:00:00" };
  }

  const startTimes = events.map((e) => e.startTime);
  const endTimes = events.map((e) => e.endTime);

  const minTime = startTimes.sort()[0];
  const maxTime = endTimes.sort().reverse()[0];

  const minHour = Math.max(0, parseInt(minTime.split(":")[0]) - 1);
  const maxHour = Math.min(23, parseInt(maxTime.split(":")[0]) + 1);

  return {
    min: `${String(minHour).padStart(2, "0")}:00:00`,
    max: `${String(maxHour).padStart(2, "0")}:00:00`,
  };
};

export default function ClassSchedule({
  onEmpty,
  accountState,
  enableDelete,
  onDelete,
}: {
  onEmpty: () => void;
  accountState: AccountState;
  enableDelete?: boolean;
  onDelete?: (classId: string) => void;
}) {
  const isPhone = useMediaQuery("(max-width:800px)");
  const [selectedEvent, setSelectedEvent] = useState<{
    title: string;
    start: string;
    end: string;
    id: string;
  } | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);

  const events: EventInput[] = (accountState.events ?? []).map((event) => ({
    title: event.title,
    daysOfWeek: event.daysOfWeek,
    startTime: event.startTime,
    endTime: event.endTime,
    id: event.uid,
  }));

  const bounds = getTimeBounds(events);

  return events.length === 0 ? (
    <EmptyState
      header="No Classes"
      height="100%"
      minHeight="20rem"
      icon={
        <CalendarMonthOutlined
          style={{
            fontSize: "4rem",
            color: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "unset"}, black 20%)`,
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
          height="auto"
          contentHeight="auto"
          headerToolbar={false}
          weekends={false}
          firstDay={1}
          allDaySlot={false}
          slotMinTime={bounds.min}
          slotMaxTime={bounds.max}
          slotDuration="00:30:00"
          snapDuration="00:30:00"
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
          dayHeaderFormat={{
            weekday: isPhone ? "narrow" : "short",
            month: undefined,
            day: undefined,
            year: undefined,
          }}
          events={events}
          eventClick={(info) => {
            setSelectedEvent({
              title: info.event.title,
              start: info.event.startStr,
              end: info.event.endStr,
              id: info.event.id,
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
              <CoPresentOutlined sx={{ fontSize: "5rem", color: "white" }} />
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
              {enableDelete && (
                <PopupButton
                  startIcon={
                    <Delete
                      sx={{ scale: 1.2, position: "relative", top: "0.1rem" }}
                    />
                  }
                  sx={{
                    color: "white",
                    backgroundColor:
                      accountState.userDetails?.accentColour ?? "unset",
                    bgcolor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "unset"}, black 30%)`,
                    "&:hover": {
                      backgroundColor: "rgba(255, 0, 0, 0.2)",
                    },
                  }}
                  variant="text"
                  onClick={() => {
                    if (selectedEvent?.id && onDelete) {
                      onDelete(selectedEvent.id);
                      setIsEventDialogOpen(false);
                    }
                  }}
                >
                  Delete Class
                </PopupButton>
              )}

              <PopupButton
                sx={{
                  "&:hover": {
                    backgroundColor:
                      accountState.userDetails?.accentColour ?? "unset",
                    bgcolor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "unset"}, black 10%)`,
                  },
                  color: "var(--mui-palette-text-primary)",
                }}
                variant="text"
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
