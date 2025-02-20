import { motion } from "framer-motion";
import { useRef } from "react";
import { Box, HStack, Avatar, Text, Flex } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import ConferenceTile from "../components/ConferenceTile";


const MotionFlex = motion(Flex);
const data = [
    {
      id: 1,
      users: [
        { id: "u1", src: "https://randomuser.me/api/portraits/women/1.jpg" },
        { id: "u2", src: "https://randomuser.me/api/portraits/men/2.jpg" },
        { id: "u3", src: "https://randomuser.me/api/portraits/women/3.jpg" },
      ],
      text: "+150 - season finale watch...",
    },
    {
      id: 2,
      users: [
        { id: "u4", src: "https://randomuser.me/api/portraits/men/4.jpg" },
        { id: "u5", src: "https://randomuser.me/api/portraits/women/5.jpg" },
      ],
      text: "+200 - gaming night!",
    },
    {
      id: 3,
      users: [
        { id: "u6", src: "https://randomuser.me/api/portraits/men/6.jpg" },
        { id: "u7", src: "https://randomuser.me/api/portraits/women/7.jpg" },
        { id: "u8", src: "https://randomuser.me/api/portraits/men/8.jpg" },
      ],
      text: "+300 - tech meetup!",
    },
  ];
function ConferencePage() {
    const scrollRef = useRef(null);

  return (
    <Box overflow="hidden" py={2} px={4}>
      <MotionFlex
        ref={scrollRef}
        drag="x"
        dragConstraints={{ left: -500, right: 0 }}
        cursor="grab"
      >
        <HStack spacing={3}>
          {data.map((item) => (<ConferenceTile item={item} key={item.id}/>
          ))}
        </HStack>
      </MotionFlex>
    </Box>
  );
};
export default ConferencePage;