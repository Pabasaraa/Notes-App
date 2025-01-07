import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import PopupForm from '../component/popupForm';
import { getRelativeTime } from '../utils/dateUtils';

const Note = () => {
  const [note, setNote] = useState({
    _id: '',
    title: '',
    content: '',
    createdAt: '',
  });
  const [isFetching, setIsFetching] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchNote();
  }, [id]);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleUpdateNote = async (title: string, content: string) => {
    try {
      const res = await axios.put(`http://localhost:5000/notes/${note._id}`, {
        title: title,
        content: content,
      });
      if (res.status === 200) {
        toast.success('Note updated successfully');
      }
      fetchNote();
      handleClosePopup();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update note');
    }
  };

  const fetchNote = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/notes/${id}`);
      setNote(response.data);
      setIsFetching(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch note');
    }
  };

  return (
    <>
      <div className="px-12 md:px-20 lg:px-36 py-4 h-screen overflow-y-auto">
        {!isFetching && note ? (
          <div className="flex h-screen">
            <div className="flex-1 flex flex-col">
              <div className="text-left space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-textLight">
                      {note.title}
                    </h1>
                    <Pencil
                      className="min-h-6 min-w-6 text-gray-500 hover:text-textPrimary-foreground cursor-pointer"
                      onClick={handleOpenPopup}
                    />
                  </div>
                  <p className="text-textPrimary-disabled text-sm">
                    Created {getRelativeTime(note.createdAt)}
                  </p>
                </div>

                <pre className="whitespace-pre-wrap break-words font-sans text-textGray">
                  {note.content}
                </pre>
              </div>
            </div>
          </div>
        ) : isFetching ? (
          <div className="flex h-screen">
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="text-center">
                <div className="animate-pulse flex flex-col items-center gap-4">
                  <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
                  <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
                  <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-screen">
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="text-center">
                <p className="text-textPrimary-disabled text-lg mb-4">
                  Note not found. Click a note from the left sidebar or create a
                  new one.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Note Popup */}
      {isPopupOpen && (
        <PopupForm
          title="Update Note"
          id={note._id}
          handleSubmit={handleUpdateNote}
          closePopup={handleClosePopup}
        />
      )}
    </>
  );
};

export default Note;
