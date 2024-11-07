// options.js

document.addEventListener('DOMContentLoaded', () => {
  const selectedFilter = document.getElementById('selectedFilter');
  const saveMessage = document.getElementById('saveMessage');
  const trumpCount = document.getElementById('trumpcount');
  const pageCount = document.getElementById('pagecount');

  // Restore options
  chrome.storage.sync.get({ filter: 'mild', trumps: 0, pages: 0 }, (items) => {
    selectedFilter.value = items.filter;
    trumpCount.textContent = items.trumps;
    pageCount.textContent = items.pages;
  });

  // Save options on change
  selectedFilter.addEventListener('change', () => {
    const filter = selectedFilter.value;
    chrome.storage.sync.set({ filter: filter }, () => {
      saveMessage.textContent = 'Filter selected - ' + filter;
      setTimeout(() => {
        saveMessage.textContent = '';
      }, 750);
    });
  });
});
