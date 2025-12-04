// 1. Global variables to cache settings (prevents freezing)
let state = {
    hideReels: true,
    hideExplore: true
}

const selectorsReels = [
    'a[href="/reels/"]',
    'svg[aria-label="Reels"]'
]

const selectorsExplore = [
    'a[href="/explore/"]',
    'svg[aria-label="Explore"]'
]

// 2. The Apply function now runs instantly using cached state
function apply() {
    if (state.hideReels) {
        hide(selectorsReels)
    } else {
        show(selectorsReels)
    }

    if (state.hideExplore) {
        hide(selectorsExplore)
    } else {
        show(selectorsExplore)
    }
}

function hide(selectors) {
    selectors.forEach(s => {
        const elements = document.querySelectorAll(s)
        elements.forEach(el => {
            const target = el.closest('a') || el
            // Only update if actually visible to save performance
            if (target.style.display !== 'none') {
                target.style.display = 'none'
            }
        })
    })
}

function show(selectors) {
    selectors.forEach(s => {
        const elements = document.querySelectorAll(s)
        elements.forEach(el => {
            const target = el.closest('a') || el
            if (target.style.display === 'none') {
                target.style.display = ''
            }
        })
    })
}

// 3. Helper to update settings from storage
function updateSettings() {
    chrome.storage.sync.get(['hideReels', 'hideExplore'], values => {
        state.hideReels = values.hideReels ?? true
        state.hideExplore = values.hideExplore ?? true
        apply()
    })
}

// --- INITIALIZATION ---

// Load settings once at start
updateSettings()

// Update settings instantly when you toggle the switch
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync') {
        updateSettings()
    }
})

// Observe DOM changes, but use the fast cached 'state'
const observer = new MutationObserver(() => {
    apply()
})

observer.observe(document.body, { childList: true, subtree: true })