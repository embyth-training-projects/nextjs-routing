export async function getAllEvents() {
  const response = await fetch(
    `https://react-fundamentals-2cf0c-default-rtdb.firebaseio.com/events.json`
  );
  const data = await response.json();

  const adaptedData = Object.entries(data).map(([id, event]) => ({
    id,
    ...event,
  }));

  return adaptedData;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
