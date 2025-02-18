import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark-1 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-red-500">CampusCompass</h2>
          <p className="mt-3 text-gray-400">
            Navigate your campus with ease. Connect with clubs, events, and
            opportunities.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-red-400">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/home" className="hover:text-yellow-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-500">
                About
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-yellow-500">
                Events
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-red-400">Follow Us</h3>
          <div className="mt-3 flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-500"
            >
              <Twitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-500"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-500"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} CampusCompass. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
