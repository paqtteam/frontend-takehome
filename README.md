## Getting Started

Thanks for taking some time to check out the Paqt front end javascript test. This demo application uses Next.js, Chakra UI and the TipTap editor to create a very basic text editor. You can find the docs for these frameworks below:

- [Next.js Docs](https://nextjs.org/docs/getting-started)
- [Chakra UI](https://chakra-ui.com/docs/getting-started)
- [tiptap](https://tiptap.dev/introduction)

First, to run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Tasks

### Add a Signature Block

The starting Editor shows an editable Heading and Paragraph node. Clicking the component buttons on the right side will add more paragraph and heading nodes. 

![starting page](/docs/editor.jpeg)

Using ChakraUI components, create a signature block [node view extension](https://tiptap.dev/guide/node-views/react)

![signature block](/docs/signature.jpeg)

including editable fields for:

- Name (Required)
- Title (Required)
- Company (Optional)

and Displays the data filling completion status of the signature block correctly.

Implementing the signature drawing is not required.

Do not worry about the recipient selector as there is no API portion to this task and so there's nothing to grab a recipient from. Do not worry about making this pixel perfect or copying the icons, use the icons from ChakraUI where it makes sense to do so.

There is a working example of a custom react view node in `components/chakra-heading.js`


