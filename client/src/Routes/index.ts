const routeWithOutAuth = [
    '/',
    '/register'
];
export const isRouteWithOutAuth = (route: string) => {
    return routeWithOutAuth.includes(route);
}