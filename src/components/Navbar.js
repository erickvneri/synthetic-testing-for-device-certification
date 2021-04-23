import '../App.scss';

function Navbar(props) {
  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      {/* SmartThings Logo */}
      <a href='https://smartthings.developer.samsung.com'
        className='navbar-item'>
        <img className='navbar-item'
          alt='SmartThings Logo'
          src='https://aws1.discourse-cdn.com/smartthings/original/3X/8/0/806ef827c63fed709436f7b08671bd8edd9ee4f3.png'/>
      </a>


      {/* Home Option */}
      <a href='/'
        className='navbar-item'
        style={{textDecoration: 'none'}}>
        Home
      </a>

      {/* Devices List Option */}
      <a href='/devices-list'
        className='navbar-item'
        style={{textDecoration: 'none'}}>
        Devices
      </a>

      {/* Capability Reference */}
      <a href='https://smartthings.developer.samsung.com/docs/api-ref/capabilities.html'
        target='_blank'
        className='navbar-item'
        style={{textDecoration: 'none'}}>
        Capability Reference
      </a>

      {/* Community Reference */}
      <a href='https://community.smartthings.com'
        target='_blank'
        className='navbar-item'
        style={{textDecoration: 'none'}}>
        Community
      </a>
    </nav>
  )
}

export default Navbar;
