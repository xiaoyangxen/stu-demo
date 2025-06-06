import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import React from 'react'
/**
 * useRef和useImperativeHandle
 */

const Child = React.forwardRef(function Child(props, ref) {
  const [first, setfirst] = useState(123)
  useImperativeHandle(ref, () => {
    return {
      // 在这里返回的内容，可以在父组件那个ref里面拿到
      first,
      setfirst
    }
  })
  return (
    <div>
      465
      <span>useImperativeHandle:{first} </span>
      {/*React.forwardRef拿子组件节点示例： <span ref={ref}></span> */}
    </div>
  )
})
let pre1, pre2
function App() {
  const [num, setnum] = useState(1)
  const box1 = useRef(null) //组件更新，再次执行的时候，不会创建新的Ref
  const box2 = React.createRef() //在每一次组件更新时候都会创建新的Ref对象
  if (!pre1) {
    pre1 = box1
    pre2 = box2
  } else {
    console.log('pre1', pre1 == box1) // true 会有一个缓存
    console.log('pre2', pre2 == box2) // false
  }

  const box3 = useRef(null)
  useEffect(() => {
    console.log(
      '通过forwardRef拿到函数子组件内部的节点',
      box3.current
    )
    box3.current?.setfirst(4156)
  }, [])
  return (
    <>
      <div ref={box1}>数字为：{num}</div>
      <div ref={box2}>box2</div>
      <Child ref={box3}></Child>
      <button onClick={() => setnum(10)}>点击</button>
    </>
  )
}
export default App
