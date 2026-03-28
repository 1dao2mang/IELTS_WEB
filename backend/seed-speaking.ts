// Seed Speaking Topics and Prompts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedSpeakingData() {
  console.log('🌱 Seeding Speaking data...');

  // 1. Get speaking skill
  let speakingSkill = await prisma.skill.findFirst({
    where: { code: 'speaking' },
  });

  if (!speakingSkill) {
    speakingSkill = await prisma.skill.create({
      data: { code: 'speaking', name: 'Speaking' },
    });
  }

  console.log(`✅ Speaking skill ID: ${speakingSkill.id}`);

  // 2. Create topics and prompts
  const topicsData = [
    // PART 1 TOPICS
    {
      part: 1,
      title: 'Hometown',
      description: 'Questions about your hometown and where you grew up',
      prompts: [
        { text: 'Can you describe your hometown?', time: 45 },
        { text: 'What do you like most about your hometown?', time: 45 },
        { text: 'Has your hometown changed much in recent years?', time: 45 },
        { text: 'Would you like to live there in the future?', time: 45 },
      ],
    },
    {
      part: 1,
      title: 'Technology',
      description: 'Questions about technology and digital devices',
      prompts: [
        { text: 'Do you use technology a lot in your daily life?', time: 45 },
        { text: 'What is your favorite piece of technology?', time: 45 },
        { text: 'Do you think technology has improved our lives? Why or why not?', time: 45 },
        { text: 'How has technology changed the way people communicate?', time: 45 },
      ],
    },
    {
      part: 1,
      title: 'Food & Cooking',
      description: 'Questions about food preferences and cooking habits',
      prompts: [
        { text: 'What kind of food do you like to eat?', time: 45 },
        { text: 'Do you enjoy cooking? Why or why not?', time: 45 },
        { text: 'Is there any food you dislike?', time: 45 },
        { text: 'Do you prefer eating at home or in restaurants?', time: 45 },
      ],
    },
    {
      part: 1,
      title: 'Music',
      description: 'Questions about music preferences and listening habits',
      prompts: [
        { text: 'What kind of music do you like?', time: 45 },
        { text: 'Do you play any musical instruments?', time: 45 },
        { text: 'When do you usually listen to music?', time: 45 },
        { text: 'Has your taste in music changed over the years?', time: 45 },
      ],
    },
    {
      part: 1,
      title: 'Sports & Exercise',
      description: 'Questions about sports and physical activities',
      prompts: [
        { text: 'Do you like sports?', time: 45 },
        { text: 'What sports do you play or watch?', time: 45 },
        { text: 'How often do you exercise?', time: 45 },
        { text: 'Do you think exercise is important? Why?', time: 45 },
      ],
    },
    {
      part: 1,
      title: 'Social Media',
      description: 'Questions about social media usage and impact',
      prompts: [
        { text: 'Do you use social media? Which platforms?', time: 45 },
        { text: 'How much time do you spend on social media each day?', time: 45 },
        { text: 'What do you think are the advantages of social media?', time: 45 },
        { text: 'Are there any disadvantages to using social media?', time: 45 },
      ],
    },
    {
      part: 1,
      title: 'Travel',
      description: 'Questions about travel experiences and preferences',
      prompts: [
        { text: 'Do you like traveling?', time: 45 },
        { text: 'What places have you visited recently?', time: 45 },
        { text: 'Do you prefer traveling alone or with others?', time: 45 },
        { text: 'Where would you like to travel in the future?', time: 45 },
      ],
    },
    {
      part: 1,
      title: 'Reading',
      description: 'Questions about reading habits and preferences',
      prompts: [
        { text: 'Do you like reading?', time: 45 },
        { text: 'What kind of books do you prefer?', time: 45 },
        { text: 'How often do you read?', time: 45 },
        { text: 'Do you prefer reading physical books or e-books?', time: 45 },
      ],
    },
    {
      part: 1,
      title: 'Weather & Seasons',
      description: 'Questions about weather preferences and seasonal activities',
      prompts: [
        { text: 'What is the weather like in your country?', time: 45 },
        { text: 'Which season do you like best? Why?', time: 45 },
        { text: 'Does the weather affect your mood?', time: 45 },
        { text: 'What activities do you do in different seasons?', time: 45 },
      ],
    },
    {
      part: 1,
      title: 'Work/Study',
      description: 'Questions about work or study experiences',
      prompts: [
        { text: 'Do you work or are you a student?', time: 45 },
        { text: 'What do you study/do for work?', time: 45 },
        { text: 'Why did you choose this field?', time: 45 },
        { text: 'Do you enjoy your work/studies?', time: 45 },
      ],
    },
    {
      part: 1,
      title: 'Shopping',
      description: 'Questions about shopping habits and preferences',
      prompts: [
        { text: 'Do you like shopping?', time: 45 },
        { text: 'Do you prefer shopping online or in stores?', time: 45 },
        { text: 'What do you usually buy when you go shopping?', time: 45 },
        { text: 'How often do you go shopping?', time: 45 },
      ],
    },
    {
      part: 1,
      title: 'Friends & Family',
      description: 'Questions about relationships and social life',
      prompts: [
        { text: 'Do you have a large family?', time: 45 },
        { text: 'How much time do you spend with family?', time: 45 },
        { text: 'Who is your best friend?', time: 45 },
        { text: 'Do you prefer spending time with family or friends?', time: 45 },
      ],
    },

    // PART 2 TOPICS
    {
      part: 2,
      title: 'A Place You Have Visited',
      description: 'Describe a memorable place you traveled to',
      prompts: [
        {
          text: 'Describe a place you have visited that you particularly enjoyed. You should say: where it was, when you went there, what you did there, and explain why you enjoyed this place.',
          time: 120,
        },
      ],
    },
    {
      part: 2,
      title: 'A Person Who Influenced You',
      description: 'Talk about someone who had an impact on your life',
      prompts: [
        {
          text: 'Describe a person who has influenced you in your life. You should say: who this person is, how you know them, what influence they have had on you, and explain why they have been so influential.',
          time: 120,
        },
      ],
    },
    {
      part: 2,
      title: 'A Memorable Event',
      description: 'Describe an important event in your life',
      prompts: [
        {
          text: 'Describe a memorable event in your life. You should say: what the event was, when and where it happened, who was involved, and explain why this event was memorable for you.',
          time: 120,
        },
      ],
    },
    {
      part: 2,
      title: 'A Skill You Would Like to Learn',
      description: 'Talk about a skill you want to acquire',
      prompts: [
        {
          text: 'Describe a skill you would like to learn. You should say: what the skill is, why you want to learn it, how you plan to learn it, and explain how this skill would be useful for you.',
          time: 120,
        },
      ],
    },
    {
      part: 2,
      title: 'Your Favorite Book or Film',
      description: 'Describe a book or film you enjoyed',
      prompts: [
        {
          text: 'Describe your favorite book or film. You should say: what it is about, when you first read/watched it, why you like it, and explain what impact it has had on you.',
          time: 120,
        },
      ],
    },

    // PART 3 TOPICS
    {
      part: 3,
      title: 'Education System',
      description: 'Discussion about education and learning',
      prompts: [
        { text: 'How has education changed in your country over the past few decades?', time: 60 },
        { text: 'Do you think online education is as effective as traditional classroom learning?', time: 60 },
        { text: 'What role should technology play in modern education?', time: 60 },
        { text: 'Should universities focus more on practical skills or academic knowledge?', time: 60 },
      ],
    },
    {
      part: 3,
      title: 'Environmental Issues',
      description: 'Discussion about environment and sustainability',
      prompts: [
        { text: 'What do you think are the biggest environmental challenges facing the world today?', time: 60 },
        { text: 'Should governments or individuals take more responsibility for protecting the environment?', time: 60 },
        { text: 'How can technology help solve environmental problems?', time: 60 },
        { text: 'Do you think future generations will face more severe environmental issues?', time: 60 },
      ],
    },
    {
      part: 3,
      title: 'Work-Life Balance',
      description: 'Discussion about modern work culture',
      prompts: [
        { text: 'Is it becoming harder for people to achieve work-life balance in modern society?', time: 60 },
        { text: 'What are the consequences of poor work-life balance?', time: 60 },
        { text: 'Should companies be responsible for ensuring their employees have good work-life balance?', time: 60 },
        { text: 'How has remote work affected work-life balance?', time: 60 },
      ],
    },
  ];

  let totalTopics = 0;
  let totalPrompts = 0;

  for (const topicData of topicsData) {
    const topic = await prisma.speakingTopic.create({
      data: {
        skillId: speakingSkill.id,
        part: topicData.part,
        topicTitle: topicData.title,
        description: topicData.description,
      },
    });

    totalTopics++;

    for (const promptData of topicData.prompts) {
      await prisma.speakingPrompt.create({
        data: {
          topicId: topic.id,
          questionText: promptData.text,
          suggestedTimeSec: promptData.time,
        },
      });
      totalPrompts++;
    }

    console.log(`✅ Created topic: ${topicData.title} (Part ${topicData.part}) with ${topicData.prompts.length} prompts`);
  }

  // 3. Create test attempts (for testing API)
  const firstUser = await prisma.user.findFirst();
  const firstTest = await prisma.test.findFirst();

  if (firstUser && firstTest) {
    for (let i = 0; i < 3; i++) {
      await prisma.testAttempt.create({
        data: {
          userId: firstUser.id,
          testId: firstTest.id,
          skillId: speakingSkill.id,
          mode: 'practice',
          status: 'in_progress',
        },
      });
    }
    console.log(`✅ Created 3 test attempts`);
  } else {
    console.log(`⚠️  No user or test found, skipping test attempt creation`);
  }

  console.log(`\n🎉 SEEDING COMPLETE!`);
  console.log(`📊 Total topics created: ${totalTopics}`);
  console.log(`📝 Total prompts created: ${totalPrompts}`);
}

seedSpeakingData()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
