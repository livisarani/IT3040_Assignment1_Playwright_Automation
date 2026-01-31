# Singlish to Sinhala Translator - Playwright Automation

This project contains automated end-to-end tests for the Singlish to Sinhala translator web application using Playwright.

##  Project Overview

This test suite automates the testing of [Swift Translator](https://www.swifttranslator.com/), a web-based Singlish to Sinhala translation tool. The tests validate various functional scenarios including positive test cases, negative test cases, and UI behavior.

##  Test Coverage

### Test Categories

- **Positive Functional Tests (24 cases)**: Validate core translation functionality
  - Simple/complex sentences (present, past, future tenses)
  - Questions, commands, negations
  - Mixed English-Sinhala content
  - Special characters, punctuation, dates, numbers
  - Place names, greetings, abbreviations

- **Negative/Robustness Tests (10 cases)**: Test edge cases and error handling
  - URLs and email addresses
  - Special symbols and HTML tags
  - Malformed input (typos, mixed case, nonsense words)
  - Number mixing and vowel repetition

- **UI Tests (1 case)**: Validate real-time user interface behavior

**Total Test Cases**: 35

##  Technology Stack

- **Node.js** (v18+)
- **Playwright** (v1.58.0)
- **TypeScript**
- **Test Framework**: Playwright Test

##  Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd C:\MAD\HealthBuddy\HealthBuddy\IT3040_Assignment1_Playwright_Automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

##  Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run tests in a specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run a specific test file
```bash
npx playwright test tests/singlishTranslator.spec.ts
```

### Run tests with specific test ID
```bash
npx playwright test -g "Pos_Fun_0001"
```

### Debug mode
```bash
npx playwright test --debug
```

##  Viewing Test Reports

After running tests, an HTML report is automatically generated.

### Open the report
```bash
npx playwright show-report
```

The report will open in your default browser and display:
- Test execution summary
- Pass/fail status for each test
- Error details with screenshots
- Execution time and traces

##  Project Structure

```
IT3040_Assignment1_Playwright_Automation/
├── tests/
│   └── singlishTranslator.spec.ts    # Main test file with all test cases
├── test-results/                      # Test execution artifacts (auto-generated)
├── playwright-report/                 # HTML report (auto-generated)
├── playwright.config.ts               # Playwright configuration
├── package.json                       # Project dependencies
└── README.md                          # This file
```

##  Configuration

The test configuration is defined in [playwright.config.ts](playwright.config.ts):

- **Browsers**: Tests run on Chromium, Firefox, and WebKit
- **Parallel execution**: Tests run in parallel for faster execution
- **Timeout**: Default timeout configured per test
- **Reporters**: HTML reporter for detailed test results
- **Screenshots**: Captured on test failure
- **Traces**: Captured on first retry

##  Test Case Structure

Each test case includes:
- **ID**: Unique identifier (e.g., `Pos_Fun_0001`)
- **Description**: What the test validates
- **Input**: Singlish text to be translated
- **Expected Keywords**: Sinhala words expected in the output

Example:
```typescript
{
  id: 'Pos_Fun_0001',
  description: 'Simple present sentence with multiple spaces',
  input: 'malli   sindhu   kiyanavaa.',
  expectedKeywords: ['මල්ලි', 'සින්දු', 'කියනවා']
}
```

##  Test Strategy

1. **Navigation**: Open the Swift Translator website
2. **Input**: Clear textarea and enter Singlish text
3. **Wait**: Allow time for automatic translation (2.5s)
4. **Extraction**: Locate and extract Sinhala output
5. **Assertion**: Verify expected keywords appear in output using soft assertions
6. **Logging**: Console output for debugging

##  Test Results

Current test execution results:
- **Total Tests**: 105 (35 tests × 3 browsers)
- **Passed**: 60
- **Failed**: 45
- **Duration**: ~2.2 minutes

##  Known Issues

Some tests may fail due to:
- Translation variations in the target application
- Timing issues with dynamic content loading
- Output format changes in the translator UI

##  Contributing

To add new test cases:

1. Add test case object to `testCases` array in [tests/singlishTranslator.spec.ts](tests/singlishTranslator.spec.ts)
2. Include `id`, `description`, `input`, and `expectedKeywords`
3. Run tests to verify
4. Update this README if needed

##  License

This project is for educational purposes as part of IT3040 Assignment 1.

##  Author

Created for Mobile Application Development (MAD) course

---

**Last Updated**: January 31, 2026
