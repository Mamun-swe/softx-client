import jwt_decode from 'jwt-decode'

export const isAuthenticate = () => {
    const token = localStorage.getItem('token')
    if (token) {
        const user = jwt_decode(token)
        return { ...user, token }
    }
    return false;
};


