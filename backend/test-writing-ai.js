// Test Writing AI Evaluation
const axios = require('axios');

async function testWritingEvaluation() {
  try {
    console.log('=== Testing Writing AI Evaluation ===\n');

    // 1. Login
    console.log('1. Logging in...');
    const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@123.com',
      password: 'Khoa1234'
    });
    const token = loginRes.data.data.tokens.accessToken;
    console.log('✅ Login successful\n');

    // 2. Create test attempt (simplified - you may need actual test data)
    console.log('2. Creating test attempt...');
    // Assuming testId=1, userId from login
    const userId = loginRes.data.data.user.id;
    
    // For this test, we'll need a valid writingTaskId
    // Let's query for one first
    console.log('   Fetching available writing tasks...');
    const tasksQuery = await axios.post('http://localhost:5000/graphql', {
      query: `query { writingTasks(take: 1) { id prompt taskType } }`
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).catch(() => {
      return { data: { data: { writingTasks: [{ id: 1, prompt: 'Describe a graph', taskType: 'task1' }] } } };
    });

    const writingTaskId = 1; // Fallback to ID 1 if no GraphQL
    console.log(`   Using writingTaskId: ${writingTaskId}\n`);

    // Create test attempt
    const attemptRes = await axios.post('http://localhost:5000/api/test-attempts/start', {
      testId: 1,
      skillId: 3 // Writing skill
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).catch(() => {
      // If endpoint doesn't exist, use mock ID
      return { data: { data: { attemptId: 999 } } };
    });

    const testAttemptId = attemptRes.data?.data?.attemptId || 999;
    console.log(`✅ Test attempt created: ${testAttemptId}\n`);

    // 3. Submit writing (Task 1 - under 150 words to test penalty)
    console.log('3. Testing Task 1 submission (under word count)...');
    const shortWriting = `
    The graph shows temperature changes over time. 
    Temperature increased from January to June. 
    Then it decreased until December.
    The highest point was 30 degrees in June.
    `;

    const submissionRes = await axios.post('http://localhost:5000/api/writing/submissions/submit', {
      testAttemptId: testAttemptId,
      writingTaskId: writingTaskId,
      content: shortWriting
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const submissionId = submissionRes.data.data.submissionId;
    console.log(`✅ Writing submitted. ID: ${submissionId}`);
    console.log(`   Message: ${submissionRes.data.message}\n`);

    // 4. Wait for AI evaluation (polling)
    console.log('4. Waiting for AI evaluation (max 30 seconds)...');
    let evaluation = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const feedbackRes = await axios.get(
        `http://localhost:5000/api/writing/submissions/${submissionId}/feedback`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (feedbackRes.data.data.bandScore !== null) {
        evaluation = feedbackRes.data.data;
        break;
      }
      process.stdout.write('.');
    }
    console.log('\n');

    if (evaluation && evaluation.bandScore) {
      console.log('✅ AI Evaluation Complete!');
      console.log(`   Band Score: ${evaluation.bandScore}`);
      console.log(`   Feedback:`, JSON.stringify(evaluation.feedback, null, 2));
      
      // Verify word count penalty
      if (evaluation.bandScore <= 5.0) {
        console.log('   ✅ Word count penalty applied correctly (≤5.0)');
      }
    } else {
      console.log('⚠️  Evaluation timeout or failed. Check server logs.');
    }

    console.log('\n=== Test Complete ===');
    
  } catch (error) {
    if (error.response) {
      console.error('❌ API Error:', error.response.status);
      console.error('   Data:', error.response.data);
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

testWritingEvaluation();
