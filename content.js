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

function updateState(values) {
    state.hideReels = values.hideReels ?? true
    state.hideExplore = values.hideExplore ?? true
    apply()
}

function updateSettings() {
    if (typeof browser !== 'undefined') {
        browser.storage.sync.get(['hideReels', 'hideExplore'])
            .then(updateState)
            .catch(err => console.error("Untrap Insta Error:", err));
    }
    else if (typeof chrome !== 'undefined') {
        chrome.storage.sync.get(['hideReels', 'hideExplore'], updateState);
    }
}

updateSettings()

const api = (typeof browser !== 'undefined') ? browser : chrome;

if (api && api.storage) {
    api.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync') {
            updateSettings()
        }
    })
}

const observer = new MutationObserver(() => {
    apply()
})

observer.observe(document.body, { childList: true, subtree: true })
