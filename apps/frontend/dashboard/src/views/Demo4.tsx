import React from 'react'
import { useCallback, useMemo, useState } from 'react'
/**
 * useMemo和useCallback 记忆函数
 */

let prev: any
function App() {
  const [supNum, setSupNum] = useState(10)
  const [oppNum, setOopNum] = useState(5)
  const [x, setX] = useState(0)
  //   每次都要重新计算，就算只是x变化，他们也要重新执行，所以使用记忆函数
  const ratio = useMemo<number | string>(() => {
    console.log('memo执行了')
    const total = supNum + oppNum
    if (total > 0) {
      return ((supNum / total) * 100).toFixed(2) + '%'
    }
    return '--'
  }, [oppNum, supNum])
  /**
   * cosnt xxx = usecallback(callback,[dependences])不会执行第一次，而是把执行函数返回
   * 如果依赖项为[],则xx一直是第一次创建的函数堆，不会创建新的函数
   * useMemo是会直接把结果返回
   */
  const handle = () => {
    console.log('xxx')
  }
  const callbackHandle = useCallback(() => {
    setX(x + 1)
  }, [x])
  if (prev) {
    // console.log('prev == handle', prev == handle) //false
    console.log('prev == changeX', prev == callbackHandle) // true
  } else {
    // prev = handle
    prev = callbackHandle
  }

  return (
    <>
      <div>
        {/* <Child handle={handle}></Child> */}
        <Child callbackHandle={callbackHandle}></Child>
        <p>支持人数：{supNum}</p>
        <p>反对人数：{oppNum}</p>
        <p>支持比率：{ratio}</p>
        <p>x:{x}</p>
      </div>
      <button onClick={() => setSupNum(supNum + 1)}>
        支持人数+1
      </button>
      <button onClick={() => setOopNum(oppNum + 1)}>
        反对人数+1
      </button>
      <button onClick={callbackHandle}>x+1</button>
    </>
  )
}
/**
 * 1.使用usecallback，确保每次给的props堆内存地址是相同的
 * 2.使用pureComponent,shouldComponentUpdate,判断子组件是否要更新
 * 3.函数组件使用React.memo
 */
// class Child extends React.PureComponent {
//   render() {
//     console.log('子组件重新渲染了', this.props)
//     return <div>123</div>
//   }
// }
const Child = React.memo(function (props) {
  console.log('子组件重新渲染了', props)
  return <div>123</div>
})
export default App
