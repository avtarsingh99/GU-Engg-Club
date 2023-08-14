import {extendTheme } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools';
import Buttons from "./UIElements/ButtonVariants";
import Headings from "./UIElements/HeadingVariants";
import Containers from "./UIElements/ContainerVariants"
import Texts from "./UIElements/TextVariants";
import Links from "./UIElements/LinkVariants";
const theme = extendTheme(
    {
        styles: {
            global: (props) => ({
                body: {
                    bg: mode('#f8f9fb', '#f8f9fb')(props),
                },
                fontFamily: "`M PLUS Rounded 1c`"
            }),
        },
        fonts: {
            body: `'M PLUS Rounded 1c'`
        },
        components: {
            Heading: Headings,
            Button:Buttons,
            Container:Containers,
            Text:Texts,
            Link:Links
        }
    }
);
const wrapperPadding = {
    base: '10px 10px',
    md: '10px 80px'
};
export { wrapperPadding };
export default theme;