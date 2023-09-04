import "./headerLink.css";


import PropTypes from 'prop-types';

export default function HeaderLink({text, icon, active}) {
    return (
        <div className='headerLink  p-5'>
            {icon}
           <p className={active ? "p-2 text text_type_main-default" : "p-2 text text_type_main-default text_color_inactive" } >{text}</p> 
        </div>
    )
}

HeaderLink.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
}