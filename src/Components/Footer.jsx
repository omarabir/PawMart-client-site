import React from "react";
import { BsYoutube } from "react-icons/bs";
import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { SiX } from "react-icons/si";
import { Link } from "react-router";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-300 mt-20">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <img className="w-14" src={logo} alt="PawMart Logo" />
              <span className="text-2xl font-extrabold text-[#FE7F73] group-hover:text-[#f86255] transition-colors">
                PawMart
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted marketplace for pet adoption and quality pet care
              products. Connecting loving families with their perfect companions
              since 2020.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="https://facebook.com/pawmart"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center hover:bg-[#FE7F73] transition-all duration-300 group"
              >
                <FaFacebook
                  className="text-gray-400 group-hover:text-white transition-colors"
                  size={18}
                />
              </a>
              <a
                href="https://youtube.com/@pawmart"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center hover:bg-[#FE7F73] transition-all duration-300 group"
              >
                <BsYoutube
                  className="text-gray-400 group-hover:text-white transition-colors"
                  size={18}
                />
              </a>
              <a
                href="https://instagram.com/pawmart"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center hover:bg-[#FE7F73] transition-all duration-300 group"
              >
                <FaInstagram
                  className="text-gray-400 group-hover:text-white transition-colors"
                  size={18}
                />
              </a>
              <a
                href="https://twitter.com/pawmart"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center hover:bg-[#FE7F73] transition-all duration-300 group"
              >
                <SiX
                  className="text-gray-400 group-hover:text-white transition-colors"
                  size={16}
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h6 className="text-lg font-bold text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-[#FE7F73] rounded-full"></div>
              Quick Links
            </h6>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-gray-400 hover:text-[#FE7F73] transition-colors duration-200 hover:translate-x-1 transform inline-flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-[#FE7F73]"></span>
                Home
              </Link>
              <Link
                to="/pets-and-supplies"
                className="text-gray-400 hover:text-[#FE7F73] transition-colors duration-200 hover:translate-x-1 transform inline-flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-[#FE7F73]"></span>
                Pets & Supplies
              </Link>
              <Link
                to="/about"
                className="text-gray-400 hover:text-[#FE7F73] transition-colors duration-200 hover:translate-x-1 transform inline-flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-[#FE7F73]"></span>
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-[#FE7F73] transition-colors duration-200 hover:translate-x-1 transform inline-flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-[#FE7F73]"></span>
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h6 className="text-lg font-bold text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-[#FE7F73] rounded-full"></div>
              Contact Us
            </h6>
            <div className="flex flex-col space-y-3">
              <a
                href="mailto:support@pawmart.com"
                className="text-gray-400 hover:text-[#FE7F73] transition-colors duration-200 inline-flex items-center gap-3 group"
              >
                <FaEnvelope
                  className="text-[#FE7F73] flex-shrink-0"
                  size={16}
                />
                <span className="text-sm">support@pawmart.com</span>
              </a>
              <a
                href="tel:+18005551234"
                className="text-gray-400 hover:text-[#FE7F73] transition-colors duration-200 inline-flex items-center gap-3 group"
              >
                <FaPhone className="text-[#FE7F73] flex-shrink-0" size={16} />
                <span className="text-sm">+1 (800) 555-1234</span>
              </a>
              <div className="text-gray-400 inline-flex items-start gap-3">
                <FaMapMarkerAlt
                  className="text-[#FE7F73] flex-shrink-0 mt-1"
                  size={16}
                />
                <span className="text-sm">
                  123 Pet Street, Suite 100
                  <br />
                  Animal City, AC 12345
                  <br />
                  United States
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h6 className="text-lg font-bold text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-[#FE7F73] rounded-full"></div>
              Newsletter
            </h6>
            <p className="text-sm text-gray-400">
              Subscribe to get updates on new pets and exclusive deals.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2.5 rounded-lg bg-gray-800 dark:bg-gray-700 border border-gray-700 dark:border-gray-600 text-gray-300 placeholder-gray-500 focus:border-[#FE7F73] focus:ring-2 focus:ring-[#FE7F73]/20 outline-none transition-all text-sm"
              />
              <button className="px-4 py-2.5 bg-gradient-to-r from-[#FE7F73] to-orange-500 hover:from-[#f86255] hover:to-orange-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 dark:border-gray-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} PawMart. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                to="/about"
                className="text-gray-500 hover:text-[#FE7F73] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/contact"
                className="text-gray-500 hover:text-[#FE7F73] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
