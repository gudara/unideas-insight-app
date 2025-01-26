// components/DynamicIcon.tsx
'use client';

import {FC, useState, useEffect } from 'react';
type IconName = keyof typeof import('lucide-react');

interface DynamicIconProps {
  iconName: IconName;
  size: number;
}

// Dynamically import Lucide icons based on the icon name
const DynamicIcon:  FC<DynamicIconProps> = ({ iconName, size }: DynamicIconProps) => {
  const [IconComponent, setIconComponent] = useState<any>(null);
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
        const icons = await import('lucide-react');
        const Icon = icons[iconName];
        if (Icon) {
          setIconComponent(() => Icon);  // Set the imported icon component
        } else {
          setIconComponent(null);  // If no icon is found, set to null
        }
        // setIconComponent(() => ImportedIcon);
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
