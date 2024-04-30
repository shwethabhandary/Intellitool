import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure
} from '@chakra-ui/react';

const NewCourseModal = ({ addCourse, currentCourse, updateCourse }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    professor: '',
    semester: '',
    lectureLinks: '',
    videos: null,
    dateCreated: new Date().toLocaleDateString(),
  });

  useEffect(() => {
    if (currentCourse) {
      setFormData(currentCourse);
    } else {
      setFormData({
        name: '',
        code: '',
        professor: '',
        semester: '',
        lectureLinks: '',
        videos: null,
        dateCreated: new Date().toLocaleDateString(),
      });
    }
  }, [currentCourse]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'videos') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    const courseData = { ...formData, id: currentCourse ? currentCourse.id : Date.now(), isActive: true };
    if (currentCourse) {
      updateCourse(courseData);
    } else {
      addCourse(courseData);
    }
    onClose(); // Close the modal
  };

  return (
    <>
      <Button onClick={onOpen}>+ New Collection</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentCourse ? 'Edit Course' : 'Add New Course'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Course Name</FormLabel>
              <Input placeholder='Course Name' name='name' value={formData.name} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Course Code</FormLabel>
              <Input placeholder='Course Code' name='code' value={formData.code} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Professor Name</FormLabel>
              <Input placeholder='Professor Name' name='professor' value={formData.professor} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Semester</FormLabel>
              <Input placeholder='Semester' name='semester' value={formData.semester} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Lecture Links</FormLabel>
              <Input placeholder='Lecture Links' name='lectureLinks' value={formData.lectureLinks} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Videos (PDF)</FormLabel>
              <Input type='file' name='videos' onChange={handleInputChange} accept="application/pdf" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              {currentCourse ? 'Update' : 'Save'}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewCourseModal;
