let selectElem = document.querySelector('#theme-select');
let logo = document.querySelector('#logo');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    const container = document.querySelector('.mission-container');
    const body = document.body;
    const subtitle = document.querySelector('.subtitle');
    const content = document.querySelector('.content');
    const title = document.querySelector('.title');

    if (current == 'dark') {
        // Dark mode
        body.style.backgroundColor = '#1a1a1a';
        container.style.backgroundColor = '#2a2a2a';
        container.style.borderColor = '#444';
        container.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
        
        title.style.color = '#eee';
        subtitle.style.color = '#4a9eff';
        content.style.color = '#ddd';
        
        // Change logo to dark version
        logo.src = 'logos/byuilogowhite.png';
        logo.alt = 'BYU Idaho Dark Logo';
    } else {
        // Light mode (default)
        body.style.backgroundColor = '#f8f8f8';
        container.style.backgroundColor = 'white';
        container.style.borderColor = '#ddd';
        container.style.boxShadow = '0 0 20px rgba(0,0,0,0.1)';
        
        title.style.color = '';
        subtitle.style.color = '#1e66ed';
        content.style.color = '#222';
        
        // Reset to light logo
        logo.src = 'logos/byuilogoblue.webp';
        logo.alt = 'BYU Idaho Logo';
    }
}     