export default function AutocompleteInput({
  searchTerm,
  setSearchTerm,
  suggestions,
  highlightedIndex,
  setHighlightedIndex,
  startEditing,
  wrapperRef,
  suggestionsRef
}) {
  const handleKeyDown = (e) => {
    if (!suggestions.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        startEditing(suggestions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setHighlightedIndex(-1);
      setSearchTerm('');
    }
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar item por nome ou código"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-autocomplete="list"
        aria-controls="item-suggestions"
        aria-activedescendant={
          highlightedIndex >= 0 ? `suggestion-${suggestions[highlightedIndex].itemId}` : undefined
        }
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <ul
          className="list-group"
          id="item-suggestions"
          ref={suggestionsRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto',
            border: '1px solid rgba(0,0,0,.15)',
            borderTop: 'none',
            backgroundColor: 'white',
            borderRadius: '0 0 .25rem .25rem',
          }}
        >
          {suggestions.map((item, idx) => (
            <li
              key={item.itemId}
              id={`suggestion-${item.itemId}`}
              className={`list-group-item list-group-item-action ${idx === highlightedIndex ? 'active' : ''}`}
              onClick={() => startEditing(item)}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHighlightedIndex(idx)}
            >
              {item.itemName} {item.barcode && `(${item.barcode})`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
