"use client";
import styled from "@emotion/styled";
import { useState, useRef, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from "@mui/icons-material/Send";
import PirateImage from "../images/pirate.jpeg";
import Image from "next/image";

type Message = {
  text: string;
  sender: string;
};

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [requestCount, setRequestCount] = useState(0);
  const [requestLimit, setRequestLimit] = useState(25);
  const maxLength = 500; // Set the maximum character limit

  const [messages, setMessages] = useState<Message[]>([]);

  const updateMessages = (newMessageThread: Message[]) => {
    setMessages(newMessageThread);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= maxLength) {
      setInputValue(event.target.value);
    }
  };
  const bottomChatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const humanMessage = { text: inputValue, sender: "human" };
    const newMessages = [...messages, humanMessage];

    setInputValue("");
    //
    const url = "http://127.0.0.1:5000/chat";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversation: newMessages,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const aiMessage = { text: data.response, sender: "ai" };
        const updatedMessages = [...newMessages, aiMessage];
        updateMessages(updatedMessages);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container>
      <HeaderContainer>
        <CharacterDetailContainer>
          <CharacterTextContainer>
            <Header>Captain Jareth Wavebreaker</Header>
            <SubHeader>of Kraken Cove</SubHeader>
          </CharacterTextContainer>

          <CharacterImg
            src={PirateImage.src}
            alt={"character"}
            onClick={() => {}}
          />
        </CharacterDetailContainer>
      </HeaderContainer>

      <Box style={{ width: 400 }}>
        <Paper elevation={3} sx={{ height: 380, overflow: "auto" }}>
          <List>
            {messages.map((message: Message, index: number) => (
              <ListItem key={index}>
                <ListItemText
                  primary={message.text}
                  {...({
                    align: message.sender === "ai" ? "right" : "left",
                  } as any)}
                />
              </ListItem>
            ))}
            <div ref={bottomChatRef} />
          </List>
        </Paper>
        <form onSubmit={handleSendMessage}>
          <TextField
            fullWidth
            margin="normal"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message here"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSendMessage} edge="end">
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const OverviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  gap: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  padding: 10px;
  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const CharacterTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    max-width: 250px;
  }
`;

const CharacterDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const Header = styled.h1`
  font-size: 24px;
  margin: 0;
  padding: 0;
`;

const SubHeader = styled.p`
  margin: 5px;
  text-align: center;
`;

const CharacterImg = styled.img`
  height: 400px;
  border-radius: 16px;
`;

const SubText = styled.p`
  font-size: 14px;
  padding: 0;
  margin: 0 5px 5px 5px;
`;

const Information = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  max-width: 400px;
  background-color: #ececec;
  border-radius: 16px;
  padding: 20px;
`;
