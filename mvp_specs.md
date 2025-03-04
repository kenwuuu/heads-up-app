### **React Native Heads Up-Style App – MVP Specification**

---

## **1. Core Features**

- **Game Rounds**: Players take turns guessing words within a time limit.
- **Deck Selection**: Users choose from default or custom decks.
- **Timer**: Countdown for each round.
- **Score Tracking**: Counts correct and passed words.
- **Gesture-based Controls**: Uses the gyroscope to detect up/down tilts for correct/pass.
- **Sound Effects**: Use `expo-av` for feedback sounds on correct/pass actions.

---

## **2. Custom Deck Management**

- **Create, Edit, Delete Decks** (Local storage using AsyncStorage)
- **Add, Edit, Remove Words in Decks**
- **Deck Export/Import**
    - Export: `expo-file-system` + `expo-sharing`
    - Import: `expo-document-picker`

---

## **3. Screens & UI Components**

### **1. Home Screen**

- Start Game button
- Deck selection dropdown
- Button to manage custom decks

### **2. Game Screen**

- Displays current word
- Timer countdown
- Gesture-based scoring (tilt up = correct, tilt down = pass)
- Sound effects for correct/pass actions

### **3. Results Screen**

- Round score summary
- Option to play again

### **4. Custom Deck Screen**

- List of saved decks
- Add/edit/delete decks
- Add/remove words in a deck
- Export/import functionality

---

## **4. Tech Stack**

### **Core Libraries**

- **React Native** (Expo or CLI)
- **React Navigation** (for screen transitions)
- **Zustand** (for state management)

### **UI & Components**

- **React Native Paper** (Prebuilt UI components)

### **Sensors & Gestures**

- **expo-sensors** (Gyroscope handling)
- **react-native-gesture-handler** (For swipe interactions, if needed)

### **Storage & File Handling**

- **AsyncStorage** (Local storage for decks)
- **expo-file-system** (Save/load deck files)
- **expo-sharing** (Export decks)
- **expo-document-picker** (Import decks)

### **Sound Effects**

- **expo-av** (Correct/pass feedback sounds)
