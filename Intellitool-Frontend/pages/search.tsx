import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faTasks, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
    const [url, setUrl] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [dummyTranscriptParts, setDummyTranscriptParts] = useState([]);

    const [lectures, setLectures] = useState([
        { id: 1, title: "Lecture 01", url: "https://example.com/lecture01.mp4" },
        { id: 2, title: "Lecture 02", url: "https://example.com/lecture02.mp4" },
        { id: 3, title: "Lecture 03", url: "https://example.com/lecture03.mp4" },
        // Add more lectures as needed
    ]);
    const [currentLecture, setCurrentLecture] = useState(null);

    const dummyTranscript = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam...".split('. ');

    const handleLectureClick = (lecture) => {
        setCurrentLecture(lecture);
        setUrl(lecture.url);
        setPlaying(true);
        setTranscript('');
    };
    

    useEffect(() => {
        setLoaded(true);
        setDummyTranscriptParts(dummyTranscript);
    }, []);

    useEffect(() => {
        if (playing) {
            const intervalId = setInterval(() => {
                if (dummyTranscriptParts.length > 0) {
                    const nextPart = dummyTranscriptParts.shift();
                    setTranscript(prev => `${prev} ${nextPart}.`);
                } else {
                    clearInterval(intervalId);
                }
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [playing, dummyTranscriptParts]);

    if (!loaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex p-4 content-wrapper">
            <div className="w-3/5 mr-4 video-section">
                <input type="text" placeholder="Insert Zoom link here" value={url} onChange={e => setUrl(e.target.value)} className="zoom-input" />
                <div className="file-upload-container">
                    {!url && (
                        <div className="video-placeholder">
                            <FontAwesomeIcon icon={faFileAlt} size="3x" className="icon" />
                            <p>Max file size 200MB</p>
                            <input type="file" accept="video/*" onChange={e => {
                                const file = e.target.files[0];
                                setUrl(URL.createObjectURL(file));
                                setPlaying(true);
                                setTranscript('');
                            }} className="file-input" />
                        </div>
                    )}
                    {url && (
                        <ReactPlayer
                            url={url}
                            playing={playing}
                            onPlay={() => setPlaying(true)}
                            onPause={() => setPlaying(false)}
                            controls={true}
                            width="100%"
                            height="100%"
                        />
                    )}
                </div>
            </div>
            <div className="w-2/5 transcript-section">
                <h2 className="font-semibold mb-3">Lecture Transcripts</h2>
                <p className="transcript-text">{transcript || (playing ? "Generating transcript..." : "Play the video to see the transcript.")}</p>
                <div className="action-buttons">
                    <button className="action-btn"><FontAwesomeIcon icon={faTasks} className="icon" /> Summarize</button>
                    <button className="action-btn"><FontAwesomeIcon icon={faQuestionCircle} className="icon" /> Generate Quiz</button>
                </div>
            </div>
        </div>
    );
};

export default Search;
