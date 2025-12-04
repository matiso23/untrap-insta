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

function updateSettings() {
    chrome.storage.sync.get(['hideReels', 'hideExplore'], values => {
        state.hideReels = values.hideReels ?? true
        state.hideExplore = values.hideExplore ?? true
        apply()
    })
}

updateSettings()

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync') {
        updateSettings()
    }
})

const observer = new MutationObserver(() => {
    apply()
})

observer.observe(document.body, { childList: true, subtree: true })
