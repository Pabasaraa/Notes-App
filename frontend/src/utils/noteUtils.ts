export const sortNotesByCreatedAt = (
  notes: { _id: string; title: string; content: string; createdAt: string }[],
  isDescending: boolean
) => {
  return notes.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return isDescending
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });
};
