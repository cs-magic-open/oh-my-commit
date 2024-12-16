import { Result } from "neverthrow";
import { GitChangeSummary } from "./git";

export type CommitData = {
  title: string;
  body?: string;
};
export type GenerateCommitResult = Result<CommitData, string>;

export type CommitEvent = {
  type: "commit" | "regenerate" | "diff-summary";
  message: CommitData;
  diffSummary: GitChangeSummary;
};
