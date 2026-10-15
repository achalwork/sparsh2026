import ProfessorHero from './components/ProfessorHero.jsx';import logo from './assets/logo.png';import PosterEditor from './components/PosterEditor.jsx';
export default function App(){return <>
<header className="top"><div className="brand"><img src={logo} alt="College logo"/><div><b>Government Yoga &amp; Naturopathy<br/>College and Hospital</b><small>Uttur/Bahirewadi, Tal. Ajara, Dist. Kolhapur</small></div></div>
<a className="btn solid" href="#poster">Create Your Invitation</a></header>
<ProfessorHero/>
<svg className="wave" viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0 40 Q360 0 720 40 T1440 40 V80 H0Z" fill="#eef3e6"/></svg>
<PosterEditor/>
<footer className="foot"><b>Government Yoga &amp; Naturopathy College and Hospital</b><br/>Uttur/Bahirewadi, Tal. Ajara, Dist. Kolhapur, Maharashtra</footer></>}