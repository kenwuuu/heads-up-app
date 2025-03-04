## **Development Order**

### **Phase 1: Setup**

1. Install Expo & required libraries
   - Run: `npx create-expo-app headsup --template`
   - Choose blank TypeScript template
   - Install core dependencies:
     ```bash
     npm install zustand @react-navigation/native @react-navigation/native-stack
     npx expo install react-native-screens react-native-safe-area-context
     ```

2. Set up Zustand for state management
   - Create `src/zustand_state_store` directory
   - Create basic store with game state:
     - Current deck
     - Game timer
     - Score tracking
   - Example structure in `store/gameStore.ts`

3. Set up React Navigation
   - Create `src/navigation` directory
   - Set up navigation container in `App.tsx`
   - Define basic stack navigator with placeholder screens

### **Phase 2: UI & Navigation**

1. Create screen components (in `src/screens`):
   - `HomeScreen.tsx`: Main menu with deck selection
   - `GameScreen.tsx`: Where gameplay happens
   - `ResultsScreen.tsx`: Show score after round
   - `CustomDeckScreen.tsx`: Deck management

2. Implement navigation between screens
   - Add screen components to stack navigator
   - Create navigation types file
   - Implement basic navigation buttons/actions
   - Test navigation flow works

### **Phase 3: Game Core Functionality**

1. Display words from a deck
   - Create sample deck data structure
   - Add deck selection logic
   - Display current word component
   - Implement word cycling

2. Add timer functionality
   - Create timer component
   - Add countdown logic
   - Handle round start/end
   - Add visual countdown indicator

3. Track correct/pass actions
   - Add score tracking to game state
   - Create temporary button controls
   - Display running score
   - Handle round completion

### **Phase 4: Gyroscope-Based Gestures**

1. Implement gyroscope reading via `expo-sensors`
2. Detect up/down tilts to trigger correct/pass actions

### **Phase 5: Sound Effects**

1. Integrate `expo-av` for sound feedback on correct/pass actions

### **Phase 6: Custom Deck Management**

1. Create UI for adding/editing decks
2. Implement AsyncStorage for saving decks locally

### **Phase 7: Deck Export/Import**

1. Implement export using `expo-file-system` + `expo-sharing`
2. Implement import using `expo-document-picker`

### **Phase 8: Polish & Testing**

1. Debug edge cases (e.g., accidental tilts, missing words)
2. Improve UI where necessary
3. Final testing & performance checks

---

### **Final Notes:**

- **Core gameplay is built first** before adding additional features.
- **Custom decks & export/import come later** since they don't block core functionality.
- **Sound effects are added after gestures** for a better experience.