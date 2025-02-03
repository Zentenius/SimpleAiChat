"use client";
import { useChat } from "ai/react";
import Markdown from "react-markdown";
import useChatScroll from "./hooks/useChatScroll";
import { ScrollArea } from "./ui/scroll-area";
import { AIInputWithSearch } from "./ui/ai-input-with-search";
import { Textarea } from "./ui/textarea";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const chatRef = useChatScroll(messages);
   const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 48,
    maxHeight: 164,
  });

  return (
    <div className="flex flex-col w-full max-w-lg rounded-lg bg-muted/50">
      <div
        className="min-h-[50vh] h-[50vh] max-h-[50vh]  p-4"
        ref={chatRef}
      >
        <div className="min-h-full flex-1 flex flex-col justify-end gap-2 w-full pb-4">
          
          <ScrollArea className="h-[48vh]">
          {messages.length ? (
            messages.map((m, i) => {
              return m.role === "user" ? (
                <div key={i} className="w-full flex flex-col gap-2 items-end">
                  <span className="px-2">You</span>
                  <div className="flex flex-col items-center px-4 py-2 max-w-[90%]  bg-muted/50 rounded-lg  whitespace-pre-wrap">
                    <ReactMarkdown
         children={m.content}
         remarkPlugins={[remarkGfm, remarkMath]}
         rehypePlugins={[rehypeKatex, rehypeHighlight]}
      />
                  </div>
                </div>
              ) : (
                <div key={i} className="w-full flex flex-col gap-2 items-start">
                  <span className="px-2">AI</span>
                  <div className="flex flex-col max-w-[90%] px-4 py-2  bg-background/20 rounded-lg whitespace-pre-wrap">
                  <ReactMarkdown
        children={m.content}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
      />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center flex-1 flex items-center justify-center text-neutral-500 text-4xl">
              <h1>Local AI Chat</h1>
            </div>
          )}
          </ScrollArea>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full px-3 py-2">
        <div 
         className="overflow-y-auto relative">

        
        <Textarea 
        value={input}
        onChange={handleInputChange}
        placeholder="Ask me anything..."
        className="w-full rounded-xl px-4 py-3 rea bg-black/5 dark:bg-white/5 border-none dark:text-white placeholder:text-black/70 dark:placeholder:text-white/70 resize-none focus-visible:ring-0 leading-[1.2"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}>
          
          
        </Textarea>
        <Button type="submit" className="absolute right-3 bottom-3 rounded-full p-2">
      <Send  className=" w-6 h-4" />
    </Button>

        </div>
      </form>
    </div>
  );
}