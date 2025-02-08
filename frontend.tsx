"use client"

import React, { useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function NewMotherChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [isTyping, setIsTyping] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsTyping(true)
    handleSubmit(e).finally(() => setIsTyping(false))
  }

  return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-purple-100">
        <Card className="w-full max-w-2xl shadow-xl">
          <CardHeader className="bg-white bg-opacity-80">
            <CardTitle className="text-2xl text-center text-purple-700">New Mother's AI Assistant</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ScrollArea className="h-[60vh] pr-4">
              {messages.map((m) => (
                  <div key={m.id} className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}>
                <span
                    className={`inline-block p-2 rounded-lg ${
                        m.role === "user" ? "bg-purple-200 text-purple-900" : "bg-pink-200 text-pink-900"
                    }`}
                >
                  {m.content}
                </span>
                  </div>
              ))}
              {isTyping && (
                  <div className="text-left">
                    <span className="inline-block p-2 rounded-lg bg-gray-200 text-gray-500">AI is typing...</span>
                  </div>
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter className="bg-white bg-opacity-80">
            <form onSubmit={onSubmit} className="flex w-full space-x-2">
              <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask anything about motherhood..."
                  className="flex-grow"
              />
              <Button type="submit" disabled={isTyping} className="bg-purple-600 hover:bg-purple-700">
                Send
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
  );
}