import Modal from './Modal';
import '../css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Header = ({setAuth}) => {
  return (
    <div id="header">
        <img className='recomeats reco-header' src="/images/recomeats.png" alt="reco-logo" />
        <Modal setAuth={setAuth}></Modal>
    </div>
  );
};

export default Header;
