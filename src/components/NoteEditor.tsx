
import React, { useState, useEffect, useRef } from "react";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { CheckCircle, Clock } from "lucide-react";


interface NoteEditorProps {
  initialContent?: string;
  noteId?: string;
  onSave?: (content: string) => Promise<void>;
  onContentChange?: (content: string) => void;
}

const NoteEditor = ({
  initialContent = "",
  noteId,
  onSave,
  onContentChange,
}: NoteEditorProps) => {
  const [content, setContent] = useState(initialContent);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (content !== initialContent) {
      onContentChange?.(content);

      if (noteId) {
        localStorage.setItem(`note-${noteId}`, content);
      } else {
        localStorage.setItem("unsaved-note", content);
      }

      setSaveStatus("saving");

      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

      saveTimeoutRef.current = setTimeout(async () => {
        if (onSave) {
          try {
            await onSave(content);
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus("idle"), 3000);
          } catch {
            setSaveStatus("idle");
          }
        } else {
          setSaveStatus("saved");
          setTimeout(() => setSaveStatus("idle"), 3000);
        }
      }, 1000);
    }

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [content]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-background rounded-md shadow-sm border border-border p-4">
      <Textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your note here..."
        className="w-full min-h-[200px] resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base leading-relaxed"
      />

      {saveStatus !== "idle" && (
        <div className="absolute bottom-4 right-4">
          <Badge variant="outline" className="flex items-center gap-1 text-xs">
            {saveStatus === "saving" ? (
              <>
                <Clock className="h-3 w-3" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Saved</span>
              </>
            )}
          </Badge>
        </div>
      )}
    </div>
  );
};

export default NoteEditor;
