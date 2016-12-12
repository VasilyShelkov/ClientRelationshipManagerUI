import AppBar from 'material-ui/AppBar';

export default () => {
  const isMobile = window.width < 768;

  return (
    <AppBar
      title="Client Relationship Manager"
      showMenuIconButton={isMobile}
      iconElementRight={<FlatButton label="Login" primary={true}/>}
    />
  )
}
