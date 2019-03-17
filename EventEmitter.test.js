const EventEmitter = require('./EventEmitter');

beforeEach(() => {
  this.emitter = new EventEmitter;
  this.event = 'test';
  this.handler = new Function();
  this.event2 = 'test2';
  this.handler2 = new Function();
});

test('Can instantiate EventEmitter', () => {
  expect(this.emitter).toBeInstanceOf(EventEmitter);
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
