const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="w-[80%] mx-auto px-4 py-10">
        {/* Top */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">FoodHub</h2>
            <p className="mt-3 text-sm text-gray-600">
              Discover & order delicious meals from your favorite providers.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-indigo-600 cursor-pointer">Home</li>
              <li className="hover:text-indigo-600 cursor-pointer">Meals</li>
              <li className="hover:text-indigo-600 cursor-pointer">Login</li>
              <li className="hover:text-indigo-600 cursor-pointer">Register</li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Contact
            </h3>
            <p className="text-sm text-gray-600">
              Email: support@foodhub.com
            </p>
            <p className="text-sm text-gray-600">
              Location: Bangladesh
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} FoodHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
