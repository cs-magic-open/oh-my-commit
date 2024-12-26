/**
 * @Copyright Copyright (c) 2024 Oh My Commit
 * @Author markshawn2020
 * @CreatedAt 2024-12-27
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect } from "react"

import type { ServerMessageEvent } from "@shared/common"

import { vscodeClientLogger } from "@/lib/vscode-client-logger"

type MessageHandler = (message: ServerMessageEvent) => void

export const useMessage = (handler: MessageHandler) => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data as ServerMessageEvent

      if (!message || typeof message !== "object" || !("type" in message)) {
        vscodeClientLogger.info("Unknown event:", message)
        return
      }

      handler(message)
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [handler])
}