import { Script } from "./types";

export const scripts: Script[] = [
  {
    id: "1",
    slug: "bedtime-meltdown",
    title: "The Bedtime Meltdown Script",
    summary: "What to say when your child refuses to go to bed and escalates.",
    situation: "Child refuses bed, cries, keeps getting up after lights out.",
    ageGroups: ["3-5", "6-8"],
    category: "bedtime",
    isPremium: false,
    tags: ["bedtime", "meltdown", "evenings", "sleep"],
    previewLines: [
      "Step 1 — Acknowledge: \"I can see you're not ready to sleep yet. That's okay.\"",
      "Step 2 — Boundary: \"AND it's still bedtime. Your body needs rest even when your brain doesn't want to.\"",
    ],
    fullScript: [
      {
        label: "Acknowledge",
        say: "I can see you're not ready to sleep yet. That's okay.",
        note: "Don't argue with the feeling. Just name it.",
      },
      {
        label: "Hold the boundary",
        say: "AND it's still bedtime. Your body needs rest even when your brain doesn't want to.",
        note: "Use 'and' not 'but' — 'but' erases everything before it.",
      },
      {
        label: "Physical cue",
        say: "I'm going to sit with you for two minutes. Then I'm going to leave and you're going to stay.",
        note: "Give a concrete time. Vague comfort extends the loop.",
      },
      {
        label: "Follow through",
        say: "I love you. Goodnight.",
        note: "Say it once. Leave. Do not re-enter unless there is genuine distress.",
      },
    ],
    whyItWorks:
      "Acknowledging the feeling removes the need to fight for it. The child gets heard without getting control. The boundary stays firm because it's stated before they escalate further.",
    commonMistake:
      "Explaining *why* sleep is important mid-meltdown. They cannot process logic when dysregulated. Save the lecture for the morning.",
    rating: 4.8,
    saves: 312,
  },
  {
    id: "2",
    slug: "morning-chaos-script",
    title: "The Morning Chaos Script",
    summary: "Stop repeating yourself every morning. One sequence that works.",
    situation: "Child is slow, distracted, won't get dressed or eat breakfast.",
    ageGroups: ["3-5", "6-8", "9-12"],
    category: "morning-routine",
    isPremium: false,
    tags: ["mornings", "routine", "school", "getting ready"],
    previewLines: [
      "Step 1 — Set the frame the night before: \"Tomorrow morning, here's the sequence...\"",
      "Step 2 — One instruction at a time: Never chain more than one task in a single sentence.",
    ],
    fullScript: [
      {
        label: "Set the frame (night before)",
        say: "Tomorrow morning, here's the sequence: wake up, get dressed, eat, shoes, go. That's it.",
        note: "Do this every evening. Predictability removes the negotiation.",
      },
      {
        label: "One instruction at a time",
        say: "First thing: get dressed.",
        note: "Not 'get dressed and eat breakfast and find your shoes.' One task. Wait for completion.",
      },
      {
        label: "When they stall",
        say: "You've got two minutes on the clock. I'll check back.",
        note: "Use a visible timer. The timer is the authority — not you.",
      },
      {
        label: "When they're done",
        say: "Done. Next: breakfast.",
        note: "Acknowledge completion briefly. Keep momentum. Don't over-praise.",
      },
      {
        label: "If they miss the window",
        say: "We're leaving in three minutes. Whatever isn't done stays undone today.",
        note: "Mean it. Natural consequences teach faster than any lecture.",
      },
    ],
    whyItWorks:
      "Most morning chaos is caused by open-ended expectations. Children need a sequence, not a list. Sequencing turns a chaotic 45 minutes into a predictable 20.",
    commonMistake:
      "Threatening consequences you won't follow through on. If you say 'we're leaving without breakfast' and then make toast anyway, you've taught them the threats aren't real.",
    rating: 4.7,
    saves: 289,
  },
  {
    id: "3",
    slug: "public-meltdown",
    title: "The Public Meltdown Script",
    summary: "How to handle a full meltdown in public without losing it yourself.",
    situation: "Child melts down in a shop, park, or restaurant.",
    ageGroups: ["3-5", "6-8"],
    category: "meltdowns",
    isPremium: true,
    tags: ["meltdown", "public", "embarrassment", "regulation"],
    previewLines: [
      "Step 1 — Get low: Drop to their eye level. Don't stand over them.",
      "Step 2 — Reduce input: Move away from the crowd if possible. Less stimulation = faster recovery.",
    ],
    fullScript: [
      {
        label: "Get low",
        say: "(no words yet — get to eye level first)",
        note: "Standing over a dysregulated child escalates. Get down. Wait.",
      },
      {
        label: "Reduce input",
        say: "Let's move over here.",
        note: "Away from crowds, noise, other people watching. You regulate first.",
      },
      {
        label: "Name it",
        say: "You're really upset right now. I can see that.",
        note: "Don't ask why yet. Don't problem-solve. Just name the state.",
      },
      {
        label: "Wait",
        say: "I'm right here. Take your time.",
        note: "Silence is allowed. You don't have to fill it. Breathe yourself.",
      },
      {
        label: "Reconnect",
        say: "Are you ready to talk about it?",
        note: "Only ask this once the body has calmed — breathing normalised, no more crying.",
      },
      {
        label: "Debrief later",
        say: "Later at home: \"What happened back there? What could we do differently next time?\"",
        note: "The learning happens after, not during. Don't debrief on the pavement.",
      },
    ],
    whyItWorks:
      "A meltdown is a neurological event, not a behavioural choice. The prefrontal cortex is offline. No logic or consequences reach a child in this state. Your job is to lower the threat level so the brain can come back online.",
    commonMistake:
      "Trying to reason, threaten, or shame during the meltdown. \"Everyone is looking at you\" makes it worse. The audience is your problem, not theirs.",
    rating: 4.9,
    saves: 401,
  },
  {
    id: "4",
    slug: "screen-time-battle",
    title: "The Screen Time Battle Script",
    summary: "End the daily fight over screens with one structural change.",
    situation: "Child argues, cries, or ignores you when screen time ends.",
    ageGroups: ["3-5", "6-8", "9-12"],
    category: "screen-time",
    isPremium: true,
    tags: ["screens", "iPad", "TV", "gaming", "transitions"],
    previewLines: [
      "Step 1 — Set the rule before the session starts, not when it ends.",
      "Step 2 — Use a visual timer so the clock is the authority, not you.",
    ],
    fullScript: [
      {
        label: "Set the rule before screens go on",
        say: "You've got 30 minutes. When the timer goes off, screens go off. Deal?",
        note: "Get verbal agreement before they start. This creates a commitment.",
      },
      {
        label: "5-minute warning",
        say: "Five minutes left on the timer.",
        note: "Neutral tone. You're not threatening — just informing.",
      },
      {
        label: "When the timer goes",
        say: "Timer's done. Screens off.",
        note: "Don't ask. Don't negotiate. State it and move to the next thing.",
      },
      {
        label: "If they argue",
        say: "We agreed before you started. The rule doesn't change because the game isn't finished.",
        note: "Say it once. Don't repeat. Walk away if needed.",
      },
      {
        label: "If they refuse",
        say: "You can turn it off, or I turn it off and screens don't come back tomorrow.",
        note: "Choice architecture. Give them the power to comply — it's less humiliating.",
      },
    ],
    whyItWorks:
      "The battle happens because the rule appears at the worst moment — when dopamine is high and stopping feels impossible. Agreeing to the rule before screens go on means the child has already committed. You're holding them to their own word.",
    commonMistake:
      "Saying 'five more minutes' as a bribe. It signals that negotiation works, and they'll push for it every time.",
    rating: 4.6,
    saves: 356,
  },
  {
    id: "5",
    slug: "sibling-fight-script",
    title: "The Sibling Fight Script",
    summary: "Stop playing judge. Use this instead.",
    situation: "Two kids fighting over an object, fairness, or whose fault it is.",
    ageGroups: ["3-5", "6-8", "9-12"],
    category: "sibling-conflict",
    isPremium: true,
    tags: ["siblings", "fighting", "fairness", "conflict"],
    previewLines: [
      "Step 1 — Don't take sides. Ever. Not even when one is obviously wrong.",
      "Step 2 — Describe what you see: \"I see two kids who both want the same thing.\"",
    ],
    fullScript: [
      {
        label: "Don't investigate",
        say: "I'm not interested in who started it.",
        note: "Once you investigate, you become the judge. Judges get appealed to forever.",
      },
      {
        label: "Describe the problem",
        say: "I see two kids who both want the same thing. That's a problem.",
        note: "Neutral. Both children feel seen without anyone being accused.",
      },
      {
        label: "Hand it back",
        say: "I'm going to give you two minutes to sort this out between you. If you can't, I decide.",
        note: "And then actually decide — don't extend the deadline.",
      },
      {
        label: "If they can't resolve it",
        say: "You couldn't sort it, so I'm sorting it. [Object] goes away for the rest of the day.",
        note: "Nobody wins. This removes the incentive to fight over things.",
      },
      {
        label: "Later",
        say: "What could you have done differently back there?",
        note: "Ask when everyone is calm. It builds conflict resolution skills over time.",
      },
    ],
    whyItWorks:
      "When parents play judge, children learn to perform victimhood to win the ruling. Removing yourself as judge forces them to negotiate — which is the actual skill you want them to build.",
    commonMistake:
      "Finding out who started it and punishing them. This creates a strong incentive to set the other sibling up.",
    rating: 4.7,
    saves: 278,
  },
  {
    id: "6",
    slug: "homework-refusal",
    title: "The Homework Refusal Script",
    summary: "Get homework done without a battle every single evening.",
    situation: "Child refuses to do homework, says it's too hard, or keeps avoiding it.",
    ageGroups: ["6-8", "9-12"],
    category: "motivation",
    isPremium: true,
    tags: ["homework", "school", "resistance", "evenings"],
    previewLines: [
      "Step 1 — Don't start with homework. Start with a 20-minute decompression window.",
      "Step 2 — Use a fixed non-negotiable time slot, not 'when you feel like it.'",
    ],
    fullScript: [
      {
        label: "Decompression first",
        say: "You've got 20 minutes to do whatever you want. Then it's homework time.",
        note: "After school, the brain needs to decompress. Forcing it immediately = resistance.",
      },
      {
        label: "Set the time, not the mood",
        say: "3:30 is homework time every day. You don't have to like it.",
        note: "Non-negotiable. Same time. No discussion about whether to do it — only how.",
      },
      {
        label: "Break the task",
        say: "What's the first thing on the list? Just the first thing.",
        note: "Don't look at the whole homework load. One task at a time.",
      },
      {
        label: "When they say it's too hard",
        say: "Show me the first question. Let's read it together.",
        note: "Don't solve it for them. Read it with them. The help is in the starting.",
      },
      {
        label: "Completion",
        say: "Done. Put it in your bag now so it doesn't get left behind.",
        note: "Bag it immediately. Half the lost homework problem is solved here.",
      },
    ],
    whyItWorks:
      "Homework resistance is usually about executive function overload, not laziness. A fixed time removes the decision entirely. The brain doesn't have to decide *whether* — only *how*.",
    commonMistake:
      "Letting them choose when to do it. 'After dinner' becomes 'after this show' becomes 9pm becomes a battle.",
    rating: 4.5,
    saves: 234,
  },
  {
    id: "7",
    slug: "teen-shutdown",
    title: "The Teen Shutdown Script",
    summary: "What to say when your teenager goes completely silent.",
    situation: "Teen won't talk, gives one-word answers, closes their door.",
    ageGroups: ["13+"],
    category: "difficult-conversations",
    isPremium: true,
    tags: ["teenager", "communication", "withdrawal", "connection"],
    previewLines: [
      "Step 1 — Don't chase. Chasing a withdrawn teen teaches them that shutdown = attention.",
      "Step 2 — Signal availability without pressure: leave the door open, not your mouth.",
    ],
    fullScript: [
      {
        label: "Don't chase",
        say: "(nothing — leave them alone for now)",
        note: "Pursuing a teen who has shut down escalates. Give it time.",
      },
      {
        label: "Signal availability",
        say: "I'm around if you want to talk. No pressure.",
        note: "Say it once. Leave. Do not follow up with 'are you sure?'",
      },
      {
        label: "Create a side-by-side moment",
        say: "(drive somewhere, cook together, watch something)",
        note: "Teens talk sideways. Face-to-face interrogation doesn't work. Side-by-side does.",
      },
      {
        label: "Start oblique",
        say: "How's [friend / game / thing they care about]?",
        note: "Not 'how are you.' That closes. Ask about something external first.",
      },
      {
        label: "If they open up",
        say: "Tell me more about that.",
        note: "Don't fix. Don't advise. Don't pivot to your own experience. Just keep them talking.",
      },
    ],
    whyItWorks:
      "Teenagers withdraw when they anticipate judgment or a lecture. Low-pressure, side-by-side presence removes the threat. The conversation happens when they feel safe, not when you demand it.",
    commonMistake:
      "\"We need to talk.\" Those four words trigger defensive shutdown in most teenagers. Never lead with them.",
    rating: 4.8,
    saves: 389,
  },
  {
    id: "8",
    slug: "lying-script",
    title: "The Lying Script",
    summary: "How to respond when you catch your child in a lie.",
    situation: "You know your child is lying. They're doubling down.",
    ageGroups: ["6-8", "9-12", "13+"],
    category: "discipline",
    isPremium: true,
    tags: ["lying", "honesty", "trust", "consequence"],
    previewLines: [
      "Step 1 — Don't ask questions you already know the answer to.",
      "Step 2 — State what you know, not what you suspect.",
    ],
    fullScript: [
      {
        label: "Don't trap them",
        say: "I'm not going to ask you if you did it. I already know you did.",
        note: "Asking 'did you do this?' when you know the answer invites the lie. Skip it.",
      },
      {
        label: "State the fact",
        say: "I know [what happened]. Here's what I want to talk about.",
        note: "Factual, calm. Not accusatory. You're not performing anger — you're addressing it.",
      },
      {
        label: "Address the lie separately",
        say: "The thing I'm more concerned about than [the action] is that you lied to me.",
        note: "Two separate issues: the behaviour, and the dishonesty. Don't conflate them.",
      },
      {
        label: "Name the consequence of lying",
        say: "When I can't trust what you tell me, I have to check everything. That affects your freedom.",
        note: "This is not a threat. It's a logical outcome. State it plainly.",
      },
      {
        label: "Give them a way back",
        say: "What actually happened?",
        note: "Now ask. Give them the chance to be honest. Acknowledge it if they are.",
      },
    ],
    whyItWorks:
      "Children lie to avoid punishment or disappointment. Trapping them doubles down on both. By separating the lie from the behaviour, you make honesty the safer choice.",
    commonMistake:
      "Making the punishment for the action so severe that lying becomes worth the risk. If consequences are proportionate, honesty becomes the easier path.",
    rating: 4.6,
    saves: 301,
  },
  {
    id: "9",
    slug: "emotion-coaching",
    title: "The Big Emotions Script",
    summary: "What to say when your child is overwhelmed by a feeling.",
    situation: "Child is crying, angry, or emotionally flooded over something that seems small.",
    ageGroups: ["3-5", "6-8", "9-12"],
    category: "emotions",
    isPremium: true,
    tags: ["emotions", "feelings", "upset", "regulation", "empathy"],
    previewLines: [
      "Step 1 — Resist the urge to fix or minimise: \"It's okay\" and \"calm down\" don't work.",
      "Step 2 — Name the feeling before anything else.",
    ],
    fullScript: [
      {
        label: "Don't minimise",
        say: "(don't say 'it's fine' or 'calm down' — say nothing first)",
        note: "Minimising tells them their feelings are wrong. That shuts down communication.",
      },
      {
        label: "Get present",
        say: "(sit with them, make eye contact, be physically close)",
        note: "Presence before words. Your regulated body helps regulate theirs.",
      },
      {
        label: "Name the feeling",
        say: "You're really [sad/frustrated/disappointed] right now.",
        note: "Not a question — a statement. Let them correct you if you're wrong.",
      },
      {
        label: "Validate",
        say: "That makes sense. I'd feel that way too.",
        note: "You don't have to agree the thing is a big deal. You agree the feeling is real.",
      },
      {
        label: "Offer, don't push",
        say: "Do you want a hug, or do you need a minute?",
        note: "Give them control over what comfort looks like. Forced hugs don't help.",
      },
      {
        label: "Problem-solve later",
        say: "When you're ready, we can figure out what to do about it.",
        note: "Only after the emotion has moved through. Not during.",
      },
    ],
    whyItWorks:
      "Emotions are not problems to be solved — they're states to be moved through. The fastest route through a big feeling is acknowledgment, not suppression. Named feelings process faster.",
    commonMistake:
      "Going straight to solutions. 'Here's what you should do...' while they're still crying tells them you're not actually listening.",
    rating: 4.9,
    saves: 445,
  },
  {
    id: "10",
    slug: "setting-limits",
    title: "The Limit Setting Script",
    summary: "How to say no without it becoming a battle.",
    situation: "Child pushes back hard when you set a limit.",
    ageGroups: ["3-5", "6-8", "9-12"],
    category: "boundaries",
    isPremium: false,
    tags: ["boundaries", "no", "limits", "pushback"],
    previewLines: [
      "Step 1 — State the limit clearly without a long explanation.",
      "Step 2 — Acknowledge the feeling without withdrawing the limit.",
    ],
    fullScript: [
      {
        label: "State the limit",
        say: "That's not happening today.",
        note: "Short. Clear. No lengthy justification — that opens the negotiation.",
      },
      {
        label: "Acknowledge the reaction",
        say: "I know you're disappointed. That's okay.",
        note: "You're not sorry for the limit — you're acknowledging the feeling about it.",
      },
      {
        label: "Don't JADE (Justify, Argue, Defend, Explain)",
        say: "(don't add more reasons — just repeat the limit calmly if pressed)",
        note: "Every new reason is a new thing to argue against. One limit. One sentence.",
      },
      {
        label: "Broken record if needed",
        say: "I hear you. The answer is still no.",
        note: "Same words. Same tone. Not escalating. Not withdrawing.",
      },
      {
        label: "Redirect",
        say: "What you CAN do is [alternative].",
        note: "Not always necessary — but useful for younger children who need somewhere to go.",
      },
    ],
    whyItWorks:
      "Children push limits to test if they're real. A limit that moves under pressure teaches that pushing works. Holding it with calm consistency — not anger — teaches that it's real.",
    commonMistake:
      "Explaining so much that the child finds a logical loophole. If your reason can be argued against, they will argue against it.",
    rating: 4.7,
    saves: 267,
  },
];

export function getScriptBySlug(slug: string): Script | undefined {
  return scripts.find((s) => s.slug === slug);
}

export function getScriptsByCategory(category: string): Script[] {
  return scripts.filter((s) => s.category === category);
}

export function searchScripts(query: string): Script[] {
  const q = query.toLowerCase();
  return scripts.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q) ||
      s.tags.some((t) => t.includes(q)) ||
      s.category.includes(q)
  );
}

export const categories = [
  { value: "all", label: "All situations" },
  { value: "meltdowns", label: "Meltdowns" },
  { value: "bedtime", label: "Bedtime" },
  { value: "screen-time", label: "Screen time" },
  { value: "discipline", label: "Discipline" },
  { value: "emotions", label: "Big emotions" },
  { value: "sibling-conflict", label: "Sibling conflict" },
  { value: "morning-routine", label: "Morning routine" },
  { value: "difficult-conversations", label: "Difficult conversations" },
  { value: "motivation", label: "Motivation" },
  { value: "boundaries", label: "Boundaries" },
];

export const ageGroups = [
  { value: "all", label: "All ages" },
  { value: "0-2", label: "0–2 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "6-8", label: "6–8 years" },
  { value: "9-12", label: "9–12 years" },
  { value: "13+", label: "13+" },
];
