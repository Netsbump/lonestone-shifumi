<a id="readme-top" name="readme-top"></a>

<br />

<div align="center">

  <h3 align="center">🕹️ Shifumi Game Front-End</h3>

  </br>

<a href="https://netsbump.github.io/lonestone-shifumi/">Live Demo</a>
·
<a href="https://github.com/Netsbump/lonestone-shifumi/issues">Report Issues</a>
·
<a href="https://github.com/Netsbump/lonestone-shifumi/pulls">Request Feature</a>

</div>

<div>

### ✨ Stack

- **React & TypeScript**
- **Tailwind CSS**
- **Vite**
- **React-Aria-Components**
- **ESLint & Prettier**

### 🤝 Contributions & Usage

Contributions, suggestions, or feedback are always welcome.

### 📁 File Structure

```plaintext
src/
│
├── assets/               # Contains global assets such as images, fonts, and styles.
│   ├── fonts/            # Custom fonts used in the project.
│   ├── images/           # Images and icons used throughout the application.
│   └── styles/           # Global styles, potentially including Tailwind configurations.
│
├── features/game/        # Core game features and logic for the Shifumi game.
│   ├── history/          # Manages the game's history, such as past rounds.
│   ├── rules/            # Defines and manages the rules of the game.
│   ├── scores/           # Handles scoring logic and display.
│   ├── screen/           # Contains the main game screen components.
│   ├── Game.tsx          # The main component for the game.
│   ├── GameButtonGroup.tsx # Component for grouping game buttons.
│   └── GameContext.tsx   # Context for managing the global state of the game.
│
├── lib/                  # Utility functions and shared types.
│   ├── types/            # TypeScript types used throughout the project.
│   └── utils/            # Utility functions that can be reused across components.
│
├── ui/                   # Reusable UI components.
│   ├── ChoiceCard.tsx    # Component representing a choice card in the game.
│   ├── GameButton.tsx    # Button component styled for the game.
│   ├── GameContainer.tsx # Container component for game layout.
│   ├── GameProgressBar.tsx # Progress bar component used in the game.
│   ├── IconTextLine.tsx  # Component for displaying text with an accompanying icon.
│   ├── Illustration.tsx  # Component for game-related illustrations.
│   └── TitleContainer.tsx # Container for titles and headings.
│
├── App.tsx               # The main application component.
├── index.tsx             # Entry point for the application.
├── main.tsx              # Initializes the app and mounts the root component.
├── index.css             # Global CSS file, likely including Tailwind base styles.
└── vite-env.d.ts         # TypeScript declarations for Vite.
```

### 🔴 Note

This project is still a work in progress, and any issues or suggestions are greatly appreciated.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

</div>
