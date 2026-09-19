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
  currentScenario: null
};

let liveCash = 0;
let liveProgress = 0;
let liveX = 80;

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
  elements.turnLabel.textContent = `Turn ${Math.min(state.turn + 1, state.maxTurns)}`;
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
  const available = eventTemplates.slice();
  return available[Math.floor(Math.random() * available.length)];
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

  elements.livePromptChoices.innerHTML = '';
  const choices = options.length ? options : (event.choices || []);

  choices.forEach((choice) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'live-choice-btn';
    btn.textContent = `${choice.icon || '🎯'} ${choice.text}`;
    btn.addEventListener('click', () => {
      if (typeof choice.effects === 'object') {
        applyChoiceEffects(choice.effects);
      }
      appendStory(`${elements.playerName.value || 'Future Builder'} chose: ${choice.text}`);
      state.turn += 1;
      renderBoard();
      if (state.turn >= state.maxTurns) {
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

        if (state.turn >= state.maxTurns) {
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
  if (elements.liveCashCount) elements.liveCashCount.textContent = String(liveCash);
  if (elements.liveProgressFill) elements.liveProgressFill.style.width = `${Math.min(liveProgress, 100)}%`;
  updateLiveMiniStats();
  if (elements.marioPlayer) {
    elements.marioPlayer.style.left = `${liveX}px`;
  }
}

function applyLiveGameOffsetFromBoard(choiceEffects) {
  const gain = (choiceEffects.income ?? 0) + (choiceEffects.savings ?? 0) + (choiceEffects.investments ?? 0) + (choiceEffects.cash ?? 0);
  const penalty = (choiceEffects.debt ?? 0) + (choiceEffects.stress ?? 0) * 4;

  const delta = Math.max(-70, Math.min(90, Math.round((gain / 200) - (penalty / 130))));
  liveX = clamp(liveX + delta, 70, 780);
  liveProgress = clamp(liveProgress + Math.max(6, delta / 2), 0, 100);
  liveCash = clamp(liveCash + Math.max(0, Math.round((gain || 0) / 120)), 0, 200);
  updateLiveGameHud();
}

function triggerJump() {
  if (!elements.marioPlayer) return;
  elements.marioPlayer.classList.remove('jump');
  void elements.marioPlayer.offsetWidth;
  elements.marioPlayer.classList.add('jump');
  setTimeout(() => elements.marioPlayer.classList.remove('jump'), 420);
}

function triggerCollect() {
  liveCash += 25;
  liveProgress = Math.min(liveProgress + 18, 100);
  if (liveCash >= 100) {
    if (elements.liveMissionText) elements.liveMissionText.textContent = 'You made it to the goal! Great work building your money habit.';
    showToast('Level clear!', 1800);
    launchConfetti(18);
  } else {
    if (elements.liveMissionText) elements.liveMissionText.textContent = 'Collect cash, avoid debt traps, and reach the finish line.';
  }
  updateLiveGameHud();
}

if (elements.leftBtn) elements.leftBtn.addEventListener('click', () => movePlayerBy(-38));
if (elements.rightBtn) elements.rightBtn.addEventListener('click', () => movePlayerBy(38));
if (elements.jumpBtn) elements.jumpBtn.addEventListener('click', triggerJump);
if (elements.collectBtn) elements.collectBtn.addEventListener('click', triggerCollect);
if (elements.backToBoardBtn) elements.backToBoardBtn.addEventListener('click', showBoardView);

window.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  const isRight = event.key === 'ArrowRight' || key === 'd';
  const isLeft = event.key === 'ArrowLeft' || key === 'a';
  const isJump = event.key === ' ' || event.key === 'ArrowUp' || key === 'w';

  if (isRight) {
    event.preventDefault();
    movePlayerBy(38);
  }
  if (isLeft) {
    event.preventDefault();
    movePlayerBy(-38);
  }
  if (isJump) {
    event.preventDefault();
    triggerJump();
  }
});
