# Parchment Project Specifications

## 1. Project Overview

Parchment is a web application designed to translate .epub books. The project is built as a modern web application using the Next.js framework.

## 2. Key Technologies

- **Frontend:** Next.js, React, TypeScript
- **Styling:** Tailwind CSS
- **API/Backend:** Next.js API Routes
- **Component Development:** Storybook
- **Testing:** Vitest
- **Natural Language Processing:** OpenAI API

## 3. Features

### 3.2. Text Translation

- **Translation Service:** The application integrates with the OpenAI API to provide text translation services.

## 4. Architecture
The project follows the standard architecture of a Next.js application.

- **`src/app`:** Contains the main application routes and pages.
- **`src/app/api`:** Contains the API routes for backend functionality.
- **`src/utils`:** Contains utility functions for tasks like EPUB extraction and translation.
- **`src/stories`:** Contains Storybook stories for UI component development and testing.
- **`public`:** Contains static assets.

## 5. Testing

The project is set up with Vitest for unit and integration testing. Test files are expected to be located alongside the source files or in a dedicated `__tests__` directory.
