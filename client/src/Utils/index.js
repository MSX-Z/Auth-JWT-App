export const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
}

export const validateName = (name) => {
    const re = /^[a-zA-Z\s]{3,}$/;
    return re.test(name);
}
