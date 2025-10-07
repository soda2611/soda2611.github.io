const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  return React.createElement(
    'div',
    null,
    React.createElement('h1', null, 'Hello from plain JS'),
    React.createElement('p', null, 'This is a React app without JSX.')
  );
}

root.render(React.createElement(App));
