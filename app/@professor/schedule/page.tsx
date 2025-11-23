import { GoogleCalendarWidget } from "@/components/common";

export default function Schedule() {
  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-10">Schedule</h1>
      <GoogleCalendarWidget calendarId="ggebperov@gmail.com" />
    </div>
  );
}