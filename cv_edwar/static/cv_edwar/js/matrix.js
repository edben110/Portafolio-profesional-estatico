// Placeholder module for matrix effect.
// Keep this file so Django can resolve the script import while you build the effect.
const canvas = document.getElementById('matrixCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}
