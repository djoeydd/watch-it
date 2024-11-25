import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

function VideoPlayer({ videoid, onPlayerVisibleChange }) {
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [opts, setOpts] = useState({
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
      controls: 1,
    },
  });

  useEffect(() => {
    if (onPlayerVisibleChange) {
      onPlayerVisibleChange(isPlayerVisible);
    }
  }, [isPlayerVisible, onPlayerVisibleChange]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setOpts({
          height: "195",
          width: "320",
          playerVars: {
            autoplay: 0,
            controls: 1,
          },
        });
      } else if (window.innerWidth < 1024) {
        setOpts({
          height: "293",
          width: "480",
          playerVars: {
            autoplay: 0,
            controls: 1,
          },
        });
      } else {
        setOpts({
          height: "390",
          width: "640",
          playerVars: {
            autoplay: 0,
            controls: 1,
          },
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call the function initially to set the correct size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogoClick = () => {
    setIsPlayerVisible((prev) => !prev);
  };

  const closePlayer = () => {
    setIsPlayerVisible(false);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <button
          onClick={handleLogoClick}
          className="play-button border-none bg-transparent text-slate-50 text-center p-2 rounded-full"
        >
          <p className="text-slate-50 text-center">Trailer</p>
          <FontAwesomeIcon icon={faYoutube} className="fa-inverse fa-3x" />
        </button>

        {/* Full-Screen YouTube Player */}
        {isPlayerVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <button
              onClick={closePlayer}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              &times;
            </button>
            <YouTube
              videoId={videoid}
              opts={opts}
              className="youtube-player border-none"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default VideoPlayer;
