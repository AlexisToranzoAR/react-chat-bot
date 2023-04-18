import ChanguitoIcon from "./Changuito";
import { ChatBot } from "./lib";

const steps = [
  {
    id: "1",
    text: "¡Hola! ¿Cuál es tu nombre?",
    trigger: "2",
  },
  {
    id: "2",
    user: true,
    validator: (value) => {
      if (!value || value.trim() === "") {
        return "Por favor, ingresa tu nombre.";
      }
      return true;
    },
    trigger: "3",
  },
  {
    id: "3",
    text: "Encantado de conocerte, {previousValue}! ¿En qué puedo ayudarte hoy?",
    trigger: "4",
  },
  {
    id: "4",
    options: [
      {
        value: "soporte",
        label: "Necesito ayuda con un problema técnico.",
        trigger: "5",
      },
      {
        value: "información",
        label: "Quiero saber más acerca de sus productos o servicios.",
        trigger: "6",
      },
      {
        value: "otro",
        label: "Tengo otra pregunta o inquietud.",
        trigger: "7",
      },
    ],
  },
  {
    id: "5",
    text: "¿Podrías proporcionarme más detalles sobre el problema que estás experimentando?",
    trigger: "8",
  },
  {
    id: "6",
    text: "¡Genial! ¿Qué te gustaría saber?",
    trigger: "8",
  },
  {
    id: "7",
    text: "Claro, ¿en qué puedo ayudarte?",
    trigger: "8",
  },
  {
    id: "8",
    user: true,
    trigger: "9",
  },
  {
    id: "9",
    text: "Lo siento, no estoy seguro de cómo ayudarte con eso. Comunicarse al 0800-555-2929",
    trigger: "11",
  },
  {
    id: "10",
    text: "¡Gracias por comunicarte con nosotros! Espero que tengas un buen día.",
    end: true,
  },
];

function App() {
  const nextStepNotFound = (trigger) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          id: trigger,
          text: "¡Gracias por comunicarte con nosotros! Espero que tengas un buen día.",
          end: true,
        });
      }, 2000);
    });
  };

  return (
    <div style={{maxHeight: 350}}>
      <ChatBot
        steps={steps}
        botName="Changuito"
        botAvatar={<ChanguitoIcon />}
        userAvatar={<ChanguitoIcon />}
        nextStepNotFound={nextStepNotFound}
        language="es"
      />
    </div>
  );
}

export default App;
