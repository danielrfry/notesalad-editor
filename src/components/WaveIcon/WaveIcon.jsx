import React from 'react';

import './WaveIcon.css';

const SVG_PROPS = {
    className: 'wave-icon',
    viewBox: '0 0 32 19',
    version: '1.1',
};

const WaveIcon = props => {
    switch (props.shape) {
        case 0:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5c0,0 2.183,-9.009 7.75,-9.025m7.75,9.025c0,0 -2.183,-9.009 -7.75,-9.025m7.75,9.025c0,0 2.183,9.009 7.75,9.025m7.75,-9.025c0,0 -2.183,9.009 -7.75,9.025" />
                    <path d="M0.5,9.5l31,0" />
                </svg>
            );
        case 1:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5c0,0 2.183,-9.009 7.75,-9.025m7.75,9.025c0,0 -2.183,-9.009 -7.75,-9.025" />
                    <path d="M0.5,9.5l31,0" />
                </svg>
            );
        case 2:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5c0,0 2.183,-8.984 7.75,-9m7.75,9c0,0 2.183,-8.984 7.75,-9m-7.75,9c0,0 -2.183,-8.984 -7.75,-9m23.25,9c0,0 -2.183,-8.984 -7.75,-9" />
                    <path d="M0.5,9.5l31,0" />
                </svg>
            );
        case 3:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5l31,0" />
                    <path d="M0.5,9.5c0,0 2.433,-8.984 8,-9m0,0l0,9m8,0c0,0 2.433,-8.984 8,-9m0,0l0,9m-16,0l8,0m8,0l7,0" />
                </svg>
            );
        case 4:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5l31,0" />
                    <path d="M0.5,9.5c0,0 1.091,-8.984 3.875,-9m3.875,9c0,0 -1.091,-8.984 -3.875,-9m3.875,9c0,0 1.091,8.984 3.875,9m3.875,-9c0,0 -1.091,8.984 -3.875,9m3.875,-9l15.5,0" />
                </svg>
            );
        case 5:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5l31,0" />
                    <path d="M0.5,9.5c0,0 1.091,-8.984 3.875,-9m3.875,9c0,0 1.091,-8.984 3.875,-9m-3.875,9c0,0 -1.091,-8.984 -3.875,-9m11.625,9c0,0 -1.091,-8.984 -3.875,-9m3.875,9l15.5,0" />
                </svg>
            );
        case 6:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5l31,0" />
                    <path d="M0.5,9.5l0,-9l15,0l0,18l16,0l0,-9" />
                </svg>
            );
        case 7:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M31.5,9.5l-31,0" />
                    <path d="M0.5,9.5l0,-9m0,0c0,0 7.897,6.382 15.5,9m15.5,9c0,0 -7.897,-6.382 -15.5,-9m15.5,0l0,9" />
                </svg>
            );
        case 8:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M18.071,14.5L29.429,14.5M0.5,9.5C0.5,9.5 1.128,6.906 2.571,4.5M16,9.5C16,9.5 15.372,6.906 13.929,4.5M16,9.5C16,9.5 16.628,12.094 18.071,14.5M31.5,9.5C31.5,9.5 30.872,12.094 29.429,14.5M2.571,4.5L13.929,4.5" />
                    <path d="M0.5,9.5L31.5,9.5" />
                </svg>
            );
        case 9:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5C0.5,9.5 1.128,6.906 2.571,4.5M16,9.5C16,9.5 15.372,6.906 13.929,4.5M2.571,4.5L13.929,4.5" />
                    <path d="M0.5,9.5L31.5,9.5" />
                </svg>
            );
        case 10:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5C0.5,9.5 1.128,6.906 2.571,4.5M16,9.5C16,9.5 15.372,6.906 13.929,4.5M2.571,4.5L13.929,4.5M16,9.5C16,9.5 16.628,6.906 18.071,4.5M31.5,9.5C31.5,9.5 30.872,6.906 29.429,4.5M18.071,4.5L29.429,4.5" />
                    <path d="M0.5,9.5L31.5,9.5" />
                </svg>
            );
        case 11:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5C0.5,9.5 1.128,6.906 2.571,4.5M2.571,4.5L8.5,4.5L8.5,9.5" />
                    <path d="M16.5,9.5C16.5,9.5 17.128,6.906 18.571,4.5M18.571,4.5L24.5,4.5L24.5,9.5" />
                    <path d="M0.5,9.5L31.5,9.5" />
                </svg>
            );
        case 12:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M9.002,14.5L14.498,14.5M0.5,9.5C0.5,9.5 0.804,6.906 1.502,4.5M8,9.5C8,9.5 7.696,6.906 6.998,4.5M8,9.5C8,9.5 8.304,12.094 9.002,14.5M15.5,9.5C15.5,9.5 15.196,12.094 14.498,14.5M1.502,4.5L6.998,4.5" />
                    <path d="M0.5,9.5L31.5,9.5" />
                </svg>
            );
        case 13:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5C0.5,9.5 0.804,6.906 1.502,4.5M8,9.5C8,9.5 7.696,6.906 6.998,4.5M1.502,4.5L6.998,4.5M8,9.5C8,9.5 8.304,6.906 9.002,4.5M15.5,9.5C15.5,9.5 15.196,6.906 14.498,4.5M9.002,4.5L14.498,4.5" />
                    <path d="M0.5,9.5L31.5,9.5" />
                </svg>
            );
        case 14:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5L31.5,9.5" />
                    <path d="M0.5,9.5L0.5,0.5L15.5,0.5L15.5,9.5" />
                </svg>
            );
        case 16:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5L31.5,9.5" />
                    <path d="M0.5,9.5L8,0.5L24,18.5L31.5,9.5" />
                </svg>
            );
        case 17:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5L31.5,9.5" />
                    <path d="M0.5,9.5L8,0.5L16,9.5" />
                </svg>
            );
        case 18:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5L31.5,9.5" />
                    <path d="M0.5,9.5L8,0.5L16,9.5M16,9.5L23.5,0.5L31.5,9.5" />
                </svg>
            );
        case 19:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5L31.5,9.5" />
                    <path d="M0.5,9.5L8,0.5L8,9.5" />
                    <path d="M16,9.5L23.5,0.5L23.5,9.5" />
                </svg>
            );
        case 20:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5L31.5,9.5" />
                    <path d="M0.5,9.5L4.25,0.5L12.25,18.5L16,9.5" />
                </svg>
            );
        case 21:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5L31.5,9.5" />
                    <path d="M0.5,9.5L4.25,0.5L8.25,9.5" />
                    <path d="M8.25,9.5L12,0.5L16,9.5" />
                </svg>
            );
        case 22:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5L31.5,9.5" />
                    <path d="M0.5,9.5L0.5,0.5L8.5,0.5L8.5,9.5" />
                    <path d="M16.5,9.5L16.5,0.5L24.5,0.5L24.5,9.5" />
                </svg>
            );
        case 24:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5L31.5,9.5" />
                    <path d="M0.5,9.5L15.5,0.5L15.5,18.5L30.5,9.5" />
                </svg>
            );
        case 25:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5L31.5,9.5" />
                    <path d="M0.5,9.5L15.5,0.5L15.5,9.5" />
                </svg>
            );
        case 26:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5L31.5,9.5" />
                    <path d="M0.5,9.5L15.5,0.5L15.5,9.5M15.5,9.5L30.5,0.5L30.5,9.5" />
                </svg>
            );
        case 27:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5L31.5,9.5" />
                    <path d="M0.5,9.5L8.5,4.7L8.5,9.5" />
                    <path d="M15.5,9.5L23.5,4.7L23.5,9.5" />
                </svg>
            );
        case 28:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5L31.5,9.5" />
                    <path d="M0.5,9.5L8.5,0.5L8.5,18.5L16.5,9.5" />
                </svg>
            );
        case 29:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5L31.5,9.5" />
                    <path d="M0.5,9.5L8.5,0.5L8.5,9.5M8.5,9.5L16.5,0.5L16.5,9.5" />
                </svg>
            );
        case 30:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5L31.5,9.5" />
                    <path d="M0.5,9.5L0.5,0.5L8.5,0.5L8.5,9.5" />
                </svg>
            );
        case 31:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,18.5L15.5,0.5L30.5,18.5" />
                </svg>
            );
        case 32:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,18.5L0.5,0.5L30.5,18.5" />
                </svg>
            );
        case 33:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,18.5L30.5,0.5L30.5,18.5" />
                </svg>
            );
        case 34:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,18.5L0.5,0.5L14.5,0.5L14.5,18.5L30.5,18.5" />
                </svg>
            );
        case 35:
            return (
                <svg {...SVG_PROPS}>
                    <path d="M0.5,9.5L0.5,6.5L3.5,6.5L3.5,3.5L6.5,3.5L6.5,16.5L9.5,16.5L9.5,1.5L12.5,1.5L12.5,13.5L15.5,13.5L15.5,17.5L18.5,17.5L18.5,4.5L21.5,4.5L21.5,7.5L24.5,7.5L24.5,0.5L27.5,0.5L27.5,13.5L30.5,13.5L30.5,9.5" />
                </svg>
            );
        default:
    }
};

export default WaveIcon;
