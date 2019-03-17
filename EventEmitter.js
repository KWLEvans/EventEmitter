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

  };

  unregisterAll(event) {

  };

  getHandlers(eventName = null) {
    if (eventName) {
      return this.events[eventName];
    }
    
    const handlers = [];

    for (eventArray in this.events) {
      handlers = [...handlers, ...eventArray];
    }
    
    return handlers;
  }
};

module.exports = EventEmitter;