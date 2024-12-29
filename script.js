let log = JSON.parse(localStorage.getItem('log')) || [];

const logList = document.getElementById('log-list');
const contactsBtn = document.getElementById('contacts-btn');
const pawBtn = document.getElementById('paw-btn');
const resetBtn = document.getElementById('reset-btn');

const contactsCountElement = document.getElementById('contacts-count');
const pawCountElement = document.getElementById('paw-count');

// Retrieve count from log
let contactsCount = log.filter((item) => item.event === 'Contacts').length;
let pawCount = log.filter((item) => item.event === 'Action').length;

contactsCountElement.textContent = contactsCount;
pawCountElement.textContent = pawCount;

log.forEach((item) => {
    const logItem = document.createElement('li');
    logItem.className = 'list-group-item d-flex justify-content-between m-2';
    logItem.innerHTML = `
        ${item.date}: ${item.event}
        <button class="btn btn-danger delete-btn">Delete</button>
    `;
    logList.appendChild(logItem);

    const deleteBtn = logItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        logItem.remove();
        log = log.filter((i) => i !== item);
        localStorage.setItem('log', JSON.stringify(log));
        updateCount();
    });
});

contactsBtn.addEventListener('click', () => {
    logEvent('Contacts');
    updateCount();
});

pawBtn.addEventListener('click', () => {
    logEvent('Action');
    updateCount();
});

resetBtn.addEventListener('click', () => {
    localStorage.removeItem('log');
    log = [];
    logList.innerHTML = '';
    contactsCount = 0;
    pawCount = 0;
    updateCount();
});

function logEvent(event) {
    const logItem = {
        date: new Date().toLocaleDateString(),
        event,
    };
    log.push(logItem);
    localStorage.setItem('log', JSON.stringify(log));
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between m-2';
    li.innerHTML = `
        ${logItem.date}: ${logItem.event}
        <button class="btn btn-danger delete-btn">Delete</button>
    `;
    logList.appendChild(li);
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        li.remove();
        log = log.filter((i) => i !== logItem);
        localStorage.setItem('log', JSON.stringify(log));
        updateCount();
    });
}

function updateCount() {
    contactsCount = log.filter((item) => item.event === 'Contacts').length;
    pawCount = log.filter((item) => item.event === 'Action').length;
    contactsCountElement.textContent = contactsCount;
    pawCountElement.textContent = pawCount;
}
