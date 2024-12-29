let contactsCount = 0;
let pawCount = 0;
let drinkingCount = 0;
let runCount = 0;

// Get data from local storage
if (localStorage.getItem('contactsCount')) {
  contactsCount = parseInt(localStorage.getItem('contactsCount'));
}
if (localStorage.getItem('pawCount')) {
  pawCount = parseInt(localStorage.getItem('pawCount'));
}
if (localStorage.getItem('drinkingCount')) {
  drinkingCount = parseInt(localStorage.getItem('drinkingCount'));
}
if (localStorage.getItem('runCount')) {
  runCount = parseInt(localStorage.getItem('runCount'));
}

// Get log from local storage
let log = [];
if (localStorage.getItem('log')) {
  log = JSON.parse(localStorage.getItem('log'));
}

// Update counts display
document.getElementById('counts').innerHTML = `
  <span>Contacts: ${contactsCount}</span>
  <span>PAW: ${pawCount}</span>
  <span>Drinking: ${drinkingCount}</span>
  <span>Run: ${runCount}</span>
`;

// Add event listeners to buttons
document.getElementById('contacts-btn').addEventListener('click', () => {
  addLog('Contacts');
  contactsCount++;
  localStorage.setItem('contactsCount', contactsCount);
  updateCountsDisplay();
});

document.getElementById('paw-btn').addEventListener('click', () => {
  addLog('PAW');
  pawCount++;
  localStorage.setItem('pawCount', pawCount);
  updateCountsDisplay();
});

document.getElementById('drinking-btn').addEventListener('click', () => {
  addLog('Drinking');
  drinkingCount++;
  localStorage.setItem('drinkingCount', drinkingCount);
  updateCountsDisplay();
});

document.getElementById('run-btn').addEventListener('click', () => {
  addLog('Run');
  runCount++;
  localStorage.setItem('runCount', runCount);
  updateCountsDisplay();
});

document.getElementById('reset-btn').addEventListener('click', () => {
  reset();
});

// Update counts display
function updateCountsDisplay() {
  document.getElementById('counts').innerHTML = `
    <span>Contacts: ${contactsCount}</span>
    <span>PAW: ${pawCount}</span>
    <span>Drinking: ${drinkingCount}</span>
    <span>Run: ${runCount}</span>
  `;
}

// Add log entry
function addLog(activity) {
  const date = new Date();
  const logEntry = {
    activity,
    date: date.toLocaleString()
  };
  log.push(logEntry);
  localStorage.setItem('log', JSON.stringify(log));
  updateLogDisplay();
}

// Update log display
function updateLogDisplay() {
  const logHtml = log.map((entry, index) => {
    return `
      <div>
        <span>${entry.activity} - ${entry.date}</span>
        <button class="btn btn-danger" onclick="deleteLogEntry(${index})">Delete</button>
      </div>
    `;
  }).join('');
  document.getElementById('log').innerHTML = logHtml;
}

// Delete log entry
function deleteLogEntry(index) {
  log.splice(index, 1);
  localStorage.setItem('log', JSON.stringify(log));
  updateLogDisplay();
}

// Reset
function reset() {
  contactsCount = 0;
  pawCount = 0;
  drinkingCount = 0;
  runCount = 0;
  log = [];
  localStorage.clear();
  updateCountsDisplay();
  updateLogDisplay();
}
