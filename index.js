var either = module.exports = function(
  eventEmitter, 
  firstEventName, 
  firstListener,
  secondEventName, 
  secondListener) {

    //removes all the listeners associated with the secondEventName
    var onFirst = function() {
      eventEmitter.removeListener(secondEventName, secondListener);
      eventEmitter.removeListener(secondEventName, onSecond);
    };

    //removes all the listeners associated with the firstEventName
    var onSecond = function() {
      eventEmitter.removeListener(firstEventName, firstListener);
      eventEmitter.removeListener(firstEventName, onFirst);
    };

    eventEmitter.once(firstEventName, firstListener);
    eventEmitter.once(firstEventName, onFirst);
    eventEmitter.once(secondEventName, secondListener);
    eventEmitter.once(secondEventName, onSecond);
};
