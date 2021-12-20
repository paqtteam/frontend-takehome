import React, { useState, useCallback } from 'react'
import {
  Box,
  Flex,
  Heading,
  HStack,
  VStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  Button,
  FormControl,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import {
  AddIcon
} from "@chakra-ui/icons";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ChakraHeading from '../components/chakra-heading'; 
import Signature from '../components/signature';
import Layout from '../layouts/default-layout';
import './editor.module.css'

const SignatureForm = ({ onChange, value = {} }) => {
  const handleChange = (e) => {
    onChange(e.target.name, e.target.value)
  }

  return (
    <Box>
      <FormControl isRequired>
        <FormLabel htmlFor='name'>Complete Name</FormLabel>
        <Input id='name' name='name' placeholder='Please Enter Name' value={value.name} onChange={handleChange} isInvalid={!value.name} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor='title'>Title</FormLabel>
        <Input id='title' name='title' placeholder='Please Enter Title' value={value.title} onChange={handleChange} isInvalid={!value.title} />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor='company'>Company</FormLabel>
        <Input id='company' name='company' placeholder='Please Enter Company' value={value.company} onChange={handleChange} />
      </FormControl>
    </Box>
  )
}

export default function Home() {
  const [openSignatureModal, setOpenSignatureModal] = useState(false)
  const [signatureValue, setSignatureValue] = useState({})

  const editor = useEditor({
    editorProps: {
        attributes: {
            class: 'editor',
        },
    },
    extensions: [
      StarterKit,
      ChakraHeading,
      Signature,
    ],
    content: '<chakra-heading><p>Hello World!</p></chakra-heading> <p>Helloooooo World!</p>',
  })

  const newNodeButton = useCallback((text, onClick) => {
    return (
      <Box 
        bg="#FAFAFA" 
        width="90%" 
        borderWidth="1px" 
        borderRadius="lg" 
        overflow="hidden"
        padding="1em" 
        margin="2em" 
        cursor="pointer"
        onClick={onClick}>
        <HStack padding="0 0.5em">
          <AddIcon/>
          <Text fontSize="lg" padding="0 0.5em">{text}</Text>
        </HStack>
      </Box>
    )
  }, [])

  const clickedAddParagraph = () => {
    editor.commands.insertContent('<p>Hello World!</p>')
  };

  const clickedAddHeading = () => {
    editor.commands.insertContent({
      type: 'ChakraHeading',
      attrs: {
        size: "lg",
      },
      content: [
        {
          type: 'text',
          text: 'Example Text',
        },
      ],
    })
  };

  const clickedAddSignature = () => {
    if (!signatureValue.name || !signatureValue.title) {
      alert('Name and Title are required!')
      return
    }
    console.log('=== signatureValue ===', signatureValue)
    editor.commands.insertContent({
      type: 'SignatureComponent',
      attrs: {
        ...signatureValue,
      }
    })
    setOpenSignatureModal(false)
    setSignatureValue({})
  };

  const handleOpenSignatureModal = () => {
    setOpenSignatureModal(true)
  }

  const handleCloseSignatureModal = () => {
    setOpenSignatureModal(false)
    setSignatureValue({})
  }

  const handleChangeSignature = (type, val) => {
    setSignatureValue({ ...signatureValue, [type]: val })
  }

  return (
    <Layout>
      <Flex w="100%" h="100%"> 
        <Box
          h="100%"
          w="100%"
          bg="#FAFAFA"
          overflow="scroll"
        >
          <Box
            maxW="850"
            minH="1100"
            bg="white"
            boxShadow= "0px 1px 4px rgba(0, 0, 0, 0.16)"
            margin="50px auto"
            padding="4rem"
          >
            <EditorContent editor={editor} />
          </Box>
        </Box>
        <Box bg="white" w="285px" h="100%" alignItems="start">
          <VStack>
            <Box>
              <Heading padding="1em" size="md">Components</Heading>
            </Box>
            {newNodeButton("Paragraph",clickedAddParagraph)}
            {newNodeButton("Heading",clickedAddHeading)}
            {newNodeButton("Signature",handleOpenSignatureModal)}
          </VStack>
        </Box>
      </Flex>

      <Modal isOpen={openSignatureModal} onClose={handleCloseSignatureModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add A Signature</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SignatureForm onChange={handleChangeSignature} value={signatureValue} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleCloseSignatureModal}>
              Close
            </Button>
            <Button variant='ghost' onClick={clickedAddSignature}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  )
};
