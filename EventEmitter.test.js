const EventEmitter = require('./EventEmitter');

beforeAll(() => {
  this.event = 'test';
  this.event2 = 'test2';
  this.argument = 'argument';
  this.argument2 = 'argument2';
})

beforeEach(() => {
  this.emitter = new EventEmitter;
  this.handler = jest.fn();
  this.handler2 = jest.fn();
});


test('Can instantiate EventEmitter', () => {
  expect(this.emitter).toBeInstanceOf(EventEmitter);
});

test('Can throw TypeError for incorrect input types', () => {
  expect(() => { 
    this.emitter.register(this.event, this.event2);
  }).toThrow(TypeError);

  expect(() => { 
    this.emitter.register(this.handler, this.handler2);
  }).toThrow(TypeError);
});

test('Can register an event handler', () => {
  this.emitter.register(this.event, this.handler);

  expect(this.emitter.getHandlers(this.event)[0].handler).toEqual(this.handler);
});

test('Can chain handler registration', () => {
  this.emitter.register(this.event, this.handler).register(this.event2, this.handler2);

  expect(this.emitter.getHandlers(this.event)[0].handler).toEqual(this.handler);
  expect(this.emitter.getHandlers(this.event2)[0].handler).toEqual(this.handler2);
});

test('Can register handler using once()', () => {
  this.emitter.once(this.event, this.handler);

  expect(this.emitter.getHandlers(this.event)[0].handler).toEqual(this.handler);
});

test('Can set once value on handler object with once()', () => {
  this.emitter.once(this.event, this.handler);

  expect(this.emitter.getHandlers(this.event)[0].once).toEqual(true);
});

test('Can unregister() an event handler', () => {
  this.emitter.register(this.event, this.handler);
  this.emitter.register(this.event, this.handler2);

  this.emitter.unregister(this.event, this.handler2);

  expect(this.emitter.getHandlers(this.event)[0].handler).toEqual(this.handler);
});

test('Can unregisterAll() event handlers from an event', () => {
  this.emitter.register(this.event, this.handler);
  this.emitter.register(this.event, this.handler2);

  this.emitter.unregisterAll(this.event);

  expect(this.emitter.getHandlers(this.event)).toBeUndefined();
});

test('Can unregisterAll() event handlers from all events', () => {
  this.emitter.register(this.event, this.handler);
  this.emitter.register(this.event, this.handler2);
  this.emitter.register(this.event2, this.handler);
  this.emitter.register(this.event2, this.handler2);

  this.emitter.unregisterAll();

  expect(this.emitter.events).toMatchObject({});
});

test('Can receive false for emitting event with no handlers', () => {
  expect(this.emitter.emit(this.event)).toBe(false);
});

test('Can receive true for emitting event with handlers', () => {
  this.emitter.register(this.event, this.handler);

  expect(this.emitter.emit(this.event)).toBe(true);
});

test('Can emit() single event', () => {
  this.emitter.register(this.event, this.handler);

  this.emitter.emit(this.event);

  expect(this.handler).toHaveBeenCalled();
});

test('Can emit() a single event multiple times', () => {
  this.emitter.register(this.event, this.handler);

  this.emitter.emit(this.event);
  this.emitter.emit(this.event);
  this.emitter.emit(this.event);

  expect(this.handler).toHaveBeenCalledTimes(3);
});

test('Can pass all arguments to an emitted event handler', () => {
  this.emitter.register(this.event, this.handler);

  this.emitter.emit(this.event, this.argument, this.argument2);

  expect(this.handler).toHaveBeenCalledWith(this.argument, this.argument2);
});

test('Can pass all arguments to all emitted event handlers', () => {
  this.emitter.register(this.event, this.handler);
  this.emitter.register(this.event, this.handler2);

  this.emitter.emit(this.event, this.argument, this.argument2);

  expect(this.handler).toHaveBeenCalledWith(this.argument, this.argument2);
  expect(this.handler2).toHaveBeenCalledWith(this.argument, this.argument2);
});

test('Can run once events only one time with multiple emit()s', () => {
  this.emitter.register(this.event, this.handler);
  this.emitter.once(this.event, this.handler2);

  this.emitter.emit(this.event);
  this.emitter.emit(this.event);
  this.emitter.emit(this.event);

  expect(this.handler).toHaveBeenCalledTimes(3);
  expect(this.handler2).toHaveBeenCalledTimes(1);
});