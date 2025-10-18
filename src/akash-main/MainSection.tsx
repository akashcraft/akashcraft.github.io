import { Stack } from "@mui/material";
import type { genericAppData } from "./appData";
import MainCard from "./MainCard";
import HeaderChip from "./HeaderChip";
import type { ReactElement } from "react";

type MainSectionProps = {
  heading: string;
  icon: ReactElement;
  genericData: genericAppData[];
  isDuration?: boolean;
  isLoading?: boolean;
};

function MainSection({
  heading,
  genericData,
  icon,
  isDuration,
  isLoading = false,
}: MainSectionProps) {
  return (
    <>
      <HeaderChip title={heading} logo={icon} />
      <Stack
        direction="row"
        spacing={0}
        justifyContent="center"
        flexWrap="wrap"
        sx={{ maxWidth: "fit-content", margin: "0 auto" }}
      >
        {genericData.map((data: genericAppData, index: number) => (
          <MainCard
            data={data}
            key={index}
            isDuration={isDuration}
            isLoading={isLoading}
          />
        ))}
      </Stack>
    </>
  );
}

export default MainSection;
