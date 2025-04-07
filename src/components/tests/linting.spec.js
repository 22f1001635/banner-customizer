import { execSync } from 'child_process'
import { describe, it } from 'vitest'

describe('Code Quality Checks', () => {
  it('should pass ESLint without errors or warnings', () => {
    try {
      const eslintCmd = 'npx eslint . --ext .vue,.js --max-warnings 0'
      console.log('Running ESLint check...')
      execSync(eslintCmd, { stdio: 'inherit' })
      console.log('ESLint check passed')
    } catch {
      throw new Error(`
        ESLint check failed.
        Run 'npm run lint' to see details and fix issues.
      `)
    }
  })

  it('should have no Prettier formatting issues', () => {
    try {
      const prettierCmd = 'npx prettier --check .'
      console.log('Running Prettier check...')
      execSync(prettierCmd, { stdio: 'inherit' })
      console.log('Prettier check passed')
    } catch {
      throw new Error(`
        Prettier check failed - files need formatting.
        Run 'npm run format' to automatically fix issues.
      `)
    }
  })
})
