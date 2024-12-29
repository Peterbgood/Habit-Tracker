let contactsCount = 0;
let pawCount = 0;
let drinkingCount = 0;
let runCount = 0;

const logList = document.getElementById('log-list');
const contactsBtn = document.getElementById('contacts-btn');
const pawBtn = document.getElementById('paw-btn');
const drinkingBtn = document.getElementById('drinking-btn');
const runBtn = document.getElementById('run-btn');

const contactsCountElement = document.getElementById('contacts-count');
const pawCountElement = document.getElementById('paw-count');
const drinkingCountElement = document.getElementById('drinking-count');
const runCountElement = document.getElementById('run-count');

contactsBtn.addEventListener('click', () => {
    logEvent('Contacts');
    updateCount('contacts');
});

pawBtn.addEventListener('click', () => {
    logEvent('PAW');
    updateCount('paw');
});

drinkingBtn.addEventListener('click', () => {
    logEvent('Drinking');
    updateCount('drinking');
});

runBtn.addEventListener('click', () => {
    logEvent('Run');
    updateCount('run');
});

function logEvent(event) {
    const logItem = document.createElement('li');
    logItem.textContent = `${new Date().toLocaleString()}: ${event}`;
    logList.appendChild(logItem);
}

function updateCount(event) {
    switch (event) {
        case 'contacts':
            contactsCount++;
            contactsCountElement.textContent = contactsCount;
            break;
        case 'paw':
            pawCount++;
            pawCountElement.textContent = pawCount;
            break;
        case 'drinking':
            drinkingCount++;
            drinkingCountElement.textContent = drinkingCount;
            break;
        case 'run':
            runCount++;
            runCountElement.textContent = runCount;
            break;
    }
}
