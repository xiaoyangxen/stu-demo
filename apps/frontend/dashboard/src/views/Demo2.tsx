import { useEffect, useLayoutEffect, useState } from 'react'
/**
 * useEffect 和 useLayoutEffect
 *
 * useEffect 当前视图更新完毕后（真实dom渲染）才会通知callback执行
 * useLayoutEffect 创建虚拟dom，还没有完成真实dom渲染时，触发执行callback
 *
 * useLayoutEffect比useEffect执行要早
 */
const getData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([10, 20, 30])
    }, 1000)
  })
}
const Demo = () => {
  const [num, setnum] = useState(0)

  useEffect(() => {
    console.log('🚀 ~ @1 ~ num', num)
  })
  useEffect(() => {
    console.log('🚀 ~ @2 ~ num', num)
  }, [])
  useEffect(() => {
    console.log('🚀 ~ @3 ~ num', num)
  }, [num])
  /** 组件重新执行后，会先调用上一个useeffect */
  useEffect(() => {
    return () => {
      console.log('🚀 ~ @4 ~ num', num)
    }
  })

  /** 这个永远不会执行，因为本身就是只执行一次，然后重新执行的时候还没有依赖 */
  useEffect(() => {
    return () => {
      console.log('🚀 ~ @5 ~ num', num)
    }
  }, [])
  useEffect(() => {
    return () => {
      console.log('🚀 ~ @6 ~ num', num)
    }
  }, [num])
  /** 1. useEffect不能放在判断条件中 */
  /* if (num > 5) {
    useEffect(() => {
      console.log('🚀 ~ @6 ~ num', num)
    }, [num])
  } */
  /** 2.useEffect中如果有返回值必须返回一个函数，async会返回一个promise对象 */
  /* useEffect(async () => {
    const data = await getData()
    console.log('🚀 ~ useEffect ~ data', data)
  }) */
  useEffect(() => {
    const next = async () => {
      const data = await getData()
      console.log('🚀 ~ useEffect ~ data', data)
    }
    next()
  }, [])
  /** 当前视图更新完毕后才会通知callback执行 */
  useLayoutEffect(() => {
    console.log('layouteffect执行了')
    if (num === 0) {
      setnum(10)
    }
  }, [num])

  const handleNum = () => {
    setnum(num + 1)
  }
  return (
    <>
      <div>数字为：{num}</div>
      <button onClick={handleNum}>点击+1</button>

      <div style={{ backgroundColor: num === 0 ? 'red' : 'green' }}>
        测试uesLayout：{num}
      </div>
      <button
        onClick={() => {
          setnum(0)
        }}
      >
        点击变为0
      </button>
    </>
  )
}
export default Demo
