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

// Initialize tabs on DOM content loaded
document.addEventListener("DOMContentLoaded", initTabs);
