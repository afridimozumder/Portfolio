// Prose content for the About + Focus sections.
// Kept here (not in components) so copy is editable without touching layout.
// Facts mirror .claude/SKILL.md — update there too if they change.

export const about = {
  title: "From building systems to governing them",
  paragraphs: [
    "My route into security wasn't a straight line — and that's the point. I trained as a software engineer at AIUB, then spent a year as a network engineer at an ISP, learning first-hand how real infrastructure stays online, secure, and accountable.",
    "Now, as an MSc Cybersecurity student at Aalborg University, I focus on governance, risk, and compliance: the work of helping organisations manage security, not just implement it. The technical foundation underneath — code, networks, and systems — is what lets me reason about risk concretely rather than in the abstract.",
  ],
};

export const focus = {
  intro:
    "I'm working toward a GRC career, grounded in hands-on security and threat-intelligence research — connecting technical reality to the frameworks organisations use to govern it.",
  frameworks: ["ISO/IEC 27001", "NIST CSF", "Risk management & controls"],
  thesis: {
    label: "Master's thesis",
    title: "Adversary Plan Generation with Knowledge Graphs and LLMs",
    blurb:
      "A LockBit-focused Cyber Threat Intelligence Knowledge Graph (CTI-KG) in Neo4j, used as structured ground truth for a GraphRAG + LLM pipeline that automatically generates Adversary Emulation Plans (AEPs).",
    tags: ["Threat intelligence", "Neo4j", "GraphRAG", "LLMs", "Adversary emulation"],
    note: "Aalborg University · in progress",
  },
};
