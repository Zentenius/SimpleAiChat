"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChat } from "ai/react";
import Markdown from "react-markdown";
import Chat from "@/components/Chat"


export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start md:p-24 p-5">
            {/**<div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>AI Chat Interface</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            {messages.map((m, index) => (
              <div key={index} className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}>
                <span
                  className={`inline-block p-2 rounded-lg ${m.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                >
                  {m.content}
                </span>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
     */}
     
      <Chat />
      <p className="my-4 text-neutral-300">
        <span className="opacity-50">Built by</span> A.B.C
      </p>
    </main>
  )
}

