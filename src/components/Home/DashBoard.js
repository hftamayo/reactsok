import ToolBar from './ToolBar';
import classes from './DashBoard.module.css';

function DashBoard(props) {
  return (
    <div>
      <ToolBar />
      <main className={classes.content}>{props.children}</main>
    </div>
  );
}

export default DashBoard;
