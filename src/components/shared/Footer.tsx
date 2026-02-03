const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="w-[80%] mx-auto px-4 py-10">
        <div className="mt-10 border-t pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} FoodHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
