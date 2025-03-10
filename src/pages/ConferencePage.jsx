import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Box, HStack, Flex } from "@chakra-ui/react";
import ConferenceTile from "../components/ConferenceTile";
import axios from "axios";
import { useSelector } from "react-redux";
import { EventSourcePolyfill } from "event-source-polyfill";

const MotionFlex = motion(Flex);

function ConferencePage() {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const [conferences, setConferences] = useState([]);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchConferences = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/conferences`,
        {
          withCredentials: true,
          headers: { token },
        }
      );
      setConferences([...data]);
    };

    fetchConferences();

    const eventSource = new EventSourcePolyfill(
      `${import.meta.env.VITE_API}/events`,
      {
        withCredentials: true,
        headers: { token },
        heartbeatTimeout: 60000,
      }
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type !== "heartbeat") {
        setConferences((prev) => [...prev, data]);
      }
    };

    eventSource.onerror = (event) => {
      console.log("SSE error", event);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    if (containerRef.current && scrollRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = scrollRef.current.scrollWidth;

      if (contentWidth > containerWidth) {
        setDragConstraints({
          left: -(contentWidth - containerWidth + 20),
          right: 0,
        });
      }
    }
  }, [conferences]);

  return (
    <Box overflow="hidden" py={2} px={4} ref={containerRef} maxW="620px">
      <MotionFlex
        ref={scrollRef}
        drag="x"
        dragConstraints={dragConstraints}
        cursor="grab"
        dragElastic={false} 
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      >
        <HStack spacing={3}>
          {conferences.length > 0 &&
            conferences.map((item) => (
              <ConferenceTile item={item} key={item.id} />
            ))}
        </HStack>
      </MotionFlex>
    </Box>
  );
}

export default ConferencePage;
