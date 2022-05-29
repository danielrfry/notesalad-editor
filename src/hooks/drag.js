import { useEffect, useState, useCallback } from 'react';

const useDrag = (onDragMove, context) => {
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

export default useDrag;
