import { ToolDefinition } from './get_time';

async function testTool() {
  console.log('Testing tool: get_time');
  try {
    const result = await ToolDefinition.execute();
    console.log('Result:', result);
    
    // Check if it's a valid ISO string
    const date = new Date(result);
    if (isNaN(date.getTime())) {
      throw new Error('Result is not a valid date');
    }
    
    console.log('Test Passed!');
  } catch (error) {
    console.error('Test Failed:', error);
    process.exit(1);
  }
}

testTool();
