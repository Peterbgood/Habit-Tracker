let contactsCount = localStorage.getItem('contactsCount') || 0;
let pawCount = localStorage.getItem('pawCount') || 0;
let drinkingCount = localStorage.getItem('drinkingCount') || 0;
let runCount = localStorage.getItem('runCount') || 0;

let log = localStorage.getItem('log') || '[]';
log = JSON.parse(log);

function updateCount() {
  document.getElementById('contacts-count').innerText = contactsCount;
  document.getElementById('paw-count').innerText = pawCount;
  document.getElementById('drinking-count').innerText = drinkingCount;
  document.getElementById('run-count').innerText = runCount;
}

function updateLog() {
  let logHtml = '';
  log.forEach((entry, index) => {
    logHtml += `
      <div class="log-entry">
        <span>${entry.date} - ${entry.activity}</span>
        <button class="btn btn-danger btn-sm" onclick="deleteEntry(${index})">Delete</button>
      </div>
    `;
  });
  document.getElementById('log').innerHTML = logHtml;
}

function addEntry(activity) {
  const date = new Date().toLocaleString();
  log.push({ date, activity });
  localStorage.setItem('log', JSON.stringify(log));
  updateLog();
}

function deleteEntry(index) {
  log.splice(index, 1);
  localStorage.setItem('log', JSON.stringify(log));
  updateLog();
}

function reset() {
  log = [];
  contactsCount = 0;
  pawCount = 0;
  drinkingCount = 0;
  runCount = 0;
  localStorage.clear();
  updateCount();
  updateLog();
}

document.getElementById('contacts-btn').addEventListener('click', () => {
  addEntry('Contacts');
  contactsCount++;
  localStorage.setItem('contactsCount', contactsCount);
  updateCount();
});

document.getElementById('paw-btn').addEventListener('click', () => {
  addEntry('PAW');
  pawCount++;
  localStorage.setItem('pawCount', pawCount);
  updateCount();
});

document.getElementById('drinking-btn').addEventListener('click', () => {
  addEntry('Drinking');
  drinkingCount++;
  localStorage.setItem('drinkingCount', drinkingCount);
  updateCount();
});

document.getElementById('run-btn').addEventListener('click', () => {
  addEntry('Run');
  runCount++;
  localStorage.setItem('runCount', runCount);
  updateCount();
});

document.getElementById('reset-btn').addEventListener('click', reset);

updateCount();
updateLog();
