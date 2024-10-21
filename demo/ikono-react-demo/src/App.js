import './App.css';
import { Add, Exit, HomeOutlined, Alarm, BurgerAdvanced } from '@ikono/react';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px'
      }}
    >
      <h1>Standard "base" size</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <HomeOutlined />
        <Add />
        <Exit />
        <Alarm />
        <BurgerAdvanced />
      </div>
      <h1>Standard "sm" size</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <HomeOutlined size="sm" />
        <Add size="sm" />
        <Exit size="sm" />
        <Alarm size="sm" />
        <BurgerAdvanced size="sm" />
      </div>
      <h1>Colours</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <HomeOutlined color="red" />
        <Add color="green" />
        <Exit color="maroon" />
        <Alarm color="blue" />
        <BurgerAdvanced color="orange" />
      </div>
    </div>
  );
}

export default App;
