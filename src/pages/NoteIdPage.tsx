import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoteEditor from "../components/NoteEditor";
import ActionBar from "../components/ActionBar";
import { createClient } from "@supabase/supabase-js";

// ✅ Replace with your actual Supabase credentials
import { supabase } from "../lib/supabaseClient"; // instead of calling createClient here
const NoteIdPage = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const [note, setNote] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load the note from Supabase
  useEffect(() => {
    const fetchNote = async () => {
      if (!noteId) return;

      try {
        const { data, error } = await supabase
          .from("notes")
          .select("content")
          .eq("id", noteId)
          .single();

        if (error) throw error;

        setNote(data.content || "");
      } catch (err) {
        console.error("Failed to fetch note:", err);
        setError("Note not found or failed to load.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  // Save the updated content to Supabase
  const handleSave = async (content: string) => {
    if (!noteId) return;

    const { error } = await supabase
      .from("notes")
      .upsert({ id: noteId, content });

    if (error) {
      console.error("Error saving note:", error);
      throw error;
    }
  };

  // Track local changes (optional for UI)
  const handleContentChange = (content: string) => {
    setNote(content);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-pulse text-muted-foreground">
          Loading note...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="text-red-500 font-medium mb-4">{error}</div>
        <ActionBar />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl w-full mx-auto flex flex-col flex-grow">
        <ActionBar noteUrl={`${window.location.origin}/n/${noteId}`} />
        <div className="mt-4 flex-grow">
          <NoteEditor
            initialContent={note}
            noteId={noteId}
            onSave={handleSave}
            onContentChange={handleContentChange}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteIdPage;