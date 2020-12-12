import * as ReactDOM from 'react-dom'
import { Counter } from './Counter'

function createRootElement() {
  const node = document.createElement('div')
  node.id = 'root'
  document.body.appendChild(node)
  return node
}

const root = document.getElementById('root') ?? createRootElement()

ReactDOM.render(<Counter />, root)
