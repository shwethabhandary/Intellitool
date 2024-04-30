import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Box, Flex, Button, Text, IconButton, Input, InputGroup, InputRightElement, Collapse,useColorModeValue } from '@chakra-ui/react';
import { CloseIcon, SearchIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const Collections = () => {
    const [courses, setCourses] = useState([
        {
            id: 1,
            name: "CMPE 272 - Cloud Computing",
            lectures: [
                { id: '1a', title: "Lecture 1", url: "https://example.com/lecture1.mp4" },
                { id: '1b', title: "Lecture 2", url: "https://example.com/lecture2.mp4" },
                { id: '1c', title: "Lecture 3", url: "https://example.com/lecture3.mp4" },
                { id: '1d', title: "Lecture 4", url: "https://example.com/lecture4.mp4" },
                { id: '1e', title: "Lecture 5", url: "https://example.com/lecture5.mp4" },
                { id: '1f', title: "Lecture 6", url: "https://example.com/lecture6.mp4" },
                { id: '1g', title: "Lecture 7", url: "https://example.com/lecture7.mp4" },
                { id: '1h', title: "Lecture 8", url: "https://example.com/lecture8.mp4" },
                { id: '1i', title: "Lecture 9", url: "https://example.com/lecture9.mp4" },
                { id: '1j', title: "Lecture 10", url: "https://example.com/lecture10.mp4" },

                // Add more lectures as needed
            ],
        },
        {
            id: 2,
            name: "CMPE 273 - Machine Learning",
            lectures: [
                { id: '2a', title: "Lecture 1", url: "https://example.com/lecture1.mp4" },
                { id: '2b', title: "Lecture 2", url: "https://example.com/lecture2.mp4" },
                { id: '2c', title: "Lecture 3", url: "https://example.com/lecture3.mp4" },
                // Add more lectures as needed
            ],
        },
        {
            id: 3,
            name: "CMPE 285 - Software Testing ",
            lectures: [
                { id: '3a', title: "Lecture 1", url: "https://example.com/lecture1.mp4" },
                { id: '3b', title: "Lecture 2", url: "https://example.com/lecture2.mp4" },
                // Add more lectures as needed
            ],
        },
        {
            id: 4,
            name: "CMPE 180 - Blockchain Leanring",
            lectures: [
                { id: '4a', title: "Lecture 1", url: "https://example.com/lecture1.mp4" },
                { id: '4b', title: "Lecture 2", url: "https://example.com/lecture2.mp4" },
                // Add more lectures as needed
            ],
        },
        {
            id: 5,
            name: "CMPE 180 - Data Strcuture and Algorithm",
            lectures: [
                { id: '4a', title: "Lecture 1", url: "https://example.com/lecture1.mp4" },
                { id: '4b', title: "Lecture 2", url: "https://example.com/lecture2.mp4" },
                { id: '4c', title: "Lecture 3", url: "https://example.com/lecture2.mp4" },
                { id: '4d', title: "Lecture 4", url: "https://example.com/lecture2.mp4" },
                // Add more lectures as needed
            ],
        },
    ]);
    const [currentLectureUrl, setCurrentLectureUrl] = useState('');
    const [activeCourseId, setActiveCourseId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedCourses, setExpandedCourses] = useState({});

    // Initialize expanded state for all courses
    useEffect(() => {
        const expandedState = courses.reduce((acc, course) => ({
            ...acc,
            [course.id]: true // Set each course to be expanded by default
        }), {});
        setExpandedCourses(expandedState);
    }, [courses]);

    const handleLectureClick = (lectureUrl, courseId) => {
        setCurrentLectureUrl(lectureUrl);
        setActiveCourseId(courseId);
    };

    const handleCloseVideo = () => {
        setCurrentLectureUrl('');
        setActiveCourseId(null);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const toggleCourse = (courseId) => {
        setExpandedCourses(prev => ({
            ...prev,
            [courseId]: !prev[courseId]
        }));
    };

    const bg = useColorModeValue('white', 'gray.800');
    const color = useColorModeValue('gray.800', 'white');

    return (
        <Flex direction="column" align="center" m={4}>
            <InputGroup mb={4} width="80%" maxWidth="600px">
                <Input
                    placeholder="Search lectures..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <InputRightElement children={<IconButton aria-label="Search" icon={<SearchIcon />} onClick={() => setSearchTerm('')} bg={bg} />} />
            </InputGroup>
            {courses.map((course) => (
                <Box key={course.id} p={5} shadow="md" borderWidth="1px" borderRadius="md" overflow="hidden" width="full">
                    <Flex justify="space-between" align="center">
                        <Text fontSize="xl" fontWeight="bold">{course.name}</Text>
                        <IconButton
                            icon={expandedCourses[course.id] ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            onClick={() => toggleCourse(course.id)}
                            aria-label="Expand/Collapse"
                        />
                    </Flex>
                    <Collapse in={expandedCourses[course.id]} animateOpacity>
                        <Flex overflowX="auto" bg={bg}>
                            {course.lectures.filter(lecture => 
                                lecture.title.toLowerCase().includes(searchTerm.toLowerCase())
                            ).map((lecture) => (
                                <Button key={lecture.id} onClick={() => handleLectureClick(lecture.url, course.id)}
                                    m={2} p={4} height="120px" minWidth="180px" bg="blue.500" color="white" shadow="sm"
                                    borderRadius="md">
                                    {lecture.title}
                                </Button>
                            ))}
                        </Flex>
                    </Collapse>
                    {activeCourseId === course.id && currentLectureUrl && (
                        <Flex width="full" my={4} position="relative">
                            <ReactPlayer url={currentLectureUrl} playing={true} controls={true} width="100%" />
                            <IconButton
                                aria-label="Close video"
                                icon={<CloseIcon />}
                                position="absolute"
                                right="0"
                                top="-10px"
                                onClick={handleCloseVideo}
                                size="sm"
                                isRound={true}
                                bg="red.500"
                                color="white"
                                _hover={{ bg: "red.600" }}
                            />
                        </Flex>
                    )}
                </Box>
            ))}
        </Flex>
    );
};

export default Collections;