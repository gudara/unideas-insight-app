// components/DynamicIcon.tsx

import React from 'react';
import dynamic from 'next/dynamic';

// Define a fallback icon in case the iconName doesn't match any available icon
import { Home, X } from 'lucide-react'; // Fallback icon (e.g., 'X' for error)

interface DynamicIconProps {
  name: string; // The icon name is a string, since it will be coming from the DB
  size?: number;

}



const DynamicIcon: React.FC<DynamicIconProps> = React.memo(({ name, size = 24 }) => {
  const Icon = dynamic(() =>
    import('lucide-react').then((mod) => {
      // If the icon exists, return it. Otherwise, return the fallback icon (e.g., 'X')
      const icon = (mod as any)[name] || X;
      return icon;
    }),
    { ssr: false } // Ensure the icon is loaded only on the client-side
  );

  return <Icon size={size} />;
  // return <Home />;
});

export default DynamicIcon;
