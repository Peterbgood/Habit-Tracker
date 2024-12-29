let contactsCount = localStorage.getItem('contactsCount') || 0;
let pawCount = localStorage.getItem('pawCount') || 0;
let log = JSON.parse(localStorage.getItem('log')) || [];

const logList = document.getElementById('log-list');
const contactsBtn = document.getElementById('contacts-btn');
const pawBtn = document.getElementById('paw-btn');
const resetBtn = document.getElementById('reset-btn');

const contactsCountElement = document.getElementById('contacts-count');
const pawCountElement = document.getElementById('paw-count');

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
        log = log.filter((i) => i.date !== item.date && i.event !== item.event);
        localStorage.setItem('log', JSON.stringify(log));
        decrementCount(item.event);
    });
});

contactsBtn.addEventListener('click', () => {
    logEvent('Contacts');
    updateCount('contacts');
});

pawBtn.addEventListener('click', () => {
    logEvent('Action');
    updateCount('paw');
});

resetBtn.addEventListener('click', () => {
    localStorage.clear();
    logList.innerHTML = '';
    contactsCount = 0;
    pawCount = 0;
    contactsCountElement.textContent = contactsCount;
    pawCountElement.textContent = pawCount;
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
        log = log.filter((i) => i.date !== logItem.date && i.event !== logItem.event);
        localStorage.setItem('log', JSON.stringify(log));
        decrementCount(logItem.event);
    });
}

function updateCount(event) {
    switch (event) {
        case 'contacts':
            contactsCount++;
            contactsCountElement.textContent = contactsCount;
            localStorage.setItem('contactsCount', contactsCount);
            break;
        case 'paw':
            pawCount++;
            pawCountElement.textContent = pawCount;
            localStorage.setItem('pawCount', pawCount);
            break;
    }
}

function decrementCount(event) {
    switch (event) {
        case 'contacts':
            contactsCount--;
            contactsCountElement.textContent = contactsCount;
            localStorage.setItem('contactsCount', contactsCount);
            break;
        case 'paw':
            pawCount--;
            pawCountElement.textContent = pawCount;
            localStorage.setItem('pawCount', pawCount);
            break;
    }
}