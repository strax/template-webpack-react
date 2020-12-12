import { useState } from 'react'

export function Counter() {
  const [state, setState] = useState(0)
  return (
    <>
      <span>Current value: {state}</span>
      <br />
      <button onClick={() => setState(n => n + 1)}>Increase</button>
    </>
  )
}
