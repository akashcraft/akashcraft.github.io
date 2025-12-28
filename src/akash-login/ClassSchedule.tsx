import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import type { EventInput } from "@fullcalendar/core";
import { useMediaQuery } from "@mui/material";
import "../styles/ClassSchedule.css";
import EmptyState from "./EmptyState";
import { AddCircleOutlined } from "@mui/icons-material";

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

export default function ClassSchedule({ onEmpty }: { onEmpty: () => void }) {
  const isPhone = useMediaQuery("(max-width:800px)");
  return events.length === 0 ? (
    <EmptyState
      header="Get Started"
      height="calc(100% - 2.75rem)"
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
      slotEventOverlap={false}
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
      dayHeaderFormat={{ weekday: isPhone ? "narrow" : "long" }}
      events={events}
    />
  );
}
