import ToolBar from './ToolBar';
import classes from './DashBoard.module.css';

function Layout(props) {
  return (
    <div>
      <ToolBar />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
