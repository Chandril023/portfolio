import React, { useState, useEffect } from 'react';
import { CiLink } from "react-icons/ci";
import projectInfo from './projectinfo';

const Project = ({ title, description, technologies, link, github }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projectDetails = projectInfo[title];

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup the effect when the component is unmounted
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  // Modal component defined inline
  const Modal = ({ children }) => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
        <div className="bg-white dark:bg-zinc-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden relative py-2">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="p-6">
            <div className="md:h-[480px] md:overflow-y-auto scroll-smooth">
              {/* Project Title with Icon */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{projectDetails?.icon}</span>
                <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">
                  {title}
                </h2>
              </div>

              {/* Technologies */}
              <div className="flex gap-2 flex-wrap mb-6">
                {technologies.split(",").map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="text-zinc-600 dark:text-zinc-300 mb-6">
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-2">
                  Project Description
                </h3>
                <p className="leading-7">{description}</p>
              </div>

              {/* Key Highlights */}
              {projectDetails?.highlights && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-3">
                    Key Highlights
                  </h3>
                  <ul className="space-y-2">
                    {projectDetails.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-zinc-600 dark:text-zinc-300">
                        <span className="text-red-800 dark:text-red-500 mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* All Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">
                  Project Links
                </h3>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 items-center text-zinc-600 dark:text-zinc-300 hover:text-red-800 hover:dark:text-red-500 transition-all duration-300"
                  >
                    <CiLink className="text-2xl" />
                    <span>View Project</span>
                  </a>
                  <a 
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 items-center text-zinc-600 dark:text-zinc-300 hover:text-red-800 hover:dark:text-red-500 transition-all duration-300"
                  >
                    <CiLink className="text-2xl" />
                    <span>View Github</span>
                  </a>
                  {projectDetails?.additionalLinks?.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-2 items-center text-zinc-600 dark:text-zinc-300 hover:text-red-800 hover:dark:text-red-500 transition-all duration-300"
                    >
                      <CiLink className="text-2xl" />
                      <span>{link.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="hover:bg-zinc-100 hover:dark:bg-zinc-900 transition-all duration-300 p-6 md:rounded-xl cursor-pointer"
      >
        <div className="flex gap-2 overflow-x-scroll py-2">
          {technologies.split(",").map((tech, index) => (
            <span
              className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500"
              key={index}
            >
              {tech}
            </span>
          ))}
        </div>
        
        <h3 className="font-bold text-lg text-zinc-700 dark:text-zinc-300 mt-4">
          {title}
        </h3>
        
        <p className="leading-7 text-zinc-500 dark:text-zinc-300 font-light text-base mt-4">
          {description}
        </p>

        <div className="flex gap-6 text-zinc-600 dark:text-zinc-300 font-medium">
          <a 
            href={link}
            onClick={(e) => e.stopPropagation()} 
            className="flex gap-2 mt-4 hover:text-red-800 hover:dark:text-red-500 cursor-pointer transition-all duration-300"
          >
            <CiLink className="text-2xl self-center" />
            <span className="text-xs self-center">View Project</span>
          </a>
          
          <a 
            href={github}
            onClick={(e) => e.stopPropagation()} 
            className="flex gap-2 mt-4 hover:text-red-800 hover:dark:text-red-500 cursor-pointer transition-all duration-300"
          >
            <CiLink className="text-2xl self-center" />
            <span className="text-xs self-center">View Github</span>
          </a>
        </div>
      </div>

      <Modal />
    </>
  );
};

export default Project;
