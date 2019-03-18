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

test('Can register an event handler', () => {
  this.emitter.register(this.event, this.handler);

  expect(this.emitter.getHandlers(this.event)[0].handler).toEqual(this.handler);
});

test('Cannot register non-function as event handler', () => {
  expect(() => { 
    this.emitter.register(this.event, this.event2);
  }).toThrow('Event handler must be a function');
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

test('Can unregister() all event handlers', () => {
  this.emitter.register(this.event, this.handler);
  this.emitter.register(this.event, this.handler2);

  this.emitter.unregisterAll(this.event);

  expect(this.emitter.getHandlers(this.event)).toBeUndefined();
});

test('Can receive false for emitting event with no handlers', () => {
  expect(this.emitter.emit(this.event)).toBe(false);
});

test('Can receive true for emitting event with handlers', () => {
  this.emitter.register(this.event, this.handler);

  expect(this.emitter.emit(this.event)).toBe(true);
});

test('Can emit() single event with no arguments', () => {
  this.emitter.register(this.event, this.handler);

  this.emitter.emit(this.event);

  expect(this.handler).toHaveBeenCalled();
});

test('Can emit() a single handler multiple times', () => {
  this.emitter.register(this.event, this.handler);

  this.emitter.emit(this.event);
  this.emitter.emit(this.event);
  this.emitter.emit(this.event);

  expect(this.handler).toHaveBeenCalledTimes(3);
});

test('Can emit() a single handler with multiple arguments', () => {
  this.emitter.register(this.event, this.handler);

  this.emitter.emit(this.event, this.argument, this.argument2);

  expect(this.handler).toHaveBeenCalledWith(this.argument, this.argument2);
});

test('Can emit() multiple handlers with multiple arguments', () => {
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