// components/DynamicIcon.tsx
'use client';

import { useState, useEffect } from 'react';

// Dynamically import Lucide icons based on the icon name
const DynamicIcon = ({ iconName, size }: { iconName: string, size: number }) => {
  const [IconComponent, setIconComponent] = useState<React.ComponentType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const iconStyle = {
    width: size,
    height: size,
    display: 'inline-block',
    lineHeight: 0, 
  };
  useEffect(() => {
    // Dynamically import the icon component
    const loadIcon = async () => {
      try {
        // Import the icon dynamically from lucide-react based on the iconName
        const { [iconName]: ImportedIcon } = await import('lucide-react');
        setIconComponent(() => ImportedIcon);
      } catch (error) {
        setIconComponent(null);
        console.error(`Icon "${iconName}" not found`, error);
        setIconComponent(null); 
      }finally {
        setIsLoading(false); 
      }
    };

    loadIcon();
  }, [iconName]); // Re-run the effect if the icon name changes

  if (isLoading) {
    return <div style={iconStyle} />
  }
  

  if (!IconComponent) {
    return <div>Icon not found</div>; 
  }

  return <IconComponent />;
};

export default DynamicIcon;




// // components/DynamicIcon.tsx

// import React from 'react';
// import dynamic from 'next/dynamic';

// // Define a fallback icon in case the iconName doesn't match any available icon
// import { X } from 'lucide-react'; // Fallback icon (e.g., 'X' for error)

// interface DynamicIconProps {
//   name: string; // The icon name is a string, since it will be coming from the DB
//   size?: number;

// }

// const DynamicIcon: React.FC<DynamicIconProps> = React.memo(({ name, size = 24 }) => {
//   const Icon = dynamic(() =>
//     import('lucide-react').then((mod) => {
//       // If the icon exists, return it. Otherwise, return the fallback icon (e.g., 'X')
//       const icon = (mod as any)[name] || X;
//       return icon;
//     }),
//   );

//   return <Icon size={size} />;
//   // return <Home />;
// });

// export default DynamicIcon;
