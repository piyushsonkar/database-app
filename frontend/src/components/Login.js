
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a40 0%, #0d0d26 100%);
`;

const FormBox = styled.div`
  background: rgba(17, 24, 39, 0.8);
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 15px rgba(34, 211, 238, 0.5);
  animation: pulse-glow 2s ease-in-out infinite;
  max-width: 400px;
  width: 100%;

  @keyframes pulse-glow {
    0% { box-shadow: 0 0 10px rgba(34, 211, 238, 0.5); }
    50% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.8); }
    100% { box-shadow: 0 0 10px rgba(34, 211, 238, 0.5); }
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #22d3ee;
  text-align: center;
  margin-bottom: 1.5rem;
  font-family: 'Orbitron', sans-serif;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  color: #d1d5db;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: #1f2937;
  border: 1px solid #22d3ee;
  border-radius: 0.25rem;
  color: #ffffff;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #06b6d4;
    box-shadow: 0 0 5px rgba(6, 182, 212, 0.5);
  }
`;

const Error = styled.p`
  color: #f87171;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #22d3ee;
  color: #111827;
  font-weight: bold;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #06b6d4;
  }
`;

const LinkText = styled.p`
  color: #d1d5db;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 1rem;

  a {
    color: #22d3ee;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      history.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Container>
      <FormBox>
        <Title>Login</Title>
        <form onSubmit={handleLogin}>
          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          {error && <Error>{error}</Error>}
          <Button type="submit">Login</Button>
        </form>
        <LinkText>
          New user? <Link to="/register">Register here</Link>
        </LinkText>
      </FormBox>
    </Container>
  );
}

export default Login;