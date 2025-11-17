import React from 'react';

const ExecutiveDirector = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Executive Director</h1>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col md:flex-row items-center mb-6">
            <img
              src="/images/executive-director.jpg"
              alt="Executive Director"
              className="w-48 h-48 rounded-full object-cover mb-4 md:mb-0 md:mr-8"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/200x200?text=Executive+Director';
              }}
            />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Dr. Rajesh Kumar</h2>
              <p className="text-gray-600 mb-4">Executive Director, Manav Seva</p>
              <p className="text-gray-700">
                Dr. Rajesh Kumar has over 20 years of experience in social work and community development.
                He holds a PhD in Social Sciences and has been instrumental in implementing various
                welfare programs across rural and urban communities.
              </p>
            </div>
          </div>
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Vision</h3>
            <p className="mb-4">
              To create a society where every individual has access to basic necessities,
              education, and healthcare, fostering sustainable development and social harmony.
            </p>
            <h3 className="text-xl font-semibold mb-4">Experience</h3>
            <ul className="list-disc list-inside mb-4">
              <li>20+ years in NGO management and social development</li>
              <li>PhD in Social Sciences from Jawaharlal Nehru University</li>
              <li>Former consultant for UNICEF and WHO</li>
              <li>Awarded "Social Worker of the Year" by Government of India</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDirector;
