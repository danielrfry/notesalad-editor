import React from 'react';

const WaveGrid = ({ columnCount = 2, children }) => (
    <div
        style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        }}
    >
        {children}
    </div>
);

export default WaveGrid;
