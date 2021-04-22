import '../App.scss';
import OAuthButton from './OAuthButton';

function Navbar(props) {
  const enableDevicesOption = () => {
    if (props.accessToken) {
      return (
        <a className='navbar-item' href="/devicesList">Devices</a>
      )
    }
  };

  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      <a href="https://smartthings.developer.samsung.com" className='navbar-item'>
        <img className='navbar-item' alt="SmartThings Logo"
          src="https://aws1.discourse-cdn.com/smartthings/original/3X/8/0/806ef827c63fed709436f7b08671bd8edd9ee4f3.png"/>
      </a>

      <section className='navbar-menu'>
        <div className='navbar-start'>
          <a className='navbar-item' href='/'>Home</a>
          {enableDevicesOption}
        </div>
      </section>


      <div className='navbar-end'>
        <p className='navbar-item'>
          <OAuthButton
            accessToken={props.accessToken}
            setToken={props.setToken}
            redirect={props.redirect} />
        </p>
      </div>
    </nav>
  )
}

export default Navbar;
