import styled from "@emotion/styled";
import macLogo from "../assets/img-macos/macSetup.png";
import { motion, AnimatePresence } from "framer-motion";

type MacDialogProps = {
  heading: string;
  description: string;
  visible: boolean;
  onClose: () => void;
};

function MacDialog({ heading, description, visible, onClose }: MacDialogProps) {
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
              <img src={macLogo} style={{ width: "5rem" }} />
              <p className="macos-header">{heading}</p>
              <p className="macos-description">{description}</p>
            </LeftAlign>
            <div className="macos-ok macos-button" onClick={onClose}>
              OK
            </div>
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
  width: 18rem;
  z-index: 5;

  img {
    width: 5rem;
    margin: 2rem;
    margin-left: 0;
  }

  p.macos-header {
    margin: 0;
    font-weight: 800;
    font-family: "San Francisco Bold";
  }

  p.macos-description {
    margin: 1rem 2rem;
    font-size: small;
    margin-left: 0;
    margin-right: 0;
  }

  div.macos-button {
    width: 80%;
    padding: 0.5rem;
    margin-bottom: 1.5rem;
    border-radius: 3rem;
  }

  div.macos-ok {
    background-color: #f38008;
    color: white;
  }

  div.macos-ok:active {
    background-color: #c96c08;
  }

  div.macos-button:hover {
    cursor: pointer;
  }
`;

export default MacDialog;
