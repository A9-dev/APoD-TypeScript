import { useEffect, useState } from "react";
import { Container, VStack, Text, Code, StackDivider, Image } from "@chakra-ui/react";
function App() {
  const [data, setData] = useState({});
  const [message, setMessage] = useState("Loading...");
  const [imageUrl, setImageUrl] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");

  // https://api.nasa.gov/planetary/apod
  const apiKey = import.meta.env.VITE_APIKEY;

  useEffect(() => {
    console.log(`Fetching from: https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setMessage(data.explanation);
        setImageUrl(data.url);
        setDate(data.date);
        setTitle(data.title);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <Container maxW="6xl" p={5}>
      <div>
        <VStack divider={<StackDivider borderColor="gray.200" />}>
          <Text fontSize="6xl" textAlign="center">
            {title}
          </Text>
          <Text fontSize="md" textAlign="center">
            {message}
          </Text>
          <Image boxSize={650} src={imageUrl} />
          <p>{date}</p>
          {Object.keys(data).length > 0 && <Code textAlign="center">{JSON.stringify(data)}</Code>}
        </VStack>
      </div>
    </Container>
  );
}

export default App;
