import React from 'react';

const OrganizationStructure = () => {
  const departments = [
    {
      name: 'Health & Medical Services',
      head: 'Dr. Sunil Gupta',
      description: 'Manages health camps, medical aid programs, and healthcare initiatives.',
      teamSize: 15
    },
    {
      name: 'Education & Skill Development',
      head: 'Ms. Anita Sharma',
      description: 'Oversees education programs, scholarships, and vocational training.',
      teamSize: 12
    },
    {
      name: 'Women Empowerment',
      head: 'Mrs. Kavita Patel',
      description: 'Leads programs for women\'s rights, skill development, and economic empowerment.',
      teamSize: 10
    },
    {
      name: 'Community Development',
      head: 'Mr. Rajesh Verma',
      description: 'Manages rural development, infrastructure, and community welfare programs.',
      teamSize: 18
    },
    {
      name: 'Fundraising & Communications',
      head: 'Ms. Priya Singh',
      description: 'Handles fundraising, public relations, and communication strategies.',
      teamSize: 8
    },
    {
      name: 'Administration & Finance',
      head: 'Mr. Amit Singh',
      description: 'Manages organizational administration, finance, and human resources.',
      teamSize: 6
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Organization Structure</h1>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium">Chairperson</h3>
              <p className="text-gray-600">Mrs. Priya Sharma</p>
              <p className="text-sm text-gray-500 mt-2">Former IAS officer with 30+ years in public administration</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium">Executive Director</h3>
              <p className="text-gray-600">Dr. Rajesh Kumar</p>
              <p className="text-sm text-gray-500 mt-2">PhD in Social Sciences, 20+ years in NGO management</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Departments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{dept.name}</h3>
                <p className="text-blue-600 text-sm mb-2">Head: {dept.head}</p>
                <p className="text-gray-600 text-sm mb-3">Team Size: {dept.teamSize} members</p>
                <p className="text-gray-700">{dept.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Support Functions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">IT & Technology</h3>
              <p className="text-gray-600 text-sm">Manages digital infrastructure and online platforms</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Legal & Compliance</h3>
              <p className="text-gray-600 text-sm">Ensures regulatory compliance and legal matters</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Monitoring & Evaluation</h3>
              <p className="text-gray-600 text-sm">Tracks program impact and organizational performance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationStructure;
