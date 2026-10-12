import aiPractitioner from "../assets/img-cert/aws-ai-practitioner.png";
import solutionsArchitect from "../assets/img-cert/aws-solutions-architect-associate.png";
import pegnl from "../assets/img-cert/pegnl.svg";
import cloudPractitioner from "../assets/img-cert/aws-cloud-practitioner.png";
import tspp from "../assets/img-cert/tspp.png";
import cad from "../assets/img-cert/cad.png";

export const images = [
  aiPractitioner,
  solutionsArchitect,
  pegnl,
  cloudPractitioner,
  tspp,
  cad,
];

export type CertFilterType = "AWS" | "Professional" | "Other";

export const CertTypeFilters: CertFilterType[] = [
  "AWS",
  "Professional",
  "Other",
];

export type CertDataType = {
  certName: string;
  image: string;
  type: CertFilterType;
  description: string;
  smallChipLabel?: string[];
  smallChipLinks?: string[];
};

export const certData: CertDataType[] = [
  {
    certName: "AWS Certified AI Practitioner",
    image: aiPractitioner,
    type: "AWS",
    description: "Issued 11 October 2026",
    smallChipLabel: ["Show Credential"],
    smallChipLinks: [
      "https://www.credly.com/badges/1918ec71-ae4d-4736-a594-ee64941c6a3a/linked_in_profile",
    ],
  },
  {
    certName: "AWS Certified Solutions Architect - Associate",
    image: solutionsArchitect,
    type: "AWS",
    description: "Issued 5 October 2026",
    smallChipLabel: ["Show Credential"],
    smallChipLinks: [
      "https://www.credly.com/badges/fd29840d-ca16-461a-ae57-2a508da388d8/linked_in_profile",
    ],
  },
  {
    certName: "PEGNL Engineer In Training",
    image: pegnl,
    type: "Professional",
    description: "Issued 8 September 2026",
    smallChipLabel: ["Show Credential"],
    smallChipLinks: ["https://akashcraft.ca/EIT-Certificate.pdf"],
  },
  {
    certName: "AWS Certified Cloud Practitioner",
    image: cloudPractitioner,
    type: "AWS",
    description: "Issued 22 August 2026",
    smallChipLabel: ["Show Credential"],
    smallChipLinks: [
      "https://www.credly.com/badges/7cf4064b-310b-44b1-a56f-ef592ed1e56a/linked_in_profile",
    ],
  },
  {
    certName: "Tech Stewardship Practice Program",
    image: tspp,
    type: "Other",
    description: "Issued 15 December 2022",
    smallChipLabel: ["Show Credential"],
    smallChipLinks: ["https://verified.sertifier.com/en/verify/40670392106478"],
  },
  {
    certName: "Onshape Fundamentals",
    image: cad,
    type: "Other",
    description: "Issued 30 November 2021",
  },
];
