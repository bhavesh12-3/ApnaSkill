// AI Diagnostic and Recommendation Engine for ApnaSkill

export function analyzeAssessment(answers, questions) {
  const categoryScores = {};
  const categoryCounts = {};
  const skillScores = {};
  let totalScore = 0;
  let maxPossibleScore = 0;

  questions.forEach((q) => {
    const selectedOption = answers[q.id];
    const isCorrect = selectedOption === q.correctIndex;
    const cat = q.category || 'General';

    if (!categoryScores[cat]) {
      categoryScores[cat] = 0;
      categoryCounts[cat] = 0;
    }
    categoryCounts[cat] += 1;

    if (isCorrect) {
      categoryScores[cat] += 1;
      totalScore += 1;
    }
    maxPossibleScore += 1;

    // Attribute skill weights
    if (q.skillWeight) {
      Object.entries(q.skillWeight).forEach(([skill, weight]) => {
        if (!skillScores[skill]) skillScores[skill] = { earned: 0, total: 0 };
        skillScores[skill].total += weight;
        if (isCorrect) {
          skillScores[skill].earned += weight;
        }
      });
    }
  });

  const percentage = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 74;

  const skillProfile = Object.entries(skillScores).map(([skill, val]) => ({
    name: skill,
    score: Math.round((val.earned / val.total) * 100)
  }));

  // Sort into strengths vs needs improvement
  const sortedSkills = [...skillProfile].sort((a, b) => b.score - a.score);
  const strengths = sortedSkills.filter(s => s.score >= 65).map(s => ({
    name: s.name,
    score: s.score,
    tag: 'Demonstrated Aptitude'
  }));
  const needsImprovement = sortedSkills.filter(s => s.score < 65).map(s => ({
    name: s.name,
    score: s.score,
    tag: s.score < 50 ? 'Immediate High-Yield Gap' : 'Growth Area'
  }));

  return {
    overallScore: percentage,
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    strengths,
    needsImprovement,
    skillProfile
  };
}

export function generateCourseRecommendations(assessmentResult, publishedCourses, studentClass = '9th–10th') {
  if (!assessmentResult || !publishedCourses) return [];

  const availableCourses = publishedCourses.filter(c => c.status === 'published');
  const gapsList = assessmentResult.academicGaps || assessmentResult.needsImprovement || [];
  const strengthsList = assessmentResult.strengths || [];

  const lowestSkillNames = gapsList.map(n => n.name.toLowerCase());
  const highestSkillNames = strengthsList.map(s => s.name.toLowerCase());

  return availableCourses.map((course) => {
    let matchScore = 70;
    let reasons = [];

    const courseSkills = (course.skills || []).map(s => s.toLowerCase());
    const courseCat = (course.category || '').toLowerCase();

    const addressesGap = courseSkills.some(s => lowestSkillNames.some(gap => gap.includes(s) || s.includes(gap))) ||
                         lowestSkillNames.some(gap => gap.includes(courseCat) || courseCat.includes(gap));
    if (addressesGap) {
      matchScore += 18;
      reasons.push(`Targeted to directly bridge your identified learning gap in ${course.category}.`);
    }

    const alignsStrength = courseSkills.some(s => highestSkillNames.some(str => str.includes(s) || s.includes(str)));
    if (alignsStrength) {
      matchScore += 10;
      reasons.push(`Capitalizes on your proven baseline logic.`);
    }

    if (course.isHighDemand) {
      matchScore += 5;
    }

    if (course.targetClass === studentClass || course.targetClass === 'All') {
      matchScore += 8;
      reasons.push(`Tailored specifically for ${studentClass} learners.`);
    }

    const finalMatch = Math.min(98, Math.max(68, matchScore));
    const finalReason = reasons.length > 0
      ? `Recommended with ${finalMatch}% match: ${reasons.join(' ')}`
      : `Recommended with ${finalMatch}% match based on your ${studentClass} learning profile and live mentor batch suitability.`;

    return {
      courseId: course.id,
      matchPercentage: finalMatch,
      reason: finalReason,
      course
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);
}

export function askApnaSkillAI(prompt, currentContext = {}) {
  const lower = prompt.toLowerCase();
  
  if (lower.includes('vlookup') || (lower.includes('excel') && lower.includes('lookup'))) {
    return {
      answer: `### Understanding Excel VLOOKUP in Simple Terms 📊

**VLOOKUP** stands for *Vertical Lookup*. Think of it like looking up a phone number in a contact directory where you know someone's **Name** (Lookup Value) and want to find their **Phone Number** (Result).

#### Syntax:
\`\`\`excel
=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
\`\`\`

#### The 4 Ingredients:
1. **\`lookup_value\`**: What you are searching for (e.g., Student ID \`A2\`).
2. **\`table_array\`**: The table range where the data lives (e.g., \`D2:G100\`). *Rule: Lookup value must always be in the first column!*
3. **\`col_index_num\`**: The column number from which to return data (e.g., \`3\` for Column F).
4. **\`[range_lookup]\`**: Put \`FALSE\` or \`0\` for an EXACT match.

> 💡 **Instructor Tip**: If you are using modern Excel or Google Sheets, ask our mentor about **\`=XLOOKUP()\`** which works in both left and right directions without column index errors!`,
      followUps: [
        "How do I fix the #N/A error in VLOOKUP?",
        "What is the difference between VLOOKUP and XLOOKUP?",
        "Show me how to create a Pivot Table from this data"
      ]
    };
  }

  if (lower.includes('python') || lower.includes('loop') || lower.includes('code')) {
    return {
      answer: `### Python For Loops: Clear Visual Explanation 🐍

A **for loop** is used to iterate over a sequence (like a list, tuple, dictionary, or string) and execute code for each item.

#### Example:
\`\`\`python
# Calculating total scores for student batch
scores = [78, 85, 92, 64, 88]
total = 0

for score in scores:
    total += score
    print(f"Adding score: {score}, Current Running Total: {total}")

average = total / len(scores)
print(f"Batch Average: {average:.1f}")
\`\`\`

#### Key Concept:
- **\`range(start, stop, step)\`** generates numbers on the fly:
\`\`\`python
for i in range(1, 6): # Prints 1, 2, 3, 4, 5
    print(f"Live Class Module {i}")
\`\`\``,
      followUps: [
        "What is a list comprehension in Python?",
        "How do functions and return statements work?",
        "How do I debug an IndexError?"
      ]
    };
  }

  if (lower.includes('hesitation') || lower.includes('speech') || lower.includes('speaking') || lower.includes('nervous')) {
    return {
      answer: `### 3-Step Routine to Overcome Speech Anxiety & Trembling 🎙️

Speech nervousness is a physiological reaction (adrenaline spike), not a lack of talent. Here is the routine our verbal coach teaches before every live speech:

1. **The 4-7-8 Breath Reset (60 Seconds Before Speaking)**:
   - Inhale deeply through your nose for 4 counts.
   - Hold gently for 7 counts (activates your vagus nerve and drops heart rate).
   - Exhale slowly through your mouth for 8 counts.

2. **The 3-Second Grounded Opening**:
   - Walk up, stand tall with feet shoulder-width apart.
   - Do NOT start speaking immediately. Smile, make eye contact with 2 people, pause for 3 seconds, then deliver your prepared opening Hook.

3. **Hook-Story-Impact Formula**:
   - **Hook (10s)**: A surprising question or vivid statistic.
   - **Story (45s)**: A concrete, relatable example.
   - **Impact (15s)**: A punchy call-to-action or moral.`,
      followUps: [
        "How do I eliminate filler words like 'umm' and 'like'?",
        "How should I structure a 2-minute school debate speech?",
        "What body language habits project instant confidence?"
      ]
    };
  }

  // Default intelligent assistant response
  return {
    answer: `### ApnaSkill Learning Assistant 💡

I can help clarify concepts, explain programming syntax, structure speeches, or recommend live practice exercises.

#### Ask me about:
- **Excel & Analytics**: VLOOKUP, Pivot Tables, IF conditions, Financial Formulas, Dashboard design.
- **Programming (Python)**: Loops, Functions, Dictionaries, OOP, Problem-solving logic.
- **Communication & Speaking**: Stage fright exercises, Debate rebuttals, Presentation hooks, Viva preparation.
- **Aptitude & Math**: Vedic shortcuts, Series logic, Time & Work problems, Olympiad questions.

*What concept would you like to explore?*`,
    followUps: [
      "Explain Excel VLOOKUP step-by-step",
      "Give me 3 tips to speak confidently in public",
      "How do Python for loops work?"
    ]
  };
}
