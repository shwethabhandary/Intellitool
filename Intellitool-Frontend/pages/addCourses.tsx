import React, { useState } from 'react';
import { Box, Button, Input, Select, Textarea, Checkbox, CheckboxGroup, Stack, useToast } from '@chakra-ui/react';

const CourseManagement = ({ professorId }) => {
    const [course, setCourse] = useState({
        name: '',
        description: '',
        term: '',
        zoom: '',
        assignments: []
    });
    const toast = useToast();

    const handleInputChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const handleAssignmentChange = (assignment) => {
        setCourse(prev => ({
            ...prev,
            assignments: assignment
        }));
    };

    const addCourse = async () => {
        const response = await fetch(`http://localhost:8000/intellitool/addCourse?professor=${professorId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(course)
        });

        if (response.ok) {
            toast({
                title: 'Course added successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
            // Optionally reset form or update state
        } else {
            toast({
                title: 'Error adding course',
                description: response.statusText,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={5}>
            <Input placeholder="Course Name" value={course.name} onChange={handleInputChange} name="name" />
            <Textarea placeholder="Course Description" value={course.description} onChange={handleInputChange} name="description" mt={2} />
            <Select placeholder="Select term" value={course.term} onChange={handleInputChange} name="term" mt={2}>
                <option value="Spring 2024">Spring 2024</option>
                <option value="Fall 2023">Fall 2023</option>
                <option value="Spring 2023">Spring 2023</option>
                <option value="Fall 2022">Fall 2022</option>
            </Select>
            <Input placeholder="Zoom Link" value={course.zoom} onChange={handleInputChange} name="zoom" mt={2} />
            <CheckboxGroup colorScheme="blue" onChange={handleAssignmentChange} value={course.assignments}>
                <Stack mt={2}>
                    {Array.from({ length: 10 }, (_, i) => `Assignment ${i + 1}`).map(assignment => (
                        <Checkbox key={assignment} value={assignment}>{assignment}</Checkbox>
                    ))}
                </Stack>
            </CheckboxGroup>
            <Button onClick={addCourse} mt={4}>Add Course</Button>
        </Box>
    );
};

export default CourseManagement;
