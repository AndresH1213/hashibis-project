import { Link } from 'react-router-dom';
import { Menu, Dropdown, MenuProps, Space } from 'antd';
import type { navProps } from '../interfaces';
import { DownOutlined } from '@ant-design/icons';

const getItems = (isAuth: boolean) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to="/">Home</Link>,
    },
    {
      key: '2',
      label: <Link to="/api">Api Service</Link>,
    },
    {
      key: '3',
      label: <>{isAuth ? <Link to="/token">Token</Link> : <Link to="/login">Start</Link>}</>,
    },
  ];
  return items;
};

const Navbar = ({ isAuth }: navProps) => {
  return (
    <nav className="navbar">
      <a href="/" className="nav-logo">
        Hashibis
      </a>
      <ul className="navbar-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/api">Api Service</Link>
        </li>
        <li>{isAuth ? <Link to="/token">Token</Link> : <Link to="/login">Start</Link>}</li>
      </ul>
      <Dropdown menu={{ items: getItems(isAuth) }} trigger={['click']} className="navbar-dropdown">
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Menú
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </nav>
  );
};

export default Navbar;
