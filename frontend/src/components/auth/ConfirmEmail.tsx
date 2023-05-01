import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin, Button, Form, notification, Input, Col } from 'antd';

// amplify
import { LoadingOutlined } from '@ant-design/icons';
import { ConfirmEmailProps } from '../../interfaces';

const ConfirmEmail = ({ authService }: ConfirmEmailProps) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (username) {
      setUsername(username);
    } else {
      navigate('/login');
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // show progress spinner
    setLoading(true);

    authService
      .confirmSignUp(username, confirmationCode)
      .then(() => {
        handleOpenNotification(
          'success',
          'Succesfully confirmed!',
          'You will be redirected to login in a few!'
        );
      })
      .catch((err) => {
        handleOpenNotification('error', 'Invalid code', err.message);
        setLoading(false);
      });
  };

  const handleOpenNotification = (type: string, title: string, message: string): void => {
    switch (type) {
      case 'success':
        notification['success']({
          message: title,
          description: message,
          placement: 'topRight',
          duration: 1.5,
          onClose: () => {
            navigate('/login');
          },
        });
        break;

      case 'error':
        notification['error']({
          message: title,
          description: message,
          placement: 'topRight',
          duration: 1.5,
        });
        break;
    }
  };

  const handleOnPaste = (event: React.ClipboardEvent) => {
    event.preventDefault();

    let code = event.clipboardData.getData('Text').trim();

    /** Update input */
    setConfirmationCode(code);

    // regex to check if string is numbers only
    const reg = new RegExp('^[0-9]+$');

    if (reg.test(code) && code.length === 6) {
      setLoading(true);

      authService
        .confirmSignUp(username, code)
        .then(() => {
          handleOpenNotification(
            'success',
            'Succesfully confirmed!',
            'You will be redirected to login in a few!'
          );
        })
        .catch((err) => {
          handleOpenNotification('error', 'Invalid code', err.message);
          setLoading(false);
        });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationCode(event.currentTarget.value);
  };

  return (
    <section className="full-container">
      <form onSubmit={handleSubmit}>
        <Col md={24} lg={18}>
          <div className="verify-code__text">
            <h2>Check your email</h2>
            <p>We've sent a six­ digit confirmation code</p>
          </div>
          <Form.Item validateStatus={error && 'error'} help={error} label="Confirmation Code">
            <Input
              size="large"
              type="number"
              placeholder="Enter confirmation code"
              onChange={handleChange}
              onPaste={handleOnPaste}
              value={confirmationCode}
            />
          </Form.Item>
        </Col>
        <div>
          <Button type="primary" disabled={loading} htmlType="submit" size="large">
            {loading ? <Spin indicator={<LoadingOutlined />} /> : 'Confirm Email'}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ConfirmEmail;
