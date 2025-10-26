import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { Stack } from "@mui/material";

type MacDialogProps = {
  heading: string;
  description: string;
  visible: boolean;
  imageSrc: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onClose: () => void;
  onCloseSecondary?: () => void;
};

function MacDialog({
  heading,
  description,
  visible,
  imageSrc,
  onClose,
  onCloseSecondary,
  primaryButtonText,
  secondaryButtonText,
}: MacDialogProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="macdialog"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            transformOrigin: "center center",
            zIndex: 5,
          }}
        >
          <StyledMacDialog>
            <LeftAlign>
              <img src={imageSrc} style={{ width: "5rem" }} />
              <p className="macos-header">{heading}</p>
              <p className="macos-description">{description}</p>
            </LeftAlign>
            <Stack
              direction="column"
              alignItems="center"
              gap={1.5}
              style={{ marginBottom: "1.5rem", width: "100%" }}
            >
              <div className="macos-ok macos-button" onClick={onClose}>
                {primaryButtonText ?? "OK"}
              </div>
              {secondaryButtonText && (
                <div
                  className="macos-secondary macos-button"
                  onClick={onCloseSecondary}
                >
                  {secondaryButtonText ?? "Cancel"}
                </div>
              )}
            </Stack>
          </StyledMacDialog>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const LeftAlign = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
`;

const StyledMacDialog = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  top: 50%;
  left: 50%;
  -webkit-backdrop-filter: blur(1px) saturate(1.1) url("#glassfilter");
  backdrop-filter: blur(1px) saturate(1.1) url("#glassfilter");
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  background-color: color-mix(
    in srgb,
    var(--mui-palette-background-macos) 95%,
    transparent
  );
  color: var(--mui-palette-text-secondary);
  transform: translate(-50%, -50%);
  font-family: "San Francisco";
  transform-origin: center;
  text-align: center;
  width: 17rem;
  z-index: 5;

  img {
    width: 5rem;
    margin: 2rem;
    margin-left: 0;
  }

  p.macos-header {
    margin: 0;
    font-weight: 800;
    font-size: 0.9rem;
    font-family: "San Francisco Bold";
  }

  p.macos-description {
    margin: 1rem 2rem;
    font-size: 0.7rem;
    margin-left: 0;
    margin-right: 0;
  }

  div.macos-button {
    width: 85%;
    padding: 0.25rem;
    font-size: 0.9rem;
    font-weight: 800;
    border-radius: 3rem;
  }

  div.macos-ok {
    background-color: #f38008;
    color: white;
  }

  div.macos-secondary {
    background-color: #877c72;
    color: white;
  }

  div.macos-ok:active {
    background-color: #c96c08;
  }

  div.macos-secondary:active {
    background-color: #6e665e;
  }

  div.macos-button:hover {
    cursor: pointer;
  }
`;

export default MacDialog;
