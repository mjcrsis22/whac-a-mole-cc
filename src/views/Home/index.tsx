import AccessForm from '../../components/AccessForm';
import moleLogo from '../../assets/mole.png';
import './styles.scss';

function Home() {
  return (
    <div className="home-container">
      <img className="home-logo" src={moleLogo} alt="" />
      <AccessForm />
    </div>
  );
}

export default Home;
