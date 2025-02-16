
# Breathe - Wellness Tracker

Breathe is an application designed to help you manage stress, stay organized, and improve your overall well-being. It includes features such as a survey, to-do list, sound library, meditation, and an AI assistant named Aeolus.

## Features

- **Home**: Welcome page with an overview of the application.
- **Survey**: Collects user feedback to improve the experience.
- **Settings**: Customize preferences and enable dark mode.
- **To Do List**: Keep track of tasks and prioritize them.
- **Sound Library**: Access a collection of soothing sounds and music.
- **Meditation**: Find guided meditations to help you relax and focus.
- **Aeolus AI**: Chat with our AI assistant for stress relief and task management.
- **Shop**: Purchase items to enhance your experience and customize your character.

## Setup Instructions

### Prerequisites

- Python 3.x
- Flask
- Tkinter
- Groq API
- Google API
- VPN (for Aeolus AI to function as Google API doesn't support all locations)

### Installation

1. **Clone the repository**:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies**:
    ```sh
    pip install flask groq google genai
    ```

3. **Run the Flask server**:
    ```sh
    python app.py
    ```

4. **Run the Tkinter application**:
    ```sh
    python last.py
    ```

### Usage

- **Home**: Provides an overview of the application.
- **Survey**: Answer the survey questions to help improve the application.
- **Settings**: Toggle dark mode and other preferences.
- **To Do List**: Add, prioritize, and complete tasks.
- **Sound Library**: Play and control soothing sounds and music.
- **Meditation**: Start guided meditations with different durations.
- **Aeolus AI**: Chat with the AI assistant for stress relief and task management.
- **Shop**: Buy and equip items to customize your character.

### Notes

- **VPN Requirement**: You need to use a VPN for Aeolus AI to function as Google API doesn't support all locations.

## File Structure

```
Mental/
├── project/
│   ├── app.py
│   ├── index.html
│   ├── last.py
│   ├── scripts.js
│   ├── styles.css
│   └── README.md
```

### app.py

Flask server to handle AI chat functionality using Google API.

### index.html

Main HTML file for the web interface.

### last.py

Tkinter application for the desktop interface.

### scripts.js

JavaScript file for handling client-side logic.

### styles.css

CSS file for styling the web interface.

### README.md

This file, providing an overview and setup instructions for the project.

## License

This project is licensed under the MIT License.
````