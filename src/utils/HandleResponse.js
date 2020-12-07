
import { useHistory } from 'react-router-dom'

export const HandleResponse = (response) => {
    const history = useHistory()
    if (response.status === 500 || response.status === 501 || response.status === 404) {
        localStorage.clear()
        return history.push('/')
    }
}

