export type Category =
  | 'Motivation'
  | 'Productivity'
  | 'Note-Taking'
  | 'Habits'
  | 'Focus'
  | 'Wellness'
  | 'Campus Life'

export const CATEGORIES: Category[] = [
  'Motivation',
  'Productivity',
  'Note-Taking',
  'Habits',
  'Focus',
  'Wellness',
  'Campus Life',
]

export type ArticleSection = {
  heading: string
  paragraphs: string[]
  list?: string[]
  quote?: string
}

export type Post = {
  slug: string
  title: string
  excerpt: string
  date: string
  publishedAt: string
  category: Category
  image: string
  readingTime: string
  sections: ArticleSection[]
}

export const POSTS: Post[] = [
  {
    slug: 'balance-university-and-personal-life',
    title: 'How to Balance University and Personal Life',
    excerpt:
      'Protecting your time outside of lectures is not a luxury — it is what keeps you studying sustainably all semester.',
    date: 'October 10, 2025',
    publishedAt: '2025-10-10',
    category: 'Wellness',
    image: '/images/cover-picnic.jpg',
    readingTime: '5 min read',
    sections: [
      {
        heading: 'Start by deciding what “enough” looks like',
        paragraphs: [
          'University can expand to fill every open hour if you let it. There is always another reading to skim, another slide to tidy, or another assignment detail to polish. Before you build a schedule, decide what a good-enough week looks like for your classes, your health, and the people you care about.',
          'This is not an excuse to do less than you are capable of. It is a way of making sure your effort has a shape. A clear definition of enough helps you notice when studying has started to crowd out the rest of your life, especially during exam season or a demanding project week.',
        ],
      },
      {
        heading: 'Make your week visible',
        paragraphs: [
          'A calendar is more useful when it includes the parts of life that are easy to forget. Put lectures, commute time, meals, exercise, hobbies, and rest beside your study blocks. Seeing the whole week makes it easier to choose realistic goals instead of promising yourself a perfect one.',
        ],
        list: [
          'Block fixed commitments first, including travel and meals.',
          'Choose three study priorities for the week rather than a long wish list.',
          'Leave small gaps between demanding tasks for transitions and unexpected delays.',
          'Schedule one evening or half-day that belongs to something other than university.',
          'Review the calendar on Sunday and adjust it without treating changes as failure.',
        ],
      },
      {
        heading: 'Protect the small spaces between obligations',
        paragraphs: [
          'Balance does not always arrive as a free weekend or a long holiday. Sometimes it is a walk between lectures, a proper lunch away from your desk, or a phone call with someone who knows you outside your student email address. These small spaces are worth protecting because they help you return to your work with more patience.',
          'Try to keep at least one daily ritual that is not optimized for productivity. Make tea without checking notifications, stretch for five minutes, or sit somewhere green after class. A life that supports your studying needs more than efficient study techniques; it needs moments that remind you why the work matters.',
        ],
      },
      {
        heading: 'Use a gentle reset for busy weeks',
        paragraphs: [
          'When deadlines gather, your personal time may shrink for a few days. That can be okay if it is temporary and intentional. The trouble starts when a busy week quietly becomes the default. A short reset can help you regain perspective before exhaustion turns into resentment.',
        ],
        list: [
          'Write down what must be finished and what can wait.',
          'Choose one nourishing activity to keep, even if it is only ten minutes long.',
          'Tell a friend, classmate, or family member when you need extra support.',
          'Plan a simple reward after the deadline, such as a favorite meal or a film night.',
        ],
      },
      {
        heading: 'Balance is a practice, not a perfect equation',
        paragraphs: [
          'Some weeks will lean heavily toward university. Others will leave more room for friends, family, creativity, or rest. The goal is not to divide every day into identical pieces. It is to keep returning to your own needs and making small corrections before one part of life consistently takes over.',
        ],
        quote: 'A sustainable semester leaves room for both ambition and being human.',
      },
    ],
  },
  {
    slug: 'stay-focused-during-long-study-sessions',
    title: 'How to Stay Focused During Long Study Sessions',
    excerpt:
      'A few small environmental tweaks can turn a restless three-hour cram into calm, deep work.',
    date: 'October 11, 2025',
    publishedAt: '2025-10-11',
    category: 'Focus',
    image: '/images/cover-library-table.jpg',
    readingTime: '6 min read',
    sections: [
      {
        heading: 'Design the room before you design the timetable',
        paragraphs: [
          'Focus is partly a decision and partly an environment. If your desk is covered with unrelated tabs, a buzzing phone, and a notebook you no longer need, your brain has to keep choosing against those distractions. Spend five minutes preparing the space before you begin.',
          'Keep only the materials for the current task within reach. Fill your water bottle, adjust the light, and decide where your phone will rest. A calm desk does not guarantee concentration, but it removes a steady stream of tiny decisions that can wear down your attention.',
        ],
      },
      {
        heading: 'Give your attention a clear job',
        paragraphs: [
          '“Study biology” is too broad to hold onto for three hours. Turn the session into a visible outcome: finish ten practice questions, summarize one chapter, or explain a concept without looking at the page. When the task has an endpoint, it becomes easier to notice progress.',
          'Write the outcome at the top of your page. If your mind wanders, return to that sentence rather than starting a new task. The goal is not to make every minute intense; it is to give your attention a familiar path back.',
        ],
      },
      {
        heading: 'Work in waves',
        paragraphs: [
          'Long sessions feel more manageable when they have a rhythm. Try a focused block followed by a real break, then return with a small review. The exact length can change with your energy and the kind of work you are doing. A 25-minute block may suit reading, while a difficult problem set might need a longer stretch.',
        ],
        list: [
          'Start with a two-minute preview of what you will do.',
          'Work on one defined task until the block ends.',
          'Step away from the screen or desk during the break.',
          'Use the first minute after the break to recall what you learned.',
          'Stop before the work becomes so tiring that every sentence needs rereading.',
        ],
      },
      {
        heading: 'Make distractions less convenient',
        paragraphs: [
          'Willpower works best when it does not have to win every second. Put your phone in another room, log out of distracting sites, or use a simple timer that shows how much time remains. If you need your laptop for studying, close the tabs that belong to a different version of the day.',
          'You can also keep a “later” note beside you. When an unrelated thought appears, write it down and return to the task. This acknowledges the thought without inviting it to drive the session.',
        ],
      },
      {
        heading: 'End with a small act of closure',
        paragraphs: [
          'Before you leave your desk, write down what you finished and the next action for tomorrow. Closure helps your brain release the session instead of carrying an unfinished cloud of tasks into your evening. It also makes the next study block easier to start.',
          'A focused session is not measured only by hours completed. Notice whether you understood more, produced something useful, or learned what kind of environment helps you think. Those details turn a long afternoon into practice you can repeat.',
        ],
      },
    ],
  },
  {
    slug: 'creating-a-study-routine-that-actually-works',
    title: 'Creating a Study Routine That Actually Works',
    excerpt:
      'Routines fail when they fight your natural rhythm. Here is how to build one that fits the life you already have.',
    date: 'October 12, 2025',
    publishedAt: '2025-10-12',
    category: 'Habits',
    image: '/images/cover-books-mug.jpg',
    readingTime: '7 min read',
    sections: [
      {
        heading: 'Begin with your real life',
        paragraphs: [
          'The most beautiful study routine is useless if it assumes you are a different person. Before choosing wake-up times or color-coded blocks, look honestly at your classes, commute, work, energy patterns, and evening commitments. A routine should fit around the life you have, not around an imaginary semester.',
          'Notice when you naturally concentrate. If you are sharpest in the morning, protect that time for difficult material. If you warm up later, use the morning for review, admin, or a short reading. The best routine works with your rhythm instead of treating fatigue as a character flaw.',
        ],
      },
      {
        heading: 'Anchor studying to something that already happens',
        paragraphs: [
          'A habit is easier to remember when it has a reliable doorway. Attach a short study ritual to an existing part of your day: after breakfast, before opening social media, or as soon as you return from campus. The anchor gives the routine a cue, while the small starting action gives it momentum.',
        ],
        list: [
          'Open your planner and choose the first task.',
          'Put your notes and a pen in the same place each time.',
          'Make a drink and start a ten-minute timer.',
          'Review yesterday’s final note before beginning anything new.',
        ],
      },
      {
        heading: 'Create a minimum viable study session',
        paragraphs: [
          'On busy or low-energy days, the full routine may feel impossible. That is when a tiny version matters. Decide on a minimum session you can complete even when the day goes sideways: read one page, solve one question, or revise one flashcard set for five minutes.',
          'The minimum is not the goal; it is the promise that keeps the habit alive. Once you begin, you will often continue. If you do not, you still maintained the identity of someone who shows up, which is more useful than waiting for a perfect block of time.',
        ],
      },
      {
        heading: 'Plan the next step before you stop',
        paragraphs: [
          'Leaving a clear next step makes tomorrow feel less like starting over. At the end of a session, note where you stopped, what confused you, and what you will do first next time. This small handover reduces the friction that often turns a planned study hour into twenty minutes of deciding what to open.',
          'Keep the ritual consistent but flexible. Your routine can have a stable shape without requiring the same subject, location, or duration every day. Stability comes from returning, not from never changing.',
        ],
      },
      {
        heading: 'Review the routine like a kind editor',
        paragraphs: [
          'Once a week, ask what felt easy, what felt forced, and what helped you continue. Remove steps that exist only to make the routine look impressive. Add support where you repeatedly get stuck. A routine is a tool, so it should become more useful as you learn how you work.',
        ],
        quote: 'The routine that survives an ordinary Tuesday is worth more than the perfect plan you only follow on a good Monday.',
      },
    ],
  },
  {
    slug: 'how-to-take-better-study-notes',
    title: 'How to Take Better Study Notes',
    excerpt:
      'Notes are not transcripts. Learn to capture ideas in a way that makes revision faster and recall stronger.',
    date: 'October 13, 2025',
    publishedAt: '2025-10-13',
    category: 'Note-Taking',
    image: '/images/cover-night-notes.jpg',
    readingTime: '5 min read',
    sections: [
      {
        heading: 'Treat notes as a conversation',
        paragraphs: [
          'Good notes do not record every word. They capture the ideas that matter, the connections you notice, and the questions you want to revisit. When you try to transcribe a lecture, your hand may stay busy while your attention quietly leaves the room.',
          'Listen for signposts: definitions, contrasts, examples, causes, and anything the lecturer repeats or writes down. Then put the idea into your own words. That act of translation is already a small retrieval practice, and it makes the notes more useful later.',
        ],
      },
      {
        heading: 'Prepare a simple map before class',
        paragraphs: [
          'You do not need an elaborate system to take better notes. Before class, skim the reading or previous slides and write three to five headings on a page. Leave space beneath each one. A light structure helps you place new information without forcing every detail into a rigid template.',
          'If the lecture moves quickly, use abbreviations and symbols consistently. Mark uncertainty with a question mark rather than stopping to perfect a sentence. You can return to the unclear point after class while the context is still fresh.',
        ],
      },
      {
        heading: 'Capture ideas, not just information',
        paragraphs: [
          'Facts are easier to find in a textbook than relationships are. Note why something matters, how it differs from a similar concept, or where it fits in the larger argument. These connections give your revision a path to follow.',
        ],
        list: [
          'Write the main idea in one sentence.',
          'Add one example that makes it concrete.',
          'Note a contrast, cause, or consequence.',
          'Leave a margin for questions and later connections.',
          'Highlight sparingly; use your own words as the real signal.',
        ],
      },
      {
        heading: 'Choose a format that matches the task',
        paragraphs: [
          'An outline can work well for a linear lecture. A concept map may be better when a topic has many overlapping parts. The Cornell method can help when you want a dedicated space for questions and summaries. The method matters less than whether it supports the way you will use the notes.',
          'Do not spend more time decorating a page than understanding it. A clean page is pleasant, but a useful page contains enough context for future you to remember what was happening.',
        ],
      },
      {
        heading: 'Turn notes into recall',
        paragraphs: [
          'Within a day or two, close the page and write or say what you remember. Then reopen your notes and fill the gaps. This short review is more effective than rereading the same lines several times because it asks your brain to retrieve the material.',
          'Before an exam, use your notes to make a small set of practice prompts. If a page cannot help you answer a question, explain a process, or see a connection, it may be ready to simplify.',
        ],
        quote: 'The best notes are not the ones that look complete. They are the ones that help you think again.',
      },
    ],
  },
  {
    slug: '5-simple-ways-to-stop-procrastinating',
    title: '5 Simple Ways to Stop Procrastinating',
    excerpt:
      'Procrastination is rarely about laziness. These five gentle nudges lower the friction to starting.',
    date: 'October 14, 2025',
    publishedAt: '2025-10-14',
    category: 'Productivity',
    image: '/images/cover-lecture-hall.jpg',
    readingTime: '4 min read',
    sections: [
      {
        heading: 'Notice what you are avoiding',
        paragraphs: [
          'Procrastination often feels like a time-management problem, but it can also be a response to uncertainty, boredom, perfectionism, or fear of doing badly. Before reaching for a stricter punishment, ask what makes the task feel uncomfortable. The answer gives you a more useful place to begin.',
          'If the task is unclear, define the next visible action. If it feels too large, make the first piece smaller. If it brings up worry, separate planning from judging and give yourself permission to create a rough version first.',
        ],
      },
      {
        heading: 'Make the first step almost too small to refuse',
        paragraphs: [
          '“Write the essay” is a project, not a starting action. “Open the document and write three imperfect sentences” is small enough to begin. Momentum often appears after the first minute, but even if it does not, you have replaced avoidance with contact.',
          'Use a timer if that helps. Promise yourself only five minutes of honest attention. When the timer ends, you can stop without guilt or continue while the work is warm.',
        ],
      },
      {
        heading: 'Lower the friction around the work',
        paragraphs: [
          'Every extra step gives procrastination another doorway. Save files where you can find them, keep a short task list, and prepare your materials before the moment you need them. If you know you avoid a particular assignment, leave its document open or place the book on your desk.',
          'You can also make the alternative less tempting. Move distracting apps off the first screen, study in a public space, or ask a classmate to begin a quiet work session with you. Changing the environment is not cheating; it is good design.',
        ],
      },
      {
        heading: 'Work with the feeling, not against it',
        paragraphs: [
          'Waiting until you feel ready can turn a small task into a dramatic event. Start while the resistance is still present, and keep the opening action gentle. A rough paragraph, one solved question, or a messy list of ideas is enough to give your mind something to respond to.',
          'When you finish, acknowledge the start rather than only the result. Your brain learns from evidence. Each time you begin despite discomfort, you make the next beginning a little more familiar.',
        ],
      },
      {
        heading: 'Create a kind accountability cue',
        paragraphs: [
          'Tell someone what you intend to finish, or send a short update when you begin and when you stop. Keep it simple and specific. Accountability works best when it feels supportive rather than like a public trial.',
        ],
        list: [
          'Name one task you will start today.',
          'Choose a time and place for the first five minutes.',
          'Remove one obvious distraction.',
          'Write down what “finished enough” means.',
          'Celebrate the act of returning, even when progress is modest.',
        ],
        quote: 'You do not need to feel motivated before you begin. Sometimes beginning is what creates the feeling.',
      },
    ],
  },
  {
    slug: 'how-to-study-when-you-dont-feel-motivated',
    title: "How to Study When You Don't Feel Motivated",
    excerpt:
      'Motivation comes and goes. Build systems that carry you through the days it decides not to show up.',
    date: 'October 14, 2025',
    publishedAt: '2025-10-14',
    category: 'Motivation',
    image: '/images/cover-campus-grass.jpg',
    readingTime: '6 min read',
    sections: [
      {
        heading: 'Let motivation be a visitor, not the landlord',
        paragraphs: [
          'Motivation is wonderful when it arrives, but it is not a dependable study plan. Some days your energy will be low, your reading will feel distant, and the future version of you who enjoys flashcards may seem like a stranger. That does not mean you have lost the ability to learn.',
          'On those days, aim for continuity rather than intensity. A small, honest session keeps the thread connected. It also gives you evidence that you can act even when your mood does not cooperate.',
        ],
      },
      {
        heading: 'Reconnect with one personal reason',
        paragraphs: [
          'A deadline can tell you what to do, but it does not always explain why the work deserves care. Take a minute to name a reason that belongs to you: understanding a subject that matters, creating more choices after graduation, making someone proud, or simply becoming the kind of person who follows through.',
          'Keep the reason specific and human. “I have to study” rarely carries much warmth. “I want to walk into the exam knowing I gave myself a fair chance” may be enough to open the notebook.',
        ],
      },
      {
        heading: 'Use a low-energy study menu',
        paragraphs: [
          'Not every study task requires the same amount of mental brightness. Make a short menu for days when concentration is limited. Put low-friction activities beside the more demanding ones so you can choose honestly instead of declaring the whole day a failure.',
        ],
        list: [
          'Review five flashcards or a previous summary.',
          'Read one short section and write three bullet points.',
          'Organize files, deadlines, or questions for the next session.',
          'Watch a lecture at a slower speed and pause to explain one idea.',
          'Complete one practice question and check the reasoning.',
        ],
      },
      {
        heading: 'Create momentum through completion',
        paragraphs: [
          'Choose a task with a visible ending. Finishing something small can shift the day from “I cannot do this” to “I am doing a part of this.” Keep the first task separate from your larger goal so that progress is easy to see.',
          'Afterward, take a proper pause. Notice what helped, even if it was only a tidy desk or a friend studying nearby. These details become clues for building a system that does not depend on a perfect mood.',
        ],
      },
      {
        heading: 'Ask for support before you feel desperate',
        paragraphs: [
          'Motivation is easier to find in good company. Join a quiet library session, explain a confusing topic to a classmate, or ask someone to check in after you start. Support does not remove the work, but it can make the first step feel less lonely.',
          'If low motivation persists alongside changes in sleep, appetite, or enjoyment, treat that as useful information rather than a productivity puzzle. Reach out to someone you trust or a campus support service. Caring for your wellbeing is part of being a student, not a break from it.',
        ],
        quote: 'A small session done kindly still counts. You are building trust with yourself one return at a time.',
      },
    ],
  },
]

export const categoryColor: Record<Category, string> = {
  Motivation: 'bg-[oklch(0.9_0.03_150)] text-[oklch(0.36_0.05_150)]',
  Productivity: 'bg-[oklch(0.9_0.03_300)] text-[oklch(0.4_0.06_300)]',
  'Note-Taking': 'bg-[oklch(0.9_0.03_150)] text-[oklch(0.36_0.05_150)]',
  Habits: 'bg-[oklch(0.9_0.03_300)] text-[oklch(0.4_0.06_300)]',
  Focus: 'bg-[oklch(0.9_0.03_150)] text-[oklch(0.36_0.05_150)]',
  Wellness: 'bg-[oklch(0.9_0.03_300)] text-[oklch(0.4_0.06_300)]',
  'Campus Life': 'bg-[oklch(0.9_0.03_150)] text-[oklch(0.36_0.05_150)]',
}

export function getPostBySlug(slug: string) {
  return POSTS.find((post) => post.slug === slug)
}
