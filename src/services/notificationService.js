

export async function fetchNotifications() {

  await new Promise((res) => setTimeout(res, 500));

  return [
    { id: 1, text: "5 users registered today", unread: true },
    { id: 2, text: "3 waitlist spots available", unread: true },
    { id: 3, text: "New admin logged in", unread: false },
  ];
}
