import { sessionData, gradeValues, calculateTotalSessionLoad, calculateTotalMoveLoad } from './state.js';
import { updateSessionTable, updateSummary } from './updateUI.js';

export function handleAddClimb() {
    const addClimbButton = document.getElementById('add-climb');
    addClimbButton.addEventListener('click', () => {
        const grade = document.getElementById('climb-grade').value;
        const location = document.getElementById('climb-location').value;
        const type = document.getElementById('climb-type').value;
        const count = parseInt(document.getElementById('climb-count').value, 10);
        const moves = parseInt(document.getElementById('climb-moves').value, 10) || 0;
        const multiplier = parseFloat(document.getElementById('grade-multiplier').value);

        let load = location === 'BOARD' ? gradeValues[grade] * multiplier * count : gradeValues[grade] * count;
        let moveLoad = type === 'completed' && moves > 0 ? moves * gradeValues[grade] * (location === 'BOARD' ? multiplier : 1) : 0;

        sessionData.push({ grade, location, type, count, moves, load, moveLoad });
        updateSessionTable();
        updateSummary();
    });
}