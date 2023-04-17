# React Chat Bot

A customizable chat bot component for React.

## Installation

Install using npm:

`npm install @alexistoranzo/react-chat-bot`

Note: Enabling React's strict mode may cause additional renders and potentially lead to issues in the package. It is recommended to avoid using strict mode with React Chat Bot.

## Usage

Import the `ChatBot` component and render it in your React app:

```
import { ChatBot } from '@alexistoranzo/react-chat-bot';

const steps = [
  {
    id: 'hello',
    text: 'Hello, how can I help you?',
    trigger: 'options',
  },
  {
    id: 'options',
    options: [
      {
        value: 'search',
        label: 'Search',
        trigger: 'search',
      },
      {
        value: 'contact',
        label: 'Contact us',
        trigger: 'contact',
      },
    ],
  },
  {
    id: 'search',
    user: true,
    validator: (value)  => {
      if (!value  ||  value.trim() ===  "") {
        return  "Please. Type your search.";
      }
      return  true;
    },
    trigger: 'results',
  },
  {
    id: 'results',
    text: 'Here are the results for {previousValue}',
    trigger: 'options',
  },
  {
    id: 'contact',
    text: 'Please email us at support@example.com',
    end: true,
  },
];

const botAvatar = <BotAvatar />;
const userAvatar = <UserAvatar />;

function MyChatBot() {
  return (
    <ChatBot
      steps={steps}
      botName="My Bot"
      botAvatar={botAvatar}
      userAvatar={userAvatar}
    />
  );
}

export default MyChatBot;
```

## Props

The `ChatBot` component accepts the following props:

-   `steps` (required): An array of step objects that define the conversation flow. Each step object has the following properties:
    -   `id` (required): A unique identifier for the step.
    -   `text` (opcional): The text that the bot should display to the user.
    -   `trigger` (required - opcional): The ID of the next step to trigger when the user responds to this step.
    -   `options` opcional): An array of option objects to display as buttons to the user. Each option object has the following properties:
        -   `value` (required): The value to return when the user selects this option.
        -   `label` (required): The label to display on the button.
        -   `trigger` (required): The ID of the next step to trigger when the user responds to this step.
    -   `user` (optional): If set to `true`, the bot will wait for the user to type a message before proceeding to the next step. The user's response will be stored in the `previousValue` variable.
    -   `end` (optional): If set to `true`, the conversation will end after this step.
Note: At least one of `text`, `options`, or `user` properties is required for each step object. If a `trigger` property is not defined in a step object, the `end` property must be set to `true`. This is because the conversation flow cannot continue to the next step without a trigger. If neither `trigger` nor `end` is defined, the chat bot will throw an error.
-   `nextStepNotFound` (optional): A function to call when the bot cannot find the next step to trigger. The function receives the current step id as its argument. 
-   `botName` (required): The name of the bot to display in the chat window.
-   `botAvatar` (required): A React component that displays the bot's avatar.
-   `userAvatar` (required): A React component that displays the user's avatar.
-   `onClose` (optional): A function to call when the user closes the chat window.
-   `iconStyle` (optional): An object containing CSS styles to apply to the chat avatar icon.
-   `textStyle` (optional): An object containing CSS styles to apply to the chat text.
-   `buttonStyle` (optional): An object containing CSS styles to apply to the chat buttons.

The `nextStepNotFound` prop is an optional function that is called when the chat bot cannot find the next step to trigger. If this prop is defined, the function will receive as its argument the ID of the step that could not be found. Additionally, you can define the argument as an `async` function that returns an object of the `step` that was not found. This can be useful if you want to log the missing steps or fetch the steps from a server.

Here is an example of how to define the `nextStepNotFound` function:

```
import { ChatBot } from '@alexistoranzo/react-chat-bot';

const steps = [
  // ...
];

function MyChatBot() {
  const handleNextStepNotFound = async (stepId) => {
    console.log(`Step not found: ${stepId}`);
    const response = await fetch(`https://myserver.com/steps/${stepId}`);
    const step = await response.json();
    return step;
  };

  return (
    <ChatBot
      steps={steps}
      botName="My Bot"
      botAvatar={botAvatar}
      userAvatar={userAvatar}
      nextStepNotFound={handleNextStepNotFound}
    />
  );
}

export default MyChatBot;
``` 

In this example, the `handleNextStepNotFound` function logs the missing step ID to the console and fetches the missing step object from a server. The function returns the missing step object, which allows the conversation to continue.