import Image from '@tiptap/extension-image';

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: '100%',
        parseHTML: (element) => element.getAttribute('width') || '100%',
        renderHTML: (attributes) => {
          return {
            width: attributes.width,
          };
        },
      },
      height: {
        default: 'auto',
        parseHTML: (element) => element.getAttribute('height') || 'auto',
        renderHTML: (attributes) => {
          return {
            height: attributes.height,
          };
        },
      },
    };
  },
});

export default CustomImage;
