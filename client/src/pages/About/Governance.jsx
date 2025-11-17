import React from 'react';

const Governance = () => {
  const boardMembers = [
    {
      name: 'Mrs. Priya Sharma',
      position: 'Chairperson',
      experience: 'Former IAS officer with 30+ years in public administration'
    },
    {
      name: 'Dr. Rajesh Kumar',
      position: 'Executive Director',
      experience: 'PhD in Social Sciences, 20+ years in NGO management'
    },
    {
      name: 'Mr. Amit Singh',
      position: 'Treasurer',
      experience: 'Chartered Accountant, former CFO of multinational corporation'
    },
    {
      name: 'Ms. Kavita Patel',
      position: 'Secretary',
      experience: 'Lawyer specializing in social justice and human rights'
    },
    {
      name: 'Dr. Sunil Gupta',
      position: 'Medical Advisor',
      experience: 'Senior physician, former head of public health department'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Governance</h1>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Board of Directors</h2>
          <div className="space-y-6">
            {boardMembers.map((member, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                <p className="text-blue-600 font-medium">{member.position}</p>
                <p className="text-gray-600 mt-1">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Governance Structure</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Manav Seva operates under a well-defined governance structure that ensures
              transparency, accountability, and effective decision-making. Our governance
              framework includes:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li><strong>Board of Directors:</strong> Oversees strategic direction and policy decisions</li>
              <li><strong>Executive Committee:</strong> Implements board decisions and manages operations</li>
              <li><strong>Audit Committee:</strong> Ensures financial transparency and compliance</li>
              <li><strong>Program Committees:</strong> Specialized groups for different program areas</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Code of Ethics</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Our organization is committed to the highest standards of ethical conduct.
              All board members, staff, and volunteers adhere to a strict code of ethics
              that includes:
            </p>
            <ul className="list-disc list-inside">
              <li>Integrity and honesty in all dealings</li>
              <li>Respect for human dignity and rights</li>
              <li>Responsible stewardship of resources</li>
              <li>Transparency in decision-making</li>
              <li>Commitment to organizational mission</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Governance;
