const { createRoot } = ReactDOM;
const { IconButton, Button, Typography, Container, CssBaseline } = MaterialUI;

function MyApp() {
  return React.createElement(
    React.Fragment,
    React.createElement(CssBaseline),
    React.createElement(
      Container,
      { maxWidth: 'sm', style: { textAlign: 'center', backgroundColor: 'red' } },
      React.createElement(Typography, { variant: 'h4', gutterBottom: true }, 'Adu vcl'),
      React.createElement(Button, {variant: 'contained', }, 'adu',)
    )
  );
}

// Gắn vào DOM
const root = createRoot(document.getElementById('root'));
root.render(React.createElement(MyApp));
