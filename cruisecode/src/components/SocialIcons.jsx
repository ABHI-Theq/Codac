import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';

const SocialIcons = () => {
  const icons = [
    { Icon: Github, color: 'hover:text-gray-400', link: 'https://github.com' },
    { Icon: Twitter, color: 'hover:text-blue-400', link: 'https://twitter.com' },
    { Icon: Linkedin, color: 'hover:text-blue-600', link: 'https://linkedin.com' },
    { Icon: Instagram, color: 'hover:text-pink-500', link: 'https://instagram.com' },
    { Icon: Facebook, color: 'hover:text-blue-500', link: 'https://facebook.com' },
  ];

  return (
    <div className="flex space-x-6">
      {icons.map(({ Icon, color, link }, index) => (
        <motion.a
          key={index}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={`text-white ${color} transition-colors duration-200`}
        >
          <Icon className="h-6 w-6" />
        </motion.a>
      ))}
    </div>
  );
};

export default SocialIcons;