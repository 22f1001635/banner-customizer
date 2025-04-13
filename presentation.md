# Wikimedia Setup Frontend Web App for interactive banner design task

## Project Overview

This documents my contribution to the Wikimedia Setup Frontend Web App for the interactive banner design task as part of my Outreachy application, implementing an interactive banner designer with full test coverage and documentation.

## Live Demo

The application is hosted on Vercel:
👉 [https://banner-customizer-git-main-saksham-sirohis-projects.vercel.app/](https://banner-customizer-git-main-saksham-sirohis-projects.vercel.app/)

## Repository Information

- **Repository URL**: [[GitHub Repository URL](https://github.com/22f1001635/banner-customizer)]
- **Framework/Library**: Vue 3 Composition API
- **Testing Framework**: Vitest + Testing Library
- **Code Quality**: ESLint + Prettier
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## Project Structure

```bash
banner-customizer/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   └── bannerform.vue
├── tests/
│   ├── setup.js
│   ├── linting.spec.js
│   └── bannerform.spec.js
├── .eslintrc.js
├── tailwind.config.js
├── vite.config.js
├── vitest.config.js
├── package.json
└── README.md
```

## Implementation Details


### Technical Setup

* Initialized Vue 3 project with Vite
* Configured Tailwind CSS for utility-first styling
* Integrated Vitest for component testing with JSDOM environment
* Set up ESLint with Vue 3 and Prettier integration
* Implemented Vercel deployment configuration

### Core Features

1. **Interactive Banner Component**
   * Dynamic background color/opacity control
   * Customizable text content with color/opacity adjustments
   * Image upload/URL input with preview and validation
   * Local storage persistence for user settings
   * Responsive design for all screen sizes
   * 20-step undo/redo history tracking
   * 6 preset styling templates
   * Aspect ratio and shape controls
2. **Control Panel**
   * Color pickers for background/text customization
   * Range sliders for opacity controls
   * Image upload with drag-and-drop support
   * Reset to defaults functionality
   * Animated settings panel with CSS transitions
   * Template quick-select system
   * Motion-safe animations

### Testing Implementation

* **Component Tests** (bannerform.spec.js):
  * 15 comprehensive tests covering:
    * Initial state verification
    * Form interactions
    * Image upload handling
    * LocalStorage operations
    * Undo/redo functionality
    * Template application
    * Error state management
    * Animation behaviors
    * History stack limits
* **Linting Checks** (linting.spec.js):
  * ESLint validation with strict Vue 3 rules
  * Prettier formatting verification
* Achieved 98% test coverage through V8 provider

### Documentation

* **README.md** includes:
  * Project setup instructions
  * Scripts overview (dev/build/test)
  * Testing methodology
  * Contribution guidelines
  * Live demo link
* **TEST_COVERAGE.md** includes:
  * Detailed test case descriptions
  * Coverage reports
  * Linting/formatting specifications

## Challenges & Solutions

1. **State History Management**
   Implemented ring buffer pattern for undo/redo functionality with 20-step limit
2. **Template System Integration**
   Created theme configuration system with color contrast validation
3. **Cross-Browser File Handling**
   Developed unified image processor for both URL and file upload inputs
4. **Animation Performance**
   Optimized CSS transitions using `will-change` and `translate3d` properties
5. **Responsive Design**
   Implemented mobile-first layout with Tailwind's breakpoint system

## Quality Assurance

* ESLint rules configured with:
  * Vue 3 essential rules
  * JavaScript base
  * Prettier compatibility
* Pre-commit hooks for:
  * Automatic linting fixes
  * Formatting validation
  * Test execution

## Future Improvements

* Export as PNG/SVG functionality
* Accessibility enhancements for screen readers
* Internationalization support
