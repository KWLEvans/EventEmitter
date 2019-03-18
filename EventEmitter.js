class EventEmitter {

  constructor() {
    this.events = {};
  }

  emit(event, ...args) {
    this.validate(event, 'string');

    if (!this.events[event]) {
      return false;
    }

    const events = this.events[event];

    for (let i = 0; i < events.length; i++) {
      events[i].handler(...args);
      if (events[i].once) {
        this.unregister(event, events[i].handler);
      }
    }

    return true;
  };

  register(event, handler, once = false) {
    this.validate(event, 'string');
    this.validate(handler, 'function');
    this.validate(once, 'boolean');

    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push({ handler, once }); 

    return this;
  };

  once(event, handler) {
    return this.register(event, handler, true);
  };

  unregister(event, handler) {
    this.validate(event, 'string');
    this.validate(handler, 'function');

    this.events[event] = this.events[event].filter(e => e.handler !== handler);

    if (this.events[event] === []) {
      delete this.events[event];
    }

    return this;
  };

  unregisterAll(event = '') {
    this.validate(event, 'string');

    if (event === '') {
      this.events = {};
    } else {
      delete this.events[event];
    }

    return this;
  };

  getHandlers(event) {
    this.validate(event, 'string');

    return this.events[event];
  }

  // A type validation function would be unnecessary in TypeScript
  validate(arg, type) {
    if (typeof arg !== type) {
      throw new TypeError(`Event handler must be a ${type}`);
    }
  }
};

module.exports = EventEmitter;