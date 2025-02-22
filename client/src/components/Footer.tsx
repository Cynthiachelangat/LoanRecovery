import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white text-center p-4">
      &copy; {new Date().getFullYear()} Loan Recovery. All rights reserved.
    </footer>
  );
};

export default Footer;
