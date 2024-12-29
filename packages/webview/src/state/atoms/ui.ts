/**
 * @Copyright Copyright (c) 2024 Oh My Commit
 * @CreatedAt 2024-12-29
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { atomWithStorage } from "@/lib/storage"

export type UiMode = "silent" | "notification" | "window" | "panel"
export const uiModeAtom = atomWithStorage<UiMode>({
  key: "oh-my-commit.ui.mode",
  defaultValue: "panel",
  storageType: "both",
})
