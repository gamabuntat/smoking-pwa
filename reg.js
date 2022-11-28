if ('serviceWorker' in navigator) {
    console.log('sw register...');
    navigator.serviceWorker.register('sw.js');
}
