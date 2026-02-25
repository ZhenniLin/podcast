export type Level = "A1" | "A2" | "B1" | "B2"
export type Topic =
  | "Travel"
  | "Food"
  | "Work"
  | "Daily Life"
  | "Culture"
  | "Tech"
  | "Books"
  | "Relationships"

export interface PodcastItem {
  id: string
  title: string
  subtitle: string
  topic: Topic
  level: Level
  duration: string
  imageUrl: string
  description: string
  transcript: { time: number; text: string }[]
  vocab: { word: string; definition: string; example: string }[]
  quiz: {
    question: string
    options: string[]
    correctIndex: number
    explanation: string
  }[]
}

export const TOPICS: { id: Topic; label: string; icon: string }[] = [
  { id: "Travel", label: "Travel", icon: "Plane" },
  { id: "Food", label: "Food", icon: "Utensils" },
  { id: "Work", label: "Work", icon: "Briefcase" },
  { id: "Daily Life", label: "Daily Life", icon: "Coffee" },
  { id: "Culture", label: "Culture", icon: "Globe" },
  { id: "Tech", label: "Tech", icon: "Cpu" },
  { id: "Books", label: "Reading", icon: "BookOpen" },
  { id: "Relationships", label: "Relationships", icon: "Heart" },
]

export const LEVELS: {
  id: Level
  title: string
  subtitle: string
  description: string
}[] = [
  {
    id: "A1",
    title: "Entry Level",
    subtitle: "Beginner",
    description: "Short sentences, slow speed",
  },
  {
    id: "A2",
    title: "Elementary",
    subtitle: "Elementary",
    description: "Daily scenarios, common words",
  },
  {
    id: "B1",
    title: "Intermediate",
    subtitle: "Intermediate",
    description: "Opinions, natural flow",
  },
  {
    id: "B2",
    title: "Upper Interm.",
    subtitle: "Upper Intermediate",
    description: "Complex ideas, native speed",
  },
]

export const MOCK_PODCASTS: PodcastItem[] = [
  {
    id: "1",
    title: "Urban Living in NYC",
    subtitle: "Urban Living in NYC",
    topic: "Daily Life",
    level: "A2",
    duration: "5:30",
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    description:
      "Essential vocabulary for city life",
    transcript: [
      { time: 0, text: "Living in New York City is an exciting experience." },
      {
        time: 5,
        text: "The subway system connects all five boroughs.",
      },
      {
        time: 10,
        text: "You can find food from every culture on every corner.",
      },
      {
        time: 15,
        text: "The pace of life here is incredibly fast.",
      },
    ],
    vocab: [
      {
        word: "Borough",
        definition: "A district of a city",
        example: "Manhattan is one of five boroughs in NYC.",
      },
      {
        word: "Subway",
        definition: "Underground train system",
        example: "I take the subway to work every day.",
      },
    ],
    quiz: [
      {
        question: "How many boroughs does NYC have?",
        options: ["Three", "Four", "Five", "Six"],
        correctIndex: 2,
        explanation: "New York City has five boroughs.",
      },
    ],
  },
  {
    id: "2",
    title: "A Day in New York",
    subtitle: "A Day in New York",
    topic: "Travel",
    level: "A2",
    duration: "4:30",
    imageUrl: "https://images.unsplash.com/photo-1546436836-07a91091f160?w=800&q=80",
    description:
      "Explore the busy streets of NYC and learn how to navigate the city",
    transcript: [
      { time: 0, text: "Good morning! Let's explore New York today." },
      {
        time: 5,
        text: "First, we'll visit the Statue of Liberty.",
      },
      {
        time: 10,
        text: "Then, we'll walk through Central Park.",
      },
    ],
    vocab: [
      {
        word: "Navigate",
        definition: "Find your way around",
        example: "It's easy to navigate NYC with a map.",
      },
    ],
    quiz: [
      {
        question: "What will we visit first?",
        options: ["Central Park", "Times Square", "Statue of Liberty", "Brooklyn Bridge"],
        correctIndex: 2,
        explanation: "The first destination is the Statue of Liberty.",
      },
    ],
  },
  {
    id: "3",
    title: "Ordering Street Food",
    subtitle: "Ordering Street Food",
    topic: "Food",
    level: "A2",
    duration: "3:45",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    description: "Learn essential phrases for ordering delicious street food",
    transcript: [
      { time: 0, text: "Hi! I'd like to order a hot dog, please." },
      { time: 4, text: "What toppings would you like?" },
      { time: 8, text: "Mustard and sauerkraut, please." },
    ],
    vocab: [
      {
        word: "Toppings",
        definition: "Food items placed on top",
        example: "I like many toppings on my pizza.",
      },
    ],
    quiz: [
      {
        question: "What toppings were ordered?",
        options: ["Ketchup and onions", "Mustard and sauerkraut", "Relish and peppers", "Mayo and cheese"],
        correctIndex: 1,
        explanation: "The customer ordered mustard and sauerkraut.",
      },
    ],
  },
  {
    id: "4",
    title: "The Job Interview",
    subtitle: "The Job Interview",
    topic: "Work",
    level: "B1",
    duration: "6:15",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
    description:
      "Common questions and answers for your first job interview",
    transcript: [
      {
        time: 0,
        text: "Tell me about yourself and your background.",
      },
      {
        time: 5,
        text: "I have five years of experience in marketing.",
      },
      {
        time: 10,
        text: "What are your strengths and weaknesses?",
      },
    ],
    vocab: [
      {
        word: "Background",
        definition: "Your experience and education",
        example: "She has a strong background in finance.",
      },
      {
        word: "Strengths",
        definition: "Things you are good at",
        example: "Communication is one of my strengths.",
      },
    ],
    quiz: [
      {
        question: "How many years of experience does the candidate have?",
        options: ["Three", "Four", "Five", "Six"],
        correctIndex: 2,
        explanation: "The candidate has five years of experience.",
      },
    ],
  },
  {
    id: "5",
    title: "Future of AI",
    subtitle: "Future of AI",
    topic: "Tech",
    level: "B2",
    duration: "7:20",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    description:
      "Discussing how AI is changing the way we work and live",
    transcript: [
      {
        time: 0,
        text: "Artificial Intelligence is no longer just science fiction.",
      },
      {
        time: 5,
        text: "It is integrated into our phones, cars, and homes.",
      },
      {
        time: 10,
        text: "But what does this mean for the future of employment?",
      },
    ],
    vocab: [
      {
        word: "Integrated",
        definition: "Combined to form a whole",
        example: "AI is integrated into many devices.",
      },
      {
        word: "Employment",
        definition: "Having a job",
        example: "AI may affect employment opportunities.",
      },
    ],
    quiz: [
      {
        question: "What is the main topic?",
        options: ["History of AI", "Future of AI", "Coding AI", "Robots"],
        correctIndex: 1,
        explanation: "The podcast discusses the future impact of AI.",
      },
    ],
  },
  {
    id: "6",
    title: "Coffee Shop Conversations",
    subtitle: "Coffee Shop Conversations",
    topic: "Daily Life",
    level: "A1",
    duration: "3:30",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    description: "Learn the basics of ordering coffee and casual chitchat",
    transcript: [
      { time: 0, text: "Hi, I would like a medium latte, please." },
      { time: 4, text: "Sure, would you like any milk alternative?" },
      { time: 8, text: "Yes, oat milk please." },
    ],
    vocab: [
      {
        word: "Latte",
        definition: "Coffee with milk",
        example: "I drink a latte every morning.",
      },
    ],
    quiz: [
      {
        question: "What milk did the customer ask for?",
        options: ["Whole milk", "Soy milk", "Oat milk", "Almond milk"],
        correctIndex: 2,
        explanation: "The customer specifically requested oat milk.",
      },
    ],
  },
  {
    id: "7",
    title: "Weekend Plans",
    subtitle: "Weekend Plans",
    topic: "Daily Life",
    level: "A2",
    duration: "4:10",
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    description: "Talking about weekend activities with friends",
    transcript: [
      { time: 0, text: "What are you doing this weekend?" },
      { time: 4, text: "I'm going to the beach with some friends." },
      { time: 8, text: "That sounds fun! Can I join you?" },
    ],
    vocab: [
      {
        word: "Weekend",
        definition: "Saturday and Sunday",
        example: "I relax on the weekend.",
      },
    ],
    quiz: [
      {
        question: "Where is the person going?",
        options: ["Mountains", "Beach", "City", "Park"],
        correctIndex: 1,
        explanation: "They're going to the beach.",
      },
    ],
  },
  {
    id: "8",
    title: "Traveling on a Budget",
    subtitle: "Traveling on a Budget",
    topic: "Travel",
    level: "B1",
    duration: "5:50",
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    description: "Tips and tricks for affordable travel adventures",
    transcript: [
      { time: 0, text: "Traveling doesn't have to be expensive." },
      { time: 5, text: "You can find cheap flights if you book in advance." },
      { time: 10, text: "Hostels are a great way to save money." },
    ],
    vocab: [
      {
        word: "Budget",
        definition: "Amount of money available to spend",
        example: "I'm traveling on a tight budget.",
      },
    ],
    quiz: [
      {
        question: "How can you save money on accommodation?",
        options: ["Hotels", "Hostels", "Resorts", "Villas"],
        correctIndex: 1,
        explanation: "Hostels are mentioned as a money-saving option.",
      },
    ],
  },
]
