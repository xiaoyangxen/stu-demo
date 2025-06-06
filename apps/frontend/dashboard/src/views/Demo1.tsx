import { useState } from 'react'
import { Input } from '@yjq/ui'
import React from 'react'

console.log(React)
/**
 * 函数组件的每一次渲染或更新，都是把函数重新执行，产生一个全新的私有上下文
 * - 内部代码也需要重新执行
 */
class App extends React.Component {
  state = {
    test: 788
  }
  render() {
    return (
      <>
        <Input />
        <p className="read-the-docs">{this.state.test}</p>
      </>
    )
  }
}
export default App
