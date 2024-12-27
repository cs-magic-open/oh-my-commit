/**
 * @Copyright Copyright (c) 2024 Oh My Commit
 * @Author markshawn2020
 * @CreatedAt 2024-12-27
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { atom } from "jotai"

export interface GitStatus {
  isGitRepository: boolean
  workspaceRoot: string | null
}

export const gitStatusAtom = atom<GitStatus | null>(null)
