<template>
  <div>
    <NuxtLayout name="default">
      <GameHeader :game-state="gameState" @start-new-game="initGame" @advance-game="advanceGame" />
      <div class="w-full flex justify-center">
        <GameBoard :boxes="gameState.boxes" @open-box="openBox" />
      </div>
      <!-- Modal para preguntas -->
      <TransitionRoot appear :show="isQuestionModalOpen" as="div" v-if="isQuestionModalOpen">
        <Dialog as="div" @close="closeQuestionModal" class="relative z-10">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
            leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95">
                <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900">
                    {{ gameState.currentQuestion.question }}
                  </DialogTitle>
                  <div class="mt-4">
                    <p class="text-sm text-gray-500 mb-4">
                      {{ gameState.currentQuestion.description }}
                    </p>
                    <div class="flex flex-wrap justify-between gap-1">
                      <button v-for="(option, index) in gameState.currentQuestion.options" :key="index"
                        @click="selectOption(index)" :class="[
                          'w-full',
                          'bg-blue-600',
                          'text-white',
                          'rounded-md',
                          'p-2',
                          'hover:bg-blue-700',
                          'transition',
                          'duration-200',
                          'mb-2',
                          {
                            'bg-green-600': index === gameState.currentQuestion.correctAnswerIndex && userSelectedOption === index,
                            'bg-red-600': index !== gameState.currentQuestion.correctAnswerIndex && userSelectedOption === index,
                          },
                        ]">
                        {{ option }}
                      </button>
                    </div>

                    <!-- Mensajes de respuesta -->
                    <div v-if="userSelectedOption !== null" class="mt-4">
                      <p v-if="userSelectedOption === gameState.currentQuestion.correctAnswerIndex"
                        class="text-green-600">
                        ¡Correcto!
                      </p>
                      <p v-else class="text-red-600">
                        Incorrecto. </p>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>


    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import GameHeader from '~/components/Blocks/GameHeader.vue'
import GameBoard from '~/components/Blocks/GameBoard.vue'
import ChatLog from '~/components/Blocks/ChatLog.vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const gameState = ref({
  boxes: [],
  boxIndex: null,
  currentQuestion: null,
  gameInstructions: '',
  score: 0,
  lives: 3,
})

const NUM_BOXES = 25
const standardBoxValues = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
];

const isQuestionModalOpen = ref(false)
const userSelectedOption = ref(null)

// Función para barajar un arreglo (Fisher-Yates Shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Intercambia elementos
  }
  return array;
}

// Initialize game state
function initGame() {
  const shuffledValues = shuffleArray([...standardBoxValues])
  const boxes = []

  for (let i = 1; i <= NUM_BOXES; i++) {
    const questionIndex = shuffledValues[i - 1]
    const question = questions[questionIndex]
    console.warn('question', question)
    console.warn('questionIndex', questionIndex)

    console.warn('shuffledValues', shuffledValues)
    console.warn('i', i)
    boxes.push({ id: i, value: questionIndex, opened: false, icon: question.icon, success: false })
  }

  gameState.value.boxes = boxes
  gameState.value.gameInstructions = 'Select a box to start the game.'
}

// Function to open a box
function openBox(boxId) {
  const boxIndex = gameState.value.boxes.findIndex(box => box.id === boxId)
  gameState.value.boxIndex = boxIndex
  if (boxIndex !== -1 && !gameState.value.boxes[boxIndex].opened) {
    gameState.value.boxes[boxIndex].opened = true

    // Display question based on box value
    const questionIndex = gameState.value.boxes[boxIndex].value
    gameState.value.currentQuestion = questions[questionIndex]
    isQuestionModalOpen.value = true
  }
}

// Function to select an option
function selectOption(index) {
  userSelectedOption.value = index

  if (gameState.value.currentQuestion) {
    // Check if the answer is correct
    if (userSelectedOption.value === gameState.value.currentQuestion.correctAnswerIndex) {
      gameState.value.score++
      gameState.value.gameInstructions = '¡Correcto! Sigue adelante.'
    } else {
      gameState.value.lives--
      gameState.value.gameInstructions = '¡Incorrecto! Pierdes una vida.'
    }
  }
  // closeQuestionModal()
}
// Function to close question modal
function closeQuestionModal() {
  console.warn(userSelectedOption.value)
  if (gameState.value.boxIndex && gameState.value.currentQuestion) {
    // Check if the answer is correct
    if (userSelectedOption.value === gameState.value.currentQuestion.correctAnswerIndex) {
      gameState.value.boxes[gameState.value.boxIndex].success = true
    }
    else {
      gameState.value.boxes[gameState.value.boxIndex].success = false
    }
  }

  isQuestionModalOpen.value = false
  gameState.value.currentQuestion = null
  gameState.value.boxIndex = null
  userSelectedOption.value = null
}

// Function to start a new game
function startNewGame() {
  initGame()
  gameState.value.gameInstructions = 'Select a box to start the game.'
  gameState.value.score = 0
  gameState.value.lives = 3
}

provide('gameState', gameState)
provide('openBox', openBox)
provide('closeQuestionModal', closeQuestionModal)
provide('selectOption', selectOption)
provide('startNewGame', startNewGame)
const questions = [
  {
    "question": "¿Qué es la automotivación?",
    "options": [
      "La habilidad de influir en otros para que actúen.",
      "La capacidad de impulsarse a uno mismo a actuar positivamente.",
      "La habilidad de evitar situaciones de tensión."
    ],
    "correctAnswerIndex": 1,
    "icon": "mdi:rocket" // Icono representativo
  },
  {
    "question": "¿De dónde proviene la automotivación?",
    "options": [
      "De factores externos como el ambiente.",
      "De la necesidad de reconocimiento social.",
      "De tu interior y el deseo de lograr lo importante."
    ],
    "correctAnswerIndex": 2,
    "icon": "mdi:star" // Icono representativo
  },
  {
    "question": "¿Qué caracteriza a las personas resilientes?",
    "options": [
      "No tienen reacciones emocionales negativas.",
      "Usan el pensamiento positivo para manejar respuestas emocionales.",
      "Evitan enfrentar desafíos para no tener retrocesos."
    ],
    "correctAnswerIndex": 1,
    "icon": "mdi:shield-check" // Icono representativo
  },
  {
    "question": "Según la presentación, ¿qué es la ambición?",
    "options": [
      "La habilidad de evitar riesgos.",
      "El impulso personal para lograr metas.",
      "La capacidad de tomar decisiones sin ayuda."
    ],
    "correctAnswerIndex": 1,
    "icon": "mdi:trophy" // Icono representativo
  },
  {
    "question": "¿Qué mentalidad tiene una persona que cree que puede mejorar sus habilidades a través del esfuerzo?",
    "options": [
      "Mentalidad fija.",
      "Mentalidad de crecimiento.",
      "Mentalidad negativa."
    ],
    "correctAnswerIndex": 1,
    "icon": "mdi:chart-line" // Icono representativo
  },
  {
    "question": "¿Cuál es un componente clave para aprovechar oportunidades?",
    "options": [
      "Coraje para enfrentar lo desconocido.",
      "Tomar riesgos sin pensar en las consecuencias.",
      "Evitar decisiones importantes."
    ],
    "correctAnswerIndex": 0,
    "icon": "mdi:lightbulb" // Icono representativo
  },
  {
    "question": "¿Qué destaca Maslow en su teoría de la jerarquía de necesidades?",
    "options": [
      "Todas las necesidades humanas son iguales.",
      "La autorrealización se alcanza tras cubrir necesidades básicas.",
      "Las necesidades de estima son menos importantes."
    ],
    "correctAnswerIndex": 1,
    "icon": "mdi:triangle" // Icono representativo
  },
  {
    "question": "¿Cuál es una diferencia clave entre la teoría de Maslow y la de Reeve sobre la motivación?",
    "options": [
      "Maslow se enfoca en las emociones.",
      "Reeve no sigue un orden jerárquico en las necesidades.",
      "Maslow no habla de autorrealización."
    ],
    "correctAnswerIndex": 1,
    "icon": "mdi:sword-fight" // Icono representativo
  },
  {
    "question": "¿Qué es un proyecto personal?",
    "options": [
      "Un plan para ayudar a los demás.",
      "Un enfoque en las cosas que son relevantes para uno mismo.",
      "Una manera de delegar responsabilidades."
    ],
    "correctAnswerIndex": 1,
    "icon": "mdi:clipboard-text" // Icono representativo
  },
  {
    "question": "¿Qué es la motivación intrínseca?",
    "options": [
      "La que surge de estímulos externos como el dinero.",
      "La que surge del interior de uno mismo.",
      "La que depende de las metas de otros."
    ],
    "correctAnswerIndex": 1,
    "icon": "mdi:heart" // Icono representativo
  },
  {
    "question": "¿Cuál de las siguientes es una motivación extrínseca?",
    "options": [
      "La satisfacción personal.",
      "El reconocimiento público.",
      "La fuerza interior."
    ],
    "correctAnswerIndex": 1,
    "icon": "mdi:medal" // Icono representativo
  },
  {
    "question": "¿Cómo se relacionan la automotivación y la autodisciplina?",
    "options": [
      "La autodisciplina depende de factores externos.",
      "Ambas implican el control de impulsos y emociones.",
      "La automotivación solo se basa en estímulos externos."
    ],
    "correctAnswerIndex": 1,
    "icon": "mdi:check-circle" // Icono representativo
  },
  {
    "question": "¿Cuál es el valor de la autonomía personal?",
    "options": [
      "Depender siempre de la opinión de los demás.",
      "La capacidad de controlarse a sí mismo y sus decisiones.",
      "Evitar tomar decisiones personales."
    ],
    "correctAnswerIndex": 1,
    "icon": "mdi:account-key" // Icono representativo
  },
  {
    "question": "¿Qué dice Aristóteles sobre la autonomía?",
    "options": [
      "Es innecesaria para el desarrollo humano.",
      "Sin autonomía, el ser humano es como un animal.",
      "La autonomía solo es importante en ciertas situaciones."
    ],
    "correctAnswerIndex": 1,
    "icon": "mdi:human" // Icono representativo
  },
  {
    "question": "¿Qué es la autodisciplina?",
    "options": [
      "Controlar impulsos y emociones para alcanzar metas a largo plazo.",
      "Dejarse llevar por las emociones.",
      "Hacer lo que otros esperan de ti."
    ],
    "correctAnswerIndex": 0,
    "icon": "mdi:timer-sand" // Icono representativo
  },
  {
    "question": "¿Qué pasa cuando no se cuida la salud física?",
    "options": [
      "No hay consecuencias.",
      "Puede afectar la salud mental.",
      "Se mejora la capacidad de resistencia."
    ],
    "correctAnswerIndex": 1,
    "icon": "solar:health-bold" // Icono representativo
  },
  {
    "question": "¿Qué porcentaje de conductas autodestructivas están relacionadas con descuidar la salud física?",
    "options": [
      "85%",
      "95%",
      "75%"
    ],
    "correctAnswerIndex": 1,
    "icon": "mdi:alert-circle" // Icono representativo
  },
  {
    "question": "¿Cuál es la relación entre optimismo y resiliencia?",
    "options": [
      "No tienen ninguna relación.",
      "Ambas ayudan a manejar respuestas emocionales negativas.",
      "Son opuestos."
    ],
    "correctAnswerIndex": 1,
    "icon": "ri:bear-smile-fill" // Icono representativo
  },
  {
    "question": "¿Qué puede evitar la falta de autodisciplina?",
    "options": [
      "Alcanzar metas a largo plazo.",
      "Tener una vida más relajada.",
      "Aumentar la productividad diaria."
    ],
    "correctAnswerIndex": 0,
    "icon": "mdi:chart-bar" // Icono representativo
  },
  {
    "question": "¿Qué parte de la pirámide de Maslow representa la autorrealización?",
    "options": [
      "La base.",
      "El nivel más alto.",
      "El centro."
    ],
    "correctAnswerIndex": 1,
    "icon": "mdi:mountain" // Icono representativo
  },
  {
    "question": "¿Qué implica tener una mentalidad fija?",
    "options": [
      "Creer que no se pueden mejorar las habilidades.",
      "Creer que todo se puede cambiar con esfuerzo.",
      "Aceptar que los demás controlan tu destino."
    ],
    "correctAnswerIndex": 0,
    "icon": "mdi:lock" // Icono representativo
  },
  {
    "question": "¿Cuál de las siguientes es una habilidad que mejora la automotivación?",
    "options": [
      "Evitar situaciones desafiantes.",
      "Mantener una actitud proactiva ante las dificultades.",
      "Depender de recompensas externas."
    ],
    "correctAnswerIndex": 1,
    "icon": "mdi:star-circle" // Icono representativo
  },
  {
    "question": "¿Cómo se define la competencia según Reeve?",
    "options": [
      "Es la habilidad de competir con otros.",
      "Es la capacidad de alcanzar metas con éxito.",
      "Es la capacidad de gestionar emociones negativas."
    ],
    "correctAnswerIndex": 1,
    "icon": "mdi:check-all" // Icono representativo
  },

  {
    "question": "¿Qué significa tener control personal sobre las decisiones?",
    "options": [
      "Dejar que otros decidan por ti.",
      "Tomar decisiones basadas en influencias externas.",
      "Tomar decisiones por ti mismo y asumir las consecuencias."
    ],
    "correctAnswerIndex": 2,
    "icon": "mdi:account-cog" // Icono representativo
  },
  {
    "question": "¿Qué indica la jerarquía de necesidades de Maslow sobre la seguridad?",
    "options": [
      "Es menos importante que la autorrealización.",
      "Es una necesidad básica que debe satisfacerse antes de alcanzar metas superiores.",
      "Es parte de las necesidades de orden superior."
    ],
    "correctAnswerIndex": 1,
    "icon": "mdi:shield" // Icono representativo
  },
  {
    "question": "¿Qué caracteriza a una persona con autodisciplina?",
    "options": [
      "Cambia sus metas constantemente.",
      "Mantiene el enfoque y perseverancia a largo plazo.",
      "Evita tomar riesgos por miedo al fracaso."
    ],
    "correctAnswerIndex": 1,
    "icon": "mdi:target" // Icono representativo
  },
  {
    "question": "¿Qué es la automotivación?",
    "options": [
      "La habilidad de influir en otros para que actúen.",
      "La capacidad de impulsarse a uno mismo a actuar positivamente.",
      "La habilidad de evitar situaciones de tensión."
    ],
    "correctAnswerIndex": 1,
    "icon": "mdi:rocket" // Icono representativo
  },
  {
    "question": "¿Cuál es el impacto de un entorno positivo en la motivación personal?",
    "options": [
      "Reduce la motivación y genera apatía.",
      "Fomenta la creatividad y el crecimiento personal.",
      "No tiene ningún efecto en la motivación."
    ],
    "correctAnswerIndex": 1, // La respuesta correcta es la segunda opción
    "icon": "mdi:emoticon-happy" // Icono representativo
  }
];


</script>
