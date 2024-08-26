import React, { createContext, useState, useContext } from "react";

const HearingLossRiskContext = createContext();

export const HearingLossRiskProvider = ({ children }) => {
  const [hearingLossRisk, setHearingLossRisk] = useState(null);

  const calculateHearingLossRisk = (values) => {
    const { bodyHeight, earSymptoms, workingHours, noise } = values;

    const X1 = parseFloat(bodyHeight);
    const X2 = earSymptoms === "มีอาการ" ? 1 : 0;
    const X3 = parseFloat(workingHours);
    const X4 = parseFloat(noise) >= 85 ? 1 : 2;

    const risk = 10.255 + 0.029 * X1 + 0.481 * X2 + 0.398 * X3 - 0.679 * X4;
    setHearingLossRisk(risk);
    console.log(`Calculated Hearing Loss Risk: ${risk}`);
  };

  const resetHearingLossRisk = () => {
    setHearingLossRisk(null);
  };

  return (
    <HearingLossRiskContext.Provider
      value={{
        hearingLossRisk,
        calculateHearingLossRisk,
        resetHearingLossRisk,
      }}
    >
      {children}
    </HearingLossRiskContext.Provider>
  );
};

export const useHearingLossRisk = () => useContext(HearingLossRiskContext);
