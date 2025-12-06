
import { GoogleGenAI } from "@google/genai";
import { ContractData } from "../types";

// Fix for TypeScript error TS2580
declare var process: {
  env: {
    API_KEY: string;
  }
};

const getApiKey = () => process.env.API_KEY || '';

export const analyzeContractRisks = async (contract: ContractData): Promise<string> => {
  const apiKey = getApiKey();

  if (!apiKey) {
    return "API Key not configured. Unable to perform AI analysis.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    const prompt = `
      You are a legal and risk expert for an oil and gas company. 
      Analyze the following contract summary and provide a concise 3-bullet point executive risk assessment for the CEO.
      Focus on financial exposure, operational criticality, and potential gaps in mitigation.

      Contract Title: ${contract.contractorName}
      Scope: ${contract.scopeOfWork}
      Amount: $${contract.amount}
      Duration: ${contract.startDate} to ${contract.endDate}
      Liability Cap: ${contract.liabilityCapPercent}%
      
      Evaluation Context:
      - Technical: ${contract.technicalEvalSummary}
      - Commercial: ${contract.commercialEvalSummary}
      - Tender Process: ${contract.tenderProcessSummary}

      Risk Profile:
      - Deviations: ${contract.deviationsDescription || 'None'}
      - Subcontracting: ${contract.subcontractingPercent}%
      - Identified Risks: ${contract.riskDescription}
      - Mitigations: ${contract.mitigationMeasures}
      
      Output format:
      - [Risk Level: Low/Medium/High]: Summary sentence...
      - Key Concern 1...
      - Key Concern 2...
      - (Optional) Mitigation Gaps...
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating AI analysis. Please review manually.";
  }
};

export const refineContractText = async (text: string, context: 'scope' | 'background'): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey || !text || text.length < 5) return text;

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    const prompt = `
      You are a senior contract administrator in the Oil & Gas industry.
      Rewrite the following rough text to be professional, precise, and legally sound.
      
      Context: ${context === 'scope' ? 'Scope of Work Description' : 'Executive Business Case/Background'}
      Input Text: "${text}"
      
      Rules:
      - Improve clarity and professional tone.
      - Fix grammar.
      - Keep it concise but detailed enough for a legal contract.
      - Do not add made-up details, just refine what is there.
      - Return ONLY the rewritten text, no conversational filler.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || text;
  } catch (error) {
    console.error("Gemini Refine Error:", error);
    return text; // Fallback to original
  }
};
