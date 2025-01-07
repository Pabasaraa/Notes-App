import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect } from 'react';
import axios from 'axios';

const noteSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string(),
});

type Props = {
  title: string;
  id?: string;
  handleSubmit: (title: string, content: string) => void;
  closePopup: () => void;
};

const PopupForm = ({ title, id, handleSubmit, closePopup }: Props) => {
  const form = useForm<z.infer<typeof noteSchema>>({
    mode: 'onChange',
    resolver: zodResolver(noteSchema),
  });

  const handleSave = () => {
    const { title, content } = form.getValues();
    handleSubmit(title, content);
  };

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/notes/${id}`).then((response) => {
        form.setValue('title', response.data.title);
        form.setValue('content', response.data.content);
      });
    }
  }, [id]);

  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-background rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 p-6">
          <h2 className="text-xl font-semibold text-textLight mb-4">{title}</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleSave)}
          >
            <div className="space-y-2">
              <input
                type="text"
                className={`w-full bg-background border border-textPrimary-disabled focus:border-divider text-textPrimary py-2 px-4 rounded-md  disabled:cursor-not-allowed disabled:opacity-70 ${
                  form.formState.errors.title
                    ? 'border-red-500'
                    : 'border-textGray'
                }`}
                placeholder="Title"
                {...form.register('title')}
              />
              {form.formState.errors.title && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.title?.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <textarea
                className={`w-full bg-background border border-textPrimary-disabled focus:border-divider text-textPrimary py-2 px-4 rounded-md  disabled:cursor-not-allowed disabled:opacity-70 ${
                  form.formState.errors.content
                    ? 'border-red-500'
                    : 'border-textGray'
                }`}
                rows={10}
                placeholder="Write your note here..."
                {...form.register('content')}
              ></textarea>
              {form.formState.errors.content && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.content?.message}
                </p>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none"
                onClick={closePopup}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PopupForm;
