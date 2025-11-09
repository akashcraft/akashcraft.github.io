import { useEffect, useMemo, useRef, useState } from "react";
import HolderBox from "../akash-commons/HolderBox";
import {
  Alert,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Portal,
  Skeleton,
  Stack,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  backcard,
  cardImages,
  onestars,
  threestars,
  twostars,
} from "./mahjong";
import { motion } from "framer-motion";
import { SidePaper } from "../akash-commons/SidePaper";
import { useNavigate } from "react-router";
import { headerContainer } from "../akash-commons/Header";
import { CasinoOutlined } from "@mui/icons-material";
import { useGetImages } from "../akash-commons/Hooks";

function createArray(totalCards: number): number[] {
  const numbers = Array.from({ length: totalCards }, (_, i) => i + 1);
  const arr = [...numbers, ...numbers];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const validSizes = [2, 6, 8, 10, 14, 18, 22];

function Mahjong() {
  const navigate = useNavigate();
  const isLoading = useGetImages([
    backcard,
    onestars,
    twostars,
    threestars,
    ...cardImages,
  ]);

  const [totalCards, setTotalCards] = useState<number>(
    Number(localStorage.getItem("mahjongSize")) || 10,
  );
  const [attempts, setAttempts] = useState<number>(0);
  const [dualIndex, setDualIndex] = useState<number[] | null>(null);
  const [complete, setComplete] = useState<boolean>(false);

  const [cardOrder, setCardOrder] = useState<number[]>(
    useMemo(() => {
      return createArray(totalCards);
    }, [totalCards]),
  );

  const cardOrderRef = useRef(cardOrder);
  const isPhone = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    if (dualIndex && dualIndex.length === 2) {
      setAttempts((prev) => prev + 1);
      setTimeout(() => {
        if (
          dualIndex &&
          cardOrder[dualIndex[0]] === cardOrder[dualIndex[1]] &&
          dualIndex[0] !== dualIndex[1]
        ) {
          const newCardOrder = [...cardOrder];
          newCardOrder[dualIndex[0]] = -1;
          newCardOrder[dualIndex[1]] = -1;
          setCardOrder(newCardOrder);
          if (newCardOrder.every((card) => card === -1)) {
            setComplete(true);
          }
        }
        setDualIndex(null);
      }, 1000);
    }
  }, [cardOrder, dualIndex]);

  const handleClick = (index: number) => {
    if (dualIndex === null) {
      setDualIndex([index]);
    } else if (dualIndex.length === 1) {
      setDualIndex([...dualIndex, index]);
    }
  };

  const changeTotalCards = (reset: boolean = false) => {
    let newTotal;
    if (!reset) {
      const currentIndex = validSizes.indexOf(totalCards);
      const newIndex = (currentIndex + 1) % validSizes.length;
      newTotal = validSizes[newIndex];
      setTotalCards(newTotal);
      localStorage.setItem("mahjongSize", newTotal.toString());
    } else {
      newTotal = totalCards;
    }
    setAttempts(0);
    const newCardOrder = createArray(newTotal);
    setCardOrder(newCardOrder);
    cardOrderRef.current = newCardOrder;
    setDualIndex(null);
    setAttempts(0);
    setComplete(false);
  };

  return (
    <HolderBox isWide>
      <Stack
        direction={isPhone ? "row" : "column"}
        alignItems={isPhone ? "flex-start" : "center"}
      >
        <Portal container={headerContainer}>
          <GameControls
            attempts={attempts}
            cardOrder={cardOrder}
            changeTotalCards={changeTotalCards}
            navigate={navigate}
            totalCards={totalCards}
            isPhone={isPhone}
          />
        </Portal>
        {isPhone && (
          <SidePaper
            icon={<CasinoOutlined />}
            style={{
              width: "15rem",
              marginTop: "0.5rem",
              height: "min-content",
              flexShrink: 0,
              boxSizing: "border-box",
            }}
            title="Controls"
          >
            <GameControls
              attempts={attempts}
              cardOrder={cardOrder}
              changeTotalCards={changeTotalCards}
              navigate={navigate}
              totalCards={totalCards}
              isPhone={isPhone}
            />
          </SidePaper>
        )}
        {!complete && (
          <>
            {isLoading && (
              <Skeleton
                sx={{ margin: "0.5rem 1rem", borderRadius: "1rem" }}
                variant="rounded"
                width={"90%"}
                height={"80dvh"}
              />
            )}
            {!isLoading && (
              <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent={isPhone ? "flex-start" : "center"}
                mr={3}
                ml={3}
                mt={isPhone ? 0 : 2}
                sx={{ height: "min-content" }}
              >
                {cardOrderRef.current.map((card, index) => (
                  <Box
                    sx={{ position: "relative" }}
                    style={{
                      ...cardStyle,
                      width: isPhone ? "6rem" : "3rem",
                      margin: isPhone ? "0.5rem" : "0.25rem",
                      borderRadius: isPhone ? "1rem" : "0.5rem",
                    }}
                    key={index}
                    onClick={() => handleClick(index)}
                  >
                    {(() => {
                      const isFlipped =
                        (dualIndex ? dualIndex[0] : -1) === index ||
                        (dualIndex ? dualIndex[1] : -1) === index;
                      const isMatched = cardOrder[index] === -1;

                      return (
                        <>
                          <motion.img
                            src={backcard}
                            style={{
                              ...cardStyle,
                              width: isPhone ? "6rem" : "3rem",
                              borderRadius: isPhone ? "1rem" : "0.5rem",
                              position: "absolute",
                              top: 0,
                              left: 0,
                              zIndex: 2,
                              margin: 0,
                            }}
                            animate={{
                              rotateY: isFlipped ? 180 : 0,
                              scale: isMatched ? 0 : 1,
                            }}
                            transition={{
                              rotateY: { duration: 0.5 },
                              scale: {
                                duration: 0.2,
                                delay: isFlipped ? 0.45 : 0,
                              },
                            }}
                            initial={false}
                          />

                          <motion.img
                            src={cardImages[card - 1]}
                            style={{
                              ...cardStyle,
                              width: isPhone ? "6rem" : "3rem",
                              borderRadius: isPhone ? "1rem" : "0.5rem",
                              position: "absolute",
                              top: 0,
                              left: 0,
                              zIndex: 1,
                              margin: 0,
                            }}
                            animate={{
                              rotateY: isFlipped ? 0 : 180,
                              scale: isMatched ? 0 : 1,
                            }}
                            transition={{
                              rotateY: { duration: 0.5 },
                              scale: {
                                duration: 0.2,
                                delay: isFlipped ? 0.45 : 0,
                              },
                            }}
                            initial={false}
                          />
                        </>
                      );
                    })()}
                  </Box>
                ))}
              </Stack>
            )}
          </>
        )}
        {complete && (
          <Stack
            sx={{ flexGrow: 1, height: isPhone ? "none" : "70dvh" }}
            alignItems="center"
            justifyContent="center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{ textAlign: "center" }}
            >
              <Typography variant="h6">
                {attempts < 1.6 * totalCards
                  ? "Wow! That was fast!"
                  : attempts < 1.9 * totalCards
                    ? "Well done! Not bad!"
                    : "Better luck next time!"}
              </Typography>
              <br />
              <img
                width={"200rem"}
                src={
                  attempts < 1.6 * totalCards
                    ? threestars
                    : attempts < 1.9 * totalCards
                      ? twostars
                      : onestars
                }
              />
            </motion.div>
          </Stack>
        )}
        {!isPhone && !complete && (
          <Alert
            sx={{ borderRadius: "2rem", marginTop: "1.5rem" }}
            severity="info"
          >
            Game controls are available on the right hamburger menu.
          </Alert>
        )}
      </Stack>
    </HolderBox>
  );
}

const cardStyle: React.CSSProperties = {
  aspectRatio: "3/4.5",
  cursor: "pointer",
  transformStyle: "preserve-3d",
  backfaceVisibility: "hidden",
  zIndex: 0,
};

const StyledListItemButton = styled(ListItemButton)({
  cursor: "pointer",
  borderRadius: "1rem",
  margin: "0.25rem 0",
  padding: "0.25rem 0.5rem",
});

const GameControls = ({
  attempts,
  cardOrder,
  changeTotalCards,
  navigate,
  totalCards,
  isPhone,
}: {
  attempts: number;
  cardOrder: number[];
  changeTotalCards: (reset?: boolean) => void;
  navigate: (path: string) => void;
  totalCards: number;
  isPhone: boolean;
}) => {
  return (
    <List
      sx={{
        marginTop: "0.5rem",
        paddingBottom: "0",
        width: isPhone ? "none" : "130%",
        margin: isPhone ? 0 : "0 0.5rem",
      }}
    >
      <ListItem disablePadding style={{ pointerEvents: "none" }}>
        <StyledListItemButton>
          <ListItemText primary="Attempts" />
          {attempts}
        </StyledListItemButton>
      </ListItem>
      <ListItem disablePadding style={{ pointerEvents: "none" }}>
        <StyledListItemButton>
          <ListItemText primary={isPhone ? "Pairs Remaining" : "Remaining"} />
          {cardOrder.filter((card) => card !== -1).length}
        </StyledListItemButton>
      </ListItem>
      <ListItem disablePadding onClick={() => changeTotalCards()}>
        <StyledListItemButton>
          <ListItemText primary="Grid Size" />
          {totalCards * 2}
        </StyledListItemButton>
      </ListItem>
      <ListItem disablePadding onClick={() => changeTotalCards(true)}>
        <StyledListItemButton>
          <ListItemText primary="Reset" />
        </StyledListItemButton>
      </ListItem>
      <ListItem
        disablePadding
        onClick={() => {
          navigate("/web");
        }}
      >
        <StyledListItemButton>
          <ListItemText primary="Quit" />
        </StyledListItemButton>
      </ListItem>
    </List>
  );
};

export default Mahjong;
