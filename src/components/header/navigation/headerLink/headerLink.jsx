import { useLocation, useNavigate } from "react-router-dom";
import styles from '../navigation.module.css'

import PropTypes from 'prop-types';

export default function HeaderLink({text, icon, nav}) {

    const navigate = useNavigate();

    const {pathname} = useLocation()



    return (
        <div className={styles.headerLink + `  p-5`}>
            {icon}
           <p className={pathname === nav ? "p-2 text text_type_main-default" : "p-2 text text_type_main-default text_color_inactive" } >{text}</p> 
        </div>
    )
}

HeaderLink.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
}