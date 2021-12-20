import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import { Box, Text } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

const SignatureNode = (props) => {
  const title = `${props.node.attrs.title}${props.node.attrs.company ? ' at ' + props.node.attrs.company : ''}`

  const removeSignature = () => {
    props.deleteNode()
  }

  return (
    <NodeViewWrapper className='signature-component'>
      <Box className='content' display='inline-block' position='relative' borderWidth='1px' borderRadius='md' borderColor='black' paddingRight='1.5em'>
        <Box display='inline-block' position='absolute' right={0} top={0} zIndex={10} onClick={removeSignature}>
          <DeleteIcon />
        </Box>
        <Text fontSize='lg' padding='0 0.5em' color='black'>{props.node.attrs.name}</Text>
        <Text fontSize='sm' padding='0 0.5em' color='gray'>{title}</Text>
      </Box>
    </NodeViewWrapper>
  );
};

export default Node.create({
  name: 'SignatureComponent',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      name: {
        default: '',
      },
      title: {
        default: '',
      },
      company: {
        default: '',
      }
    }
  },

  parseHTML() {
    return [{
      tag: 'signature-component',
    },]
  },

  renderHTML({ HTMLAttributes }) {
    return ['signature-component', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(SignatureNode)
  },
})