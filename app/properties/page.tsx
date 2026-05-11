'use client';

import React from 'react';
import PropertyList from '@/components/PropertyList';

const PropertiesPage = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Available Properties</h1>
      <PropertyList />
    </div>
  );
};

export default PropertiesPage;