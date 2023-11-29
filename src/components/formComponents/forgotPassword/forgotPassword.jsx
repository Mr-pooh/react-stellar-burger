
import styles from '../form.module.css'
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../useForm/useForm';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../services/actions';


function ForgotPassword(){

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const { values, handleChange } = useForm({email: ''})

    const onChange = (e) => {
      handleChange(e)
    }

    const onSubmit = (e) => {
      e.preventDefault()
      dispatch(forgotPassword(values.email, ()=> navigate('/reset-password')))
    }

    return (
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className={styles.title + ` text text_type_main-large`}>Восстановление пароля</h1>
                <EmailInput
                  onChange={onChange}
                  value={values.email}
                  name={'email'}
                  isIcon={false}
                  placeholder={'Укажите e-mail'}
                />
                <Button htmlType="submit" type="primary" size="medium" onClick={null}>Восстановить</Button>
                <div className={styles.text}>
                    <p className={`text text_type_main-default text_color_inactive`}>Вспомнили пароль?<Link to={'/login'} className={styles.link} >Войти</Link></p>
                </div>
            </form>

    )
}

export default ForgotPassword