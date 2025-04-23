import { sessionData, sessionHistory, calculateTotalSessionLoad, calculateTotalMoveLoad } from './state.js';

export function updateSessionTable() {
    const tbody = document.querySelector('#session-table tbody');
    tbody.innerHTML = '';
    sessionData.forEach((climb, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${climb.grade}</td>
            <td>${climb.location}</td>
            <td>${climb.type}</td>
            <td>${climb.count}</td>
            <td>${climb.moves}</td>
            <td>${climb.load.toFixed(1)}</td>
            <td>${climb.moveLoad.toFixed(1)}</td>
            <td><button class="delete-btn" data-index="${index}">Delete</button></td>
        `;
        tbody.appendChild(row);
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index, 10);
            sessionData.splice(index, 1);
            updateSessionTable();
            updateSummary();
        });
    });
}

export function updateSummary() {
    document.getElementById('total-session-load').textContent = calculateTotalSessionLoad().toFixed(1);
    document.getElementById('total-move-load').textContent = calculateTotalMoveLoad().toFixed(1);

    const boardClimbs = sessionData.filter(climb => climb.location === 'BOARD' && climb.type === 'completed').reduce((sum, climb) => sum + climb.count, 0);
    const gymClimbs = sessionData.filter(climb => climb.location === 'GYM' && climb.type === 'completed').reduce((sum, climb) => sum + climb.count, 0);

    document.getElementById('board-climbs').textContent = boardClimbs;
    document.getElementById('gym-climbs').textContent = gymClimbs;

    const summaryData = {};
    for (let i = 0; i <= 15; i++) {
        const grade = `V${i}`;
        summaryData[grade] = {
            BOARD: 0,
            GYM: 0,
            'BOARD FAIL': 0,
            'GYM FAIL': 0,
            load: 0
        };
    }

    sessionData.forEach(climb => {
        const location = climb.location;
        const type = climb.type === 'failed' ? `${location} FAIL` : location;
        summaryData[climb.grade][type] += climb.count;
        summaryData[climb.grade].load += climb.load;
    });

    const tbody = document.querySelector('#summary-table tbody');
    tbody.innerHTML = '';

    Object.keys(summaryData).forEach(grade => {
        const data = summaryData[grade];
        if (data.BOARD === 0 && data.GYM === 0 && data['BOARD FAIL'] === 0 && data['GYM FAIL'] === 0) {
            return;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${grade}</td>
            <td>${data.BOARD}</td>
            <td>${data.GYM}</td>
            <td>${data['BOARD FAIL']}</td>
            <td>${data['GYM FAIL']}</td>
            <td>${data.load.toFixed(1)}</td>
        `;
        tbody.appendChild(row);
    });
}

export function updateHistoryTable() {
    const tbody = document.querySelector('#history-table tbody');
    tbody.innerHTML = '';
    sessionHistory.slice().reverse().forEach((session, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${session.date}</td>
            <td>${session.totalSessionLoad.toFixed(1)}</td>
            <td>${session.totalMoveLoad.toFixed(1)}</td>
            <td><button class="load-btn" data-index="${index}">Load</button></td>
        `;
        tbody.appendChild(row);
    });
}