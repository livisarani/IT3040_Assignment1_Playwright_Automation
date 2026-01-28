import { test, expect, Page } from '@playwright/test';

// 1. Define all Test Cases from your CSV/Excel file
const testCases = [
  // --- POSITIVE FUNCTIONAL TESTS ---
  {
    id: 'Pos_Fun_0001',
    description: 'Simple present sentence with multiple spaces',
    input: 'malli   sindhu   kiyanavaa.',
    expectedKeywords: ['මල්ලි', 'සින්දු', 'කියනවා'] 
  },
  {
    id: 'Pos_Fun_0002',
    description: 'Compound sentence (Conjunction)',
    input: 'mata thibaha nisaa mama wathura bonavaa.',
    expectedKeywords: ['මට', 'තිබහ', 'නිසා', 'බොනවා'] 
  },
  {
    id: 'Pos_Fun_0003',
    description: 'Complex sentence (If condition)',
    input: 'oyaa paadam kaloth oyaa pass wei.',
    expectedKeywords: ['ඔයා', 'පාඩම්', 'කලොත්', 'pass']
  },
  {
    id: 'Pos_Fun_0004',
    description: 'Interrogative (Question)',
    input: 'oyaagea gama kohedha?',
    expectedKeywords: ['ඔයාගේ', 'ගම', 'කොහෙද']
  },
  {
    id: 'Pos_Fun_0005',
    description: 'Imperative (Command)',
    input: 'dhoraval vahanna.',
    expectedKeywords: ['දොරවල්', 'වහන්න']
  },
  {
    id: 'Pos_Fun_0006',
    description: 'Past tense usage',
    input: 'nangi pereedhaa guvan thotupalata giyaa.',
    expectedKeywords: ['නන්ගි', 'පෙරේදා', 'ගුවන්', 'තොටුපලට', 'ගියා']
  },
  {
    id: 'Pos_Fun_0007',
    description: 'Future tense usage',
    input: 'api labana sathiye trip ekak yamu.',
    expectedKeywords: ['අපි', 'ලබන', 'සතියෙ', 'trip', 'එකක්']
  },
  {
    id: 'Pos_Fun_0008',
    description: 'Negation (Negative form)',
    input: 'mama salli illanne naee.',
    expectedKeywords: ['මම', 'සල්ලි', 'ඉල්ලන්නෙ', 'නෑ']
  },
  {
    id: 'Pos_Fun_0009',
    description: 'Plural form',
    input: 'lamayi sellam karanavaa.',
    expectedKeywords: ['ලමයි', 'සෙල්ලම්', 'කරනවා']
  },
  {
    id: 'Pos_Fun_0010',
    description: 'Polite Request',
    input: 'karunakara mata pen eka dhenawada?',
    expectedKeywords: ['කරුනකර', 'මට', 'pen', 'එක']
  },
  {
    id: 'Pos_Fun_0011',
    description: 'Informal Slang',
    input: 'ado mata call ekak deepan.',
    expectedKeywords: ['ado', 'මට', 'call', 'එකක්']
  },
  {
    id: 'Pos_Fun_0012',
    description: 'Mixed English technical terms',
    input: 'mama Discord server eka haedhuvaa..',
    expectedKeywords: ['මම', 'Discord', 'server', 'එක', 'හැදුවා']
  },
  {
    id: 'Pos_Fun_0013',
    description: 'Common English words & Time',
    input: 'mata bus eke yanna baee dhaen velava 8.00 AM.',
    expectedKeywords: ['මට', 'bus', 'eke', 'යන්න', 'බෑ', '8.00 AM']
  },
  {
    id: 'Pos_Fun_0014',
    description: 'Date handling',
    input: 'mama upannee 1999-12-05 venidhaa.',
    expectedKeywords: ['මම', 'උපන්නේ', '1999-12-05', 'වෙනිදා']
  },
  {
    id: 'Pos_Fun_0015',
    description: 'Currency handling',
    input: 'ticket eka Rs. 2500 yi.',
    expectedKeywords: ['ticket', 'එක', 'Rs.', '2500', 'යි']
  },
  {
    id: 'Pos_Fun_0016',
    description: 'Abbreviation handling',
    input: 'mata OTP eka laebunaa.',
    expectedKeywords: ['මට', 'OTP', 'එක', 'ලැබුනා']
  },
  {
    id: 'Pos_Fun_0017',
    description: 'Punctuation marks',
    input: 'oyaa, mama, saha eyaa (api thundhenaa) yamu.',
    expectedKeywords: ['ඔයා,', 'මම,', 'සහ', 'එයා', '(අපි', 'තුන්දෙනා)', 'යමු']
  },
  {
    id: 'Pos_Fun_0018',
    description: 'Missing spaces (Robustness)',
    input: 'apikadetaayemu',
    expectedKeywords: ['අපිකඩෙටායෙමු'] // Actual translator output
  },
  {
    id: 'Pos_Fun_0019',
    description: 'Place names',
    input: 'api Jaffna wala library ekata giyaa.',
    expectedKeywords: ['අපි', 'Jaffna', 'library', 'එකට', 'ගියා']
  },
  {
    id: 'Pos_Fun_0020',
    description: 'Repeated emphasis',
    input: 'poddak poddak inna.',
    expectedKeywords: ['පොඩ්ඩක්', 'පොඩ්ඩක්', 'ඉන්න']
  },
  {
    id: 'Pos_Fun_0021',
    description: 'Long Paragraph',
    input: 'Pariganaka vidyaava yanu thaththu haa gananaya kireem pilibanda vidyaavaki.',
    expectedKeywords: ['විඩ්යාව', 'යනු', 'තත්තු', 'හා', 'ගනනය']
  },
  {
    id: 'Pos_Fun_0022',
    description: 'Formatting Line Breaks & Units',
    input: 'list eka: \n1. paan \n2. seeni 2kg',
    expectedKeywords: ['list', 'එක:', 'පාන්', 'සේනි', '2kg']
  },
  {
    id: 'Pos_Fun_0023',
    description: 'Greetings',
    input: 'suba saendhaevak yaaluvanea.',
    expectedKeywords: ['සුබ', 'සැන්දැවක්']
  },
  {
    id: 'Pos_Fun_0024',
    description: 'Pronoun (You)',
    input: 'oyaata monavadha oone?',
    expectedKeywords: ['ඔයාට', 'මොනවද', 'ඕනෙ']
  },

  // --- NEGATIVE / ROBUSTNESS TESTS ---
  {
    id: 'Neg_Fun_0001',
    description: 'URL mix failure',
    input: 'mage website eka http://lavanya.com balanna.',
    expectedKeywords: ['mage', 'website', 'http://lavanya.com'] // Expecting it NOT to break structure
  },
  {
    id: 'Neg_Fun_0002',
    description: 'Special Symbol Overload',
    input: 'mata $$$onee &*^%.',
    expectedKeywords: ['mata', '$$$onee'] // Checking if it handles robustness
  },
  {
    id: 'Neg_Fun_0003',
    description: 'Number mixed in word',
    input: 'ge3dhara yamu.',
    expectedKeywords: ['ගෙදර', 'යමු']
  },
  {
    id: 'Neg_Fun_0004',
    description: 'English Typos',
    input: 'mama laptopp eka on kalaa.',
    expectedKeywords: ['මම', 'laptopp', 'on', 'කලා']
  },
  {
    id: 'Neg_Fun_0005',
    description: 'Email address',
    input: 'contact: lavanya@jay.com',
    expectedKeywords: ['contact:', 'lavanya@jay.com']
  },
  {
    id: 'Neg_Fun_0006',
    description: 'Long vowel repetition',
    input: 'kohedha yanneeeee',
    expectedKeywords: ['කොහෙද', 'යන්නේඊඊඊ']
  },
  {
    id: 'Neg_Fun_0007',
    description: 'HTML Tag Injection',
    input: '<h1>Header</h1> eka loku wadi.',
    expectedKeywords: ['<h1>Header</h1>', 'එක', 'ලොකු', 'වැඩි']
  },
  {
    id: 'Neg_Fun_0008',
    description: 'Mixed Case formatting',
    input: 'mAmA kAdEta gIyA',
    expectedKeywords: ['මාමා', 'කඩේට', 'ගියා']
  },
  {
    id: 'Neg_Fun_0009',
    description: 'Double underscore',
    input: 'fill this __ blank.',
    expectedKeywords: ['fill', 'this', '__', 'blank.']
  },
  {
    id: 'Neg_Fun_0010',
    description: 'Non-existent nonsense word',
    input: 'qwertyuiopasdfghjkl',
    expectedKeywords: ['qwertyuiopasdfghjkl'] // Robustness: should typically remain English or nonsense
  }
];

// 2. Loop through all Functional Test Cases
test.describe('Assignment 1: Singlish to Sinhala Automation', () => {

  for (const tc of testCases) {
    test(`${tc.id} - ${tc.description}`, async ({ page }: { page: Page }) => {
      await page.goto('https://www.swifttranslator.com/');

      // Clear existing text if any (safety step)
      await page.fill('textarea', '');

      // Enter Singlish text
      await page.fill('textarea', tc.input);

      // Wait a moment for auto-conversion
      await page.waitForTimeout(2500); // Increased slightly for robustness

      let output = '';
      
      // Try to find the Sinhala output area more precisely
      // Look for generic elements that contain "Sinhala" label and extract the text after it
      const sinhalaSection = page.locator('div').filter({ hasText: /^Sinhala$/ }).first();
      
      if (await sinhalaSection.count() > 0) {
        // Get the parent or sibling element that contains the actual output
        const parent = sinhalaSection.locator('..').first();
        const fullText = await parent.textContent();
        
        if (fullText) {
          // Extract text after "Sinhala" label
          const sinhalaIndex = fullText.indexOf('Sinhala');
          if (sinhalaIndex !== -1) {
            const textAfterLabel = fullText.substring(sinhalaIndex + 7).trim();
            // Remove button text like "Copy", "Clear" that might be included
            output = textAfterLabel.replace(/Copy|Clear|🗑️/g, '').trim();
          }
        }
      }
      
      if (!output && tc.expectedKeywords.length > 0) {
        const searchKey = tc.expectedKeywords[0];
        const candidates = await page.locator('generic').filter({ hasText: searchKey }).all();
        
        for (const el of candidates) {
          const text = await el.textContent();
          if (text && text.includes(searchKey) && !text.includes('Singlish') && text.length < 500) {
            output = text.trim();
            break;
          }
        }
      }

      // If still empty, try generic extraction from body (for negative tests)
      if (!output) {
        output = await page.locator('body').innerText();
      }

      console.log(`[${tc.id}] Input: "${tc.input}" | Output Found: "${output.substring(0, 50)}..."`);

      // ✅ Assertions
      for (const keyword of tc.expectedKeywords) {
        await expect.soft(output).toContain(keyword);
      }
    });
  }

  // 3. UI Test Case: Real-time Output
  test('Pos_UI_0001 - Real-time typing updates', async ({ page }: { page: Page }) => {
    await page.goto('https://www.swifttranslator.com/');

    const input = 'lassanayi';
    const expected = 'ලස්සනයි';

    // Type character by character to simulate user typing
    await page.locator('textarea').pressSequentially(input, { delay: 200 });

    // Wait briefly for the UI to update
    await page.waitForTimeout(1000);

    // Verify the output exists on the page
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toContain(expected);
  });

});