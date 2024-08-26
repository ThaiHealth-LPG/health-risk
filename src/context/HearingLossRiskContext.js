import React, { createContext, useState, useContext } from "react";

const HearingLossRiskContext = createContext();

export const HearingLossRiskProvider = ({ children }) => {
  const [hearingLossRiskScore, setHearingLossRiskScore] = useState(null);
  const [hearingLossRiskLevel, setHearingLossRiskLevel] = useState(null);

  const getRiskLevel = (score) => {
    if (score >= 0 && score < 5) return 1;
    if (score >= 5 && score < 10) return 2;
    if (score >= 10 && score < 15) return 3;
    if (score >= 15 && score < 20) return 4;
    if (score >= 20 && score <= 25) return 5;
    return null;
  };

  const calculateHearingLossRisk = (values) => {
    const { bodyHeight, earSymptoms, workingHours, noise } = values;

    const X1 = parseFloat(bodyHeight);
    const X2 = earSymptoms === "มีอาการ" ? 1 : 0;
    const X3 = parseFloat(workingHours);
    const X4 = parseFloat(noise) >= 85 ? 1 : 2;

    const riskScore =
      10.255 + 0.029 * X1 + 0.481 * X2 + 0.398 * X3 - 0.679 * X4;

    const roundedRiskScore = parseFloat(riskScore.toFixed(2));

    const riskLevel = getRiskLevel(roundedRiskScore);

    setHearingLossRiskScore(roundedRiskScore);
    setHearingLossRiskLevel(riskLevel);

    console.log(`Calculated Hearing Loss Risk Score: ${riskScore}`);
    console.log(`Categorized Risk Level: ${riskLevel}`);
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
