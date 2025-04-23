export let sessionData = [];
export let sessionHistory = JSON.parse(localStorage.getItem('climbingSessionHistory')) || [];

export const gradeValues = {};
for (let i = 0; i <= 15; i++) {
    gradeValues[`V${i}`] = i + 1;
}

export function calculateTotalSessionLoad() {
    return sessionData.reduce((sum, climb) => sum + climb.load, 0);
}

export function calculateTotalMoveLoad() {
    return sessionData.reduce((sum, climb) => sum + (climb.moveLoad || 0), 0);
}