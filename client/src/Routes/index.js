const pathWithOutAuth = {
    Login: '/',
    Register: '/register'
}

const pathWithAuth = {
    Home: '/home',
    Setting: '/setting'
}

export const getPathWithOutAuth = Object.values(pathWithOutAuth);
export const getPathWithAuth = Object.values(pathWithAuth); 