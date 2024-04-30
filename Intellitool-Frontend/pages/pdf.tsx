import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faTasks, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const PresentationViewer = () => {
    // Specify the type for slides state as array of strings
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [slides, setSlides] = useState<string[]>([]);
    const [transcript, setTranscript] = useState<string>("Dummy text extracted from the slides.");

    // Pre-defined dummy slides stored in your project's public folder
    const dummySlides: string[] = [
        '/previews/slide1.jpg',
        '/previews/slide2.jpg',
        '/previews/slide3.jpg',
        '/previews/slide4.jpg',
        '/previews/slide5.jpg',
        '/previews/slide6.jpg',
        '/previews/slide7.jpg',
        '/previews/slide8.jpg',
        '/previews/slide9.jpg',
        '/previews/slide10.jpg',
        '/previews/slide11.jpg',
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSlides(dummySlides);  // Correctly inferred type
            setCurrentSlide(0);
            setTranscript("Extracted transcript or dummy text goes here.");
        }
    };

    return (
        <div className="presentation-container">
            <div className="file-upload-section">
                <input type="file" accept=".ppt, .pptx" onChange={handleFileChange} className="file-input" />
            </div>
            {slides.length > 0 && (
                <div className="viewer-section">
                    <div className="slide-viewer">
                        <img src={slides[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
                    </div>
                    <div >
                        <button onClick={() => setCurrentSlide(currentSlide - 1)} disabled={currentSlide <= 0}>
                            <FontAwesomeIcon icon={faArrowLeft} /> Previous
                        </button>
                        <button onClick={() => setCurrentSlide(currentSlide + 1)} disabled={currentSlide >= slides.length - 1}>
                            <FontAwesomeIcon icon={faArrowRight} /> Next
                        </button>
                    </div>
                </div>
            )}
            <div className="transcript-section">
                <h2>Transcript</h2>
                <p>{transcript}</p>
            </div>
            <div className="action-buttons">
                <Button className="action-btn"><FontAwesomeIcon icon={faTasks} /> Summarize</Button>
                <Button className="action-btn"><FontAwesomeIcon icon={faQuestionCircle} /> Generate Quiz</Button>
            </div>
        </div>
    );
};

export default PresentationViewer;


