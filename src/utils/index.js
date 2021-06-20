export function raf(FrameRequestCallback) {
    const requestAnimationFrame = window.requestAnimationFrame;
    return requestAnimationFrame.call(window,FrameRequestCallback)
}

export function doubleRaf(fn){
    raf(()=>{
        raf(fn);
    })
}