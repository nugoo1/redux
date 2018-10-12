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

### Watching for State Changes
The code below will print the state every time the state changes.
```
store.subscribe(() => {
    console.log(store.getState());
});
```

We can unsubscribe from being notified of state changes.

```
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

unsubscribe();
```

### Sending Data with your Actions
We can send additional data by adding another property to the action object. Note that the type property is always necessary and Redux will throw an error otherwise.

```
store.dispatch({
  type: 'INCREMENT',
  incrementBy: 5
});
```

To handle this additional property, we add some conditional logic to our store as shown below.

```
const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
      return {
        count: state.count + incrementBy
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

And there we go. We can now apss dynamic information with our action objects. 

Let's do the same for decrement.

```
const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
      return {
        count: state.count + incrementBy
      };
    case 'DECREMENT':
      const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
      return {
        count: state.count - decrementBy
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

Note that for required arguments, like setting the count to a specific number, we don't need any conditional logic and we can simply just use the action.property value in our switch statement.

## Detour - Destructuring

```
const person = {
    name: 'Nuwan',
    age: 25,
    location: {
        city: 'Colombo',
        temp: 34
    } 
};

console.log(`${person.name} is ${person.age}.`);
```

For the moment this is pretty basic, but what we're gonna do is to use a 'name' variable and an 'age' variable instead of 'person.name' and 'person.age'.

```
const person = {
    name: 'Nuwan',
    age: 25,
    location: {
        city: 'Colombo',
        temp: 34
    } 
};

const name = person.name;
const age = person.age;

console.log(`${name} is ${age}.`);
```

Now we could change the code to something like above, but this isn't ideal. Let's explore a better method to do this -> ES6 destructuring.

### ES6 Object Destructuring
With ES6 destructuring we can do this with one line.

```
const person = {
    name: 'Nuwan',
    age: 25,
    location: {
        city: 'Colombo',
        temp: 34
    } 
};

const { name, age } = person;

console.log(`${name} is ${age}.`);
```

So where exactly would this be useful? Let's look at another example.

```
if (person.location.city && person.location.temp) {
    console.log(`It's ${person.location.temp} in ${person.location.city}`);
}
```
Would this work? Yes. But the problem is we are pulling data off the same object over and over. We can make this much more readable.

```
const {city, temp} = person.location;
if (city && temp) {
    console.log(`It's ${temp} in ${city}`);
}
```

As you can see, the code above is much more readable.

We can also rename the values. Let's rename the temp variable to temperature.

```
const {city, temp:temperature} = person.location;
if (city && temperature) {
    console.log(`It's ${temperature} in ${city}`);
}
```

You can also set up default values. Let's set up some defaults, like if the name variable is undefined, let's use a default value like anonymous. This is the same as when we set up defaults for function arguments.

```
const person = {
    age: 25,
    location: {
        city: 'Colombo',
        temp: 34
    } 
};

const { name = 'Anonymous', age } = person;
console.log(`${name} is ${age}.`);
```

We can use renaming and default values simultaneously.

```
const { name: firstName = 'Anonymous', age } = person;
console.log(`${firstName} is ${age}.`);
```

Here's another simple example to rename the publisher name and set up a default if the publisher name is not defined.

```
const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
};

const {name: publisherName = 'Self-Published'} = book.publisher

console.log(publisherName);
```

Great, now we can destructure objects, creating seperate variables for the data we pull out of these objects. It allows us to create local variables, rename them as well as setting default values. Next, let's look at Array destructuring. After that, back to Redux!

### ES6 Object Destructuring
Let's start with an example.

```
const address = ['1299 S Juniper Street', 'Colombo', 'Sri Lanka', '10120'];

console.log(`You are in ${address[1]} ${address[2]}`)
```

Now this would work but it's unclear what address[1] is. So let's destructure the array just like we did with objects.

```
const address = ['1299 S Juniper Street', 'Colombo', 'Sri Lanka', '10120'];

const [street, city, country, zip] = address;

console.log(`You are in ${city} ${country}`) //You are in Colombo Sri Lanka
```

You can also destructure just the values you need.

```

const address = ['1299 S Juniper Street', 'Colombo', 'Sri Lanka', '10120'];

const [, city, country,] = address;

console.log(`You are in ${city} ${country}`)
```

This would just destructure the city and country, ignoring the other items in the array.

Although you can't rename variables (there's nothing to rename!), ike objects - you can set defaults.

```

const address = [];

const [, city = 'New York'] = address;

console.log(`You are in ${city}.`) //You are in New York.
```

Here's another basic example. We've only destructured the array items that we want.

```
const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [description, , mediumCoffee] = item;

console.log(`A medium ${description} costs ${mediumCoffee}`);
```

That's it for our detour. Let's get back to Redux!

### Action Generators
Action generators = functions that return action objects.

Action generators are simple functions that take in some arguements and return an action object, so we don't have to define our objects each time we want to change the Redux state object.

```
const incrementCount = () => ({
  type: 'INCREMENT'
});
```
A reason we do this is because manually creating action objects every time may lead to errors. Since our type property does not show up any errors if we simply make a spelling mistake, it is hard to catch these errors in the code. On the other hand, calling the incrementCount function, we can easily catch errors as we will get an error stating that the function is not defined. 

The code below outlined the differences in the dispatch calls. As you can see it's hard to make a mistake when calling the action generator.

```
store.dispatch({
  type: 'INCREMENT',
  incrementBy: 5
});

store.dispatch(incrementCount());
```

Now to pass in data with our dispatch call, we simply change our action generator to handle this.

```
const incrementCount = (payload = {}) => ({
  type: 'INCREMENT',
  incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
});

store.dispatch(incrementCount({ incrementBy: 5 }));

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy // We got rid of the conditional logic because action.incrementBy is handled by the action generator and is always defined (either to 1 or a custom value passed in from the dispatch call)
      };
    case 'DECREMENT':
      const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
      return {
        count: state.count - decrementBy
      };
    case 'SET':
      return {
        count: action.count
      }
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  };
});
```

Notice that we set an empty object as the default value for payload because if we dispatch an incrementCount call without passing in an incrementBy value and try to access a property of the payload, which is undefined, we get an error.

Let's destructure this a bit.

```
const incrementCount = ({ incrementBy } = {}) => ({
  type: 'INCREMENT',
  incrementBy: typeof incrementBy === 'number' ? incrementBy : 1
});
```

This is great but we can take this one step further. Let's set up a default value and simplify the code a bit more!

```
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});
```
Voila! Isn't that a lot nicer? The destructuring detour was worth it!

Now let's create action generators for the other functions.

```
const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy //We removed the const here and used action.decrementBy because the logic is handled by the action generator
      };
    case 'SET':
      return {
        count: action.count
      }
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  };
});
```

Let's continue creating action generators for SET and RESET.

```
const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

store.dispatch(resetCount());

const setCount = ({ count }) => ({
  type: 'SET',
  count
});

store.dispatch(setCount({ count: 101 }));
```

Great, we're down with our action generators. This let's us define complex logic just one time, allowing us to make simple function calls throughout our program.

Later on, we're going to make our action generators live in a separate file.

### Reducers
The reducer is what determines what to do based on an action, i.e. change state.

```
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      };
    case 'SET':
      return {
        count: action.count
      }
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  };
}

const store = createStore(countReducer);
```

### Creating multiple reducers

We've been using reducers all along, what we've done is simply isolated because our applications will have multiple reducers.

So what is a Reducer?

Reducers are pure functions -> the output is only determined by the input (state and the action). It doesn't use anything out of the function scope, and it doesn't change anything outside of the function scope either.

Never change state or action -> we never reassign a value to state or actions, or if they are objects we do not want to mutate them. We never change state or action. We simply read off them and return a new value based off that state and action.

Let's start off with some demo data as a guideline to help us create redux store with multiple reducers.
```
import { createStore, combineReducers } from 'redux';

const demoState = {
    expenses: [{
        id: 'pofdsfopdsfs',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};
```

Next, we'll use combineReducers to allow us to write reducers for this complex state.

So for our reducers, we'll have two - Expenses (an array of objects) and Filters (object).

Let's start with just our expenses reducer.

```
// Expenses Reducer

const expensesReducerDefaulState = [];

const expensesReducer = (state = expensesReducerDefaulState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

// Store creation

const store = createStore(expensesReducer);

console.log(store.getState()); // returns and empty array -> []
```

Introducing combineReducers -> It let's you combine multiple reducers to create a single store.

```
const store = createStore(
    combineReducers({
        expenses: expensesReducer
    })
);

console.log(store.getState()); //expenses: []

```

Now we have a store with an expenses property with a value of an empty array. This let's us build more complex redux stores.

So let's create our second reducer and actually make use of combineReducers!

```
// Expenses Reducer

const expensesReducerDefaulState = [];

const expensesReducer = (state = expensesReducerDefaulState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

// Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

// Store creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

console.log(store.getState()); //{expenses: Array(0), filters: {…}}

```

And there we have it. We have the correct redux store in place, with multiple reducers!
Now we have a way to scale our application with multiple reducers. Next we'll set up our reducers so they can respond to actions and change the state object in the redux store.

### Adding the action generators
We're gonna need the npm package uuid for our unique ID's.

`yarn add uuid@3.1.0`

Let's add our action generator for ADD_EXPENSE

```
// ADD_EXPENSE
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid()
    }
});
```

Now we need to create a switch case to handle this action in our reducer.

```
const expensesReducer = (state = expensesReducerDefaulState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return state.concat(action.expense);
        default:
            return state;
    }
};

store.dispatch(addExpense({ description: 'Rent', amount: 100 }));

```

We're gonna be using ES6 spread operators to clean up the code a bit.

```
const expensesReducer = (state = expensesReducerDefaulState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ]
        default:
            return state;
    }
};
```
Using the ES6 spread operator we can do this neatly without manipulating state (push would mutate it). This is very useful when we'll be using objects later.

Now let's add the removeExpense action generator.


```
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const expensesReducer = (state = expensesReducerDefaulState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE': 
            return state.filter(({ id }) => id != action.id);
        default:
            return state;
    }
};

```

Great, we can not remove an expense with our action generator and reducer. That's 2/3 of the way through.

Now let's spread our objects to help with our other reducers. For this, we have to customize our babel configuration! Let's do that now.

`yarn add babel-plugin-transform-object-rest-spread`

Now change the babel.rc file and add the object-rest-spread to the plugins array.

```
{
  "presets": [
    "env",
    "react"
  ],
  "plugins": [
    "transform-class-properties",
    "transform-object-rest-spread" // Right Here! (leave off the babel prefix)
  ]
}
```

The object spread operator works the same way as array spread operator. You can add data and override data.

Let's use the object spread operator to set up the EDIT_EXPENSE action generator and reducer.

```
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const expensesReducer = (state = expensesReducerDefaulState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE': 
            return state.filter(({ id }) => id != action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            });
        default:
            return state;
    }
};

const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 200 }));
store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))
```

Now let's set up the Filters reducer, starting with the setTextFilter.

```
const setTextFilter = (text) => ({
    type: 'SET_TEXT_FILTER',
    text
});

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        default:
            return state;
    }
};

```

The expensesReducer does not change at all, just the filtersReducer.

Let's do the two action generators and switch statements for SORT_BY_DATE and SORT_BY_AMOUNT now. They take no arguements so the logic is very simple.

```
// The Action Generators
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});
```


```
// The filters Reducer with new switch statements for sort by date and sort by amount.
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        default:
            return state;
    }
};
```

Now let's create our action generators and switch statements for SET_START_DATE and SET_END_DATE

```
// The Action Generators
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

// The filters Reducer with new switch statements for sort by date and sort by amount.
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
};
```

### Interacting reducers
Next, we're going to make the filtersRedcuer actually change the expenses array based on the state of the filters object. So what we're going to do to get this done is create a function called getVisibleExpenses, taking in 2 arguements, the expenses array and the filters object. To make this easier, we'll call this function in store.subscribe(); so that every time the Redux store changes, we run the expenses and filters through this new getVisibleExpenses function to sort the expenses array based on the filters object.

First let's just start by creating the dummy function so we know what this will look like.

```
// Get visible expenses
const getVisibleExpenses = (expenses, filters) => {
    return expenses;
};

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});
```

Now let's start by modifying the function so that we destructure the filters object arguement received from invoking the function.

```
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch;
        const endDateMatch;
        const textMatch;

        return startDate && endDateMatch && textMatch;
    });
};
```

So what this function does is that it filters through the expense array, only returning the items that match all of the three property values in the filters object, i.e. startDate, endDate and text.

Now let's expand on the logic of actually filtering the expenses array.

```
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate; 
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        
        return startDateMatch && endDateMatch && textMatch;
    });
};
```

The above function takes in the expenses array and the filters object. First it filters the array and only returns items that match all three of the filter values.
Let's start with the first one. 

startDateMatch checks if startDate is a number; if startDate is undefined (that means no date filter is set, startDateMatch will equal to true! If expense.createdAt is greater than startDate, that means we do want to see it and again it will make the stateDateMatch equal to true. The same goes for endDateMatch.

textMatch uses the .includes() method of check whether text is included in the expenses.description, and only returns if it does include the text. Don't forget to convert to lowercase before running the .includes() method.

The last thing we have to add is the sortBy filter. What we're going to do is add a .sort() function at the end of our return statement. We're just chaining it on, so the return statement is still going to be used. Let's get to it!


```
// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate; //First checks if startDate is a number, if startDate is undefined (that means no date filter is set, startDateMatch will equal to true!). If expense.createdAt is greater than startDate, that means we do want to see it and again it will make the stateDateMatch equal to true. 
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};
```

What this does is, after running all the filtering from the previous sections (startDate, endDate and text), we chained on a .sort() method call. It first checks whether sortBy is set to 'date' or 'amount', then accordingly it runs the conditional statement to sort the array according to the expense.createdAt value or expense.amount value.

And we are done! We have the entire Redux Store in place. Currently it's sitting in one file so in the next section, let's move everything to its own file and also integrate it with React.