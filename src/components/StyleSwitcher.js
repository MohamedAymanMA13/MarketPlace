import React, { useState, useEffect } from 'react';
import { CogIcon } from '@heroicons/react/outline'; 
import { useRouter } from 'next/router';

export default function StyleSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const defaultColor = '#5C48C1';
  const [selectedColor, setSelectedColor] = useState(defaultColor); 
  const router = useRouter();
  const isRTL = router.locale === 'ar';

  useEffect(() => {
    const savedColor = localStorage.getItem('themeColor');
    if (savedColor) {
      setSelectedColor(savedColor);
      document.documentElement.style.setProperty('--theme-color', savedColor);
    } else {
      document.documentElement.style.setProperty('--theme-color', defaultColor);
    }
  }, []); 

  const colors = [
    { name: 'Red', value: '#f44336' },
    { name: 'Orange', value: '#ff9800' },
    { name: 'Yellow', value: '#ffeb3b' },
    { name: 'Green', value: '#4caf50' },
    { name: 'Blue', value: '#2196f3' },
    { name: 'Purple', value: '#9c27b0' },
    { name: 'Gray', value: '#607d8b' },
    { name: 'Brown', value: '#795548' },
    { name: 'Main', value: defaultColor },
  ];

  const toggleSwitcher = () => {
    setIsOpen(!isOpen);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    document.documentElement.style.setProperty('--theme-color', color);
    localStorage.setItem('themeColor', color);
  };

  return (
    <>
      <div
        className={`fixed top-1/4 transform -translate-y-1/2 p-2 bg-white ${isRTL ? 'rounded-l-md' : 'rounded-r-md'} shadow-lg cursor-pointer transition-transform duration-300 ${
          isOpen 
            ? isRTL ? '-translate-x-[174px]' : 'translate-x-[174px]' 
            : 'translate-x-0'
        } ${isRTL ? 'right-0' : 'left-0'}`}
        onClick={toggleSwitcher}
      >
        <CogIcon className="w-6 h-6 text-main" />
      </div>

      {/* Style Switcher Panel */}
      <div
        className={`fixed top-1/5 w-44 bg-white shadow-lg p-4 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'
        } ${isRTL ? 'right-0' : 'left-0'}`}
      >
        <h4 className="text-lg font-bold mb-4 text-main">Style Switcher</h4>
        <div className="grid grid-cols-3 gap-2">
          {colors.map((color) => (
            <div
              key={color.value}
              className={`w-8 h-8 rounded cursor-pointer border-2 ${
                selectedColor === color.value ? 'border-gray-800' : 'border-transparent'
              }`}
              style={{ backgroundColor: color.value }}
              onClick={() => handleColorChange(color.value)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
