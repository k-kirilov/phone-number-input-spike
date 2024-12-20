import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TimeZoneBased } from "./TimeZoneBased";
import { ThirdPartyAPIBased } from "./ThirdPartyAPIBased";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div style={{ display: "flex", flexDirection: "row", gap: 32 }}>
      <TimeZoneBased />
      <ThirdPartyAPIBased />
    </div>
  </StrictMode>
);
