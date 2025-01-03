/**
 * @Copyright Copyright (c) 2024 Oh My Commit
 * @CreatedAt 2024-12-29
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from "react"

import { FoldersIcon, ListIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { ViewMode } from "@/state/atoms/commit.changed-files"

interface ViewToggleProps {
  view: ViewMode
  onChange: (view: ViewMode) => void
  className?: string
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, onChange, className }) => {
  return (
    <div
      className={cn(
        `flex gap-1 p-1 rounded-md`,
        // bg-gray-100 dark:bg-gray-800
        className
      )}
    >
      <button
        className={cn(
          "p-1 rounded transition-colors",
          view === "flat"
            ? "bg-white dark:bg-gray-700 shadow-sm ring-1 ring-gray-200 dark:ring-gray-600"
            : "hover:bg-gray-200 dark:hover:bg-gray-600"
        )}
        title="Flat View"
        onClick={() => onChange("flat")}
      >
        <ListIcon className="h-4 w-4" />
      </button>
      <button
        className={cn(
          "p-1 rounded transition-colors",
          view === "tree"
            ? "bg-white dark:bg-gray-700 shadow-sm ring-1 ring-gray-200 dark:ring-gray-600"
            : "hover:bg-gray-200 dark:hover:bg-gray-600"
        )}
        title="Tree View"
        onClick={() => onChange("tree")}
      >
        <FoldersIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
