'use client';

import React from 'react';
import LeadList from '@/components/LeadList';

const LeadsPage = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Leads</h1>
      <LeadList />
    </div>
  );
};

export default LeadsPage;