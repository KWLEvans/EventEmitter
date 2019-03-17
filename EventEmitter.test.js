const EventEmitter = require('./EventEmitter');

beforeEach(() => {
  this.emitter = new EventEmitter;
  this.event = 'test';
  this.handler = new Function();
});

test('Can instantiate EventEmitter', () => {
  expect(this.emitter).toBeInstanceOf(EventEmitter);
});

test('Can register an event handler', () => {
  this.emitter.register(this.event, this.handler);

  expect(this.emitter.getHandlers(this.event)[0].handler).toEqual(this.handler);
});