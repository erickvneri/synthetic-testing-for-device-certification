import '../App.scss';
import OAuthButton from './OAuthButton';

function Navbar(props) {

  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      <a className='navbar-item'
        href="https://community.smartthings.com/c/developer-programs">
        <img src="https://aws1.discourse-cdn.com/smartthings/original/3X/8/0/806ef827c63fed709436f7b08671bd8edd9ee4f3.png"
             alt="SmartThings Logo" />
      </a>

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
