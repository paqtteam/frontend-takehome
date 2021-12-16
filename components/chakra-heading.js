import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import { Heading } from '@chakra-ui/react'

const HeadingNode = (props) => {
  const nodeProps = {
    size:props.node.attrs.size,
  };
  return (
    <NodeViewWrapper className='chakra-heading'>
      <Heading {...nodeProps}>
        <NodeViewContent className="content" />
      </Heading>
    </NodeViewWrapper>
  );
};

export default Node.create({
  name: 'ChakraHeading',

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [{
      tag: 'chakra-heading',
    },]
  },

  renderHTML({ HTMLAttributes }) {
    return ['chakra-heading', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(HeadingNode)
  },
})