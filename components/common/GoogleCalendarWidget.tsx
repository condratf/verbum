import React from "react";

interface Props {
  calendarId: string;
  timezone?: string;
  style?: React.CSSProperties;
  features?: {
    showTitle?: boolean;
    showNav?: boolean;
    showDate?: boolean;
    showPrint?: boolean;
    showTabs?: boolean;
    mode?: string;
  };
}

export const GoogleCalendarWidget: React.FC<Props> = ({
  calendarId,
  timezone = "UTC",
  style,
  features = {
    showTitle: true,
    showNav: true,
    showDate: true,
    showPrint: true,
    showTabs: true,
    mode: "WEEK",
  },
}) => {
  const src = `
    https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calendarId)}
    &ctz=${timezone}
    ${features?.showTitle ? "&showTitle=1" : "&showTitle=0"}
    ${features?.showNav ? "&showNav=1" : "&showNav=0"}
    ${features?.showDate ? "&showDate=1" : "&showDate=0"}
    ${features?.showPrint ? "&showPrint=1" : "&showPrint=0"}
    ${features?.showTabs ? "&showTabs=1" : "&showTabs=0"}
    ${features?.mode ? "&mode=" + features.mode : ""}
  `;

  return (
    <iframe
      src={src}
      style={{ border: 0, width: "100%", height: "800px", ...style }}
      frameBorder={0}
      scrolling="no"
    />
  );
};