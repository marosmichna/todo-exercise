
const links = [
    { href: '/', label: 'Home' },
    { href: '/toDos', label: 'ToDos' },
    { href: '/contact', label: 'Contact' },
  ];

const NavBar = () => {



  return (
    <div className="bg-gray-800 p-4">
      <div className="container mx-auto flex space-x-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-white hover:text-gray-300"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}

export default NavBar;

