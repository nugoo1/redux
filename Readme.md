# Redux

First let's install Redux.

`yarn add redux`

We're gonna kick things off by importing some stuff from the library. 

```
import { createStore } from 'redux';

const store = createStore((state = { count:0 }) => {

});

```

Notice that if the state is not defined, we initialize it with count equals zero.

Next, we can use the function below to get the state.

`console.log(store.getState());`

## Actions | Changing Data in the Redux Store

We're gonna do things like change the count to zero, or increment the count by 1. That's actually gonna have an impact on the count, and we're gonna use getState calls to get the updated count.

We're gonna do this with actions. Actions are just objects that get sent to the store.

Let's get started!

### Incrementing the count

Below is the action object.

```
{
  type: 'INCREMENT'
}
```

Now let's send this object to the store. We do this with store.dispatch() as shown below.

```
store.dispatch(
  {
    type: 'INCREMENT'
  }  
);
```

Now we have a perfectly valid call to dispatch. We are dispatching our very first action, but we still don't have any changes to the state. But the store is actually getting called twice. If you put a console.log statement just before returning state, you'll see that dispatching an action to the store actually makes it return the state a second time.


Now let's actually access this action object.

We're gonna make changes to our craeteStore function, passing in action as the second argument. Notice that it does not have a default state. 

```
const store = createStore((state = { count: 0 }, action) => {
  if (action.type === 'INCREMENT') {
    return {
      count: state.count + 1
    }
  } else {
    return state;
  }
});
```
The function now has an if condition for the action type. If an action is dispatched, it checks what the action type is and determines what to do with the state data.

But it's common practice to use a switch statement instead of an if/else statement, so let's change that now.

```
const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      };
    default:
      return state;
  };
});
```

We've made zero changes to the code. We've just changed the tools we've used.

Now let's do the same for decrement and reset.

```
const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      };
    case 'DECREMENT':
      return {
        count: state.count - 1
      };
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  };
});
```

All done! So to recap, the createStore function gets called once when we first create the store, and each time we call store.dispatch(). So every time we dispatch an action to the store, and based on the action we change the state.