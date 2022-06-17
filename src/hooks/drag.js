import { useCallback, useRef } from 'react';

const useDrag = (onDragMove, context) => {
    const dragData = useRef();

    const onPointerDown = useCallback(e => {
        if (!dragData.current) {
            e.preventDefault();
            e.currentTarget.setPointerCapture(e.pointerId);
            dragData.current = {
                startX: e.clientX,
                startY: e.clientY,
                pointerId: e.pointerId,
                context
            }
        }
    }, [dragData, context])
    const onPointerMove = useCallback(e => {
        const curDragData = dragData.current;
        if (curDragData?.pointerId === e.pointerId) {
            const dX = e.clientX - curDragData.startX;
            const dY = e.clientY - curDragData.startY;
            onDragMove(curDragData.context, dX, dY);
        }
    }, [dragData, onDragMove])
    const onPointerUp = useCallback(e => {
        if (dragData.current?.pointerId === e.pointerId) {
            e.currentTarget.releasePointerCapture(e.pointerId);
            dragData.current = undefined;
        }
    }, [dragData])

    return { onPointerDown, onPointerMove, onPointerUp };
}

export default useDrag;