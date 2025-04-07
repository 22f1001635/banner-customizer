Customizable Banner Project
===========================

A Vue.js application that lets users create and customize banners with dynamic text, colors, opacities, and images. Settings persist in localStorage, and animations enhance user interaction.

Features
--------

- Customizable banner text, background/text colors, and opacities
- Image upload or URL input with validation
- Toggleable settings form with animations
- LocalStorage persistence for user settings
- Responsive design with Tailwind CSS
- Reset to defaults and cancel changes functionality
- Error handling for invalid image URLs

Technologies
------------

- Vue 3
- Tailwind CSS
- Vitest (Testing)
- Vite (Build Tool)

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
