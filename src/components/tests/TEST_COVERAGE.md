# Test Coverage Overview

## Test Cases in `bannerform.spec.js`

| Test Case | Description |
|-----------|-------------|
| **Renders with default values** | Verifies initial state with default text, colors, opacities, and image |
| **Toggles settings form** | Tests form visibility when button is clicked |
| **Updates banner properties** | Validates all form inputs (text, colors, opacities, URL) updates the banner and saves to localStorage |
| **Handles image upload** | Ensures file uploads update the banner image |
| **Shows URL error** | Checks invalid URL validation displays error message |
| **Resets inputs on cancel** | Confirms form inputs reset without saving changes |
| **Resets to defaults** | Tests reset button clears localStorage and restores defaults |
| **Stops wiggle animation** | Verifies animation classes are removed after first click |
| **Loads saved settings** | Ensures localStorage settings are applied on component mount |

## Key Tested Functionalities

1. **State Management**
   - Default values initialization
   - Form input binding
   - LocalStorage synchronization

2. **User Interactions**
   - Form submission/cancellation
   - File upload handling
   - Range slider operations

3. **Error Handling**
   - Invalid URL detection
   - Image loading failures

4. **UI Behavior**
   - CSS class transitions
   - Animation triggers
   - Responsive layout

## Coverage Report
Run `npm run coverage` to generate detailed coverage reports, including:
- Lines covered
- Branches tested
- Uncovered code paths
