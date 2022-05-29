import React from 'react';
import classNames from 'classnames';

import './KeyboardOctave.css';

const KeyboardOctave = ({ octave, activeNotes, highlighted }) => {
    const n = (octave + 2) * 12;
    const cLabel = `C${octave}`;

    const isNoteActive = note => activeNotes.includes(note + n);

    return (
        <div
            className={classNames('keyboard-octave', {
                'keyboard-octave--highlighted': highlighted,
            })}
        >
            <svg viewBox="0 0 80 155" className="keyboard-octave__keys">
                <path
                    data-notenum={n + 11}
                    d="M0,0.5l77,0c1.38,0 2.5,1.12 2.5,2.5l0,17c0,1.38 -1.12,2.5 -2.5,2.5l-77,0"
                    className={classNames('keyboard-octave__key-white', {
                        'keyboard-octave__key-white--active': isNoteActive(11),
                    })}
                />
                <path
                    data-notenum={n + 9}
                    d="M0,22.5l77,0c1.38,0 2.5,1.12 2.5,2.5l0,17c0,1.38 -1.12,2.5 -2.5,2.5l-77,0"
                    className={classNames('keyboard-octave__key-white', {
                        'keyboard-octave__key-white--active': isNoteActive(9),
                    })}
                />
                <path
                    data-notenum={n + 7}
                    d="M0,44.5l77,0c1.38,0 2.5,1.12 2.5,2.5l0,17c0,1.38 -1.12,2.5 -2.5,2.5l-77,0"
                    className={classNames('keyboard-octave__key-white', {
                        'keyboard-octave__key-white--active': isNoteActive(7),
                    })}
                />
                <path
                    data-notenum={n + 5}
                    d="M0,66.5l77,0c1.38,0 2.5,1.12 2.5,2.5l0,17c0,1.38 -1.12,2.5 -2.5,2.5l-77,0"
                    className={classNames('keyboard-octave__key-white', {
                        'keyboard-octave__key-white--active': isNoteActive(5),
                    })}
                />
                <path
                    data-notenum={n + 4}
                    d="M0,88.5l77,0c1.38,0 2.5,1.12 2.5,2.5l0,17c0,1.38 -1.12,2.5 -2.5,2.5l-77,0"
                    className={classNames('keyboard-octave__key-white', {
                        'keyboard-octave__key-white--active': isNoteActive(4),
                    })}
                />
                <path
                    data-notenum={n + 2}
                    d="M0,110.5l77,0c1.38,0 2.5,1.12 2.5,2.5l0,17c0,1.38 -1.12,2.5 -2.5,2.5l-77,0"
                    className={classNames('keyboard-octave__key-white', {
                        'keyboard-octave__key-white--active': isNoteActive(2),
                    })}
                />
                <path
                    data-notenum={n + 0}
                    d="M0,132.5l77,0c1.38,0 2.5,1.12 2.5,2.5l0,17c0,1.38 -1.12,2.5 -2.5,2.5l-77,0"
                    className={classNames('keyboard-octave__key-white', {
                        'keyboard-octave__key-white--active': isNoteActive(0),
                    })}
                />
                <path
                    data-notenum={n + 10}
                    d="M0,15.5l43.5,0c1.104,0 2,0.896 2,2l0,10c0,1.104 -0.896,2 -2,2l-43.5,0"
                    className={classNames('keyboard-octave__key-black', {
                        'keyboard-octave__key-black--active': isNoteActive(10),
                    })}
                />
                <path
                    data-notenum={n + 8}
                    d="M0,37.5l43.5,0c1.104,0 2,0.896 2,2l0,10c0,1.104 -0.896,2 -2,2l-43.5,0"
                    className={classNames('keyboard-octave__key-black', {
                        'keyboard-octave__key-black--active': isNoteActive(8),
                    })}
                />
                <path
                    data-notenum={n + 6}
                    d="M0,59.5l43.5,0c1.104,0 2,0.896 2,2l0,10c0,1.104 -0.896,2 -2,2l-43.5,0"
                    className={classNames('keyboard-octave__key-black', {
                        'keyboard-octave__key-black--active': isNoteActive(6),
                    })}
                />
                <path
                    data-notenum={n + 3}
                    d="M0,103.5l43.5,0c1.104,0 2,0.896 2,2l0,10c0,1.104 -0.896,2 -2,2l-43.5,0"
                    className={classNames('keyboard-octave__key-black', {
                        'keyboard-octave__key-black--active': isNoteActive(3),
                    })}
                />
                <path
                    data-notenum={n + 1}
                    d="M0,125.5l43.5,0c1.104,0 2,0.896 2,2l0,10c0,1.104 -0.896,2 -2,2l-43.5,0"
                    className={classNames('keyboard-octave__key-black', {
                        'keyboard-octave__key-black--active': isNoteActive(1),
                    })}
                />
                <text
                    data-notenum={n + 0}
                    x="59.66px"
                    y="147.795px"
                    className={classNames('keyboard-octave__key-label', {
                        'keyboard-octave__key-label--active': isNoteActive(0),
                    })}
                >
                    {cLabel}
                </text>
            </svg>
        </div>
    );
};

export default KeyboardOctave;
