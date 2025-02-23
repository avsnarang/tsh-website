import React, { useState } from 'react';
import { MapPin, Phone, Mail, X } from 'lucide-react';
import Button from '../ui/Button';

interface BranchInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
}

const branches: BranchInfo[] = [
  {
    name: 'Paonta Sahib Campus',
    address: 'Jamniwala Road, Badripur, Paonta Sahib, H.P.',
    phone: '+91 8628800056',
    email: 'ps@tsh.edu.in'
  },
  {
    name: 'Juniors Campus',
    address: 'Near Degree College, Devinagar, Paonta Sahib, H.P.',
    phone: '+91 98057 35656',
    email: 'juniors@tsh.edu.in'
  },
  {
    name: 'Majra Campus',
    address: 'Near SBI Majra, Majra, Paonta Sahib, H.P.',
    phone: '+91 96927 00056',
    email: 'majra@tsh.edu.in'
  }
];

export default function ContactInfo() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<BranchInfo | null>(null);

  const handleBranchSelect = (branch: BranchInfo) => {
    setSelectedBranch(branch);
  };

  return (
    <div className="text-center lg:text-left">
      <h3 className="text-xl text-neutral-light mb-4">Contact Us</h3>
      
      <div className="flex flex-col gap-4">
        {branches.map((branch) => (
          <button
            key={branch.name}
            onClick={() => handleBranchSelect(branch)}
            className="text-neutral-light/80 hover:text-primary-light transition-colors text-left flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" />
            {branch.name}
          </button>
        ))}
      </div>

      {/* Branch Details Modal */}
      {selectedBranch && (
        <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-semibold text-neutral-dark">{selectedBranch.name}</h3>
              <button
                onClick={() => setSelectedBranch(null)}
                className="p-2 hover:bg-neutral-dark/10 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-neutral-dark" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold text-neutral-dark">Address</h4>
                  <p className="text-neutral-dark/80">{selectedBranch.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold text-neutral-dark">Phone</h4>
                  <a 
                    href={`tel:${selectedBranch.phone.replace(/\s/g, '')}`}
                    className="text-neutral-dark/80 hover:text-primary transition-colors"
                  >
                    {selectedBranch.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold text-neutral-dark">Email</h4>
                  <a 
                    href={`mailto:${selectedBranch.email}`}
                    className="text-neutral-dark/80 hover:text-primary transition-colors"
                  >
                    {selectedBranch.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}