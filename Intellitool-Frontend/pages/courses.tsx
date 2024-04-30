import React, { useState } from 'react';
import { Box, Grid, Text, Badge, Button, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

const CoursesDisplay = () => {
    // Using hardcoded course data
    const [courses] = useState([
        {
            id: 110,
            name: "E10",
            description: "E10 Labs",
            term: "Spring 2024",
            zoom: "sjsu.zoom.in/yken"
        },
        {
            id: 111,
            name: "Python",
            description: "Python for beginners",
            term: "Spring 2024",
            zoom: "sjsu.zoom.in/yken"
        },
        {
            id: 112,
            name: "Web Development",
            description: "Introduction to HTML, CSS, and JavaScript",
            term: "Fall 2023",
            zoom: "sjsu.zoom.in/webdev"
        },
        {
            id: 113,
            name: "Data Structures",
            description: "Advanced data structures in C++",
            term: "Fall 2022",
            zoom: "sjsu.zoom.in/datastruc"
        },
        {
            id: 114,
            name: "Cloud Computing",
            description: "Cloud Computing and Virtulization",
            term: "Fall 2023",
            zoom: "sjsu.zoom.in/datastruc"
        },
        {
            id: 115,
            name: "Business Analytics",
            description: "Introduction  of Data Minng",
            term: "Fall 2023",
            zoom: "sjsu.zoom.in/datastruc"
        },
        {
            id: 116,
            name: "Blockchain and IOT",
            description: "Introduction to Applicaitons of Cryptocurrency",
            term: "Fall 2023",
            zoom: "sjsu.zoom.in/datastruc"
        }
    ]);

    // Commented out the loading state and API fetch logic for now
    /*
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        fetch('http://localhost:8000/getallcourses')
            .then(res => res.json())
            .then(data => {
                setCourses(data);
                setIsLoading(false);
            })
            .catch(error => {
                toast({
                    title: 'Error fetching courses',
                    description: error.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }
    */

    return (
        <>
            <Box p={5}>
                <Link href="/addCourses" passHref>
                    <Button colorScheme="teal" as="a">Add New Course</Button>
                </Link>
            </Box>
            <Grid templateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={6} p={5}>
                {courses.map(course => (
                    <Box key={course.id} p={5} shadow="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
                        <Text fontSize="xl" fontWeight="bold">{course.name}</Text>
                        <Text mt={2}>{course.description}</Text>
                        <Badge borderRadius="full" px={2} colorScheme="teal" mt={2}>
                            {course.term}
                        </Badge>
                        <ChakraLink href={`https://${course.zoom}`} isExternal mt={2} display="block">
                            Zoom Link
                        </ChakraLink>
                    </Box>
                ))}
            </Grid>
        </>
    );
};


export default CoursesDisplay;