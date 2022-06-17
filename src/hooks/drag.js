import { useEffect, useState, useCallback, useRef } from 'react';

export const useDrag = (onDragMove, context) => {
    const [dragData, setDragData] = useState(null);

    useEffect(() => {
        if (dragData) {
            const onMouseMove = e => {
                const dX = e.clientX - dragData.x;
                const dY = e.clientY - dragData.y;
                onDragMove(dragData.context, dX, dY);
            };
            const onMouseUp = e => {
                setDragData(null);
            };

            document.addEventListener('mousemove', onMouseMove, {
                capture: true,
            });
            document.addEventListener('mouseup', onMouseUp, { capture: true });

            return () => {
                document.removeEventListener('mousemove', onMouseMove, {
                    capture: true,
                });
                document.removeEventListener('mouseup', onMouseUp, {
                    capture: true,
                });
            };
        }
    }, [dragData, onDragMove]);

    const onMouseDown = useCallback(
        e => {
            if (e.buttons & 1) {
                e.preventDefault();
                setDragData({ x: e.clientX, y: e.clientY, context });
            }
        },
        [context]
    );

    return onMouseDown;
};

export const useTouchDrag = (onDragMove, context) => {
    const dragData = useRef();

    const onTouchStart = useCallback(e => {
        if (!dragData.current) {
            e.preventDefault();
            const touch = e.changedTouches[0];
            dragData.current = {
                touchID: touch.identifier,
                startX: touch.clientX,
                startY: touch.clientY,
                context
            }
        }
    }, [dragData, context])
    const onTouchMove = useCallback(e => {
        const touch = [...e.changedTouches].find(t => t.identifier === dragData.current?.touchID);
        if (touch) {
            const curDragData = dragData.current;
            const dX = touch.clientX - curDragData.startX;
            const dY = touch.clientY - curDragData.startY;
            onDragMove(curDragData.context, dX, dY);
        }
    }, [dragData, onDragMove])
    const onTouchEnd = useCallback(e => {
        const touch = [...e.changedTouches].find(t => t.identifier === dragData.current?.touchID);
        if (touch) {
            dragData.current = undefined;
        }
    }, [dragData])

    return { onTouchStart, onTouchMove, onTouchEnd };
}

