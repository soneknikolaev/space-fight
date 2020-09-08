import concat from 'lodash/concat';
import filter from 'lodash/filter';

export const Events = <Event extends GameEventBase>() => {
  let events: Event[] = [];

  return {
    dispatch(event: Event) {
      events = concat(
        filter(events, (prevEvent) => event.type !== prevEvent.type),
        event
      );
    },

    get(): Event[] {
      return events;
    },

    reset() {
      events = [];
    },
  };
};
