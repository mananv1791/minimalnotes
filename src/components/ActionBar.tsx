import React, { useState } from "react";
import { Button } from "./ui/button";
import { Plus, Copy, Check } from "lucide-react";

interface ActionBarProps {
  onNewNote?: () => void;
  noteUrl?: string;
}

const ActionBar = ({
  onNewNote = () => {},
  noteUrl = window.location.href,
}: ActionBarProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(noteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-background border-b">
      <Button variant="outline" size="sm" onClick={onNewNote}>
        <Plus className="h-4 w-4 mr-2" />
        New Note
      </Button>

      <Button variant="ghost" size="sm" onClick={handleCopyUrl}>
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-2 text-green-500" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-2" />
            Copy URL
          </>
        )}
      </Button>
    </div>
  );
};

export default ActionBar;