import Img from "../images/QR.jpg";
import '../page-styles/Staff.css'
import DASH from '../components/Dash-bord';
import { Button } from 'semantic-ui-react'


function QR() {

  return (
    <div className='container-fluid Scroll'>
      <DASH />
      <div className='ui dividing header'>
        <h1>QR Viewer</h1>
      </div>
      <br />
      <div >
        <img src={Img} alt="QR code" class="ui medium bordered rounded image left aligned item" />
      </div>
      <br />
      <div>
        <h2>
          <a href={Img} Target="_blank" download>
            <Button className="ui blue button">
              Download
            </Button>
          </a>
        </h2>
      </div>
    </div>
  );
}

export default QR;
