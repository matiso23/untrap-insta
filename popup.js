const reels = document.getElementById('toggleReels');
const explore = document.getElementById('toggleExplore');

function updateUI(values) {
    reels.checked = values.hideReels ?? true;
    explore.checked = values.hideExplore ?? true;
}

browser.storage.sync.get(['hideReels', 'hideExplore'])
    .then(updateUI)
    .catch(error => console.error("Error loading settings:", error));

reels.addEventListener('change', () => {
    browser.storage.sync.set({ hideReels: reels.checked });
});

explore.addEventListener('change', () => {
    browser.storage.sync.set({ hideExplore: explore.checked });
});
