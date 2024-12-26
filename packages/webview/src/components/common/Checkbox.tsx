/**
 * @Copyright Copyright (c) 2024 Oh My Commit
 * @Author markshawn2020
 * @CreatedAt 2024-12-27
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from "react"

import { cn } from "../../lib/utils"

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  className,
}) => {
  return (
    <label className={cn("w-3 h-3 relative block", className)}>
      <input
        aria-checked={checked}
        checked={checked}
        className="absolute inset-0 cursor-pointer opacity-0 w-full h-full z-10"
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
        onClick={(e) => e.stopPropagation()}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 border rounded",
          "border-[var(--vscode-checkbox-border)]",
          checked &&
            "bg-[var(--vscode-checkbox-background)] border-[var(--vscode-checkbox-foreground)]"
        )}
      />
      {checked && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center text-[var(--vscode-checkbox-foreground)]"
        >
          <svg
            className="w-2 h-2"
            fill="none"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}
    </label>
  )
}
