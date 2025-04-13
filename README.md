# Customizable Banner Project

A Vue.js application that lets users create and customize banners with dynamic text, colors, opacities, and images. Includes undo/redo functionality, preset templates, and persistent settings. 

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://banner-customizer-git-main-saksham-sirohis-projects.vercel.app/)

## Features

- **Complete Customization**:
  - Adjustable banner text
  - Background and text color pickers
  - Opacity controls for background, text, and images
  - Image upload (file or URL) with validation
  - Aspect ratio and shape controls

- **Advanced Functionality**:
  - Undo/redo operations with 20-step history
  - 6 preset templates for quick styling
  - LocalStorage persistence for user settings
  - Responsive design works on all devices

- **User Experience**:
  - Toggleable settings panel with animations
  - Real-time preview of changes
  - Reset to defaults option
  - Error handling for invalid inputs
  - Motion-safe animations

## Technologies

- **Core**:
  - Vue 3 (Composition API)
  - Tailwind CSS
  - Vite (Build Tool)

- **Testing**:
  - Vitest (Unit Testing)
  - Testing Library (Component Testing)

- **Quality**:
  - ESLint (Code Linting)
  - Prettier (Code Formatting)

## Live Demo

The application is hosted on Vercel:  
👉 [https://banner-customizer-git-main-saksham-sirohis-projects.vercel.app/](https://banner-customizer-git-main-saksham-sirohis-projects.vercel.app/)

Setup
-----

1. **Clone the repository**

   ```
   git clone https://github.com/22f1001635/banner-customizer.git
   cd banner-customizer
   ```
2. **Install dependencies**

   ```
   npm install
   ```
3. **Run the development server**

   ```
   npm run dev
   ```
4. **Build for production**

   ```
   npm run build
   ```

Development Tools
-----------------

- **Run linter (ESLint)**

  ```
  npm run lint
  ```
- **Format code (Prettier)**

  ```
  npm run format
  ```

Testing
-------

- **Run all tests**

  ```
  npm test
  ```
- **Run tests with coverage**

  ```
  npm run coverage
  ```

Tests include:

- Component rendering
- Form interactions
- State management
- LocalStorage operations
- Error handling
- Animation behavior
- Undo/redo functionality
- Template application

Contributing
------------

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please ensure:

- Code follows existing patterns
- Tests are added/updated for new features
- Documentation is updated if needed
- Code passes linting (`npm run lint`)
- Code is properly formatted (`npm run format`)
