// Response from backend...........
const hubData = {
  income: {
    yearly: [99999999, "up", 10],
    monthly: [11111111, "up", 15],
  },
  expense: {
    yearly: [88888888, "down", 5],
    monthly: [22222222, "up", 1],
  },
  monthlyRemaining: 33333333,
  investments: {
    yearly: [77777777, "up", 6],
    monthly: [44444444, "down", 2],
  },
  debt: {
    payed: [10101010, 60],
    remaining: [10000000, 40],
  },
  target: {
    achieved: [66666666, 10],
    remaining: [555555555, 20],
  },
};

/**
 * Tab configuration for navigation.
 * @type {Array<{tabId: string, containerId: string, iconId: string, filledIcon: string, outlineIcon: string}>}
 */
const tabs = [
  {
    tabId: "hubTab",
    containerId: "hubContainer",
    iconId: "hubIcon",
    filledIcon: "/icons/home_filled_icon.png",
    outlineIcon: "/icons/home_outline_icon.png",
  },
  {
    tabId: "ledgerTab",
    containerId: "ledgerContainer",
    iconId: "ledgerIcon",
    filledIcon: "/icons/transaction_filled_icon.png",
    outlineIcon: "/icons/transaction_outline_icon.png",
  },
  {
    tabId: "plannerTab",
    containerId: "plannerContainer",
    iconId: "plannerIcon",
    filledIcon: "/icons/budget_filled_icon.png",
    outlineIcon: "/icons/budget_outline_icon.png",
  },
  {
    tabId: "vaultsTab",
    containerId: "vaultsContainer",
    iconId: "vaultsIcon",
    filledIcon: "/icons/accounts_filled_icon.png",
    outlineIcon: "/icons/accounts_outline_icon.png",
  },
  {
    tabId: "moreTab",
    containerId: "moreContainer",
    iconId: "moreIcon",
    filledIcon: "/icons/more_filled_icon.png",
    outlineIcon: "/icons/more_outline_icon.png",
  },
  {
    tabId: "portfolioTab",
    containerId: "portfolioContainer",
    iconId: "portfolioIcon",
    filledIcon: "/icons/investments_filled_icon.png",
    outlineIcon: "/icons/investments_outline_icon.png",
  },
  {
    tabId: "goalTab",
    containerId: "goalContainer",
    iconId: "goalIcon",
    filledIcon: "/icons/goal_filled_icon.png",
    outlineIcon: "/icons/goal_outline_icon.png",
  },
  {
    tabId: "duesTab",
    containerId: "duesContainer",
    iconId: "duesIcon",
    filledIcon: "/icons/debt_filled_icon.png",
    outlineIcon: "/icons/debt_outline_icon.png",
  },
  {
    tabId: "tuneUpTab",
    containerId: "tuneUpContainer",
    iconId: "tuneUpIcon",
    filledIcon: "/icons/settings_filled_icon.png",
    outlineIcon: "/icons/settings_outline_icon.png",
  },
];

/**
 * Activates a tab, showing its container and updating icons and styles.
 * @param {Object} activeTab - The tab configuration to activate.
 */
function activateTab(activeTab) {
  if (!activeTab) {
    console.error("No active tab provided");
    return;
  }

  tabs.forEach(({ tabId, containerId, iconId, filledIcon, outlineIcon }) => {
    const tab = document.getElementById(tabId);
    const container = document.getElementById(containerId);
    const icon = document.getElementById(iconId);

    if (!tab || !container || !icon) {
      console.warn(
        `Element missing: tabId=${tabId}, containerId=${containerId}, iconId=${iconId}`
      );
      return;
    }

    if (tabId === activeTab.tabId) {
      container.classList.remove("hidden");
      icon.src = filledIcon;
      tab.classList.add("md:bg-gray-300");
      tab.setAttribute("aria-selected", "true");
    } else {
      container.classList.add("hidden");
      icon.src = outlineIcon;
      tab.classList.remove("md:bg-gray-300");
      tab.setAttribute("aria-selected", "false");
    }
  });
}

/**
 * Initializes tab event listeners.
 */
function initTabs() {
  tabs.forEach((tab) => {
    const tabElement = document.getElementById(tab.tabId);
    if (!tabElement) {
      console.warn(`Tab element not found: ${tab.tabId}`);
      return;
    }

    // Add click event listener
    tabElement.addEventListener("click", () => activateTab(tab));

    // Add keyboard support for accessibility
    tabElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateTab(tab);
      }
    });

    // Ensure tab is focusable and has ARIA attributes
    tabElement.setAttribute("tabindex", "0");
    tabElement.setAttribute("role", "tab");
    tabElement.setAttribute(
      "aria-selected",
      tab.tabId === "hubTab" ? "true" : "false"
    );
  });

  // Activate the first tab by default
  if (tabs.length > 0) {
    activateTab(tabs[0]);
  }
}

// ---------------------------------------------------------------------------------------------
function animateNumber(el, target, duration) {
  const startTime = performance.now();
  const startValue = parseInt(el.textContent.replace(/,/g, "")) || 0;
  const delta = target - startValue;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(startValue + delta * progress);

    el.textContent = value.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function setupToggleBlock({
  containerId,
  toggleClass,
  titleClass,
  valueClass,
  value1,
  value2,
  duration = 1000,
  title1,
  title2,
}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const checkbox = toggleClass
    ? container.querySelector(`#${toggleClass}`)
    : null;
  const heading = titleClass ? container.querySelector(`.${titleClass}`) : null;
  const valueEl = container.querySelector(`.${valueClass}`);
  if (!valueEl) return;

  const setValues = (isYearly) => {
    const target = isYearly ? value2 : value1;
    if (heading) heading.textContent = isYearly ? title2 : title1;
    animateNumber(valueEl, target, duration);
  };

  setValues(false); // Initial load: monthly

  if (checkbox) {
    checkbox.addEventListener("change", () => {
      setValues(checkbox.checked);
    });
  }
}

function add_values() {
  setupToggleBlock({
    containerId: "income",
    toggleClass: "income-toggle",
    titleClass: "income-title",
    valueClass: "income-value",
    value1: hubData.income.monthly[0],
    value2: hubData.income.yearly[0],
    title1: "Total Earned This Month",
    title2: "Total Earned This Year",
  });

  setupToggleBlock({
    containerId: "expenses",
    toggleClass: "exp-toggle",
    titleClass: "exp-title",
    valueClass: "exp-value",
    value1: hubData.expense.monthly[0],
    value2: hubData.expense.yearly[0],
    title1: "Total Spent This Month",
    title2: "Total Spent This Year",
  });
  setupToggleBlock({
    containerId: "investments",
    toggleClass: "investment-toggle",
    titleClass: "invest-title",
    valueClass: "invest-value",
    value1: hubData.investments.monthly[0],
    value2: hubData.investments.yearly[0],
    title1: "Invested This Month",
    title2: "Invested This Year",
  });
  setupToggleBlock({
    containerId: "goal",
    toggleClass: "goal-toggle",
    titleClass: "goal-title",
    valueClass: "goal-value",
    value1: hubData.target.remaining[0],
    value2: hubData.target.achieved[0],
    title1: "Remaining to Goal",
    title2: "Gaol Achieved So Far",
  });

  setupToggleBlock({
    containerId: "debt",
    toggleClass: "debt-toggle",
    titleClass: "debt-title",
    valueClass: "debt-value",
    value1: hubData.debt.remaining[0],
    value2: hubData.debt.payed[0],
    title1: "Remaining Payable",
    title2: "Cleared Amount",
  });
}

function localMoneyConvertion(amount, dom) {
  if (dom) animateNumber(dom, amount, 1000);
}

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initTabs?.();
  add_values();

  const spendingRemin = document.getElementById("expenseRemaning");
  localMoneyConvertion(hubData.monthlyRemaining, spendingRemin);
});
