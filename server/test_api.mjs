import './server.js';
await new Promise(r => setTimeout(r, 900));

const doFetch = async(url, opts) => {
    const r = await fetch(url, opts);
    return r.json();
};

const health = await doFetch('http://localhost:5000/api/health');
console.log('HEALTH:', JSON.stringify(health));

const login = await doFetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'principal@sjpcollege.ac.in', password: 'password123' })
});
console.log('LOGIN:', JSON.stringify(login));

const wrong = await doFetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'principal@sjpcollege.ac.in', password: 'wrongpass' })
});
console.log('WRONG_PASS:', JSON.stringify(wrong));

const signup = await doFetch('http://localhost:5000/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName: 'New Teacher', email: 'newt@sjp.ac.in', password: 'newpass1', role: 'Faculty Teacher' })
});
console.log('SIGNUP:', JSON.stringify(signup));

process.exit(0);

process.exit(0);