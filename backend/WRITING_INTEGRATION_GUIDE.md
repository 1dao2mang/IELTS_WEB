# Writing AI Evaluation - Frontend Integration Guide

## 📋 Tổng quan

Hệ thống Writing AI tự động chấm điểm IELTS Writing với 4 tiêu chí:
- **Task Achievement/Response** (25%)
- **Coherence & Cohesion** (25%) 
- **Lexical Resource** (25%)
- **Grammatical Range & Accuracy** (25%)

**Band Score**: 0-9 (increments 0.5)

---

## 🔌 API Endpoints

### 1. Submit Writing

**POST** `/api/writing/submissions/submit`

**Headers**:
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request Body**:
```json
{
  "testAttemptId": 123,
  "writingTaskId": 45,
  "content": "My writing essay content here..."
}
```

**Response** (Immediate):
```json
{
  "success": true,
  "message": "Writing submitted successfully. AI evaluation in progress...",
  "data": {
    "submissionId": 789
  }
}
```

**Note**: Response trả về ngay lập tức. AI evaluation chạy async trong background (~3-10 giây).

---

### 2. Get Evaluation Result

**GET** `/api/writing/submissions/:submissionId/feedback`

**Headers**:
```
Authorization: Bearer {accessToken}
```

**Response** (Đang chấm):
```json
{
  "success": true,
  "data": {
    "feedback": "Evaluation in progress...",
    "bandScore": null
  }
}
```

**Response** (Hoàn thành):
```json
{
  "success": true,
  "data": {
    "bandScore": 6.5,
    "feedback": {
      "scores": {
        "overall": 6.5,
        "taskAchievement": 6,
        "coherence": 7,
        "lexical": 6.5,
        "grammar": 6
      },
      "feedback": {
        "strengths": [
          "Clear task response with relevant examples",
          "Good use of cohesive devices"
        ],
        "improvements": [
          "Need more complex sentence structures",
          "Some minor grammatical errors"
        ],
        "suggestions": [
          "Practice using conditionals and passive voice",
          "Proofread for subject-verb agreement"
        ]
      }
    }
  }
}
```

---

## 🎨 UI Implementation

### Flow Diagram

```
[User writes essay] 
    ↓
[Click Submit Button]
    ↓
[POST /submissions/submit] → Show "Submitting..." loader
    ↓
[Response: submissionId] → Navigate to Results page
    ↓
[Poll GET /feedback every 2s] → Show "AI đang chấm điểm..." animation
    ↓
[bandScore !== null] → Display results
```

---

### Code Example (React/TypeScript)

#### 1. Submit Writing

```typescript
interface SubmitWritingRequest {
  testAttemptId: number;
  writingTaskId: number;
  content: string;
}

interface SubmitWritingResponse {
  success: boolean;
  message: string;
  data: {
    submissionId: number;
  };
}

const submitWriting = async (data: SubmitWritingRequest): Promise<number> => {
  const response = await fetch('/api/writing/submissions/submit', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result: SubmitWritingResponse = await response.json();
  
  if (!result.success) {
    throw new Error('Submission failed');
  }

  return result.data.submissionId;
};
```

#### 2. Poll for Evaluation

```typescript
interface EvaluationResult {
  bandScore: number | null;
  feedback: {
    scores: {
      overall: number;
      taskAchievement: number;
      coherence: number;
      lexical: number;
      grammar: number;
    };
    feedback: {
      strengths: string[];
      improvements: string[];
      suggestions: string[];
    };
  } | string;
}

const pollEvaluation = async (
  submissionId: number,
  onUpdate: (result: EvaluationResult) => void
): Promise<void> => {
  const maxAttempts = 30; // 30 attempts × 2s = 60s max
  let attempts = 0;

  const poll = async () => {
    try {
      const response = await fetch(
        `/api/writing/submissions/${submissionId}/feedback`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      const result = await response.json();
      const evaluation: EvaluationResult = result.data;

      onUpdate(evaluation);

      // Check if evaluation is complete
      if (evaluation.bandScore !== null) {
        return; // Done!
      }

      // Continue polling
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(poll, 2000); // Poll every 2 seconds
      } else {
        console.error('Evaluation timeout');
        onUpdate({
          bandScore: null,
          feedback: 'Evaluation timeout. Please try again later.'
        });
      }
    } catch (error) {
      console.error('Polling error:', error);
    }
  };

  poll();
};
```

#### 3. React Component Example

```tsx
import { useState, useEffect } from 'react';

const WritingResultPage = ({ submissionId }: { submissionId: number }) => {
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pollEvaluation(submissionId, (result) => {
      setEvaluation(result);
      if (result.bandScore !== null) {
        setLoading(false);
      }
    });
  }, [submissionId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>🤖 AI đang chấm điểm bài viết của bạn...</p>
        <p className="text-sm">Vui lòng đợi 5-10 giây</p>
      </div>
    );
  }

  if (!evaluation || typeof evaluation.feedback === 'string') {
    return <div className="error">{evaluation?.feedback || 'Error'}</div>;
  }

  return (
    <div className="results-container">
      <h2>📊 Kết quả chấm điểm</h2>
      
      {/* Overall Score */}
      <div className="overall-score">
        <h1>{evaluation.feedback.scores.overall}</h1>
        <p>IELTS Band Score</p>
      </div>

      {/* Detailed Scores */}
      <div className="detailed-scores">
        <ScoreBar 
          label="Task Achievement" 
          score={evaluation.feedback.scores.taskAchievement} 
        />
        <ScoreBar 
          label="Coherence & Cohesion" 
          score={evaluation.feedback.scores.coherence} 
        />
        <ScoreBar 
          label="Lexical Resource" 
          score={evaluation.feedback.scores.lexical} 
        />
        <ScoreBar 
          label="Grammar" 
          score={evaluation.feedback.scores.grammar} 
        />
      </div>

      {/* Feedback */}
      <div className="feedback-section">
        <h3>✅ Điểm mạnh</h3>
        <ul>
          {evaluation.feedback.feedback.strengths.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <h3>⚠️ Cần cải thiện</h3>
        <ul>
          {evaluation.feedback.feedback.improvements.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <h3>💡 Gợi ý</h3>
        <ul>
          {evaluation.feedback.feedback.suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
```

---

## 🎯 Best Practices

### 1. Word Count Display

Hiển thị word count realtime khi user đang viết:

```typescript
const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
};

// In component:
const [content, setContent] = useState('');
const wordCount = countWords(content);
const minWords = taskType === 'task1' ? 150 : 250;

<div className="word-counter">
  {wordCount}/{minWords} words
  {wordCount < minWords && <span className="warning">⚠️ Under minimum</span>}
</div>
```

### 2. Disable Submit if Under Word Count

```typescript
<button 
  disabled={wordCount < minWords}
  onClick={handleSubmit}
>
  Submit Writing
</button>
```

### 3. Loading States

- **Submitting**: "Đang nộp bài..."
- **Evaluating**: "AI đang chấm điểm..." (với animation)
- **Complete**: Hiển thị kết quả

### 4. Error Handling

```typescript
try {
  const submissionId = await submitWriting(data);
  navigate(`/writing/results/${submissionId}`);
} catch (error) {
  toast.error('Failed to submit writing. Please try again.');
}
```

---

## 📊 UI Design Suggestions

### Score Visualization

```
Overall Band: [    6.5    ]  ← Large, prominent

Detailed Scores:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Task Response      [6.0] ████████░░
Coherence          [7.0] █████████░
Lexical            [6.5] ████████▓░
Grammar            [6.0] ████████░░
```

### Feedback Cards

```
┌─────────────────────────────┐
│ ✅ Strengths                │
│ • Clear introduction         │
│ • Good examples              │
└─────────────────────────────┘

┌─────────────────────────────┐
│ ⚠️  Need Improvement         │
│ • Use more complex sentences │
│ • Check grammar              │
└─────────────────────────────┘
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Evaluation takes too long
**Solution**: Set timeout 60s, show "Please try again" if timeout

### Issue 2: User refreshes page during evaluation
**Solution**: Store submissionId in localStorage, resume polling on page load

### Issue 3: Multiple submissions
**Solution**: Disable submit button after first click, clear only after success/error

---

## 🚀 Deployment Checklist

- [ ] Update `.env` với Gemini API keys
- [ ] Test Task 1 evaluation (min 150 words)
- [ ] Test Task 2 evaluation (min 250 words)
- [ ] Test under word count penalty
- [ ] Test error handling (no API key, timeout, etc.)
- [ ] UI displays all 4 scores correctly
- [ ] Feedback is readable and actionable
- [ ] Mobile responsive design

---

## 📞 Support

**Backend Logs**:
```
🤖 Starting AI evaluation for submission 123...
✅ AI evaluation completed for submission 123. Band: 6.5
```

**Error Logs**:
```
❌ AI evaluation failed for submission 123: Quota exceeded
```

Check server console for these messages to debug issues.
