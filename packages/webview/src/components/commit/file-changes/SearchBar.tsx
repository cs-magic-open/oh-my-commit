/**
 * @Copyright Copyright (c) 2024 Oh My Commit
 * @CreatedAt 2024-12-29
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from "react"

import { VSCodeTextField } from "@vscode/webview-ui-toolkit/react"

import { useAtom } from "jotai"

import { searchQueryAtom } from "@/state/atoms/search"

interface SearchBarProps {
  className?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)

  return (
    <div className="relative grow overflow-hidden flex items-center  border border-[var(--vscode-input-border)] rounded-sm">
      <i className="codicon codicon-search absolute left-2 translate-y-[2px] text-[12px] opacity-50 pointer-events-none z-10 " />
      <style>
        {`
            .search-input::part(control) {
              padding-left: 24px !important;
            }
          `}
      </style>

      <VSCodeTextField
        className="w-full search-input"
        placeholder="Filter"
        value={searchQuery}
        onInput={(e) => {
          const target = e.target as HTMLInputElement
          setSearchQuery(target.value)
        }}
      />
    </div>
  )
}
