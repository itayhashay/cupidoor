import CupidoorIcon from '../../icons/cupidon_icon.svg';
import { LABEL, LABEL_STYLES } from './constants';
import "./index.css";

const CupidoorSpinner = () => {
  return (
    <div className="no-freeze-spinner">
      <div id="no-freeze-spinner">
        <div>
          <i className="material-icons">
            <img src={CupidoorIcon} alt="My Happy SVG" style={{ width: "25px", height: "25px"}}/>
          </i>
          <i className="material-icons">
            home
          </i>
          <i className="material-icons">
            favorite
          </i>
          <div></div>
          <span style={LABEL_STYLES}>{LABEL}</span>
        </div>
      </div>
    </div>
  );
};

export default CupidoorSpinner;