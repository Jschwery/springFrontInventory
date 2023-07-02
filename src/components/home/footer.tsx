import React from "react";

const Footer = () => {
  return (
    <footer className="grid grid-cols-1 grid-rows-3 sm:grid-cols-3 sm:grid-rows-1 gap-6 p-8">
      <div className="flex flex-col">
        <h3 className="font-bold">About Us</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <div className="flex flex-col">
        <h3 className="font-bold">Follow Us</h3>
        <div className="flex gap-4">{/* Insert your social icons here */}</div>
        <p>Phone: 123-456-7890</p>
      </div>
      <div className="flex flex-col">
        <h3 className="font-bold">Subscribe to Our Newsletter</h3>
        <input
          type="email"
          className="w-full py-2 px-4 mb-2 border border-gray-300 rounded"
          placeholder="Enter your email"
        />
      </div>
    </footer>
  );
};

export default Footer;
