let log = JSON.parse(localStorage.getItem('log')) || [];
let counts = JSON.parse(localStorage.getItem('counts')) || { contacts: 0, paw: 0, drinking: 0, run: 0 };

document.getElementById('contacts-btn').addEventListener('click', () => {
    addLog('Contacts');
});

document.getElementById('paw-btn').addEventListener('click', () => {
    addLog('PAW');
});

document.getElementById('drinking-btn').addEventListener('click', () => {
    addLog('Drinking');
});

document.getElementById('run-btn').addEventListener('click', () => {
    addLog('Run');
});

function addLog(category) {
    let date = new Date().toLocaleString();
    log.push({ category, date });
    updateCounts(category);
    updateLogList();
    localStorage.setItem('log', JSON.stringify(log));
    localStorage.setItem('counts', JSON.stringify(counts));
}

function updateCounts(category) {
    counts[category.toLowerCase()]++;
}

function updateLogList() {
    let logList = document.getElementById('log-list');
    logList.innerHTML = '';
    log.forEach((item, index) => {
        let listItem = document.createElement('LI');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `${item.category} - ${item.date} <button class="btn btn-danger float-end delete-btn" data-index="${index}">Delete</button>`;
        logList.appendChild(listItem);
    });
    updateCountsDisplay();
    deleteButtons();
}

function updateCountsDisplay() {
    document.getElementById('contacts-count').innerText = `Contacts: ${counts.contacts}`;
    document.getElementById('paw-count').innerText = `PAW: ${counts.paw}`;
    document.getElementById('drinking-count').innerText = `Drinking: ${counts.drinking}`;
    document.getElementById('run-count').innerText = `Run: ${counts.run}`;
}

function deleteButtons() {
    let deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let index = btn.getAttribute('data-index');
            log.splice(index, 1);
            updateCounts(log[index].category);
            updateLogList();
            localStorage.setItem('log', JSON.stringify(log));
            localStorage.setItem('counts', JSON.stringify(counts));
        });
    });
}

updateLogList();
