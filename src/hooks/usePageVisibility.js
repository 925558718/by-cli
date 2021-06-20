import { useRef } from 'react'

export function usePageVisibility() {
    const visibility = useRef('visible');

    const setVisibility = () => {
        if (typeof window != null) {
            visibility.current = document.hidden ? ' hidden' : 'visible';
        }
    }
    setVisibility()
    window.addEventListener('visibilitychange', setVisibility)
    return visibility
}
export default usePageVisibility