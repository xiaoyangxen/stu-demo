import { useState } from 'react'
import './App.css'
import { Input } from '@yjq/ui'
import React from 'react'
import Demo from './views/Demo4'

function App() {
  const [test, settest] = useState('67486456654')
  return (
    <>
      <Demo></Demo>
      {/* <Input /> */}
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

// class App extends React.Component {
//   state = {
//     test: 788,
//   };
//   render() {
//     return (
//       <>
//         <Input />
//         <p className="read-the-docs">{this.state.test}</p>
//       </>
//     );
//   }
// }
export default App
