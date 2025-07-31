//
// PUBLIC_INTERFACE
// Simple daily reminder logic for SurfSync using Notification API
// Optionally use REACT_APP_SITE_URL from env for fallback reminder email link

// PUBLIC_INTERFACE
export function requestReminderPermission() {
  if ("Notification" in window) {
    Notification.requestPermission();
  }
}

// PUBLIC_INTERFACE
export function scheduleDailyReminder(hour = 8) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  // This demo implementation only shows notification if the page is open.
  // Real apps may use Service Workers or backend jobs to send reminders.
  setTimeout(() => {
    new Notification("SurfSync: Log your surf session today! 🌊", {
      body: "Don't forget to track your session and stats on SurfSync.",
      icon: "/favicon.ico",
    });
  }, computeDelay(hour));
}

function computeDelay(hour) {
  const now = new Date();
  const target = new Date();
  target.setHours(hour, 0, 0, 0);
  if (target < now) target.setDate(target.getDate() + 1);
  return target - now;
}

// Fallback: link for subscribing to email reminders
export function getEmailReminderLink() {
  const url = process.env.REACT_APP_SITE_URL || window.location.origin;
  return `${url}/reminder-signup`;
}
