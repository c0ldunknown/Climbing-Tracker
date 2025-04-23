import { sessionData, sessionHistory, calculateTotalSessionLoad, calculateTotalMoveLoad } from './state.js';
import { updateHistoryTable, updateSessionTable, updateSummary } from './updateUI.js';

export function handleSaveSession() {
    const saveSessionButton = document.getElementById('save-session');
    saveSessionButton.addEventListener('click', () => {
        if (sessionData.length === 0) {
            alert('No climbs to save!');
            return;
        }

        const date = document.getElementById('session-date').value;
        const session = { date, data: [...sessionData], totalSessionLoad: calculateTotalSessionLoad(), totalMoveLoad: calculateTotalMoveLoad() };
        sessionHistory.push(session);
        localStorage.setItem('climbingSessionHistory', JSON.stringify(sessionHistory));
        updateHistoryTable();
        alert('Session saved!');
    });
}

export function handleClearSession() {
    const clearSessionButton = document.getElementById('clear-session');
    clearSessionButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear the current session?')) {
            sessionData.length = 0;
            updateSessionTable();
            updateSummary();
        }
    });
}

export function handleExportData() {
    const exportDataButton = document.getElementById('export-data');
    exportDataButton.addEventListener('click', () => {
        let csv = 'Date,Grade,Location,Status,Count,Moves,Load,MoveLoad\n';
        sessionData.forEach(climb => {
            const date = document.getElementById('session-date').value;
            csv += `${date},${climb.grade},${climb.location},${climb.type},${climb.count},${climb.moves},${climb.load},${climb.moveLoad}\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `climbing_session_${document.getElementById('session-date').value}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}