import React from 'react';
import goTop1 from '../public/gotop.png';

function ScrollToTop() {
    const [scroll, setScroll] = React.useState(window.scrollY);
    const [isClick, setIsClick] = React.useState();

    React.useEffect(() => {
        window.addEventListener('scroll', function () {
            if (!isClick) setScroll(window.scrollY);
        });
    });
    function goTop() {
        window.scrollTo({ 'behavior': 'smooth', 'top': 0 });
        setIsClick(true);
        setScroll(0);
    }

    return (
        <div className="gototop" onClick={() => goTop()} style={scroll > 200 ? { visibility: 'visible', opacity: '1' } : null} >
            <img src={goTop1} alt="goTop" />
        </div>
    );
}

export default ScrollToTop;