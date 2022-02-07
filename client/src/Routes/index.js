const routeWithOutAuth = [
    '/',
    '/register'
];
export const isRouteWithOutAuth = (route) => {
    return routeWithOutAuth.includes(route);
}