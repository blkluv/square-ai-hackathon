import React from 'react';

function SellerOverview() {
  return (
    <div className="bg-gray-100 font-sans">
      <header className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-white text-2xl font-semibold">Seller Admin</a>
          <a href="/" className="text-white hover:underline">Logout</a>
        </div>
      </header>
      <main className="container mx-auto p-4">
        {/* Overview page content */}
      </main>
      <footer className="bg-gray-900 text-white py-4 text-center">
        <p>&copy; 2023 Seller Admin</p>
      </footer>
    </div>
  );
}

export default SellerOverview;
