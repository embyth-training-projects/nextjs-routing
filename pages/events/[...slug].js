import { Fragment } from "react";

import { getFilteredEvents } from "../../helpers/api";

import ResultTitle from "../../components/events/results-title";
import EventList from "../../components/events/event-list";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";

function FilteredEventsPage(props) {
  const { hasError, events, date } = props;

  if (hasError) {
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

  if (!events || events.length === 0) {
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

  const constructedDate = new Date(date.year, date.month - 1);

  return (
    <Fragment>
      <ResultTitle date={constructedDate} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;

  const filterYear = +filterData[0];
  const filterMonth = +filterData[1];

  if (
    isNaN(filterYear) ||
    isNaN(filterMonth) ||
    filterYear > 2030 ||
    filterYear < 2010 ||
    filterMonth > 12 ||
    filterMonth < 1
  ) {
    return { props: { hasError: true } };
  }

  const filteredEvents = await getFilteredEvents({
    year: filterYear,
    month: filterMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: filterYear,
        month: filterMonth,
      },
    },
  };
}

export default FilteredEventsPage;
