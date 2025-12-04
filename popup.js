const reels = document.getElementById('toggleReels')
const explore = document.getElementById('toggleExplore')

chrome.storage.sync.get(['hideReels', 'hideExplore'], values => {
    reels.checked = values.hideReels ?? true
    explore.checked = values.hideExplore ?? true
})

reels.addEventListener('change', () => {
    chrome.storage.sync.set({ hideReels: reels.checked })
})

explore.addEventListener('change', () => {
    chrome.storage.sync.set({ hideExplore: explore.checked })
})
