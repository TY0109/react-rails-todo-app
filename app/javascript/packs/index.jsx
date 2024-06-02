// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
// 非推奨
// import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import PropTypes from 'prop-types'

// Helloコンポーネント関数
const Hello = props => (
  <div>Hello {props.name}!</div>
)

// 非推奨
// propsの初期値
// Hello.defaultProps = {
//   name: 'David'
// }

// propsの型
Hello.propTypes = {
  name: PropTypes.string
}

// 非推奨
// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.render(
//     <Hello name="React" />,
//     document.body.appendChild(document.createElement('div')),
//   )
// })

// React18以降の書き方
document.addEventListener('DOMContentLoaded', () => {
  const container = document.body.appendChild(document.createElement('div'));
  const root = createRoot(container);
  
  root.render(<Hello name="React" />);
});
