fetch('https://reqres.in/api/users')
    .then(res => res.json())
    .then(console.log)