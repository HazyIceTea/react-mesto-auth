const baseUrl = "https://auth.nomoreparties.co/";

export const register = (data) =>{
    return fetch(`${baseUrl}signup`,{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            password: data.password,
            email: data.email
        })
    })
        .then(res => res.ok? res.json(): Promise.reject());
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
        .then(res => res.ok? res.json(): Promise.reject())
        .then(res =>  localStorage.setItem('jwt', res.token))
}

export const getMyInfo = (token) =>{
    return fetch(`${baseUrl}users/me`,{
        method: 'GET',
        headers: {"Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`},
    })
        .then(res => res.ok? res.json(): Promise.reject());
}
