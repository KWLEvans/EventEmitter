#EventEmitter

##Methods

####once(_eventName_, _callback_)
The `once()` method binds a handler that is run at most one time
  * **Arguments**
    * `eventName: (String)` is the name of the event to which to bind your callback
    * `callback: (Function)` is a function that runs when event of name `eventName` is emitted
  * **Return Type**
    * The `EventEmitter` instance is returned to allow for chaining.

####register(_eventName_, _callback_)
  The `register()` method binds a handler to be run when an event is `emit`ted
  * **Arguments**
    * `eventName: (String)` is the name of the event to which to bind your callback
    * `callback: (Function)` is a function that runs when event of name `eventName` is emitted
  * **Return Type**
    * The `EventEmitter` instance is returned to allow for chaining.