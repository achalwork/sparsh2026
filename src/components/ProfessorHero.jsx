import {Chips} from './Sections.jsx';
import {CalendarDays,MapPin,Leaf} from 'lucide-react';
import photo from '../assets/professor.jpg';
export default function ProfessorHero(){return(
<div className="hero-bg"><section className="hero"><div className="hero-text">
<span className="tag">SPARSH 2026 | National Naturopathy Day</span>
<h1><em>Dr. Shweta Shete</em><span className="role">Assistant Professor</span></h1>
<p className="inst">Government Yoga &amp; Naturopathy College and Hospital</p>
<p className="addr">Uttur/Bahirewadi, Tal. Ajara, Dist. Kolhapur, Maharashtra</p>
<p className="intro">Join us for an inspiring journey of learning, experience, practice and integration.</p>
<Chips/>
<a className="btn solid big" href="#poster">Create your invitation ↓</a></div>
<div className="arch-wrap"><div className="arch"><img src={photo} alt="Assistant Professor Shweta Shete"/></div></div></section></div>)}