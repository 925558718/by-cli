import React, { useEffect, useMemo, useRef, useState } from 'react'
import './index.stylus'
import useTouch from '../../hooks/useTouch'
import useWindowSize from '../../hooks/useWindowSize'
import useInterval from '../../hooks/useTimeout'
import { doubleRaf } from '../../utils/index'

function Swiper(props) {
    const {
        children,
        interval = 1000,
        animInterval = 500,
        initialSwipe = 0
    } = props
    const [test,setTest]=useState(0)
    const [active, setActive] = useState(0)
    const [items, setItems] = useState([])
    const [swiping, setSwiping] = useState(false)
    const [rect, setRect] = useState({})
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [offset, setOffset] = useState(0)
    const touch = useTouch()
    const windowSize = useWindowSize()
    const ref = useRef(null)
    const timer = useRef(null)
    const count = React.Children.count(children)
    const size = useMemo(() => width, [width])
    const delta = useMemo(() => touch.deltaY.current)
    const contentSize = useMemo(() => count * size, [count, size])

    const minOffset = useMemo(() => {
        if (rect) {
            const base = rect.width
            return base - size * count
        }
        return 0
    })
    useEffect(() => {
        const items = React.Children.map(children, (item, index) => {
            return React.cloneElement(item, {
                className: 'swiper-item',
                style: { width: `${size}px` }
            })
        })
        setItems(items)
    }, [active, size])
    const isCorrectDirection = useMemo(() => {
        return touch.direction.current === 'horizontal'
    })
    const contentStyle = useMemo(() => {
        const style = {
            transitionDuration: `${swiping ? 0 : animInterval}ms`,
            transform: `translateX(${offset})`
        }
        if (size) {
            style.width = `${contentSize}px`;
        }
        return style
    }, [swiping, offset, animInterval])
    const getTargetActive = (pace) => {
        if (pace) {
            return Math.min(Math.max(active + pace, -1), count);
        }
        return active
    }

    const getTargetOffset = (targetActive, offset) => {
        let currentPosition = targetActive * size;
        let targetOffset = offset - currentPosition
        return targetOffset
    }

    const move = ({ pace = 0, offset = 0, emitChnage }) => {
        if (count <= 1) { return; }
        const targetActive = getTargetActive(pace)
        const targetOffset = getTargetOffset(targetActive, offset)
        setActive(targetActive);
        setOffset(targetOffset);
    }

    const correctPosition = () => {
        setSwiping(true);
        if (active <= -1) {
            move({ pace: count })
        }
        if (active > count) {
            move({ pace: -count })
        }
    }
    const prev = () => {
        correctPosition();
        touch.reset();

        doubleRaf(() => {
            setSwiping(false);
            move({
                pace: -1,
                emitChnage: true
            })
        })
    }
    const next = () => {
        correctPosition();
        touch.reset();
        doubleRaf(() => {
            setSwiping(false);
            move({
                pace: 1,
                emitChnage: true
            })
        })
    }


    const stopAutoplay = () => {
        clearTimeout(timer)
    }

    const autoplay = () => {
        next()
    }
    
    const initialize = (active = initialSwipe) => {
        if (!ref.current) { return; }
        stopAutoplay();

        const rect = {
            width: ref.current.offsetWidth,
            height: ref.current.offsetHeight
        }

        if (count) {
            active = Math.min(count - 1, active)
        }

        setRect(rect)
        setSwiping(true)
        setActive(active)
        setWidth(rect.width)
        setHeight(rect.height)
        setOffset(getTargetActive(active))
    }
    const resize = () => initialize(active)

    let touchStartTimer=0

    const touTouchStart = (event) => {
        touch.start(event);
        touchStartTimer = Date.now();
        stopAutoplay();
        correctPosition();
    }

    const onTouchMove = (event) => {
        if (swiping) {
            touch.move(event);
            if (isCorrectDirection) {
                preventDefault(event)
                move({ offset: delta })
            }
        }
    }

    const onTouchEnd = () => {
        if (!swiping) { return; }
        const duration = Date.now() - touchStartTimer;
        const speend = delta / duration;
        const shouldSwipe = Math.abs(speed) > 0.25 || Math.abs(delta) > size / 2
        if (shouldSwipe && isCorrectDirection) {
            const offset = touch.deltaX
            let pace = 0
            pace = offset > 0 ? delta > 0 ? -1 : 1 : 0
            move({ pace })
        } else if (delte) {
            move({ pace: 0 })
        }
        setSwiping(false)
        autoplay()
    }
    useEffect(() => {
        resize()
    }, [windowSize.height, windowSize.width])

    useEffect(() => {
        initialize()
    }, [])
    useInterval(autoplay,interval)
    return (
        <div className={'swiper'} ref={ref}>{active}
            <div className={'swiper-content'} style={contentStyle}>
                {items}
            </div>
        </div>
    )
}

export default Swiper