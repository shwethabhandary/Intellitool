import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faTasks, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import CloudConvert from 'cloudconvert';

const cloudConvert = new CloudConvert('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYmEwOGQ3MGY0N2JkM2VhODZiYjY5MGRlMmFkZjBiYjZiNDZlNmFkMjRjYjE1ZmQwNGEzODk5ZjI4OTA0MjM0N2I5ZjUxZWQzMGQ1MmNhNWIiLCJpYXQiOjE3MTM2MDUzOTUuNzk1OTY0LCJuYmYiOjE3MTM2MDUzOTUuNzk1OTY1LCJleHAiOjQ4NjkyNzg5OTUuNzkwOTQ4LCJzdWIiOiI2ODA0NTU0MiIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.U3QUvWOyo-2uhXxpk-O1-h865HGBgLcbBgUzqhu5YTSYCCRvaQp59FgNkEX2wRtlI_a9VdKgMP_HKpRVYNfjirak4Ja9t3vErYxl9GbQwNnShjFhWqoDyNtAo4JaQIuYy7CWzwPdea5k4U82gfvqtn4nE7o1xjXjY6d88AP7Hamf1NEqQnXEWnnpJYQGJQVp5S9ckzjGI7mBb_gw8_OBlqPKm2vsiMgHIOjDWUXdLHVW9kr5--aKtxLbClM6UtB4TUpuyW22wXQOm-zzTW9OeOHLC_INnFfECcBgL1QEvqPNnotFOQvZzltYElLQIFjD4MdiDb_sg_VCaWHCKgikd2jQv7piqp6ivbqzH_55RqZrCE7BNw6edipa3dRVM8VWoshky3vNIKkMI5HVsqzhdiaBflg2NfBafbJBrvRINZarKdkB4tq1QRSHaB4B6GFa_qwCkSsMdwzxUf80HBsErqxNJb50HdBTwWtnRnyeLNdg2Ul_2wtzd0pFICj538AVj34mJIA6nWs71RR5QFsmmoeGI5O8nK-dCBFxoQE2_8xep81jwwrUKE_DiFx_zbcqxPo7GXFlCG73fR1dHWr3lwa19l88J_fe4cw7irzpIfsY9bEhsUlf_xOzW0UJflnIUR0MeY4HIUnNs9_GZ_omxTRAq4Kfb225IzuZLsNTGDg');

const PresentationViewer = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState([]);
    const [transcript, setTranscript] = useState("Dummy text extracted from the slides.");

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
    
            try {
                const response = await fetch('/api/convert', {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    const data = await response.json();
                    setSlides(data.slides);
                    setCurrentSlide(0);
                } else {
                    console.error('Failed to convert file');
                }
            } catch (error) {
                console.error('Error converting file:', error);
            }
        }
    };
    

    const goToSlide = (index) => {
        if (index >= 0 && index < slides.length) {
            setCurrentSlide(index);
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
                    <div className="navigation-buttons">
                        <button onClick={() => goToSlide(currentSlide - 1)} disabled={currentSlide <= 0}>
                            <FontAwesomeIcon icon={faArrowLeft} /> Previous
                        </button>
                        <button onClick={() => goToSlide(currentSlide + 1)} disabled={currentSlide >= slides.length - 1}>
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
