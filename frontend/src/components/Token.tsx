import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { Card, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

const Token = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.isInit && !auth?.token) {
      navigate('/login');
    } else if (auth.token) {
      setToken(auth.token);
    }
  }, [auth.token]);

  return (
    <section className="token-container">
      <Card className="token-box">
        <p>{token || 'Not authenticated'}</p>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(token);
          }}
          icon={<CopyOutlined />}
          className="copy-button"
        ></Button>
      </Card>
    </section>
  );
};

export default Token;
