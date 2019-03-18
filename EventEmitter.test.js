const EventEmitter = require('./EventEmitter');

beforeAll(() => {
  this.event = 'test';
  this.handler = new Function();
  this.event2 = 'test2';
  this.handler2 = new Function();
})

beforeEach(() => {
  this.emitter = new EventEmitter;
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

  expect(this.emitter.getHandlers(this.event)).toBeUndefined;
})