#EventEmitter

##Methods

####emit(_eventName_[, ...args])
The `emit()` method runs all handlers registered to the given `eventName`, passing them any and all `args`
  * **Arguments**
    * `eventName: (String)` is the name of the event to emit
    * `...args: (Any)` are any number of arguments passed in
  * **Return Type**
    * A `Boolean` that is `true` if there were handlers called and `false` otherwise

####getHandlers(_eventName_)
The `getHandlers()` method gets all bound handlers for a given event
  * **Arguments**
    * `eventName: (String)` is the name of the event for which to retrieve the handlers array
  * **Return Type**
    * An `Array` of handler Objects with properties: 
    `handler: (Function)`: the handler function
    `once: (Boolean)`: whether or not it is a once bound handler

####once(_eventName_, _handler_)
The `once()` method binds a handler that is run at most one time
  * **Arguments**
    * `eventName: (String)` is the name of the event to which to bind your handler
    * `handler: (Function)` is a function that runs when event of name `eventName` is emitted
  * **Return Type**
    * The `EventEmitter` instance is returned to allow for chaining.

####register(_eventName_, _handler_[, _once_ = false])
  The `register()` method binds a handler to be run when an event is `emit`ted
  * **Arguments**
    * `eventName: (String)` is the name of the event to which to bind your handler
    * `handler: (Function)` is a function that runs when event of name `eventName` is emitted
    * `once: (Boolean)` defines whether an event should be unbound after running once
  * **Return Type**
    * The `EventEmitter` instance is returned to allow for chaining.

####unregister(_eventName_, _handler_)
  The `unregister()` method unbinds a handler from an event. 
  * **Arguments**
    * `eventName: (String)` is the name of the event from which to unbind your handler
    * `handler: (Function)` is the specific handler to unbind
  * **Return Type**
    * The `EventEmitter` instance is returned to allow for chaining.
    
####unregisterAll([_eventName_ = null])
  The `unregisterAll()` method unbinds all handlers from a given event. If no `eventName` argument is passed, it unbinds all handlers from all events
  * **Arguments**
    * `eventName: (String)` is the name of the event from which to unbind all handlers
  * **Return Type**
    * The `EventEmitter` instance is returned to allow for chaining.