import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import {
    FormControl,
    FormLabel,
    Input,
    Box,
    Heading,
    Text,
    Divider,
    Spinner,
    Container,
    Flex,
    Center
} from '@chakra-ui/react'
import { useState } from 'react';


const ComponentNode = (props) => {
    const [user, setUser] = useState({
        name: '',
        title: '',
        company: ''
    })

    const onSetUser = ({ target }) => {
        let data = {
            ...user,
        }
        data[target.name] = target.value;
        setUser(data);
    };

    const getFirstname = (name) => {
        if (name) {
            return name.split(' ').shift();
        }
    }

    return (
        <NodeViewWrapper>
            <Box bg='gray.50' w='100%' p={4} color='dark' borderRadius='lg' paddingBottom='8'>
                <Box bg='gray.100' padding='8' borderRadius='lg'>
                    <Heading textAlign='center'>Signature Here</Heading>
                </Box>
                <FormControl marginTop='8'>
                    <FormLabel>Complete Name</FormLabel>
                    <Input name='name' value={user.name} variant="filled" type='text' onChange={onSetUser} />
                </FormControl>
                <FormControl marginTop='4'>
                    <FormLabel>Title</FormLabel>
                    <Input name='title' value={user.title} variant="filled" type='text' onChange={onSetUser} />
                </FormControl>
                <FormControl marginTop='4'>
                    <FormLabel>Company (Optional)</FormLabel>
                    <Input name='company' value={user.company} variant="filled" type='text' onChange={onSetUser} />
                </FormControl>
                {(!user.name || !user.title) &&
                    <Container>
                        <Divider marginTop="8" marginBottom='4'></Divider>
                        <Flex marginTop='8'>
                            <Center flex="1">
                                <Spinner marginRight='2' size='sm' />
                                <Text fontSize='sm'>
                                    Waiting {getFirstname(user.name)} for signature
                                </Text>
                            </Center>
                        </Flex>
                    </Container>
                }
            </Box>
        </NodeViewWrapper>
    );
};

export default Node.create({
    name: 'ChakraForm',
    group: 'block',
    atom: true,

    addAttributes() {
        return {
            count: {
                default: 0,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'chakra-form',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['chakra-form', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return ReactNodeViewRenderer(ComponentNode)
    },
})