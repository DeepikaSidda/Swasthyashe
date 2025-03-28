import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import PeriodHealth from './pages/PeriodHealth';
import NaturalRemedies from './pages/NaturalRemedies';
import BloodColorGuide from './pages/BloodColorGuide';
import MenstrualHygiene from './pages/MenstrualHygiene';
import MentalWellness from './pages/MentalWellness';
import SexualHealth from './pages/SexualHealth';
import SkinHairCare from './pages/SkinHairCare';
import PregnancyCare from './pages/PregnancyCare';
import Aryurvedicmentalhealth from './pages/Aryurvedicmentalhealth';
import Skincare from './pages/Skincare';
import Haircare from './pages/Haircare';
import DietPlan from './pages/DietPlan';




function App() {
  return (
    <Router>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden w-full">
          <Navbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-rounded">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/period-health" element={<PeriodHealth />} />
              <Route path="/natural-remedies" element={<NaturalRemedies />} />
              <Route path="/blood-color-guide" element={<BloodColorGuide />} />
              <Route path="/menstrual-hygiene" element={<MenstrualHygiene />} />
              <Route path="/mental-wellness" element={<MentalWellness />} />
              <Route path="/sexual-health" element={<SexualHealth />} />
              <Route path="/skin-hair-care" element={<SkinHairCare />} />
              <Route path="/pregnancy-care" element={<PregnancyCare />} />
              <Route path="/aryurvedic-mental-health" element={<Aryurvedicmentalhealth />} />
              <Route path="/skin-care" element={<Skincare />} />
              <Route path="/hair-care" element={<Haircare />} />
              <Route path="/diet-plan" element={<DietPlan />} />






            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;