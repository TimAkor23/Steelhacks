const avatarOptions = ['🧒', '👧', '🧑', '👩', '🧑‍🎓', '🧑‍💼', '🧑‍🔧', '🧑‍🏫'];
const boardSpaces = ['🏠', '💼', '🧾', '📈', '🎯', '🏁'];

const scenarioTemplates = [
  { name: 'Apartment starter', income: 42000, bills: 1800, taxes: 7200, debt: 12000, savings: 2600, investments: 1800, cash: 1200, stress: 34 },
  { name: 'City hustle', income: 52000, bills: 2200, taxes: 9800, debt: 18000, savings: 3200, investments: 2500, cash: 1500, stress: 40 },
  { name: 'College edge', income: 36000, bills: 1500, taxes: 6100, debt: 22000, savings: 2000, investments: 1200, cash: 900, stress: 38 },
  { name: 'Family support', income: 47000, bills: 2100, taxes: 8400, debt: 9000, savings: 5000, investments: 3000, cash: 2000, stress: 30 },
  { name: 'Side hustle start', income: 46000, bills: 1700, taxes: 7600, debt: 16000, savings: 3500, investments: 2800, cash: 1800, stress: 32 },
  { name: 'Apartment + loan', income: 58000, bills: 2400, taxes: 11300, debt: 25000, savings: 2800, investments: 4200, cash: 1400, stress: 46 }
];

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
  }
];

const elements = {
  selectedAvatar: document.getElementById('selectedAvatar'),
  selectedNameLabel: document.getElementById('selectedNameLabel'),
  avatarPicker: document.getElementById('avatarPicker'),
  playerName: document.getElementById('playerName'),
  playStyle: document.getElementById('playStyle'),
  randomizeButton: document.getElementById('randomizeButton'),
  starterStats: document.getElementById('starterStats'),
  startGameButton: document.getElementById('startGameButton'),
  boardTrack: document.getElementById('boardTrack'),
  tokenMarker: document.getElementById('tokenMarker'),
  trackerText: document.getElementById('trackerText'),
  eventTitle: document.getElementById('eventTitle'),
  eventText: document.getElementById('eventText'),
  choiceButtons: document.getElementById('choiceButtons'),
  cashValue: document.getElementById('cashValue'),
  debtValue: document.getElementById('debtValue'),
  incomeValue: document.getElementById('incomeValue'),
  savingsValue: document.getElementById('savingsValue'),
  investmentValue: document.getElementById('investmentValue'),
  stressValue: document.getElementById('stressValue'),
  storyLog: document.getElementById('storyLog'),
  worldBadge: document.getElementById('worldBadge'),
  levelBadge: document.getElementById('levelBadge'),
  turnLabel: document.getElementById('turnLabel'),
  scoreBadge: document.getElementById('scoreBadge'),

  // live game elements
  liveGameView: document.getElementById('liveGameView'),
  liveScoreBadge: document.getElementById('liveScoreBadge'),
  liveCashCount: document.getElementById('liveCashCount'),
  liveMissionText: document.getElementById('liveMissionText'),
  liveProgressFill: document.getElementById('liveProgressFill'),
  liveDecisionModal: document.getElementById('liveDecisionModal'),
  jumpBtn: document.getElementById('jumpBtn'),
  collectBtn: document.getElementById('collectBtn'),
  backToBoardBtn: document.getElementById('backToBoardBtn'),
  marioPlayer: document.getElementById('marioPlayer'),
  livePromptTitle: document.getElementById('livePromptTitle'),
  livePromptText: document.getElementById('livePromptText'),
  livePromptChoices: document.getElementById('livePromptChoices')
};

// page nav elements
const builderView = document.getElementById('builderView');
const statsView = document.getElementById('statsView');
const liveHud = document.getElementById('liveHud');
const boardActions = document.getElementById('boardActions');
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

// New page & profile elements
const builderNav = document.getElementById('builderNav');
const boardNav = document.getElementById('boardNav');
const profileNav = document.getElementById('profileNav');
const boardView = document.getElementById('boardView');
const profileView = document.getElementById('profileView');
const backToBoard = document.getElementById('backToBoard');
const profileAvatar = document.getElementById('profileAvatar');
const profileName = document.getElementById('profileName');
const profileScore = document.getElementById('profileScore');
const profileSummary = document.getElementById('profileSummary');

// Stat fill elements on profile view
const cashFill = document.getElementById('cashFill');
const debtFill = document.getElementById('debtFill');
const incomeFill = document.getElementById('incomeFill');
const savingsFill = document.getElementById('savingsFill');
const investmentsFill = document.getElementById('investmentsFill');
const stressFill = document.getElementById('stressFill');

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

function createStarterScenario() {
  const base = scenarioTemplates[Math.floor(Math.random() * scenarioTemplates.length)];
  const style = elements.playStyle.value;

  let income = base.income;
  let bills = base.bills;
  let taxes = base.taxes;
  let debt = base.debt;
  let savings = base.savings;
  let investments = base.investments;
  let cash = base.cash;
  let stress = base.stress;

  if (style === 'saver') {
    income *= 0.94;
    debt *= 0.75;
    savings += 2800;
    bills *= 0.92;
    stress -= 8;
  } else if (style === 'builder') {
    income *= 1.08;
    savings += 900;
    investments += 1500;
    debt *= 0.9;
  } else if (style === 'risk') {
    income *= 1.14;
    debt *= 1.2;
    investments += 2400;
    stress += 10;
  }

  return {
    label: base.name,
    income: Math.round(income),
    bills: Math.round(bills),
    taxes: Math.round(taxes),
    debt: Math.round(debt),
    savings: Math.round(savings),
    investments: Math.round(investments),
    cash: Math.round(cash),
    stress: clamp(stress, 15, 90)
  };
}

function renderStarterStats() {
  const scenario = state.currentScenario || createStarterScenario();
  state.currentScenario = scenario;

  const items = [
    ['Income', formatCurrency(scenario.income)],
    ['Bills', formatCurrency(scenario.bills)],
    ['Taxes', formatCurrency(scenario.taxes)],
    ['Debt', formatCurrency(scenario.debt)],
    ['Savings', formatCurrency(scenario.savings)],
    ['Investments', formatCurrency(scenario.investments)]
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
  const activeIndex = Math.min(state.turn, boardSpaces.length - 1);

  elements.boardTrack.innerHTML = boardSpaces
    .map((space, index) => `<div class="track-space ${index === activeIndex ? 'active' : ''}">${space}</div>`)
    .join('');

  animateTokenToSpace(activeIndex);
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

  if (state.stats.debt > 25000) {
    elements.trackerText.textContent = 'Debt is holding your progress back. Attack it before it grows bigger.';
  } else if (state.stats.savings >= 10000) {
    elements.trackerText.textContent = 'Your emergency cushion is strong. Keep growing your future wealth.';
  } else if (state.stats.income >= 70000) {
    elements.trackerText.textContent = 'Your income is climbing. Keep building stability and smarter habits.';
  } else if (state.stats.stress >= 70) {
    elements.trackerText.textContent = 'Stress is high. Protect your budget and focus on cash flow.';
  } else {
    elements.trackerText.textContent = 'Build momentum by staying steady, saving early, and avoiding debt traps.';
  }
}

function updateHud() {
  if (!state.stats) return;

  elements.cashValue.textContent = formatCurrency(state.stats.cash);
  elements.debtValue.textContent = formatCurrency(state.stats.debt);
  elements.incomeValue.textContent = formatCurrency(state.stats.income);
  elements.savingsValue.textContent = formatCurrency(state.stats.savings);
  elements.investmentValue.textContent = formatCurrency(state.stats.investments);
  elements.stressValue.textContent = `${Math.round(state.stats.stress)}`;
  elements.scoreBadge.textContent = `Score ${state.score}`;
  elements.worldBadge.textContent = `World ${Math.min(1 + Math.floor(state.turn / 2), 4)}`;
  elements.levelBadge.textContent = `Lv. ${Math.max(1, Math.floor(state.score / 80) + 1)}`;
  elements.turnLabel.textContent = `Decision ${state.turn + 1}`;
  updateTrackerText();

  // update visual meters on profile view if present
  try {
    const clampPct = (v) => Math.round(clamp(v, 0, 100));

    // normalize against simple targets
    const cashPct = clampPct((state.stats.cash / 20000) * 100);
    const debtPct = clampPct(100 - (state.stats.debt / 50000) * 100);
    const incomePct = clampPct((state.stats.income / 100000) * 100);
    const savingsPct = clampPct((state.stats.savings / 50000) * 100);
    const investmentsPct = clampPct((state.stats.investments / 200000) * 100);
    const stressPct = clampPct((state.stats.stress / 100) * 100);

    if (cashFill) cashFill.style.width = `${cashPct}%`;
    if (debtFill) debtFill.style.width = `${debtPct}%`;
    if (incomeFill) incomeFill.style.width = `${incomePct}%`;
    if (savingsFill) savingsFill.style.width = `${savingsPct}%`;
    if (investmentsFill) investmentsFill.style.width = `${investmentsPct}%`;
    if (stressFill) stressFill.style.width = `${stressPct}%`;

    if (profileScore) profileScore.textContent = `Score ${state.score}`;
    if (profileName) profileName.textContent = elements.playerName.value || 'Future Builder';
    if (profileAvatar) profileAvatar.textContent = state.avatar;
    if (profileSummary) profileSummary.textContent = `Cash ${formatCurrency(state.stats.cash)}, Debt ${formatCurrency(state.stats.debt)}, Net ${formatCurrency(state.stats.savings + state.stats.investments - state.stats.debt)}.`;
  } catch (e) {
    // ignore when profile view not mounted
  }
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
  const entry = document.createElement('div');
  entry.className = 'story-entry';
  entry.textContent = message;
  elements.storyLog.prepend(entry);

  while (elements.storyLog.children.length > 6) {
    elements.storyLog.removeChild(elements.storyLog.lastChild);
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
    } else if (k === 'savings' || k === 'investments' || k === 'cash' || k === 'income') {
      state.stats[k] = Math.max(0, before + change);
    } else if (k === 'stress') {
      state.stats.stress = clamp(before + change, 0, 100);
    }
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
      appendStory(`${elements.playerName.value || 'Future Builder'} chose: ${choice.text}`);
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

  elements.eventTitle.textContent = event.title;
  if (eventIconEl) eventIconEl.textContent = event.icon || '🎲';
  if (eventShortEl) eventShortEl.textContent = event.description.slice(0, 64) + (event.description.length > 64 ? '…' : '');
  if (eventDetailEl) eventDetailEl.textContent = event.description;

  renderLivePrompt(event, event.choices);

  if (boardActions) {
    boardActions.innerHTML = '';
    const title = document.createElement('div');
    title.className = 'action-title';
    title.textContent = event.title;
    const desc = document.createElement('div');
    desc.className = 'action-desc';
    desc.textContent = event.description;
    const choicesWrap = document.createElement('div');
    choicesWrap.className = 'action-choices';

    event.choices.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';
      btn.textContent = choice.icon ? choice.icon + ' ' + choice.text : choice.text;
      btn.addEventListener('click', () => {
        applyChoiceEffects(choice.effects);
        appendStory(`${elements.playerName.value || 'Future Builder'} chose: ${choice.text}`);
        state.turn += 1;
        renderBoard();
        boardActions.innerHTML = '';

        if (hasReachedFinishLine()) {
          setTimeout(() => finishGame(), 420);
          return;
        }

        setTimeout(() => renderEvent(), 420);
      });
      choicesWrap.appendChild(btn);
    });

    boardActions.appendChild(title);
    boardActions.appendChild(desc);
    boardActions.appendChild(choicesWrap);
    boardActions.classList.remove('hidden');
  }

  const infoBtn = document.getElementById('eventInfoBtn');
  if (infoBtn) infoBtn.style.display = 'none';
}

function showLiveGameView() {
  if (elements.liveGameView) elements.liveGameView.classList.remove('hidden');
  if (builderView) builderView.classList.add('hidden');
  if (boardView) boardView.classList.add('hidden');
  if (profileView) profileView.classList.add('hidden');
  if (statsView) statsView.classList.add('hidden');
}

function showBuilderView() {
  if (builderView) builderView.classList.remove('hidden');
  if (elements.liveGameView) elements.liveGameView.classList.add('hidden');
  if (boardView) boardView.classList.add('hidden');
  if (profileView) profileView.classList.add('hidden');
  if (statsView) statsView.classList.add('hidden');
}

function showBoardView() {
  if (boardView) boardView.classList.remove('hidden');
  if (builderView) builderView.classList.add('hidden');
  if (elements.liveGameView) elements.liveGameView.classList.add('hidden');
  if (profileView) profileView.classList.add('hidden');
  if (statsView) statsView.classList.add('hidden');
  updateHud();
}

function showProfileView() {
  if (profileView) profileView.classList.remove('hidden');
  if (builderView) builderView.classList.add('hidden');
  if (boardView) boardView.classList.add('hidden');
  if (elements.liveGameView) elements.liveGameView.classList.add('hidden');
  if (statsView) statsView.classList.add('hidden');
  updateHud();
}

function syncPlayerIdentity() {
  elements.selectedNameLabel.textContent = elements.playerName.value || 'Future Builder';
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
    investments: scenario.investments,
    stress: scenario.stress
  };

  elements.selectedNameLabel.textContent = elements.playerName.value || 'Future Builder';
  elements.storyLog.innerHTML = '';
  appendStory(`${elements.playerName.value || 'Future Builder'} started a new life game with ${scenario.label.toLowerCase()}.`);
  appendStory('Goal: build a safer financial future and avoid money traps.');

  // Reset live game state
  liveX = 80;
  liveCash = 0;
  liveProgress = 0;
  livePathStep = 0;

  // Hide other views and show live game
  if (builderView) builderView.classList.add('hidden');
  if (statsView) statsView.classList.add('hidden');
  if (profileView) profileView.classList.add('hidden');
  if (boardView) boardView.classList.add('hidden');
  if (elements.liveGameView) elements.liveGameView.classList.remove('hidden');

  // Initialize live game displays
  updateHud();
  updateLiveGameHud();
  renderEvent();
}

function finishGame() {
  const summary = state.stats.savings + state.stats.investments - state.stats.debt;
  const finishText = summary >= 50000
    ? 'You finished with a strong cushion and a healthier future. Your money habits are setting you up for long-term success.'
    : summary >= 0
      ? 'You finished with some stability, but there is still room to grow your savings and reduce stress.'
      : 'This run was tough, but every challenge taught you something valuable about protecting cash flow and controlling debt.';
      
  if (elements.liveGameView) elements.liveGameView.classList.add('hidden');
  if (statsView) statsView.classList.remove('hidden');
  launchConfetti(25);
  showToast('Journey complete!', 3000);

  if (finalTitle) finalTitle.textContent = 'Adventure complete!';
  if (finalSummaryEl) finalSummaryEl.textContent = `${finishText} Final net worth: ${formatCurrency(summary)}.`;
  try {
    const pct = clamp(Math.round((summary / 100000) * 100), 0, 100);
    if (finalNetFill) finalNetFill.style.width = `${pct}%`;
    if (finalDetails) finalDetails.textContent = `Cash ${formatCurrency(state.stats.cash)}, Debt ${formatCurrency(state.stats.debt)}, Savings ${formatCurrency(state.stats.savings)}, Investments ${formatCurrency(state.stats.investments)}.`;
  } catch (e) {}

  if (elements.trackerText) elements.trackerText.textContent = 'Your story is complete. Replay to try a different money strategy.';
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

if (elements.backToBoardBtn) elements.backToBoardBtn.addEventListener('click', showBoardView);

// Navigation buttons
if (builderNav) builderNav.addEventListener('click', showBuilderView);
if (boardNav) boardNav.addEventListener('click', showBoardView);
if (profileNav) profileNav.addEventListener('click', showProfileView);

// Find and wire up liveGameNav
const liveGameNav = document.getElementById('liveGameNav');
if (liveGameNav) liveGameNav.addEventListener('click', showLiveGameView);

// Builder and game start buttons
elements.randomizeButton.addEventListener('click', () => {
  state.currentScenario = null;
  renderStarterStats();
  appendStory('A new starter scenario was loaded.');
});

elements.startGameButton.addEventListener('click', () => {
  startGame();
});

// Avatar picker events
elements.playerName.addEventListener('input', syncPlayerIdentity);
elements.playStyle.addEventListener('change', () => {
  renderStarterStats();
});

// Play again
if (playAgainBtn) playAgainBtn.addEventListener('click', () => {
  startGame();
});

// Initialize page on load
renderAvatarPicker();
renderStarterStats();
updateHud();
renderBoard();
renderEvent();
showBuilderView();

