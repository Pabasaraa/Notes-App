import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LucideTrash, Menu, PlusCircle, X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

import Logo from '../../assets/Logo';
import PopupForm from '../popupForm';
import { sortNotesByCreatedAt } from '../../utils/noteUtils';

type Props = {
  defaultOpen?: boolean;
};

const MenuOptions = ({ defaultOpen }: Props) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [notes, setNotes] = useState([
    { _id: '', title: '', content: '', createdAt: '' },
  ]);
  const [isDescending, setIsDescending] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notes');
      setNotes(response.data);
      console.log('response', response);
      setIsFetching(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSaveNote = async (title: string, content: string) => {
    try {
      const res = await axios.post('http://localhost:5000/notes', {
        title: title,
        content: content,
      });
      if (res.status === 200) {
        toast.success('Note saved successfully');
      }
      fetchNotes();
      handleClosePopup();
    } catch (error) {
      console.error(error);
      toast.error('Failed to save note');
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const res = await axios.delete(`http://localhost:5000/notes/${id}`);
      if (res.status === 200) {
        toast.success('Note deleted successfully');
      }
      fetchNotes();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete note');
    }
  };

  const handleSortToggle = () => {
    const sorted = sortNotesByCreatedAt(notes, isDescending);
    setNotes(sorted);
    setIsDescending(!isDescending);
  };

  return (
    <main className="relative">
      <div
        className="absolute left-4 top-4 z-[100] lg:!hidden cursor-pointer"
        onClick={handleOpen}
      >
        <Menu className="h-6 w-6 text-textPrimary hover:text-textPrimary-foreground" />
        <span className="sr-only">Open Sidebar</span>
      </div>
      {isOpen && (
        <nav
          data-state={isOpen ? 'open' : 'closed'}
          className={`bg-background backdrop-blur-xl fixed top-0 border-r-[1px] border-divider px-6 pb-6 pt-4 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-y-0 left-0 h-full data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left ${
            defaultOpen
              ? 'hidden lg:inline-block z-0 w-[300px]'
              : 'inline-block lg:hidden z-[100] w-full'
          }`}
        >
          {!defaultOpen && (
            <div
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none cursor-pointer"
              onClick={handleClose}
            >
              <X className="h-6 w-6 text-textPrimary hover:text-textPrimary-foreground" />
              <span className="sr-only">Close</span>
            </div>
          )}
          <div className="flex flex-col justify-between h-full overflow-y-auto">
            <div className="flex flex-col">
              <div className="flex flex-col items-center gap-2">
                <div className="inline-block">
                  <Logo height={80} width={150} />
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex flex-row justify-between items-center">
                  <p className="text-textPrimary-foreground font-inter text-sm">
                    YOUR NOTES
                  </p>
                  <PlusCircle
                    className="h-6 w-6 text-textPrimary-foreground hover:text-textPrimary-disabled cursor-pointer"
                    onClick={handleOpenPopup}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 border-gray-300 rounded"
                      checked={!isDescending}
                      onChange={handleSortToggle}
                    />
                    <label className="text-textPrimary text-sm">
                      Sort by Created At
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  {!isFetching && notes ? (
                    notes.map((note, index) => (
                      <div
                        key={index}
                        className="group relative text-textPrimary w-full flex cursor-pointer select-none items-center dark:data-[selected='false']:hover:bg-gray-800 data-[selected='false']:hover:bg-gray-200 data-[selected='true']:hover:bg-callToAction/90 hover:text-textPrimary py-1.5 font-inter text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-callToAction data-[selected=true]:text-white data-[selected=true]:font-semibold data-[disabled=true]:opacity-50 rounded-lg"
                      >
                        <div className="flex items-center gap-2 hover:bg-transparent rounded-md transition w-full justify-between">
                          <p onClick={() => navigate(`/notes/${note._id}`)}>
                            {note.title}
                          </p>
                          <LucideTrash
                            className="h-4 w-4 min-h-4 min-w-4 text-textPrimary hidden group-hover:block hover:text-red-500"
                            onClick={() => handleDeleteNote(note._id)}
                          />
                        </div>
                      </div>
                    ))
                  ) : isFetching ? (
                    <div className="animate-pulse flex flex-col items-center gap-4">
                      <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
                      <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
                      <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
                    </div>
                  ) : (
                    <div className="flex h-screen">
                      <div className="flex-1 flex flex-col justify-center items-center">
                        <div className="text-center">
                          <p className="text-gray-500 text-lg mb-4">
                            No notes found. Click the plus icon to create a new
                            note.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}

      {isPopupOpen && (
        <PopupForm
          title="New Note"
          handleSubmit={handleSaveNote}
          closePopup={handleClosePopup}
        />
      )}
    </main>
  );
};

export default MenuOptions;
