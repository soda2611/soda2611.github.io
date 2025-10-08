const { createRoot } = ReactDOM;
const { Button, Typography, Container, CssBaseline } = MaterialUI;

// Component: Giao diện chính
function MyApp() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(CssBaseline),
    React.createElement(
      Container,
      { maxWidth: 'sm', style: { marginTop: '50px', textAlign: 'center' } },
      React.createElement(Typography, { variant: 'h4', gutterBottom: true }, 'Chào mừng đến với ứng dụng React thuần'),
      React.createElement(MyButton)
    )
  );
}

// Gắn vào DOM
const root = createRoot(document.getElementById('root'));
root.render(React.createElement(MyApp));
