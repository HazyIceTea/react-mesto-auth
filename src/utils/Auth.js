const baseUrl = "https://auth.nomoreparties.co/";

function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

export const register = (data) =>{
    return fetch(`${baseUrl}signup`,{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            password: data.password,
            email: data.email
        })
    })
        .then(res => getResponseData(res));
}

export const login = (data) =>{
    return fetch(`${baseUrl}signin`,{
        method: 'POST',
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({
            password: data.password,
            email: data.email
        })
    })
        .then(res => getResponseData(res))
        .then(res =>  localStorage.setItem('jwt', res.token))
}

export const checkToken = (token) =>{
    return fetch(`${baseUrl}users/me`,{
        method: 'GET',
        headers: {"Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`},
    })
        .then(res => getResponseData(res));
}
