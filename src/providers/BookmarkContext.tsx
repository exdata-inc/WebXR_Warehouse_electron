import React, { ReactElement } from 'react';
import JSZip from 'jszip';

import type { Bookmark, Bookmarks, BookmarkSetFunctions } from '@/types/Bookmark';

export type BookmarkContextType = {
  bookmarks: Bookmarks;
  bookmarkSetFunctions: BookmarkSetFunctions;
  setBookmarks: (bookmarks: string | Bookmarks | File) => void;
  addBookmark: (bookmark: Bookmark) => void;
  deleteBookmark: (index: number) => void;
  registerBookmarkSetFunctions: (functions: BookmarkSetFunctions) => void;
  applyBookmark: (bookmark: Bookmark | number) => void;
  saveData: () => Promise<void>;
  loadData: () => Promise<void>;
};

const BookmarkContext = React.createContext<BookmarkContextType>(
  {} as BookmarkContextType,
);

export const useBookmarkContext = (): BookmarkContextType => {
  return React.useContext<BookmarkContextType>(BookmarkContext);
};

type Props = {
  children: React.ReactNode;
};

export const BookmarkProvider = (props: Props): ReactElement => {

  const [bookmarks, setBookmarksData] = React.useState<Bookmarks>([]);
  const setBookmarks = (bookmarks: string | Bookmarks | File) => {
    if (typeof bookmarks === 'string') {
      // JSON 文字列か確認
      try {
        const parsedData = JSON.parse(bookmarks);
        setBookmarksData(JSON.parse(parsedData));
      } catch (error) {
        fetch(bookmarks)
          .then((response) => response.json())
          .then((data) => setBookmarksData(data))
          .catch((err) => console.error('Failed to fetch or parse data from URL:', err));
      }
    } else if (bookmarks instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBookmarksData(JSON.parse(e.target.result as string));
      };
      reader.readAsText(bookmarks);
    } else {
      setBookmarksData(bookmarks);
    }
  };
  const addBookmark = (bookmark: Bookmark) => {
    console.log("addBookmark", bookmark);
    setBookmarksData([...bookmarks, bookmark]);
  }
  const deleteBookmark = (index: number) => {
    console.log("deleteBookmark", index);
    const newBookmarks = [...bookmarks];
    newBookmarks.splice(index, 1);
    setBookmarksData(newBookmarks);
  }

  const [bookmarkSetFunctions, setBookmarkSetFunctions] = React.useState<BookmarkSetFunctions>({});
  const registerBookmarkSetFunctions = (functions: BookmarkSetFunctions) => {
    setBookmarkSetFunctions((prev) => ({ ...prev, ...functions }));
  };

  const applyBookmark = (bookmark: Bookmark | number) => {
    const target = typeof bookmark === 'number' ? bookmarks[bookmark] : bookmark;
    Object.keys(bookmarkSetFunctions).forEach((key) => {
      bookmarkSetFunctions[key] && bookmarkSetFunctions[key](target[key.replace('set_', '')]);
    });
  }
  const saveData = async () => {
    const zip = new JSZip();
    zip.file('bookmarks.json', JSON.stringify(bookmarks));
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    const url = URL.createObjectURL(zipBlob);
    a.href = url;
    const now = new Date();
    const formattedTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
    a.download = `webxr_warehouse_bookmarks_${formattedTime}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  }
  const loadData = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.zip';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const zip = new JSZip();
        const zipFile = await zip.loadAsync(file);
        const bookmarksData = await zipFile.file('bookmarks.json')?.async('text');
        if (bookmarksData) {
          setBookmarksData(JSON.parse(bookmarksData));
        }
      }
    }
    input.click();
  }

  const value: BookmarkContextType = {
    bookmarks,
    bookmarkSetFunctions,
    setBookmarks,
    addBookmark,
    deleteBookmark,
    registerBookmarkSetFunctions,
    applyBookmark,
    saveData,
    loadData,
  };
  return <BookmarkContext.Provider value={value}>{props.children}</BookmarkContext.Provider>;
};

export default BookmarkProvider;
