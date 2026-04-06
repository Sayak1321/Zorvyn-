const output = document.getElementById('output');
const log = (msg) => { output.innerText += '\n\n' + msg; };

document.getElementById('testBtn').addEventListener('click', async () => {
    output.innerText = 'Starting sequence...';
    try {
        log('=> 1. Pinging /health endpoint');
        let res = await fetch('/health');
        log('Response: ' + JSON.stringify(await res.json(), null, 2));

        log('=> 2. Pinging /api/auth/register (Creating random user)');
        const randomEmail = `user${Math.floor(Math.random() * 10000)}@test.com`;
        res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: randomEmail, password: 'securePassword123' })
        });
        log('Response: ' + JSON.stringify(await res.json(), null, 2));

        log('=> 3. Pinging /api/auth/login');
        res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: randomEmail, password: 'securePassword123' })
        });
        const loginData = await res.json();
        log('Response: ' + JSON.stringify(loginData, null, 2));

        log('=> 4. Pinging /api/records with JWT Token');
        res = await fetch('/api/records', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginData.token}`
            }
        });
        log('Response: ' + JSON.stringify(await res.json(), null, 2));
        
        log('Walkthrough sequence completed successfully!');
    } catch(e) {
        log('Error: ' + e.message);
    }
});
