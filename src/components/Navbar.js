import '../App.scss';
import OAuthButton from './OAuthButton';


function Navbar(props) {

  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>

      <div className='navbar-menu'>
        <div className='navbar-start'>
          <p className='navbar-item'>
            Device Capability Certification
          </p>
        </div>
      </div>

      <div className='navbar-end'>
        <p className='navbar-item'>
          <OAuthButton
            accessToken={props.accessToken}
            setToken={props.setToken}
            redirect={props.redirect}/>
        </p>
      </div>
    </nav>
  )
}

export default Navbar;
