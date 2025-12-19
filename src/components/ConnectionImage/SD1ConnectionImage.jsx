import './ConnectionImage.css';

const SD1ConnectionImage = (props) => {
    switch (props.conn) {
        case 0:
            return (
                <svg
                    style={{ width: '52px', height: '17px' }}
                    className="conn-image"
                    width="100%"
                    height="100%"
                    viewBox="0 0 52 17"
                    version="1.1"
                >
                    <g>
                        <rect x="8.5" y="4.5" width="12" height="12" />
                        <rect x="28.5" y="4.5" width="12" height="12" />
                        <text x="11.997px" y="13.721px">
                            1
                        </text>
                        <text x="31.997px" y="13.721px">
                            2
                        </text>
                        <path d="M40.5,10.5l8,0" />
                        <path d="M20.5,10.5l8,0" />
                        <path d="M24.5,10.5l0,-10l-24,0l0,10l4,0" />
                        <path
                            className="conn-image__arrow"
                            d="M4,8l0,5l4,-2.5l-4,-2.5Z"
                        />
                        <path
                            className="conn-image__arrow"
                            d="M48,8l0,5l4,-2.5l-4,-2.5Z"
                        />
                    </g>
                </svg>
            );
        case 1:
            return (
                <svg
                    style={{ width: '40px', height: '33px' }}
                    className="conn-image"
                    width="100%"
                    height="100%"
                    viewBox="0 0 40 33"
                    version="1.1"
                >
                    <g>
                        <rect x="8.5" y="4.5" width="12" height="12" />
                        <rect x="8.5" y="20.5" width="12" height="12" />
                        <text x="11.997px" y="13.721px">
                            1
                        </text>
                        <text x="11.997px" y="29.721px">
                            2
                        </text>
                        <path d="M28.5,18.5l8,0" />
                        <path d="M20.5,10.5l8,0" />
                        <path d="M28.5,10.5l0,16l-8,0" />
                        <path d="M24.5,10.5l0,-10l-24,0l0,10l4,0" />
                        <path
                            className="conn-image__arrow"
                            d="M4,8l0,5l4,-2.5l-4,-2.5Z"
                        />
                        <path
                            className="conn-image__arrow"
                            d="M36,16l0,5l4,-2.5l-4,-2.5Z"
                        />
                    </g>
                </svg>
            );
        case 2:
            return (
                <svg
                    style={{ width: '39px', height: '69px' }}
                    className="conn-image"
                    width="100%"
                    height="100%"
                    viewBox="0 0 39 69"
                    version="1.1"
                >
                    <rect x="8.5" y="4.5" width="12" height="12" />
                    <rect x="8.5" y="20.5" width="12" height="12" />
                    <rect x="8.5" y="40.5" width="12" height="12" />
                    <rect x="8.5" y="56.5" width="12" height="12" />
                    <text x="11.997px" y="13.721px">
                        1
                    </text>
                    <text x="11.997px" y="29.721px">
                        2
                    </text>
                    <text x="11.997px" y="49.721px">
                        3
                    </text>
                    <text x="11.997px" y="65.721px">
                        4
                    </text>
                    <path d="M20.5,10.5L27.5,10.5L27.5,58.5L20.5,58.5" />
                    <path d="M27.5,34.5L35.5,34.5" />
                    <path d="M24.5,10.5L24.5,0.5L0.5,0.5L0.5,10.5L4.5,10.5" />
                    <path d="M24.5,46.5L24.5,36.5L0.5,36.5L0.5,46.5L4.5,46.5" />
                    <path
                        d="M4,8L4,13L8,10.5L4,8Z"
                        className="conn-image__arrow"
                    />
                    <path
                        d="M4,44L4,49L8,46.5L4,44Z"
                        className="conn-image__arrow"
                    />
                    <path
                        d="M35,32L35,37L39,34.5L35,32Z"
                        className="conn-image__arrow"
                    />
                    <path d="M20.5,26.5L27.5,26.5" />
                    <path d="M20.5,46.5L27.5,46.5" />
                </svg>
            );
        case 3:
            return (
                <svg
                    style={{ width: '72px', height: '33px' }}
                    className="conn-image"
                    width="100%"
                    height="100%"
                    viewBox="0 0 72 33"
                    version="1.1"
                >
                    <rect x="8.5" y="4.5" width="12" height="12" />
                    <rect x="28.5" y="20.5" width="12" height="12" />
                    <rect x="8.5" y="20.5" width="12" height="12" />
                    <rect x="48.5" y="4.5" width="12" height="12" />
                    <text x="11.997px" y="13.721px">
                        1
                    </text>
                    <text x="11.997px" y="29.721px">
                        2
                    </text>
                    <text x="31.997px" y="29.721px">
                        3
                    </text>
                    <path d="M44.5,10.5L44.5,26.5L40.5,26.5" />
                    <text x="51.997px" y="13.721px">
                        4
                    </text>
                    <path d="M20.5,10.5L48.5,10.5" />
                    <path d="M20.5,26.5L28.5,26.5" />
                    <path d="M60.5,10.5L68.5,10.5" />
                    <path d="M24.5,10.5L24.5,0.5L0.5,0.5L0.5,10.5L4.5,10.5" />
                    <path
                        d="M4,8L4,13L8,10.5L4,8Z"
                        className="conn-image__arrow"
                    />
                    <path
                        d="M68,8L68,13L72,10.5L68,8Z"
                        className="conn-image__arrow"
                    />
                </svg>
            );
        case 4:
            return (
                <svg
                    style={{ width: '92px', height: '17px' }}
                    className="conn-image"
                    width="100%"
                    height="100%"
                    viewBox="0 0 92 17"
                    version="1.1"
                >
                    <g>
                        <rect x="8.5" y="4.5" width="12" height="12" />
                        <rect x="48.5" y="4.5" width="12" height="12" />
                        <rect x="28.5" y="4.5" width="12" height="12" />
                        <rect x="68.5" y="4.5" width="12" height="12" />
                        <text x="11.997px" y="13.721px">
                            1
                        </text>
                        <text x="31.997px" y="13.721px">
                            2
                        </text>
                        <text x="51.997px" y="13.721px">
                            3
                        </text>
                        <text x="71.997px" y="13.721px">
                            4
                        </text>
                        <path d="M40.5,10.5l8,0" />
                        <path d="M60.5,10.5l8,0" />
                        <path d="M80.5,10.5l8,0" />
                        <path d="M20.5,10.5l8,0" />
                        <path d="M24.5,10.5l0,-10l-24,0l0,10l4,0" />
                        <path
                            className="conn-image__arrow"
                            d="M4,8l0,5l4,-2.5l-4,-2.5Z"
                        />
                        <path
                            className="conn-image__arrow"
                            d="M88,8l0,5l4,-2.5l-4,-2.5Z"
                        />
                    </g>
                </svg>
            );
        case 5:
            return (
                <svg
                    style={{ width: '60px', height: '37px' }}
                    className="conn-image"
                    width="100%"
                    height="100%"
                    viewBox="0 0 60 37"
                    version="1.1"
                >
                    <rect x="8.5" y="4.5" width="12" height="12" />
                    <rect x="8.5" y="24.5" width="12" height="12" />
                    <rect x="28.5" y="4.5" width="12" height="12" />
                    <rect x="28.5" y="24.5" width="12" height="12" />
                    <text x="11.997px" y="13.721px">
                        1
                    </text>
                    <text x="11.997px" y="33.721px">
                        3
                    </text>
                    <text x="31.997px" y="13.721px">
                        2
                    </text>
                    <text x="31.997px" y="33.721px">
                        4
                    </text>
                    <path d="M40.5,10.5L48.5,10.5L48.5,30.5L40.5,30.5" />
                    <path d="M20.5,10.5L28.5,10.5" />
                    <path d="M20.5,30.5L28.5,30.5" />
                    <path d="M48.5,20.5L56.5,20.5" />
                    <path d="M24.5,10.5L24.5,0.5L0.5,0.5L0.5,10.5L4.5,10.5" />
                    <path
                        d="M4,8L4,13L8,10.5L4,8Z"
                        className="conn-image__arrow"
                    />
                    <path d="M24.5,30.5L24.5,20.5L0.5,20.5L0.5,30.5L4.5,30.5" />
                    <path
                        d="M4,28L4,33L8,30.5L4,28Z"
                        className="conn-image__arrow"
                    />
                    <path
                        d="M56,18L56,23L60,20.5L56,18Z"
                        className="conn-image__arrow"
                    />
                </svg>
            );
        case 6:
            return (
                <svg
                    style={{ width: '76px', height: '33px' }}
                    className="conn-image"
                    width="100%"
                    height="100%"
                    viewBox="0 0 76 33"
                    version="1.1"
                >
                    <g>
                        <rect x="8.5" y="4.5" width="12" height="12" />
                        <rect x="28.5" y="20.5" width="12" height="12" />
                        <rect x="8.5" y="20.5" width="12" height="12" />
                        <rect x="48.5" y="20.5" width="12" height="12" />
                        <text x="11.997px" y="13.721px">
                            1
                        </text>
                        <text x="11.997px" y="29.721px">
                            2
                        </text>
                        <text x="31.997px" y="29.721px">
                            3
                        </text>
                        <text x="51.997px" y="29.721px">
                            4
                        </text>
                        <path d="M20.5,10.5l44,0l0,16l-4,0" />
                        <path d="M40.5,26.5l8,0" />
                        <path d="M20.5,26.5l8,0" />
                        <path d="M64.5,26.5l8,0" />
                        <path d="M24.5,10.5l0,-10l-24,0l0,10l4,0" />
                        <path
                            className="conn-image__arrow"
                            d="M4,8l0,5l4,-2.5l-4,-2.5Z"
                        />
                        <path
                            className="conn-image__arrow"
                            d="M72,24l0,5l4,-2.5l-4,-2.5Z"
                        />
                    </g>
                </svg>
            );
        case 7:
            return (
                <svg
                    style={{ width: '56px', height: '49px' }}
                    className="conn-image"
                    width="100%"
                    height="100%"
                    viewBox="0 0 56 49"
                    version="1.1"
                >
                    <g>
                        <rect x="8.5" y="4.5" width="12" height="12" />
                        <rect x="8.5" y="20.5" width="12" height="12" />
                        <rect x="8.5" y="36.5" width="12" height="12" />
                        <rect x="28.5" y="20.5" width="12" height="12" />
                        <text x="11.997px" y="13.721px">
                            1
                        </text>
                        <text x="11.997px" y="29.721px">
                            2
                        </text>
                        <text x="31.997px" y="29.721px">
                            3
                        </text>
                        <text x="11.997px" y="45.721px">
                            4
                        </text>
                        <path d="M20.5,10.5l24,0l0,32l-24,0" />
                        <path d="M20.5,26.5l8,0" />
                        <path d="M40.5,26.5l12,0" />
                        <path d="M24.5,10.5l0,-10l-24,0l0,10l4,0" />
                        <path
                            className="conn-image__arrow"
                            d="M4,8l0,5l4,-2.5l-4,-2.5Z"
                        />
                        <path
                            className="conn-image__arrow"
                            d="M52,24l0,5l4,-2.5l-4,-2.5Z"
                        />
                    </g>
                </svg>
            );
        default:
    }
};

export default SD1ConnectionImage;
