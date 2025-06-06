import { useMemo, useState } from 'react'
/**
 * useMemo和useCallback 记忆函数
 */

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

  return (
    <>
      <div>
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
      <button onClick={() => setX(x + 1)}>x+1</button>
    </>
  )
}
export default App
