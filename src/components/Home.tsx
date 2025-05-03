import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteEditor from "../components/NoteEditor";
import ActionBar from "../components/ActionBar";
import { Card, CardContent } from "../components/ui/card";

const Home = () => {
  const [note, setNote] = useState<string>("");
  const [noteId, setNoteId] = useState<string | null>(null);
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
    localStorage.setItem("note_draft", content);
    localStorage.setItem(`note_${noteId}`, content);
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
  <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
    <div className="w-full max-w-2xl rounded-xl shadow-xl border bg-white">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <button
          onClick={handleNewNote}
          className="flex items-center text-sm px-3 py-1.5 border rounded hover:bg-gray-100"
        >
          <span className="text-base font-medium">＋ New Note</span>
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(getNoteUrl())}
          className="flex items-center text-sm text-gray-700 hover:text-black"
        >
          📋 Copy URL
        </button>
      </div>
      <div className="px-4 py-3">
        <NoteEditor
          initialContent={note}
          onContentChange={handleNoteChange}
        />
      </div>
    </div>
  </div>
);
};

export default Home;
