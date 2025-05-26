
// import React from 'react';
// import styled from 'styled-components';

// const Container = styled.div`
//   min-height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: linear-gradient(135deg, #1a1a40 0%, #0d0d26 100%);
// `;

// const Box = styled.div`
//   background: rgba(17, 24, 39, 0.8);
//   padding: 2rem;
//   border-radius: 0.5rem;
//   box-shadow: 0 0 15px rgba(34, 211, 238, 0.5);
//   animation: pulse-glow 2s ease-in-out infinite;
//   max-width: 400px;
//   width: 100%;

//   @keyframes pulse-glow {
//     0% { box-shadow: 0 0 10px rgba(34, 211, 238, 0.5); }
//     50% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.8); }
//     100% { box-shadow: 0 0 10px rgba(34, 211, 238, 0.5); }
//   }
// `;

// const Title = styled.h2`
//   font-size: 2rem;
//   font-weight: bold;
//   color: #22d3ee;
//   text-align: center;
//   margin-bottom: 1.5rem;
//   font-family: 'Orbitron', sans-serif;
// `;

// const Text = styled.p`
//   color: #d1d5db;
//   text-align: center;
// `;

// function Dashboard() {
//   return (
//     <Container>
//       <Box>
//         <Title>Welcome to the Dashboard!</Title>
//         <Text>You are successfully logged in.</Text>
//       </Box>
//     </Container>
//   );
// }

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a40 0%, #0d0d26 100%);
  padding: 2rem;
`;

const Box = styled.div`
  background: rgba(17, 24, 39, 0.8);
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 15px rgba(34, 211, 238, 0.5);
  animation: pulse-glow 2s ease-in-out infinite;
  max-width: 600px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #d1d5db;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
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

const Select = styled.select`
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

const Button = styled.button`
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

const Success = styled.p`
  color: #34d399;
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const Error = styled.p`
  color: #f87171;
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const RequestList = styled.div`
  margin-top: 2rem;
`;

const RequestItem = styled.div`
  background: #1f2937;
  padding: 1rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  border: 1px solid #22d3ee;
`;

const RequestTitle = styled.h3`
  color: #22d3ee;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const RequestText = styled.p`
  color: #d1d5db;
  font-size: 0.875rem;
`;

function Dashboard() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [category, setCategory] = useState('General');
  const [requests, setRequests] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Fetch requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://192.168.1.100:5000/api/requests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch requests');
      }
    };
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://192.168.1.100:5000/api/requests',
        { title, description, priority, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Request created successfully!');
      setError('');
      setTitle('');
      setDescription('');
      setPriority('Low');
      setCategory('General');
      // Refresh requests
      const response = await axios.get('http://192.168.1.100:5000/api/requests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create request');
      setSuccess('');
    }
  };

  return (
    <Container>
      <Box>
        <Title>Dashboard</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Description</Label>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Priority</Label>
            <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Select>
          </InputGroup>
          <InputGroup>
            <Label>Category</Label>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="General">General</option>
              <option value="Technical">Technical</option>
              <option value="Support">Support</option>
            </Select>
          </InputGroup>
          {success && <Success>{success}</Success>}
          {error && <Error>{error}</Error>}
          <Button type="submit">Submit Request</Button>
        </Form>
        <RequestList>
          <Title>Previous Requests</Title>
          {requests.length === 0 ? (
            <RequestText>No requests found.</RequestText>
          ) : (
            requests.map((request) => (
              <RequestItem key={request._id}>
                <RequestTitle>{request.title}</RequestTitle>
                <RequestText>Description: {request.description}</RequestText>
                <RequestText>Priority: {request.priority}</RequestText>
                <RequestText>Category: {request.category}</RequestText>
                <RequestText>Created: {new Date(request.createdAt).toLocaleString()}</RequestText>
              </RequestItem>
            ))
          )}
        </RequestList>
      </Box>
    </Container>
  );
}

export default Dashboard;




