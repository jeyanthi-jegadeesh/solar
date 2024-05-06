import Image from "next/image";
import styles from "./page.module.css";
import SpaceExplorer from "./components/SpaceExplorer/SpaceExplorer";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <main>
      <Box height='100vh'> 
        <SpaceExplorer />
      </Box>
      <Box height='90vh' width='33vw' zIndex={10} position='absolute' top='5vh' right='5vw' border='2px solid white'  padding={25} opacity='33%' background='whitesmoke'>
        <h1>EARTH</h1>
        <p>Earth is the third planet from the Sun and the only astronomical object known to harbor life. According to radiometric dating and other evidence, Earth formed over 4.5 billion years ago.</p>
        <p>Earth is the only planet not named after a god or greek deity.</p>
        
      </Box>
     </main>
  );
}
