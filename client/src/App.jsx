// import { useState } from 'react';
import Hello from '@/components/Hello';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="flex flex-row justify-center items-center w-screen min-h-screen border-2 border-orange-500">
      <h1 className="text-3xl font-bold underline center">Hello world!</h1>
      <Hello />
    </div>
  );
}

export default App;
