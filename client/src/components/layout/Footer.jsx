
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">🎉 MeetSphere</h3>
            <p className="text-gray-400">Find and save local events</p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://github.com/emancht" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
              aria-label="GitHub"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/emancht/" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a
              href="https://x.com/emancht" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
              aria-label="Twitter"
            >
              <FaTwitter className="text-2xl" />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} 🎉 MeetSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;