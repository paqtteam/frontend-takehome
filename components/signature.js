import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Divider,
  Container,
  Flex,
  Center,
	InputGroup,
	InputLeftElement,
	Icon
} from '@chakra-ui/react'
import { TimeIcon } from '@chakra-ui/icons';
import { FaSignature } from 'react-icons/fa';
import { useState } from 'react';


const SignatureNode = (props) => {
  const [user, setUser] = useState({
    name: '',
    title: '',
    company: ''
  })

	const [signature, setSignature] = useState('');

	const onSignature = ({target}) => {
		setSignature(target.value);
	};

  const onSetUser = ({ target }) => {
    const data = {
      ...user,
    }
    data[target.name] = target.value;
    setUser(data);
  };

  const getFirstName = (name) => {
    if (name) {
      return name.split(' ').shift();
    }
  }

	const styles = {};
	if (props.selected) {
		styles.border = '1px solid #ff0000';
	}

  return (
    <NodeViewWrapper>
      <Box style={styles} borderWidth='1px' borderRadius='lg' overflow='hidden' w='100%' p={4} color='dark' borderRadius='lg' paddingBottom='8'>
        <Box padding='4 0' borderRadius='lg'>
					<InputGroup>
						<InputLeftElement
							pointerEvents='none'
							children={<Icon as={FaSignature} color='black.700' />}
						/>
						<Input onChange={onSignature} color='black.700' variant='flushed' placeholder='Signature here' />
					</InputGroup>
        </Box>
        <FormControl marginTop='8'>
          <FormLabel htmlFor='name' >Complete Name</FormLabel>
          <Input id='name' name='name' placeholder='Type here' value={user.name} variant="filled" type='text' onChange={onSetUser} />
        </FormControl>
        <FormControl marginTop='4'>
          <FormLabel htmlFor='title'>Title</FormLabel>
          <Input id='title' name='title' placeholder='Type here' value={user.title} variant="filled" type='text' onChange={onSetUser} />
        </FormControl>
        <FormControl marginTop='4'>
          <FormLabel htmlFor="company">Company (Optional)</FormLabel>
          <Input id='company' name='company' placeholder='Type here' value={user.company} variant="filled" type='text' onChange={onSetUser} />
        </FormControl>
				{!signature && <Container>
						<Divider marginTop="8" marginBottom='4'></Divider>
						<Flex marginTop='8'>
							<Center flex="1">
							<TimeIcon 
								marginRight='2'	
								color='blue.500'
							/>
								<Text fontSize='sm'>
									Waiting {getFirstName(user.name)} for signature
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
  name: 'signature-form',
  group: 'block',
	selected: true,
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
        tag: 'signature-form',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['signature-form', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(SignatureNode)
  },
})