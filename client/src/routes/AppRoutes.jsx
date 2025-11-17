import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import AboutUs from '../pages/About/AboutUs';
import ChairpersonMessage from '../pages/About/ChairpersonMessage';
import ExecutiveDirector from '../pages/About/ExecutiveDirector';
import Governance from '../pages/About/Governance';
import OrganizationStructure from '../pages/About/OrganizationStructure';
import Activities from '../pages/Activities';
import HealthCampaigns from '../pages/Activities/HealthCampaigns';
import EducationInitiatives from '../pages/Activities/EducationInitiatives';
import WomenEmpowerment from '../pages/Activities/WomenEmpowerment';
import Career from '../pages/Activities/Career';
import Gallery from '../pages/Gallery';
import NewsEvents from '../pages/NewsEvents';
import Contact from '../pages/Contact';
import Reports from '../pages/Reports';
import Tenders from '../pages/Tenders';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/chairperson-message" element={<ChairpersonMessage />} />
      <Route path="/executive-director" element={<ExecutiveDirector />} />
      <Route path="/governance" element={<Governance />} />
      <Route path="/organization-structure" element={<OrganizationStructure />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/health-campaigns" element={<HealthCampaigns />} />
      <Route path="/education-initiatives" element={<EducationInitiatives />} />
      <Route path="/women-empowerment" element={<WomenEmpowerment />} />
      <Route path="/career" element={<Career />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/news-events" element={<NewsEvents />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/tenders" element={<Tenders />} />
    </Routes>
  );
};

export default AppRoutes;
