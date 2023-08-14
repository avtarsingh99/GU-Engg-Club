
const OutlineBW = {
    bg: 'blackAlpha.900',
    textColor: 'whiteAlpha.900',
    width: '100%',
    rounded: 0,
    _hover: {
        background: 'white',
        color: 'black',
        border: '1px solid black',
        transition: 'all 500 ease-in'
    }
}
const Buttons = {
    variants: {
        'outline-bw': OutlineBW
    }
};
export default Buttons;