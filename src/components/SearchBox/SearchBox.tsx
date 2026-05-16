import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

function SearchBox({
  onSearch,
}: SearchBoxProps) {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    onSearch(event.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleChange}
    />
  );
}

export default SearchBox;