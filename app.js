const avatarOptions = ['🧒', '👧', '🧑', '👩', '🧑‍🎓', '🧑‍💼', '🧑‍🔧', '🧑‍🏫'];
const boardSpaces = ['🏠', '💼', '🧾', '📈', '🎯', '🏁'];

const scenarioTemplates = [
  { name: "Student", description: "You’re balancing school and a limited income. Budget for books, food, transportation, and everyday expenses.", income: 1200, bills: 1000, taxes: 0, debt: 200, savings: 400, emergencyFund: 200, investments: 100, cash: 250, stress: 30 },
  { name: "Business Owner", description: "You’re running a business. Cover operating costs while making enough to support yourself. Income shown is your take-home pay after business costs and taxes; expenses are personal costs.", income: 3000, bills: 2500, taxes: 0, debt: 400, savings: 1500, emergencyFund: 1000, investments: 1000, cash: 700, stress: 60 },
  { name: "Blue Collar Worker", description: "You work a hands-on job. Balance everyday bills, transportation, work gear, and unexpected expenses.", income: 3600, bills: 3200, taxes: 150, debt: 1500, savings: 50, emergencyFund: 600, investments: 500, cash: 500, stress: 55 },
  { name: "Employee", description: "You earn a regular paycheck. Balance monthly bills, savings, and your longer-term goals.", income: 3200, bills: 2400, taxes: 0, debt: 60, savings: 500, emergencyFund: 400, investments: 300, cash: 800, stress: 30 },
];

const mindsetModifiers = {
  saver: { emergencyFund: 1.5, cash: 1.2, savings: 1.5, debt: 0.75, investments: 0.8, income: 0.95, bills: 0.9, stress: 0.75 },
  builder: { emergencyFund: 1.1, cash: 1.1, savings: 1.2, debt: 0.9, investments: 1.4, income: 1.05, bills: 1.0, stress: 1.0 },
  risk: { emergencyFund: 0.6, cash: 0.8, savings: 0.7, debt: 1.25, investments: 2.0, income: 1.15, bills: 1.1, stress: 1.3 },
};

const eventTemplates = [
  {
    title: 'First job offer',
    description: 'A local business offers you a steady role with room to grow.',
    choices: [
      { text: 'Take the job and start earning more every year', icon: '💼', effects: { income: 9000, cash: 2500, savings: 1000, score: 18 } },
      { text: 'Keep your current job and build side skills', icon: '🛠️', effects: { income: 2000, savings: 1500, stress: -6, score: 12 } },
      { text: 'Skip it to focus on school and a cheaper lifestyle', icon: '🎓', effects: { stress: -12, cash: 400, savings: 1200, score: 10 } }
    ]
  },
  {
    title: 'Car repair bill',
    description: 'Your transportation needs a surprise repair before the month ends.',
    choices: [
      { text: 'Use savings to fix it fast', icon: '💸', effects: { savings: -1800, cash: -600, stress: 8, score: 4 } },
      { text: 'Borrow from a friend and pay it back slowly', icon: '🤝', effects: { debt: 1200, stress: 6, score: 5 } },
      { text: 'Delay repairs and ride share more often', icon: '🚗', effects: { cash: -500, stress: 10, score: 2 } }
    ]
  },
  {
    title: 'Tax refund surprise',
    description: 'Your tax return comes back bigger than expected.',
    choices: [
      { text: 'Put it straight into savings', icon: '🏦', effects: { savings: 2200, score: 20 } },
      { text: 'Pay down debt and free up monthly cash', icon: '✂️', effects: { debt: -1800, cash: 800, score: 18 } },
      { text: 'Spend it on a learning course', icon: '📚', effects: { investments: 1500, income: 3000, stress: -4, score: 16 } }
    ]
  },
  {
    title: 'Market boom',
    description: 'The investment market is climbing, and your account is warming up.',
    choices: [
      { text: 'Keep investing every month', icon: '📈', effects: { investments: 3500, income: 1500, score: 24 } },
      { text: 'Pull some money out and buy essentials', icon: '🛒', effects: { cash: 2200, investments: -1200, stress: -4, score: 14 } },
      { text: 'Wait and watch the market', icon: '👀', effects: { cash: 500, stress: -8, score: 10 } }
    ]
  },
  {
    title: 'Rent increase',
    description: 'Your landlord raises the monthly rent and your budget tightens.',
    choices: [
      { text: 'Move to a cheaper place', icon: '📦', effects: { bills: -260, savings: 900, stress: -8, score: 17 } },
      { text: 'Take on a roommate to share costs', icon: '👥', effects: { cash: 600, savings: 1000, stress: -6, score: 15 } },
      { text: 'Stay and cut extra spending', icon: '✂️', effects: { cash: -300, stress: 12, score: 8 } }
    ]
  },
  {
    title: 'Scholarship opportunity',
    description: 'A program wants to support your future education and career training.',
    choices: [
      { text: 'Take the scholarship and keep building skills', icon: '🎓', effects: { income: 6000, investments: 1200, stress: -12, score: 22 } },
      { text: 'Use part of it to lower debt', icon: '💳', effects: { debt: -2400, cash: 1150, score: 20 } },
      { text: 'Save it as a safety net', icon: '💼', effects: { savings: 2800, stress: -4, score: 15 } }
    ]
  },
  {
    title: 'Family emergency',
    description: 'A family expense lands right when money feels tight.',
    choices: [
      { text: 'Help immediately with a cash transfer', icon: '🤲', effects: { cash: -1500, savings: -1000, stress: 16, score: 4 } },
      { text: 'Offer time and a smaller payment plan', icon: '🕒', effects: { cash: -400, stress: 8, score: 9 } },
      { text: 'Set a firm limit and protect your budget', icon: '🚫', effects: { stress: -6, score: 12 } }
    ]
  },
  {
    title: 'Side hustle win',
    description: 'A small business project starts bringing in extra cash each month.',
    choices: [
      { text: 'Grow the side hustle and reinvest profits', icon: '🚀', effects: { income: 4500, investments: 2300, score: 25 } },
      { text: 'Use the bonus to pay off debt fast', icon: '🏦', effects: { debt: -2700, cash: 1400, score: 20 } },
      { text: 'Save it as a buffer for emergencies', icon: '🧰', effects: { savings: 2600, score: 18 } }
    ]
  },
  {
    title: 'Medical expense',
    description: 'An unexpected medical bill arrives while your budget is already stretched.',
    choices: [
      { text: 'Pay the bill from savings', icon: '🏥', effects: { savings: -3200, cash: -500, stress: 10, score: 5 } },
      { text: 'Use a payment plan and protect your savings', icon: '🧾', effects: { debt: 2800, stress: 8, score: 8 } },
      { text: 'Delay care and keep the cash for now', icon: '⏳', effects: { cash: 300, stress: 20, score: 1 } }
    ]
  },
  {
    title: 'Predatory loan offer',
    description: 'A lender promises quick cash, but the interest could follow you for years.',
    choices: [
      { text: 'Take the loan to solve today\'s problem', icon: '💳', effects: { cash: 4200, debt: 6500, stress: 14, score: 2 } },
      { text: 'Sell investments and avoid new debt', icon: '📉', effects: { investments: -2600, cash: 2300, stress: 6, score: 10 } },
      { text: 'Cut spending and wait it out', icon: '✂️', effects: { cash: -900, stress: 12, score: 14 } }
    ]
  },
  {
    title: 'Job uncertainty',
    description: 'Your employer announces layoffs and asks you to choose how to respond.',
    choices: [
      { text: 'Pay for training to become harder to replace', icon: '📚', effects: { cash: -1200, investments: 1800, income: 5500, stress: 8, score: 18 } },
      { text: 'Build a three-month emergency reserve', icon: '🛡️', effects: { savings: 1800, cash: -700, stress: -4, score: 16 } },
      { text: 'Take overtime and burn out for extra pay', icon: '⚡', effects: { income: 7000, cash: 900, stress: 22, score: 8 } }
    ]
  },
  {
    title: 'Insurance renewal',
    description: 'Your insurance premium jumps, forcing a choice between protection and monthly cash flow.',
    choices: [
      { text: 'Keep full coverage and pay the higher bill', icon: '🛡️', effects: { cash: -600, savings: -400, stress: 3, score: 12 } },
      { text: 'Raise the deductible and save monthly cash', icon: '⚖️', effects: { savings: 700, stress: 8, score: 14 } },
      { text: 'Cancel coverage and take the risk', icon: '🎲', effects: { cash: 900, stress: 18, score: 3 } }
    ]
  },
  {
    title: 'Family request',
    description: 'Someone close to you needs help, but giving too much could derail your own plan.',
    choices: [
      { text: 'Send a large transfer immediately', icon: '🤲', effects: { cash: -2200, savings: -1200, stress: 16, score: 5 } },
      { text: 'Give a smaller amount with a clear limit', icon: '🤝', effects: { cash: -700, stress: 8, score: 12 } },
      { text: 'Decline and protect your emergency fund', icon: '🚫', effects: { stress: -4, score: 15 } }
    ]
  },
  {
    title: 'Investment warning',
    description: 'A market drop threatens your investments just as a major bill is due.',
    choices: [
      { text: 'Sell investments before the drop gets worse', icon: '📉', effects: { investments: -1800, cash: 1300, stress: 6, score: 9 } },
      { text: 'Hold steady and protect your long-term plan', icon: '📈', effects: { stress: 14, score: 18 } },
      { text: 'Borrow money to buy more at the low price', icon: '🎯', effects: { debt: 3000, investments: 4200, stress: 20, score: 10 } }
    ]
  },
  {
    title: 'Housing decision',
    description: 'You can lock in a new home, but the move changes your debt and monthly cash flow.',
    choices: [
      { text: 'Sign the lease and pay moving costs', icon: '🏠', effects: { cash: -1800, savings: -800, stress: 12, score: 8 } },
      { text: 'Share a place and accelerate savings', icon: '👥', effects: { savings: 1700, stress: 5, score: 17 } },
      { text: 'Stay put and negotiate with the landlord', icon: '📞', effects: { cash: -300, savings: 400, stress: 8, score: 13 } }
    ]
  },
  {
    title: 'Emergency car failure',
    description: 'Your car fails before an important week. Every option costs money, but one protects your future cash flow better.',
    choices: [
      { text: 'Pay for the full repair today', icon: '🔧', effects: { cash: -1400, savings: -900, stress: 10, score: 8 } },
      { text: 'Use a mechanic payment plan', icon: '🧾', effects: { cash: -350, debt: 1900, stress: 14, score: 6 } },
      { text: 'Replace it with a reliable used car', icon: '🚙', effects: { cash: -900, debt: 3600, stress: 8, score: 10 } }
    ]
  },
  {
    title: 'Tax deadline',
    description: 'A tax balance is due now. You must pay, borrow, or liquidate part of your plan to stay current.',
    choices: [
      { text: 'Pay the balance from savings', icon: '🏦', effects: { savings: -2400, cash: -500, stress: 8, score: 12 } },
      { text: 'Put the balance on a payment plan', icon: '💳', effects: { cash: -250, debt: 3000, stress: 12, score: 7 } },
      { text: 'Sell investments to cover the bill', icon: '📉', effects: { investments: -2100, cash: -300, stress: 6, score: 10 } }
    ]
  },
  {
    title: 'Utility shutoff warning',
    description: 'A past-due utility bill must be handled before service is interrupted. Every option reduces your resources.',
    choices: [
      { text: 'Pay the full balance immediately', icon: '💡', effects: { cash: -850, stress: 6, score: 9 } },
      { text: 'Borrow from your emergency fund', icon: '🧰', effects: { savings: -1100, stress: 8, score: 8 } },
      { text: 'Accept a late fee and payment plan', icon: '📅', effects: { cash: -300, debt: 900, stress: 13, score: 5 } }
    ]
  },
  {
    title: 'Burnout warning',
    description: 'Your body and mind are asking for a break, but taking time off could slow your financial progress.',
    choices: [
      { text: 'Take a real break and recover', icon: '🌿', effects: { income: -1800, cash: -500, health: 18, relationships: 8, purpose: 10, stress: -20, score: 12 } },
      { text: 'Keep working and schedule a short weekend reset', icon: '⏱️', effects: { income: 2200, health: -10, relationships: -6, purpose: 2, stress: 14, score: 8 } },
      { text: 'Ask for help and reduce your workload', icon: '🫶', effects: { income: -900, health: 10, relationships: 14, purpose: 8, stress: -12, score: 15 } }
    ]
  },
  {
    title: 'Friend in need',
    description: 'A close friend needs support during a difficult month, and your choice will shape the relationship.',
    choices: [
      { text: 'Offer money you cannot easily spare', icon: '💛', effects: { cash: -900, savings: -400, health: -2, relationships: 18, purpose: 12, stress: 8, score: 10 } },
      { text: 'Offer your time instead of money', icon: '🤝', effects: { health: -4, relationships: 12, purpose: 10, stress: 5, score: 13 } },
      { text: 'Set a boundary and explain honestly', icon: '🗣️', effects: { relationships: -4, purpose: 8, stress: -4, score: 14 } }
    ]
  },
  {
    title: 'Career values test',
    description: 'A higher-paying role conflicts with your values and leaves less time for the people you care about.',
    choices: [
      { text: 'Take the promotion and accept the pressure', icon: '🏆', effects: { income: 8500, health: -12, relationships: -10, purpose: -6, stress: 18, score: 12 } },
      { text: 'Decline and protect your balance', icon: '⚖️', effects: { income: -1200, health: 10, relationships: 8, purpose: 16, stress: -10, score: 18 } },
      { text: 'Negotiate a smaller raise with flexible hours', icon: '📝', effects: { income: 2800, health: 5, relationships: 5, purpose: 10, stress: 2, score: 20 } }
    ]
  },
  {
    title: 'Community commitment',
    description: 'Your neighborhood needs help, but volunteering takes time and may reduce your available income.',
    choices: [
      { text: 'Volunteer regularly and give up paid hours', icon: '🌎', effects: { income: -1600, health: 6, relationships: 16, purpose: 20, stress: 2, score: 17 } },
      { text: 'Make a small donation and keep working', icon: '🎁', effects: { cash: -450, relationships: 6, purpose: 10, score: 13 } },
      { text: 'Focus on stabilizing your own household', icon: '🏠', effects: { health: 4, relationships: -3, purpose: 4, stress: -6, score: 11 } }
    ]
  },
  {
    title: 'Contract canceled',
    description: 'Your main contract disappears without warning. Every response damages your earning power, and one bad choice can end the run.',
    choices: [
      { text: 'Pay for an emergency transition program', icon: '🧑‍💼', effects: { income: -50000, cash: -900, health: -8, purpose: 4, stress: 20, score: 4 } },
      { text: 'Take a costly bridge loan while searching', icon: '💳', effects: { income: -36000, debt: 4800, cash: 900, relationships: -4, stress: 18, score: 3 } },
      { text: 'Leave the field and start over elsewhere', icon: '🧭', effects: { income: -34000, cash: -500, health: 5, relationships: 4, purpose: 14, stress: 10, score: 9 } }
    ]
  }
];

const elements = {
  selectedAvatar: document.getElementById('selectedAvatar'),
  // live game elements
  liveGameView: document.getElementById('liveGameView'),
  liveScoreBadge: document.getElementById('liveScoreBadge'),
  liveCashCount: document.getElementById('liveCashCount'),
  liveMissionText: document.getElementById('liveMissionText'),
  liveProgressFill: document.getElementById('liveProgressFill'),
  liveDecisionModal: document.getElementById('liveDecisionModal'),
  jumpBtn: document.getElementById('jumpBtn'),
  collectBtn: document.getElementById('collectBtn'),
  marioPlayer: document.getElementById('marioPlayer'),
  livePromptTitle: document.getElementById('livePromptTitle'),
  livePromptText: document.getElementById('livePromptText'),
  livePromptChoices: document.getElementById('livePromptChoices'),
  moralOverallValue: document.getElementById('moralOverallValue'),
  moralOverallFill: document.getElementById('moralOverallFill'),
  healthValue: document.getElementById('healthValue'),
  healthFill: document.getElementById('healthFill'),
  relationshipsValue: document.getElementById('relationshipsValue'),
  relationshipsFill: document.getElementById('relationshipsFill'),
  academicsValue: document.getElementById('academicsValue'),
  academicsFill: document.getElementById('academicsFill')
};

const statsView = document.getElementById('statsView');
const playAgainBtn = document.getElementById('playAgainBtn');
const finalTitle = document.getElementById('finalTitle');
const finalSummaryEl = document.getElementById('finalSummary');
const finalNetFill = document.getElementById('finalNetFill');
const finalDetails = document.getElementById('finalDetails');

// containers for visual effects
const toastContainer = document.getElementById('toastContainer');
const confettiContainer = document.getElementById('confettiContainer');
const eventIconEl = document.getElementById('eventIcon');
const eventShortEl = document.getElementById('eventShort');
const eventDetailEl = document.getElementById('eventText');

const state = {
  avatar: avatarOptions[0],
  score: 0,
  turn: 0,
  maxTurns: 6,
  stats: null,
  currentEvent: null,
  started: false,
  currentScenario: null,
  isAwaitingDecision: false,
  recentEvents: []
};

let liveCash = 0;
let liveProgress = 0;
let liveX = 80;
let livePathStep = 0;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(Math.round(value));
}

// Use the setup screen's monthly take-home amounts and mindset multipliers.
// Optional arguments let callers select a story rather than randomizing it.
function createStarterScenario(situationName, style = 'saver') {
  const base = scenarioTemplates.find((scenario) => scenario.name === situationName)
    || scenarioTemplates[Math.floor(Math.random() * scenarioTemplates.length)];
  const modifiers = mindsetModifiers[style] || mindsetModifiers.saver;
  const scenario = {
    ...base,
    label: base.name,
    incomePeriod: 'monthly',
    incomeBasis: 'take-home',
    billsPeriod: 'monthly'
  };
  Object.keys(modifiers).forEach((key) => {
    scenario[key] = Math.round(base[key] * modifiers[key]);
  });
  scenario.stress = clamp(scenario.stress, 0, 100);
  return scenario;
}

function renderStarterStats() {
  const scenario = state.currentScenario || createStarterScenario();
  state.currentScenario = scenario;

  const items = [
    ['Take-home income / month', formatCurrency(scenario.income)],
    ['Expenses / month', formatCurrency(scenario.bills)],
    ['Taxes', formatCurrency(scenario.taxes)],
    ['Debt', formatCurrency(scenario.debt)],
    ['Savings', formatCurrency(scenario.savings)],
    ['Investments', formatCurrency(scenario.investments)],
    ['Emergency Fund', formatCurrency(scenario.emergencyFund)]
  ];

  elements.starterStats.innerHTML = items
    .map(([label, value]) => `<div class="mini-stat"><strong>${label}</strong><br>${value}</div>`)
    .join('');
}

function renderAvatarPicker() {
  elements.avatarPicker.innerHTML = avatarOptions
    .map(
      (icon) => `
        <button type="button" class="avatar-option ${icon === state.avatar ? 'selected' : ''}" data-avatar="${icon}" aria-label="Use avatar ${icon}">
          ${icon}
        </button>
      `
    )
    .join('');

  elements.avatarPicker.querySelectorAll('.avatar-option').forEach((button) => {
    button.addEventListener('click', () => {
      state.avatar = button.dataset.avatar;
      elements.selectedAvatar.textContent = state.avatar;
      renderAvatarPicker();
    });
  });
}

function renderBoard() {
  return;
}

function animateTokenToSpace(index) {
  const leftPercent = 10 + index * 17;
  const bottomVal = index === boardSpaces.length - 1 ? '24px' : '18px';
  elements.tokenMarker.style.left = `${leftPercent}%`;
  elements.tokenMarker.style.bottom = bottomVal;
  elements.tokenMarker.classList.add('pop');
  setTimeout(() => elements.tokenMarker.classList.remove('pop'), 260);
}

function updateTrackerText() {
  if (!state.stats) return;
  const trackerText = document.getElementById('liveMissionText');
  if (!trackerText) return;

  if (state.stats.debt > 25000) {
    trackerText.textContent = 'Debt is holding your progress back. Attack it before it grows bigger.';
  } else if (state.stats.savings >= 10000) {
    trackerText.textContent = 'Your emergency cushion is strong. Keep growing your future wealth.';
  } else if (state.stats.income >= 70000) {
    trackerText.textContent = 'Your income is climbing. Keep building stability and smarter habits.';
  } else if (state.stats.stress >= 70) {
    trackerText.textContent = 'Stress is high. Protect your budget and focus on cash flow.';
  } else {
    trackerText.textContent = 'Build momentum by staying steady, saving early, and avoiding debt traps.';
  }
}

function updateHud() {
  if (!state.stats) return;
  updateTrackerText();
  updateLiveGameHud();
}

// previous stats for diff-based animations
state.prevStats = null;

function animateStatChange(key, delta) {
  try {
    const map = { cash: 'cashValue', debt: 'debtValue', income: 'incomeValue', savings: 'savingsValue', investments: 'investmentValue', stress: 'stressValue' };
    const el = document.getElementById(map[key]);
    if (!el) return;
    el.classList.remove('flash-up', 'flash-down');
    void el.offsetWidth;
    el.classList.add(delta >= 0 ? 'flash-up' : 'flash-down');
    setTimeout(() => el.classList.remove('flash-up', 'flash-down'), 900);
  } catch (e) {}
}

function appendStory(message) {
  const storyLog = document.getElementById('storyLog');
  if (!storyLog) return;
  const entry = document.createElement('div');
  entry.className = 'story-entry';
  entry.textContent = message;
  storyLog.prepend(entry);

  while (storyLog.children.length > 6) {
    storyLog.removeChild(storyLog.lastChild);
  }
}

function showToast(message, duration = 2200) {
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

function triggerShake(target) {
  if (!target) return;
  target.classList.remove('shake');
  void target.offsetWidth;
  target.classList.add('shake');
  setTimeout(() => target.classList.remove('shake'), 560);
}

function launchConfetti(count = 18) {
  if (!confettiContainer) return;
  const colors = ['#ff6b6b', '#ffd166', '#4ecdc4', '#5b8def'];
  for (let index = 0; index < count; index += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.animationDelay = `${Math.random() * 180}ms`;
    confettiContainer.appendChild(piece);
    setTimeout(() => piece.remove(), 1500);
  }
}

function applyChoiceEffects(effects) {
  // apply diffs and animate stat changes
  const keys = ['cash', 'debt', 'income', 'savings', 'investments', 'stress'];
  const deltas = {};
  keys.forEach(k => {
    const before = state.stats[k] ?? 0;
    const change = effects[k] ?? 0;
    deltas[k] = change;
    // apply
    if (k === 'debt') {
      state.stats.debt = Math.max(0, before + change);
    } else if (k === 'savings' || k === 'investments') {
      state.stats[k] = Math.max(0, before + change);
    } else if (k === 'cash') {
      state.stats.cash = before + change;
    } else if (k === 'income') {
      state.stats.income = before + change;
    } else if (k === 'stress') {
      state.stats.stress = clamp(before + change, 0, 100);
    }
  });

  const moralEffects = {
    health: effects.health ?? Math.round(-(effects.stress ?? 0) * 0.35 + ((effects.cash ?? 0) < 0 ? -1 : (effects.cash ?? 0) > 0 ? 1 : 0)),
    relationships: effects.relationships ?? ((effects.cash ?? 0) < 0 && (effects.stress ?? 0) > 0 ? -2 : (effects.cash ?? 0) > 0 ? 1 : 0),
    purpose: effects.purpose ?? Math.round((effects.score ?? 0) / 8 - ((effects.debt ?? 0) > 0 ? 2 : 0))
  };

  Object.entries(moralEffects).forEach(([key, change]) => {
    const before = state.stats[key] ?? 0;
    state.stats[key] = clamp(before + change, 0, 100);
    if (change !== 0) animateStatChange(key, change);
  });

  const scoreBefore = state.score;
  state.score = Math.max(0, state.score + (effects.score ?? 0));

  // animate changed stats
  for (const k in deltas) {
    if ((deltas[k] ?? 0) !== 0) animateStatChange(k, deltas[k]);
  }
  if ((effects.score ?? 0) !== 0) {
    // small badge flash
    const sb = elements.scoreBadge;
    if (sb) {
      sb.classList.add(effects.score > 0 ? 'flash-up' : 'flash-down');
      setTimeout(() => sb.classList.remove('flash-up', 'flash-down'), 900);
    }
  }

  // visual reactions: big wins vs hits
  const bigWin = (effects.score ?? 0) >= 20 || (effects.income ?? 0) >= 3000 || (effects.investments ?? 0) >= 2000;
  const bigLoss = (effects.savings ?? 0) < -1000 || (effects.debt ?? 0) > 1500 || (effects.cash ?? 0) < -1200 || (effects.stress ?? 0) >= 12;

  if (bigWin) {
    showToast('Big win!', 2200);
    launchConfetti(18);
  } else if (bigLoss) {
    showToast('Tough hit...', 2200);
    triggerShake(elements.boardTrack);
  }

  updateHud();
}

function hasNegativeIncome() {
  return state.stats && state.stats.income < 0;
}

function hasNegativeCash() {
  return state.stats && state.stats.cash < 0;
}

function getRandomEvent() {
  const available = eventTemplates.filter((event) => !state.recentEvents.includes(event.title));
  const pool = available.length ? available : eventTemplates;
  const event = pool[Math.floor(Math.random() * pool.length)];
  state.recentEvents = [...state.recentEvents, event.title].slice(-3);
  return event;
}

function hasReachedFinishLine() {
  return livePathStep >= state.maxTurns;
}

function renderLivePrompt(event, options = []) {
  if (!event) return;

  if (elements.livePromptTitle) {
    elements.livePromptTitle.textContent = event.title;
  }
  if (elements.livePromptText) {
    elements.livePromptText.textContent = event.description;
  }
  if (!elements.livePromptChoices) return;

  // Freeze player movement until a decision is made
  state.isAwaitingDecision = true;
  if (elements.liveDecisionModal) elements.liveDecisionModal.classList.add('is-visible');
  elements.livePromptChoices.innerHTML = '';
  const choices = options.length ? options : (event.choices || []);

  choices.forEach((choice) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'live-choice-btn';
    btn.textContent = `${choice.icon || '🎯'} ${choice.text}`;
    btn.addEventListener('click', () => {
      // Allow player to move again after making a decision
      state.isAwaitingDecision = false;
      if (elements.liveDecisionModal) elements.liveDecisionModal.classList.remove('is-visible');
      if (typeof choice.effects === 'object') {
        applyChoiceEffects(choice.effects);
      }
      appendStory(`Future Builder chose: ${choice.text}`);
      if (hasNegativeIncome() || hasNegativeCash()) {
        const outcome = hasNegativeCash() ? 'cash-loss' : 'income-loss';
        setTimeout(() => finishGame(outcome), 420);
        return;
      }
      state.turn += 1;
      livePathStep = clamp(livePathStep + getChoiceMovement(choice.effects), 0, state.maxTurns);
      updateLiveGameHud();
      if (hasReachedFinishLine()) {
        setTimeout(() => finishGame(), 420);
        return;
      }
      setTimeout(() => renderEvent(), 420);
    });
    elements.livePromptChoices.appendChild(btn);
  });
}

function renderEvent() {
  const event = getRandomEvent();
  state.currentEvent = event;

  if (eventIconEl) eventIconEl.textContent = event.icon || '🎲';
  if (eventShortEl) eventShortEl.textContent = event.description.slice(0, 64) + (event.description.length > 64 ? '…' : '');
  if (eventDetailEl) eventDetailEl.textContent = event.description;

  renderLivePrompt(event, event.choices);

}

function startGame() {
  const scenario = state.currentScenario || createStarterScenario();
  state.started = true;
  state.turn = 0;
  state.score = 0;
  state.recentEvents = [];
  state.stats = {
    cash: scenario.cash,
    debt: scenario.debt,
    income: scenario.income,
    savings: scenario.savings,
    emergencyFund: scenario.emergencyFund ?? 0,
    investments: scenario.investments,
    stress: scenario.stress,
    health: 72,
    relationships: 68,
    purpose: 65
  };

  appendStory(`Future Builder started a new life game with ${scenario.label.toLowerCase()}.`);
  appendStory('Goal: build a safer financial future and avoid money traps.');

  // Reset live game state
  liveX = 80;
  liveCash = 0;
  liveProgress = 0;
  livePathStep = 0;

  if (statsView) statsView.classList.add('hidden');
  if (elements.liveGameView) elements.liveGameView.classList.remove('hidden');

  // Initialize live game displays
  updateHud();
  updateLiveGameHud();
  renderEvent();
}

function finishGame(outcome = 'complete') {
  const summary = state.stats.cash + state.stats.savings + (state.stats.emergencyFund ?? 0) + state.stats.investments - state.stats.debt;
  const finishText = outcome === 'cash-loss'
    ? 'Your cash balance fell below zero, so the run ends here. Protect your cash flow and try again.'
    : outcome === 'income-loss'
    ? 'Your income fell below zero, so the run ends here. Rebuild your income foundation and try again.'
    : summary >= 50000
    ? 'You finished with a strong cushion and a healthier future. Your money habits are setting you up for long-term success.'
    : summary >= 0
      ? 'You finished with some stability, but there is still room to grow your savings and reduce stress.'
      : 'This run was tough, but every challenge taught you something valuable about protecting cash flow and controlling debt.';
      
  if (elements.liveGameView) elements.liveGameView.classList.add('hidden');
  if (statsView) statsView.classList.remove('hidden');
  launchConfetti(25);
  showToast('Journey complete!', 3000);

  if (finalTitle) finalTitle.textContent = outcome === 'cash-loss'
    ? 'Game over: cash ran out'
    : outcome === 'income-loss'
      ? 'Game over: income collapsed'
      : 'Adventure complete!';
  if (finalSummaryEl) finalSummaryEl.textContent = `${finishText} Final net worth: ${formatCurrency(summary)}.`;
  try {
    const pct = clamp(Math.round((summary / 100000) * 100), 0, 100);
    if (finalNetFill) finalNetFill.style.width = `${pct}%`;
    if (finalDetails) {
      const moral = ['health', 'relationships', 'purpose'].map((key) => Math.round(state.stats[key]));
      const overall = Math.round(moral.reduce((total, value) => total + value, 0) / moral.length);
      const details = [
        ['Cash', formatCurrency(state.stats.cash)],
        ['Income', formatCurrency(state.stats.income)],
        ['Debt', formatCurrency(state.stats.debt)],
        ['Savings', formatCurrency(state.stats.savings)],
        ['Investments', formatCurrency(state.stats.investments)],
        ['Life balance', `${overall}%`],
        ['Health', `${moral[0]}%`],
        ['Relationships', `${moral[1]}%`],
        ['Academics', `${moral[2]}%`]
      ];
      finalDetails.innerHTML = details
        .map(([label, value]) => `<div class="summary-stat-card"><span>${label}</span><strong>${value}</strong></div>`)
        .join('');
    }
  } catch (e) {}

  if (profileScore) profileScore.textContent = `Score ${state.score}`;
  if (profileSummary) profileSummary.textContent = `Final net worth ${formatCurrency(summary)}. Life balance ${Math.round((state.stats.health + state.stats.relationships + state.stats.purpose) / 3)}%.`;

  if (elements.trackerText) elements.trackerText.textContent = outcome === 'income-loss'
    ? 'Income dropped below zero. Replay and protect your earning power.'
    : 'Your story is complete. Replay to try a different money strategy.';
  if (elements.turnLabel) elements.turnLabel.textContent = 'Final turn';
  if (elements.scoreBadge) elements.scoreBadge.textContent = `Final ${state.score}`;
}

function updateLiveMiniStats() {
  const miniMap = {
    cash: document.getElementById('miniCashStat'),
    debt: document.getElementById('miniDebtStat'),
    income: document.getElementById('miniIncomeStat'),
    savings: document.getElementById('miniSavingsStat'),
    invest: document.getElementById('miniInvestStat'),
    stress: document.getElementById('miniStressStat')
  };

  if (!state.stats) return;
  if (miniMap.cash) miniMap.cash.textContent = formatCurrency(state.stats.cash);
  if (miniMap.debt) miniMap.debt.textContent = formatCurrency(state.stats.debt);
  if (miniMap.income) miniMap.income.textContent = formatCurrency(state.stats.income);
  if (miniMap.savings) miniMap.savings.textContent = formatCurrency(state.stats.savings);
  if (miniMap.invest) miniMap.invest.textContent = formatCurrency(state.stats.investments);
  if (miniMap.stress) miniMap.stress.textContent = String(Math.round(state.stats.stress));

  const moral = ['health', 'relationships', 'purpose'].map((key) => clamp(state.stats[key] ?? 0, 0, 100));
  const overall = Math.round(moral.reduce((total, value) => total + value, 0) / moral.length);
  const moralRows = [
    ['health', elements.healthValue, elements.healthFill],
    ['relationships', elements.relationshipsValue, elements.relationshipsFill],
    ['purpose', elements.academicsValue, elements.academicsFill]
  ];
  moralRows.forEach(([key, valueEl, fillEl]) => {
    const value = Math.round(clamp(state.stats[key] ?? 0, 0, 100));
    if (valueEl) valueEl.textContent = String(value);
    if (fillEl) fillEl.style.width = `${value}%`;
  });
  if (elements.moralOverallValue) elements.moralOverallValue.textContent = String(overall);
  if (elements.moralOverallFill) elements.moralOverallFill.style.width = `${overall}%`;
}

function updateLiveGameHud() {
  if (elements.liveScoreBadge) elements.liveScoreBadge.textContent = `Score ${state.score || 0}`;
  if (state.stats) liveCash = state.stats.cash;
  if (elements.liveCashCount) elements.liveCashCount.textContent = formatCurrency(liveCash);
  liveProgress = state.maxTurns ? (livePathStep / state.maxTurns) * 100 : 0;
  liveX = 80 + (700 * liveProgress) / 100;
  if (elements.liveProgressFill) elements.liveProgressFill.style.width = `${liveProgress}%`;
  updateLiveMiniStats();
  if (elements.marioPlayer) {
    elements.marioPlayer.style.left = `${liveX}px`;
  }
}

function getChoiceMovement(effects = {}) {
  const costsMoney = (effects.cash ?? 0) < 0 || (effects.savings ?? 0) < 0 || (effects.investments ?? 0) < 0;
  const addsDebt = (effects.debt ?? 0) > 0;
  return costsMoney || addsDebt ? -1 : 1;
}

// Play again
if (playAgainBtn) playAgainBtn.addEventListener('click', () => {
  startGame();
});

startGame();
const avatarOptions = ['🧒', '👧', '🧑', '👩', '🧑‍🎓', '🧑‍💼', '🧑‍🔧', '🧑‍🏫'];
const boardSpaces = ['🏠', '💼', '🧾', '📈', '🎯', '🏁'];

const scenarioTemplates = [
  { name: "Student", description: "You’re balancing school and a limited income. Budget for books, food, transportation, and everyday expenses.", income: 1200, bills: 1000, taxes: 0, debt: 200, savings: 400, emergencyFund: 200, investments: 100, cash: 250, stress: 30 },
  { name: "Business Owner", description: "You’re running a business. Cover operating costs while making enough to support yourself. Income shown is your take-home pay after business costs and taxes; expenses are personal costs.", income: 3000, bills: 2500, taxes: 0, debt: 400, savings: 1500, emergencyFund: 1000, investments: 1000, cash: 700, stress: 60 },
  { name: "Blue Collar Worker", description: "You work a hands-on job. Balance everyday bills, transportation, work gear, and unexpected expenses.", income: 3600, bills: 3200, taxes: 150, debt: 1500, savings: 50, emergencyFund: 600, investments: 500, cash: 500, stress: 55 },
  { name: "Employee", description: "You earn a regular paycheck. Balance monthly bills, savings, and your longer-term goals.", income: 3200, bills: 2400, taxes: 0, debt: 60, savings: 500, emergencyFund: 400, investments: 300, cash: 800, stress: 30 },
];

const mindsetModifiers = {
  saver: { emergencyFund: 1.5, cash: 1.2, savings: 1.5, debt: 0.75, investments: 0.8, income: 0.95, bills: 0.9, stress: 0.75 },
  builder: { emergencyFund: 1.1, cash: 1.1, savings: 1.2, debt: 0.9, investments: 1.4, income: 1.05, bills: 1.0, stress: 1.0 },
  risk: { emergencyFund: 0.6, cash: 0.8, savings: 0.7, debt: 1.25, investments: 2.0, income: 1.15, bills: 1.1, stress: 1.3 },
};

const eventTemplates = [
  {
    title: 'First job offer',
    description: 'A local business offers you a steady role with room to grow.',
    choices: [
      { text: 'Take the job and start earning more every year', icon: '💼', effects: { income: 9000, cash: 2500, savings: 1000, score: 18 } },
      { text: 'Keep your current job and build side skills', icon: '🛠️', effects: { income: 2000, savings: 1500, stress: -6, score: 12 } },
      { text: 'Skip it to focus on school and a cheaper lifestyle', icon: '🎓', effects: { stress: -12, cash: 400, savings: 1200, score: 10 } }
    ]
  },
  {
    title: 'Car repair bill',
    description: 'Your transportation needs a surprise repair before the month ends.',
    choices: [
      { text: 'Use savings to fix it fast', icon: '💸', effects: { savings: -1800, cash: -600, stress: 8, score: 4 } },
      { text: 'Borrow from a friend and pay it back slowly', icon: '🤝', effects: { debt: 1200, stress: 6, score: 5 } },
      { text: 'Delay repairs and ride share more often', icon: '🚗', effects: { cash: -500, stress: 10, score: 2 } }
    ]
  },
  {
    title: 'Tax refund surprise',
    description: 'Your tax return comes back bigger than expected.',
    choices: [
      { text: 'Put it straight into savings', icon: '🏦', effects: { savings: 2200, score: 20 } },
      { text: 'Pay down debt and free up monthly cash', icon: '✂️', effects: { debt: -1800, cash: 800, score: 18 } },
      { text: 'Spend it on a learning course', icon: '📚', effects: { investments: 1500, income: 3000, stress: -4, score: 16 } }
    ]
  },
  {
    title: 'Market boom',
    description: 'The investment market is climbing, and your account is warming up.',
    choices: [
      { text: 'Keep investing every month', icon: '📈', effects: { investments: 3500, income: 1500, score: 24 } },
      { text: 'Pull some money out and buy essentials', icon: '🛒', effects: { cash: 2200, investments: -1200, stress: -4, score: 14 } },
      { text: 'Wait and watch the market', icon: '👀', effects: { cash: 500, stress: -8, score: 10 } }
    ]
  },
  {
    title: 'Rent increase',
    description: 'Your landlord raises the monthly rent and your budget tightens.',
    choices: [
      { text: 'Move to a cheaper place', icon: '📦', effects: { bills: -260, savings: 900, stress: -8, score: 17 } },
      { text: 'Take on a roommate to share costs', icon: '👥', effects: { cash: 600, savings: 1000, stress: -6, score: 15 } },
      { text: 'Stay and cut extra spending', icon: '✂️', effects: { cash: -300, stress: 12, score: 8 } }
    ]
  },
  {
    title: 'Scholarship opportunity',
    description: 'A program wants to support your future education and career training.',
    choices: [
      { text: 'Take the scholarship and keep building skills', icon: '🎓', effects: { income: 6000, investments: 1200, stress: -12, score: 22 } },
      { text: 'Use part of it to lower debt', icon: '💳', effects: { debt: -2400, cash: 1150, score: 20 } },
      { text: 'Save it as a safety net', icon: '💼', effects: { savings: 2800, stress: -4, score: 15 } }
    ]
  },
  {
    title: 'Family emergency',
    description: 'A family expense lands right when money feels tight.',
    choices: [
      { text: 'Help immediately with a cash transfer', icon: '🤲', effects: { cash: -1500, savings: -1000, stress: 16, score: 4 } },
      { text: 'Offer time and a smaller payment plan', icon: '🕒', effects: { cash: -400, stress: 8, score: 9 } },
      { text: 'Set a firm limit and protect your budget', icon: '🚫', effects: { stress: -6, score: 12 } }
    ]
  },
  {
    title: 'Side hustle win',
    description: 'A small business project starts bringing in extra cash each month.',
    choices: [
      { text: 'Grow the side hustle and reinvest profits', icon: '🚀', effects: { income: 4500, investments: 2300, score: 25 } },
      { text: 'Use the bonus to pay off debt fast', icon: '🏦', effects: { debt: -2700, cash: 1400, score: 20 } },
      { text: 'Save it as a buffer for emergencies', icon: '🧰', effects: { savings: 2600, score: 18 } }
    ]
  },
  {
    title: 'Medical expense',
    description: 'An unexpected medical bill arrives while your budget is already stretched.',
    choices: [
      { text: 'Pay the bill from savings', icon: '🏥', effects: { savings: -3200, cash: -500, stress: 10, score: 5 } },
      { text: 'Use a payment plan and protect your savings', icon: '🧾', effects: { debt: 2800, stress: 8, score: 8 } },
      { text: 'Delay care and keep the cash for now', icon: '⏳', effects: { cash: 300, stress: 20, score: 1 } }
    ]
  },
  {
    title: 'Predatory loan offer',
    description: 'A lender promises quick cash, but the interest could follow you for years.',
    choices: [
      { text: 'Take the loan to solve today\'s problem', icon: '💳', effects: { cash: 4200, debt: 6500, stress: 14, score: 2 } },
      { text: 'Sell investments and avoid new debt', icon: '📉', effects: { investments: -2600, cash: 2300, stress: 6, score: 10 } },
      { text: 'Cut spending and wait it out', icon: '✂️', effects: { cash: -900, stress: 12, score: 14 } }
    ]
  },
  {
    title: 'Job uncertainty',
    description: 'Your employer announces layoffs and asks you to choose how to respond.',
    choices: [
      { text: 'Pay for training to become harder to replace', icon: '📚', effects: { cash: -1200, investments: 1800, income: 5500, stress: 8, score: 18 } },
      { text: 'Build a three-month emergency reserve', icon: '🛡️', effects: { savings: 1800, cash: -700, stress: -4, score: 16 } },
      { text: 'Take overtime and burn out for extra pay', icon: '⚡', effects: { income: 7000, cash: 900, stress: 22, score: 8 } }
    ]
  },
  {
    title: 'Insurance renewal',
    description: 'Your insurance premium jumps, forcing a choice between protection and monthly cash flow.',
    choices: [
      { text: 'Keep full coverage and pay the higher bill', icon: '🛡️', effects: { cash: -600, savings: -400, stress: 3, score: 12 } },
      { text: 'Raise the deductible and save monthly cash', icon: '⚖️', effects: { savings: 700, stress: 8, score: 14 } },
      { text: 'Cancel coverage and take the risk', icon: '🎲', effects: { cash: 900, stress: 18, score: 3 } }
    ]
  },
  {
    title: 'Family request',
    description: 'Someone close to you needs help, but giving too much could derail your own plan.',
    choices: [
      { text: 'Send a large transfer immediately', icon: '🤲', effects: { cash: -2200, savings: -1200, stress: 16, score: 5 } },
      { text: 'Give a smaller amount with a clear limit', icon: '🤝', effects: { cash: -700, stress: 8, score: 12 } },
      { text: 'Decline and protect your emergency fund', icon: '🚫', effects: { stress: -4, score: 15 } }
    ]
  },
  {
    title: 'Investment warning',
    description: 'A market drop threatens your investments just as a major bill is due.',
    choices: [
      { text: 'Sell investments before the drop gets worse', icon: '📉', effects: { investments: -1800, cash: 1300, stress: 6, score: 9 } },
      { text: 'Hold steady and protect your long-term plan', icon: '📈', effects: { stress: 14, score: 18 } },
      { text: 'Borrow money to buy more at the low price', icon: '🎯', effects: { debt: 3000, investments: 4200, stress: 20, score: 10 } }
    ]
  },
  {
    title: 'Housing decision',
    description: 'You can lock in a new home, but the move changes your debt and monthly cash flow.',
    choices: [
      { text: 'Sign the lease and pay moving costs', icon: '🏠', effects: { cash: -1800, savings: -800, stress: 12, score: 8 } },
      { text: 'Share a place and accelerate savings', icon: '👥', effects: { savings: 1700, stress: 5, score: 17 } },
      { text: 'Stay put and negotiate with the landlord', icon: '📞', effects: { cash: -300, savings: 400, stress: 8, score: 13 } }
    ]
  },
  {
    title: 'Emergency car failure',
    description: 'Your car fails before an important week. Every option costs money, but one protects your future cash flow better.',
    choices: [
      { text: 'Pay for the full repair today', icon: '🔧', effects: { cash: -1400, savings: -900, stress: 10, score: 8 } },
      { text: 'Use a mechanic payment plan', icon: '🧾', effects: { cash: -350, debt: 1900, stress: 14, score: 6 } },
      { text: 'Replace it with a reliable used car', icon: '🚙', effects: { cash: -900, debt: 3600, stress: 8, score: 10 } }
    ]
  },
  {
    title: 'Tax deadline',
    description: 'A tax balance is due now. You must pay, borrow, or liquidate part of your plan to stay current.',
    choices: [
      { text: 'Pay the balance from savings', icon: '🏦', effects: { savings: -2400, cash: -500, stress: 8, score: 12 } },
      { text: 'Put the balance on a payment plan', icon: '💳', effects: { cash: -250, debt: 3000, stress: 12, score: 7 } },
      { text: 'Sell investments to cover the bill', icon: '📉', effects: { investments: -2100, cash: -300, stress: 6, score: 10 } }
    ]
  },
  {
    title: 'Utility shutoff warning',
    description: 'A past-due utility bill must be handled before service is interrupted. Every option reduces your resources.',
    choices: [
      { text: 'Pay the full balance immediately', icon: '💡', effects: { cash: -850, stress: 6, score: 9 } },
      { text: 'Borrow from your emergency fund', icon: '🧰', effects: { savings: -1100, stress: 8, score: 8 } },
      { text: 'Accept a late fee and payment plan', icon: '📅', effects: { cash: -300, debt: 900, stress: 13, score: 5 } }
    ]
  },
  {
    title: 'Burnout warning',
    description: 'Your body and mind are asking for a break, but taking time off could slow your financial progress.',
    choices: [
      { text: 'Take a real break and recover', icon: '🌿', effects: { income: -1800, cash: -500, health: 18, relationships: 8, purpose: 10, stress: -20, score: 12 } },
      { text: 'Keep working and schedule a short weekend reset', icon: '⏱️', effects: { income: 2200, health: -10, relationships: -6, purpose: 2, stress: 14, score: 8 } },
      { text: 'Ask for help and reduce your workload', icon: '🫶', effects: { income: -900, health: 10, relationships: 14, purpose: 8, stress: -12, score: 15 } }
    ]
  },
  {
    title: 'Friend in need',
    description: 'A close friend needs support during a difficult month, and your choice will shape the relationship.',
    choices: [
      { text: 'Offer money you cannot easily spare', icon: '💛', effects: { cash: -900, savings: -400, health: -2, relationships: 18, purpose: 12, stress: 8, score: 10 } },
      { text: 'Offer your time instead of money', icon: '🤝', effects: { health: -4, relationships: 12, purpose: 10, stress: 5, score: 13 } },
      { text: 'Set a boundary and explain honestly', icon: '🗣️', effects: { relationships: -4, purpose: 8, stress: -4, score: 14 } }
    ]
  },
  {
    title: 'Career values test',
    description: 'A higher-paying role conflicts with your values and leaves less time for the people you care about.',
    choices: [
      { text: 'Take the promotion and accept the pressure', icon: '🏆', effects: { income: 8500, health: -12, relationships: -10, purpose: -6, stress: 18, score: 12 } },
      { text: 'Decline and protect your balance', icon: '⚖️', effects: { income: -1200, health: 10, relationships: 8, purpose: 16, stress: -10, score: 18 } },
      { text: 'Negotiate a smaller raise with flexible hours', icon: '📝', effects: { income: 2800, health: 5, relationships: 5, purpose: 10, stress: 2, score: 20 } }
    ]
  },
  {
    title: 'Community commitment',
    description: 'Your neighborhood needs help, but volunteering takes time and may reduce your available income.',
    choices: [
      { text: 'Volunteer regularly and give up paid hours', icon: '🌎', effects: { income: -1600, health: 6, relationships: 16, purpose: 20, stress: 2, score: 17 } },
      { text: 'Make a small donation and keep working', icon: '🎁', effects: { cash: -450, relationships: 6, purpose: 10, score: 13 } },
      { text: 'Focus on stabilizing your own household', icon: '🏠', effects: { health: 4, relationships: -3, purpose: 4, stress: -6, score: 11 } }
    ]
  },
  {
    title: 'Contract canceled',
    description: 'Your main contract disappears without warning. Every response damages your earning power, and one bad choice can end the run.',
    choices: [
      { text: 'Pay for an emergency transition program', icon: '🧑‍💼', effects: { income: -50000, cash: -900, health: -8, purpose: 4, stress: 20, score: 4 } },
      { text: 'Take a costly bridge loan while searching', icon: '💳', effects: { income: -36000, debt: 4800, cash: 900, relationships: -4, stress: 18, score: 3 } },
      { text: 'Leave the field and start over elsewhere', icon: '🧭', effects: { income: -34000, cash: -500, health: 5, relationships: 4, purpose: 14, stress: 10, score: 9 } }
    ]
  }
];

const elements = {
  selectedAvatar: document.getElementById('selectedAvatar'),
  // live game elements
  liveGameView: document.getElementById('liveGameView'),
  liveScoreBadge: document.getElementById('liveScoreBadge'),
  liveCashCount: document.getElementById('liveCashCount'),
  liveMissionText: document.getElementById('liveMissionText'),
  liveProgressFill: document.getElementById('liveProgressFill'),
  liveDecisionModal: document.getElementById('liveDecisionModal'),
  jumpBtn: document.getElementById('jumpBtn'),
  collectBtn: document.getElementById('collectBtn'),
  marioPlayer: document.getElementById('marioPlayer'),
  livePromptTitle: document.getElementById('livePromptTitle'),
  livePromptText: document.getElementById('livePromptText'),
  livePromptChoices: document.getElementById('livePromptChoices'),
  moralOverallValue: document.getElementById('moralOverallValue'),
  moralOverallFill: document.getElementById('moralOverallFill'),
  healthValue: document.getElementById('healthValue'),
  healthFill: document.getElementById('healthFill'),
  relationshipsValue: document.getElementById('relationshipsValue'),
  relationshipsFill: document.getElementById('relationshipsFill'),
  academicsValue: document.getElementById('academicsValue'),
  academicsFill: document.getElementById('academicsFill')
};

const statsView = document.getElementById('statsView');
const playAgainBtn = document.getElementById('playAgainBtn');
const finalTitle = document.getElementById('finalTitle');
const finalSummaryEl = document.getElementById('finalSummary');
const finalNetFill = document.getElementById('finalNetFill');
const finalDetails = document.getElementById('finalDetails');

// containers for visual effects
const toastContainer = document.getElementById('toastContainer');
const confettiContainer = document.getElementById('confettiContainer');
const eventIconEl = document.getElementById('eventIcon');
const eventShortEl = document.getElementById('eventShort');
const eventDetailEl = document.getElementById('eventText');

const state = {
  avatar: avatarOptions[0],
  score: 0,
  turn: 0,
  maxTurns: 6,
  stats: null,
  currentEvent: null,
  started: false,
  currentScenario: null,
  isAwaitingDecision: false,
  recentEvents: []
};

let liveCash = 0;
let liveProgress = 0;
let liveX = 80;
let livePathStep = 0;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(Math.round(value));
}

// Use the setup screen's monthly take-home amounts and mindset multipliers.
// Optional arguments let callers select a story rather than randomizing it.
function createStarterScenario(situationName, style = 'saver') {
  const base = scenarioTemplates.find((scenario) => scenario.name === situationName)
    || scenarioTemplates[Math.floor(Math.random() * scenarioTemplates.length)];
  const modifiers = mindsetModifiers[style] || mindsetModifiers.saver;
  const scenario = {
    ...base,
    label: base.name,
    incomePeriod: 'monthly',
    incomeBasis: 'take-home',
    billsPeriod: 'monthly'
  };
  Object.keys(modifiers).forEach((key) => {
    scenario[key] = Math.round(base[key] * modifiers[key]);
  });
  scenario.stress = clamp(scenario.stress, 0, 100);
  return scenario;
}

function renderStarterStats() {
  const scenario = state.currentScenario || createStarterScenario();
  state.currentScenario = scenario;

  const items = [
    ['Take-home income / month', formatCurrency(scenario.income)],
    ['Expenses / month', formatCurrency(scenario.bills)],
    ['Taxes', formatCurrency(scenario.taxes)],
    ['Debt', formatCurrency(scenario.debt)],
    ['Savings', formatCurrency(scenario.savings)],
    ['Investments', formatCurrency(scenario.investments)],
    ['Emergency Fund', formatCurrency(scenario.emergencyFund)]
  ];

  elements.starterStats.innerHTML = items
    .map(([label, value]) => `<div class="mini-stat"><strong>${label}</strong><br>${value}</div>`)
    .join('');
}

function renderAvatarPicker() {
  elements.avatarPicker.innerHTML = avatarOptions
    .map(
      (icon) => `
        <button type="button" class="avatar-option ${icon === state.avatar ? 'selected' : ''}" data-avatar="${icon}" aria-label="Use avatar ${icon}">
          ${icon}
        </button>
      `
    )
    .join('');

  elements.avatarPicker.querySelectorAll('.avatar-option').forEach((button) => {
    button.addEventListener('click', () => {
      state.avatar = button.dataset.avatar;
      elements.selectedAvatar.textContent = state.avatar;
      renderAvatarPicker();
    });
  });
}

function renderBoard() {
  return;
}

function animateTokenToSpace(index) {
  const leftPercent = 10 + index * 17;
  const bottomVal = index === boardSpaces.length - 1 ? '24px' : '18px';
  elements.tokenMarker.style.left = `${leftPercent}%`;
  elements.tokenMarker.style.bottom = bottomVal;
  elements.tokenMarker.classList.add('pop');
  setTimeout(() => elements.tokenMarker.classList.remove('pop'), 260);
}

function updateTrackerText() {
  if (!state.stats) return;
  const trackerText = document.getElementById('liveMissionText');
  if (!trackerText) return;

  if (state.stats.debt > 25000) {
    trackerText.textContent = 'Debt is holding your progress back. Attack it before it grows bigger.';
  } else if (state.stats.savings >= 10000) {
    trackerText.textContent = 'Your emergency cushion is strong. Keep growing your future wealth.';
  } else if (state.stats.income >= 70000) {
    trackerText.textContent = 'Your income is climbing. Keep building stability and smarter habits.';
  } else if (state.stats.stress >= 70) {
    trackerText.textContent = 'Stress is high. Protect your budget and focus on cash flow.';
  } else {
    trackerText.textContent = 'Build momentum by staying steady, saving early, and avoiding debt traps.';
  }
}

function updateHud() {
  if (!state.stats) return;
  updateTrackerText();
  updateLiveGameHud();
}

// previous stats for diff-based animations
state.prevStats = null;

function animateStatChange(key, delta) {
  try {
    const map = { cash: 'cashValue', debt: 'debtValue', income: 'incomeValue', savings: 'savingsValue', investments: 'investmentValue', stress: 'stressValue' };
    const el = document.getElementById(map[key]);
    if (!el) return;
    el.classList.remove('flash-up', 'flash-down');
    void el.offsetWidth;
    el.classList.add(delta >= 0 ? 'flash-up' : 'flash-down');
    setTimeout(() => el.classList.remove('flash-up', 'flash-down'), 900);
  } catch (e) {}
}

function appendStory(message) {
  const storyLog = document.getElementById('storyLog');
  if (!storyLog) return;
  const entry = document.createElement('div');
  entry.className = 'story-entry';
  entry.textContent = message;
  storyLog.prepend(entry);

  while (storyLog.children.length > 6) {
    storyLog.removeChild(storyLog.lastChild);
  }
}

function showToast(message, duration = 2200) {
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

function triggerShake(target) {
  if (!target) return;
  target.classList.remove('shake');
  void target.offsetWidth;
  target.classList.add('shake');
  setTimeout(() => target.classList.remove('shake'), 560);
}

function launchConfetti(count = 18) {
  if (!confettiContainer) return;
  const colors = ['#ff6b6b', '#ffd166', '#4ecdc4', '#5b8def'];
  for (let index = 0; index < count; index += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.animationDelay = `${Math.random() * 180}ms`;
    confettiContainer.appendChild(piece);
    setTimeout(() => piece.remove(), 1500);
  }
}

function applyChoiceEffects(effects) {
  // apply diffs and animate stat changes
  const keys = ['cash', 'debt', 'income', 'savings', 'investments', 'stress'];
  const deltas = {};
  keys.forEach(k => {
    const before = state.stats[k] ?? 0;
    const change = effects[k] ?? 0;
    deltas[k] = change;
    // apply
    if (k === 'debt') {
      state.stats.debt = Math.max(0, before + change);
    } else if (k === 'savings' || k === 'investments') {
      state.stats[k] = Math.max(0, before + change);
    } else if (k === 'cash') {
      state.stats.cash = before + change;
    } else if (k === 'income') {
      state.stats.income = before + change;
    } else if (k === 'stress') {
      state.stats.stress = clamp(before + change, 0, 100);
    }
  });

  const moralEffects = {
    health: effects.health ?? Math.round(-(effects.stress ?? 0) * 0.35 + ((effects.cash ?? 0) < 0 ? -1 : (effects.cash ?? 0) > 0 ? 1 : 0)),
    relationships: effects.relationships ?? ((effects.cash ?? 0) < 0 && (effects.stress ?? 0) > 0 ? -2 : (effects.cash ?? 0) > 0 ? 1 : 0),
    purpose: effects.purpose ?? Math.round((effects.score ?? 0) / 8 - ((effects.debt ?? 0) > 0 ? 2 : 0))
  };

  Object.entries(moralEffects).forEach(([key, change]) => {
    const before = state.stats[key] ?? 0;
    state.stats[key] = clamp(before + change, 0, 100);
    if (change !== 0) animateStatChange(key, change);
  });

  const scoreBefore = state.score;
  state.score = Math.max(0, state.score + (effects.score ?? 0));

  // animate changed stats
  for (const k in deltas) {
    if ((deltas[k] ?? 0) !== 0) animateStatChange(k, deltas[k]);
  }
  if ((effects.score ?? 0) !== 0) {
    // small badge flash
    const sb = elements.scoreBadge;
    if (sb) {
      sb.classList.add(effects.score > 0 ? 'flash-up' : 'flash-down');
      setTimeout(() => sb.classList.remove('flash-up', 'flash-down'), 900);
    }
  }

  // visual reactions: big wins vs hits
  const bigWin = (effects.score ?? 0) >= 20 || (effects.income ?? 0) >= 3000 || (effects.investments ?? 0) >= 2000;
  const bigLoss = (effects.savings ?? 0) < -1000 || (effects.debt ?? 0) > 1500 || (effects.cash ?? 0) < -1200 || (effects.stress ?? 0) >= 12;

  if (bigWin) {
    showToast('Big win!', 2200);
    launchConfetti(18);
  } else if (bigLoss) {
    showToast('Tough hit...', 2200);
    triggerShake(elements.boardTrack);
  }

  updateHud();
}

function hasNegativeIncome() {
  return state.stats && state.stats.income < 0;
}

function hasNegativeCash() {
  return state.stats && state.stats.cash < 0;
}

function getRandomEvent() {
  const available = eventTemplates.filter((event) => !state.recentEvents.includes(event.title));
  const pool = available.length ? available : eventTemplates;
  const event = pool[Math.floor(Math.random() * pool.length)];
  state.recentEvents = [...state.recentEvents, event.title].slice(-3);
  return event;
}

function hasReachedFinishLine() {
  return livePathStep >= state.maxTurns;
}

function renderLivePrompt(event, options = []) {
  if (!event) return;

  if (elements.livePromptTitle) {
    elements.livePromptTitle.textContent = event.title;
  }
  if (elements.livePromptText) {
    elements.livePromptText.textContent = event.description;
  }
  if (!elements.livePromptChoices) return;

  // Freeze player movement until a decision is made
  state.isAwaitingDecision = true;
  if (elements.liveDecisionModal) elements.liveDecisionModal.classList.add('is-visible');
  elements.livePromptChoices.innerHTML = '';
  const choices = options.length ? options : (event.choices || []);

  choices.forEach((choice) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'live-choice-btn';
    btn.textContent = `${choice.icon || '🎯'} ${choice.text}`;
    btn.addEventListener('click', () => {
      // Allow player to move again after making a decision
      state.isAwaitingDecision = false;
      if (elements.liveDecisionModal) elements.liveDecisionModal.classList.remove('is-visible');
      if (typeof choice.effects === 'object') {
        applyChoiceEffects(choice.effects);
      }
      appendStory(`Future Builder chose: ${choice.text}`);
      if (hasNegativeIncome() || hasNegativeCash()) {
        const outcome = hasNegativeCash() ? 'cash-loss' : 'income-loss';
        setTimeout(() => finishGame(outcome), 420);
        return;
      }
      state.turn += 1;
      livePathStep = clamp(livePathStep + getChoiceMovement(choice.effects), 0, state.maxTurns);
      updateLiveGameHud();
      if (hasReachedFinishLine()) {
        setTimeout(() => finishGame(), 420);
        return;
      }
      setTimeout(() => renderEvent(), 420);
    });
    elements.livePromptChoices.appendChild(btn);
  });
}

function renderEvent() {
  const event = getRandomEvent();
  state.currentEvent = event;

  if (eventIconEl) eventIconEl.textContent = event.icon || '🎲';
  if (eventShortEl) eventShortEl.textContent = event.description.slice(0, 64) + (event.description.length > 64 ? '…' : '');
  if (eventDetailEl) eventDetailEl.textContent = event.description;

  renderLivePrompt(event, event.choices);

}

function startGame() {
  const scenario = state.currentScenario || createStarterScenario();
  state.started = true;
  state.turn = 0;
  state.score = 0;
  state.recentEvents = [];
  state.stats = {
    cash: scenario.cash,
    debt: scenario.debt,
    income: scenario.income,
    savings: scenario.savings,
    emergencyFund: scenario.emergencyFund ?? 0,
    investments: scenario.investments,
    stress: scenario.stress,
    health: 72,
    relationships: 68,
    purpose: 65
  };

  appendStory(`Future Builder started a new life game with ${scenario.label.toLowerCase()}.`);
  appendStory('Goal: build a safer financial future and avoid money traps.');

  // Reset live game state
  liveX = 80;
  liveCash = 0;
  liveProgress = 0;
  livePathStep = 0;

  if (statsView) statsView.classList.add('hidden');
  if (elements.liveGameView) elements.liveGameView.classList.remove('hidden');

  // Initialize live game displays
  updateHud();
  updateLiveGameHud();
  renderEvent();
}

function finishGame(outcome = 'complete') {
  const summary = state.stats.cash + state.stats.savings + (state.stats.emergencyFund ?? 0) + state.stats.investments - state.stats.debt;
  const finishText = outcome === 'cash-loss'
    ? 'Your cash balance fell below zero, so the run ends here. Protect your cash flow and try again.'
    : outcome === 'income-loss'
    ? 'Your income fell below zero, so the run ends here. Rebuild your income foundation and try again.'
    : summary >= 50000
    ? 'You finished with a strong cushion and a healthier future. Your money habits are setting you up for long-term success.'
    : summary >= 0
      ? 'You finished with some stability, but there is still room to grow your savings and reduce stress.'
      : 'This run was tough, but every challenge taught you something valuable about protecting cash flow and controlling debt.';
      
  if (elements.liveGameView) elements.liveGameView.classList.add('hidden');
  if (statsView) statsView.classList.remove('hidden');
  launchConfetti(25);
  showToast('Journey complete!', 3000);

  if (finalTitle) finalTitle.textContent = outcome === 'cash-loss'
    ? 'Game over: cash ran out'
    : outcome === 'income-loss'
      ? 'Game over: income collapsed'
      : 'Adventure complete!';
  if (finalSummaryEl) finalSummaryEl.textContent = `${finishText} Final net worth: ${formatCurrency(summary)}.`;
  try {
    const pct = clamp(Math.round((summary / 100000) * 100), 0, 100);
    if (finalNetFill) finalNetFill.style.width = `${pct}%`;
    if (finalDetails) {
      const moral = ['health', 'relationships', 'purpose'].map((key) => Math.round(state.stats[key]));
      const overall = Math.round(moral.reduce((total, value) => total + value, 0) / moral.length);
      const details = [
        ['Cash', formatCurrency(state.stats.cash)],
        ['Income', formatCurrency(state.stats.income)],
        ['Debt', formatCurrency(state.stats.debt)],
        ['Savings', formatCurrency(state.stats.savings)],
        ['Investments', formatCurrency(state.stats.investments)],
        ['Life balance', `${overall}%`],
        ['Health', `${moral[0]}%`],
        ['Relationships', `${moral[1]}%`],
        ['Academics', `${moral[2]}%`]
      ];
      finalDetails.innerHTML = details
        .map(([label, value]) => `<div class="summary-stat-card"><span>${label}</span><strong>${value}</strong></div>`)
        .join('');
    }
  } catch (e) {}

  if (profileScore) profileScore.textContent = `Score ${state.score}`;
  if (profileSummary) profileSummary.textContent = `Final net worth ${formatCurrency(summary)}. Life balance ${Math.round((state.stats.health + state.stats.relationships + state.stats.purpose) / 3)}%.`;

  if (elements.trackerText) elements.trackerText.textContent = outcome === 'income-loss'
    ? 'Income dropped below zero. Replay and protect your earning power.'
    : 'Your story is complete. Replay to try a different money strategy.';
  if (elements.turnLabel) elements.turnLabel.textContent = 'Final turn';
  if (elements.scoreBadge) elements.scoreBadge.textContent = `Final ${state.score}`;
}

function updateLiveMiniStats() {
  const miniMap = {
    cash: document.getElementById('miniCashStat'),
    debt: document.getElementById('miniDebtStat'),
    income: document.getElementById('miniIncomeStat'),
    savings: document.getElementById('miniSavingsStat'),
    invest: document.getElementById('miniInvestStat'),
    stress: document.getElementById('miniStressStat')
  };

  if (!state.stats) return;
  if (miniMap.cash) miniMap.cash.textContent = formatCurrency(state.stats.cash);
  if (miniMap.debt) miniMap.debt.textContent = formatCurrency(state.stats.debt);
  if (miniMap.income) miniMap.income.textContent = formatCurrency(state.stats.income);
  if (miniMap.savings) miniMap.savings.textContent = formatCurrency(state.stats.savings);
  if (miniMap.invest) miniMap.invest.textContent = formatCurrency(state.stats.investments);
  if (miniMap.stress) miniMap.stress.textContent = String(Math.round(state.stats.stress));

  const moral = ['health', 'relationships', 'purpose'].map((key) => clamp(state.stats[key] ?? 0, 0, 100));
  const overall = Math.round(moral.reduce((total, value) => total + value, 0) / moral.length);
  const moralRows = [
    ['health', elements.healthValue, elements.healthFill],
    ['relationships', elements.relationshipsValue, elements.relationshipsFill],
    ['purpose', elements.academicsValue, elements.academicsFill]
  ];
  moralRows.forEach(([key, valueEl, fillEl]) => {
    const value = Math.round(clamp(state.stats[key] ?? 0, 0, 100));
    if (valueEl) valueEl.textContent = String(value);
    if (fillEl) fillEl.style.width = `${value}%`;
  });
  if (elements.moralOverallValue) elements.moralOverallValue.textContent = String(overall);
  if (elements.moralOverallFill) elements.moralOverallFill.style.width = `${overall}%`;
}

function updateLiveGameHud() {
  if (elements.liveScoreBadge) elements.liveScoreBadge.textContent = `Score ${state.score || 0}`;
  if (state.stats) liveCash = state.stats.cash;
  if (elements.liveCashCount) elements.liveCashCount.textContent = formatCurrency(liveCash);
  liveProgress = state.maxTurns ? (livePathStep / state.maxTurns) * 100 : 0;
  liveX = 80 + (700 * liveProgress) / 100;
  if (elements.liveProgressFill) elements.liveProgressFill.style.width = `${liveProgress}%`;
  updateLiveMiniStats();
  if (elements.marioPlayer) {
    elements.marioPlayer.style.left = `${liveX}px`;
  }
}

function getChoiceMovement(effects = {}) {
  const costsMoney = (effects.cash ?? 0) < 0 || (effects.savings ?? 0) < 0 || (effects.investments ?? 0) < 0;
  const addsDebt = (effects.debt ?? 0) > 0;
  return costsMoney || addsDebt ? -1 : 1;
}

// Play again
if (playAgainBtn) playAgainBtn.addEventListener('click', () => {
  startGame();
});

startGame();
