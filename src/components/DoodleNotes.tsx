import React, { useState, useRef, useEffect } from 'react';
import { PenTool, Download, Trash2, Save, Plus, FileText, Palette } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
}

const DoodleNotes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'doodle' | 'notes'>('doodle');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#3B82F6');
  const [brushSize, setBrushSize] = useState(5);
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('mindease-notes');
    if (savedNotes) {
      const parsed = JSON.parse(savedNotes);
      setNotes(parsed.map((note: any) => ({
        ...note,
        timestamp: new Date(note.timestamp)
      })));
    }
  }, []);

  // Save notes to localStorage
  const saveNotesToStorage = (notesToSave: Note[]) => {
    localStorage.setItem('mindease-notes', JSON.stringify(notesToSave));
  };

  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16',
    '#000000', '#6B7280', '#F97316', '#14B8A6'
  ];

  const brushSizes = [2, 5, 10, 15, 20];

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = 'source-over';
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const downloadDoodle = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `mindease-doodle-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const saveNote = () => {
    if (!noteTitle.trim() && !noteContent.trim()) return;

    const note: Note = {
      id: currentNote?.id || Date.now().toString(),
      title: noteTitle.trim() || 'Untitled Note',
      content: noteContent.trim(),
      timestamp: new Date()
    };

    let updatedNotes;
    if (currentNote) {
      updatedNotes = notes.map(n => n.id === note.id ? note : n);
    } else {
      updatedNotes = [note, ...notes];
    }

    setNotes(updatedNotes);
    saveNotesToStorage(updatedNotes);
    setCurrentNote(null);
    setNoteTitle('');
    setNoteContent('');
  };

  const editNote = (note: Note) => {
    setCurrentNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
  };

  const deleteNote = (noteId: string) => {
    const updatedNotes = notes.filter(n => n.id !== noteId);
    setNotes(updatedNotes);
    saveNotesToStorage(updatedNotes);
    
    if (currentNote?.id === noteId) {
      setCurrentNote(null);
      setNoteTitle('');
      setNoteContent('');
    }
  };

  const createNewNote = () => {
    setCurrentNote(null);
    setNoteTitle('');
    setNoteContent('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <PenTool className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Doodle & Notes</h1>
          <p className="text-xl text-gray-600">Express yourself through art and words</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('doodle')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                activeTab === 'doodle'
                  ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Palette size={20} />
              <span className="font-medium">Doodle Canvas</span>
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                activeTab === 'notes'
                  ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FileText size={20} />
              <span className="font-medium">Notes</span>
            </button>
          </div>
        </div>

        {activeTab === 'doodle' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Drawing Controls */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Color:</span>
                  <div className="flex space-x-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setBrushColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                          brushColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Size:</span>
                  <div className="flex space-x-2">
                    {brushSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setBrushSize(size)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 ${
                          brushSize === size
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={clearCanvas}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Clear</span>
                </button>
                <button
                  onClick={downloadDoodle}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors"
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Canvas */}
            <div className="bg-gray-50 rounded-xl p-4">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="border border-gray-200 rounded-lg bg-white cursor-crosshair mx-auto block"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
              />
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Note Editor */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {currentNote ? 'Edit Note' : 'New Note'}
                  </h2>
                  <button
                    onClick={createNewNote}
                    className="flex items-center space-x-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-xl hover:bg-orange-200 transition-colors"
                  >
                    <Plus size={16} />
                    <span>New</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    placeholder="Note title..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Write your thoughts, feelings, or reflections here..."
                    rows={12}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    onClick={saveNote}
                    disabled={!noteTitle.trim() && !noteContent.trim()}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl hover:from-orange-600 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={20} />
                    <span>{currentNote ? 'Update Note' : 'Save Note'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Notes List */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Your Notes</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {notes.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No notes yet. Create your first note!</p>
                ) : (
                  notes.map(note => (
                    <div
                      key={note.id}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                        currentNote?.id === note.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => editNote(note)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 truncate">{note.title}</h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {note.content}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {note.timestamp.toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNote(note.id);
                          }}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoodleNotes;