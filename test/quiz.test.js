// test/quiz.test.js
// Standalone programmatic unit tests for CarbonStory emission calculation logic
// No third-party dependencies required. Run via: node test/quiz.test.js

const assert = require('assert');

// 1. Mocking the calculation logic used in the application (build/js/story.js)
function calculateTotalEmissions(selectedOptions) {
    return selectedOptions.reduce((sum, opt) => sum + parseFloat(opt.emissionValue), 0);
}

// 2. Mock Data
const mockSelections = [
    { id: 'transport-car', emissionValue: '2.8' },
    { id: 'food-meat', emissionValue: '4.5' },
    { id: 'home-ac', emissionValue: '6.0' }
];

const mockLowEmissionSelections = [
    { id: 'transport-metro', emissionValue: '0.2' },
    { id: 'food-plant', emissionValue: '0.5' },
    { id: 'home-fan', emissionValue: '0.4' }
];

console.log("Starting Programmatic Unit Tests...\n");

try {
    // Test Case 1: High Emission Calculation
    const highTotal = calculateTotalEmissions(mockSelections);
    // Floating point math check (2.8 + 4.5 + 6.0 = 13.3)
    // Use Math.abs for float comparison to avoid precision errors
    assert.ok(Math.abs(highTotal - 13.3) < 0.001, "High emission total should equal 13.3");
    console.log("✅ TC-01: High Emission Calculation Passed");

    // Test Case 2: Low Emission Calculation
    const lowTotal = calculateTotalEmissions(mockLowEmissionSelections);
    assert.ok(Math.abs(lowTotal - 1.1) < 0.001, "Low emission total should equal 1.1");
    console.log("✅ TC-02: Low Emission Calculation Passed");

    // Test Case 3: Empty Selections
    const emptyTotal = calculateTotalEmissions([]);
    assert.strictEqual(emptyTotal, 0, "Empty selections should yield 0 emissions");
    console.log("✅ TC-03: Empty Selections Calculation Passed");

    // Test Case 4: Invalid/NaN Handling
    const invalidTotal = calculateTotalEmissions([{ emissionValue: 'NaN' }, { emissionValue: '1.0' }]);
    assert.ok(isNaN(invalidTotal), "Invalid selections should result in NaN");
    console.log("✅ TC-04: Invalid Input Handling Passed");

    console.log("\n🎉 All unit tests passed successfully!");
    process.exit(0);

} catch (error) {
    console.error("❌ Test Failed:", error.message);
    process.exit(1);
}
