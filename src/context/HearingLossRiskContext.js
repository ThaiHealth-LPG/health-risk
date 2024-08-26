import React, { createContext, useState, useContext } from "react";

const HearingLossRiskContext = createContext();

export const HearingLossRiskProvider = ({ children }) => {
  const [hearingLossRiskScore, setHearingLossRiskScore] = useState(null);
  const [hearingLossRiskLevel, setHearingLossRiskLevel] = useState(null);

  const calculateHearingLossRisk = (values) => {
    const { bodyHeight, earSymptoms, workingHours, noise } = values;

    const X1 = parseFloat(bodyHeight);
    const X2 = earSymptoms === "มีอาการ" ? 1 : 0;
    const X3 = parseFloat(workingHours);
    const X4 = parseFloat(noise) >= 85 ? 1 : 2;

    const riskScore =
      10.255 + 0.029 * X1 + 0.481 * X2 + 0.398 * X3 - 0.679 * X4;

    const roundedRiskScore = parseFloat(riskScore.toFixed(2));

    const riskLevel = riskScore / 5;

    const roundedRiskLevel = parseFloat(riskLevel.toFixed(1));

    setHearingLossRiskScore(roundedRiskScore);
    setHearingLossRiskLevel(roundedRiskLevel);

    console.log(`Calculated Hearing Loss Risk Score: ${roundedRiskScore}`);
    console.log(`Categorized Risk Level: ${roundedRiskLevel}`);
  };

  const resetHearingLossRisk = () => {
    setHearingLossRiskScore(null);
    setHearingLossRiskLevel(null);
  };

  return (
    <HearingLossRiskContext.Provider
      value={{
        hearingLossRiskScore,
        hearingLossRiskLevel,
        calculateHearingLossRisk,
        resetHearingLossRisk,
      }}
    >
      {children}
    </HearingLossRiskContext.Provider>
  );
};

export const useHearingLossRisk = () => useContext(HearingLossRiskContext);