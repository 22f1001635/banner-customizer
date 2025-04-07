import { expect } from 'vitest'
import * as jestDomMatchers from '@testing-library/jest-dom/matchers'

expect.extend(jestDomMatchers)

import '../src/assets/main.css'
