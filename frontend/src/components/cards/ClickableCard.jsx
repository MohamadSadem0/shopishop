import React from 'react';
import {Link} from 'react-router-dom';

const ClickableCard = ({src, style, to, alt = 'Clickable Image'}) => {
    return (
        <Link to={to} className=' w-[334px] h-[209px] rounded-[20px] overflow-hidden'>

            <img
                src={src}
                alt={alt}
                className={style}
                // style={{ cursor: 'pointer', maxWidth: '100%' }}
            />

        </Link>
    );
};
export default ClickableCard;
