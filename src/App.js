import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Voting from './Voting.json';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');

  useEffect(() => {
    const init = async () => {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
      setWeb3(web3);

      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Voting.networks[networkId];
      const contract = new web3.eth.Contract(
        Voting.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setContract(contract);

      const candidates = await contract.methods.getCandidates().call();
      setCandidates(candidates);
    };

    init();
  }, []);

  const handleVote = async () => {
    await contract.methods.vote(selectedCandidate).send({ from: accounts[0] });
  };

  return (
    <div>
      <h1>Voting DApp</h1>
      <select onChange={(e) => setSelectedCandidate(e.target.value)}>
        {candidates.map((candidate, index) => (
          <option key={index} value={candidate}>{candidate}</option>
        ))}
      </select>
      <button onClick={handleVote}>Vote</button>
    </div>
  );
};

export default App;