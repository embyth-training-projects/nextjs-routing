import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import ResultTitle from "../../components/events/results-title";
import EventList from "../../components/events/event-list";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";

function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const { data, error } = useSWR(
    `https://react-fundamentals-2cf0c-default-rtdb.firebaseio.com/events.json`
  );

  useEffect(() => {
    if (data) {
      const adaptedData = Object.entries(data).map(([id, event]) => ({
        id,
        ...event,
      }));

      setLoadedEvents(adaptedData);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const filterData = router.query.slug;
  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  if (
    isNaN(filterYear) ||
    isNaN(filterMonth) ||
    filterYear > 2030 ||
    filterYear < 2010 ||
    filterMonth > 12 ||
    filterMonth < 1 ||
    error
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const constructedDate = new Date(filteredYear, filterMonth - 1);

  return (
    <Fragment>
      <ResultTitle date={constructedDate} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
