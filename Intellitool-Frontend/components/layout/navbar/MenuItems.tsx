import React, { useState } from 'react';
import { MenuLink, MenuLinkProps } from './MenuLink';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, RadioGroup, Radio, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios'; // Import axios for making HTTP requests
import { toast } from 'react-hot-toast';

interface MenuItemsProps {
  isOpen?: boolean;
  links: Array<MenuLinkProps>;
}

export const MenuItems = ({ isOpen = false, links }: MenuItemsProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currUser, setCurrUser] = useState<any>(null);
  const [userData, setUserData] = useState<{ userId: string; username: string; role: string } | null>(null);

  const {
    isOpen: isLoginModalOpen,
    onOpen: onLoginModalOpen,
    onClose: onLoginModalClose
  } = useDisclosure();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:8000/intellitool/users');
      const users = response.data;

      // Check if the username, password, and role match any user in the API response
      const user = users.find((user: any) => user.username === username && user.password === password && user.role === role);

      if (user) {
        setIsLoggedIn(true);
        setUserData({ userId: String(user.id), username: user.username, role: user.role });
        localStorage.setItem('userId', String(user.id));
        localStorage.setItem('username', user.username);
        localStorage.setItem('role', user.role);
        toast.success('Login successful.');
        onLoginModalClose();
      } else {
        toast.error('Invalid username, password, or role.');
      }
    } catch (error) {
      console.error('Error while logging in:', error);
      toast.error('Failed to login. Please try again later.');
    }
  };

  return (
    <>
      <div
        className={`${
          isOpen ? 'flex' : 'hidden'
        } lg:flex flex-col lg:flex-row justify-between basis-full md:basis-auto ml-0 lg:ml-10 w-full`}
      >
        {/* Links */}
        <div className="pt-0 space-x-0 lg:space-x-8 space-y-4 lg:space-y-0 flex flex-col lg:flex-row items-left lg:items-center justify-end font-bold">
          {links.map(link => (
            <MenuLink key={link.label} label={link.label} href={link.href} />
          ))}
        </div>

        {/* CTA Button -> Login / Profile */}
        <div className="mt-4 lg:mt-0">
          {!isLoggedIn ? (
            <Button onClick={onLoginModalOpen}>Login</Button>
          ) : (
            <div
              className="relative w-[36px] h-[36px] cursor-pointer"
              onClick={onLoginModalOpen}
            >
              <Image
                src={currUser ? currUser.photoURL : '/misc/default-profile.jpg'}
                alt="profile picture"
                fill={true}
                className="rounded-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <Modal isOpen={isLoginModalOpen} onClose={onLoginModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Role</FormLabel>
          <RadioGroup value={role} onChange={(value) => setRole(value)}>
            <Stack spacing={2}>
              <Radio value="student">Student</Radio>
              <Radio value="teacher">Teacher</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleLogin}>
              Login
            </Button>
            <Button onClick={onLoginModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
