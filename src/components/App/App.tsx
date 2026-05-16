import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import css from "./App.module.css";

import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

import { fetchNotes } from "../../services/noteService";

function App() {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search,
      }),
      placeholderData: (prev) => prev,
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}

        <button className={css.button} onClick={() => setIsOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {data && data.notes.length > 0 && (
        <NoteList
          notes={data.notes}
        />
      )}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm
            onClose={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
