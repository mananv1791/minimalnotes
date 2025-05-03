import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteEditor from "../components/NoteEditor";
import ActionBar from "../components/ActionBar";
import { Card, CardContent } from "../components/ui/card";

const Home = () => {
  const [note, setNote] = useState<string>("");
  const [noteId, setNoteId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const navigate = useNavigate();

  const generateNoteId = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  useEffect(() => {
    const id = generateNoteId();
    setNoteId(id);
    const savedDraft = localStorage.getItem("note_draft");
    if (savedDraft) {
      setNote(savedDraft);
    }
  }, []);

  const saveNote = (content: string) => {
    if (!noteId) return;
    setIsSaving(true);
    setIsSaved(false);
    localStorage.setItem("note_draft", content);
    localStorage.setItem(`note_${noteId}`, content);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }, 800);
  };

  const handleNoteChange = (content: string) => {
    setNote(content);
    saveNote(content);
  };

  const handleNewNote = () => {
    const newNoteId = generateNoteId();
    setNoteId(newNoteId);
    setNote("");
    localStorage.removeItem("note_draft");
    navigate("/");
  };

  const getNoteUrl = () => {
    if (!noteId) return "";
    return `${window.location.origin}/n/${noteId}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardContent className="p-0">
          <ActionBar onNewNote={handleNewNote} noteUrl={getNoteUrl()} />
          <NoteEditor
            initialContent={note}
            noteId={noteId ?? ""}
            onContentChange={handleNoteChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;