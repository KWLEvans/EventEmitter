class EventEmitter {

  constructor() {
    this.events = {};
  }

  // Emitting named events with any number of arguments.
  emit(event, data = {}) {

  };

  // Registering handler functions for named events that are passed the appropriate arguments on emission.
  register(event, handler, once = false) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push({ handler, once }); 

    return this;
  };

  // Registering a "one-time" handler that will be called at most one time.
  once(event, handler) {
    return this.register(event, handler, true);
  };

  // Removing specific previously-registered event handlers and/or all previously-registered event handlers.
  unregister(event, handler) {
    this.events[event] = this.events[event].filter(e => e.handler !== handler);

    if (this.events[event] === []) {
      delete this.events[event];
    }

    return this;
  };

  unregisterAll(event = null) {
    delete this.events[event];

    return this;
  };

  getHandlers(eventName) {
    return this.events[eventName];
  }
};

module.exports = EventEmitter;