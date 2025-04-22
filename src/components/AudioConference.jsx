import {
  LiveKitRoom,
  RoomAudioRenderer,
  useParticipants,
  useRoomInfo,
} from "@livekit/components-react";
import "@livekit/components-styles";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  Select,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ConferenceUi from "./ConferenceUi";

const serverUrl = "wss://social-threads-app-8jyllp8e.livekit.cloud";

export default function RoomScheduler() {
  const { roomId } = useParams();
  const { token: authtoken } = useSelector((state) => state.auth);
  const [token, setToken] = useState(null);
  const [title, setTitle] = useState("");
  const [selectedTime, setSelectedTime] = useState("11:30 - 12:00");
  const [details, setDetails] = useState("");

  const suggestedTimes = ["11:30 - 12:00", "12:10 - 12:40"];

  // 🔹 Create Room
  const createRoom = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/getlivetoken`,
        { roomName: title },
        {
          headers: { token: authtoken },
        }
      );
      setToken(response.data);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  // 🔹 Join Room from params
  const joinRoom = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/getlivetoken/new`,
        { roomId },
        {
          headers: { token: authtoken },
        }
      );
      setToken(response.data);
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  useEffect(() => {
    if (roomId) joinRoom();
  }, [roomId]);

  if (!token) {
    return (
      <Flex bg="#111" color="white" h="100vh" align="center" justify="center">
        <Box bg="#1c1c1e" p={8} borderRadius="md" w="600px">
          <Text fontSize="xl" mb={4}>
            {roomId=="createRoom" ? "Create New Meeting" : "join meeting"}
          </Text>
          <VStack spacing={4} align="stretch">
            {roomId=="createRoom" && (
              <>
                <Input
                  placeholder="Meeting title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {/* <Select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  {suggestedTimes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </Select> */}
                <Textarea
                  placeholder="Meeting details (optional)"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </>
            )}

            <HStack justify="space-between">
              <Button variant="ghost" colorScheme="gray">
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  if (roomId!="createRoom") {
                    joinRoom();
                    return;
                  } 
                    createRoom();
                  
                }}
              >
                {roomId!="createRoom" ? "Join" : "Send"}
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    );
  }

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={serverUrl}
      data-lk-theme="default"
      style={{ height: "100vh" }}
    >
      <Box p={4} textAlign="center" bg="#111" color="white">
        <Text fontSize="2xl" mb={4}>
          {title || "Meeting Room"}
        </Text>
        <RoomAudioRenderer />
        <ParticipantTracks />
      </Box>
    </LiveKitRoom>
  );
}

const ParticipantTracks = () => {
  const participants = useParticipants();
  const room = useRoomInfo();

  return (
    <>
      {participants.length > 0 && (
        <ConferenceUi participants={participants} room={room} />
      )}
    </>
  );
};
