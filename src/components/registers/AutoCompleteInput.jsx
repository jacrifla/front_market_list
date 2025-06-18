import { Form, ListGroup } from 'react-bootstrap';

export default function AutocompleteInput({
  searchTerm,
  setSearchTerm,
  suggestions,
  highlightedIndex,
  setHighlightedIndex,
  startEditing,
  wrapperRef,
  suggestionsRef,
}) {
  const handleKeyDown = (e) => {
    if (!suggestions.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        startEditing(suggestions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setHighlightedIndex(-1);
      setSearchTerm('');
    }
  };

  return (
    <div ref={wrapperRef} className="autocomplete-wrapper">
      <Form.Control
        type="text"
        className="mb-3"
        placeholder="Buscar item por nome ou código"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        aria-autocomplete="list"
        aria-controls="item-suggestions"
        aria-activedescendant={
          highlightedIndex >= 0
            ? `suggestion-${suggestions[highlightedIndex].itemId}`
            : undefined
        }
      />

      {suggestions.length > 0 && (
        <ListGroup
          ref={suggestionsRef}
          className="autocomplete-suggestions"
          id="item-suggestions"
        >
          {suggestions.map((item, idx) => (
            <ListGroup.Item
              key={item.itemId}
              id={`suggestion-${item.itemId}`}
              action
              active={idx === highlightedIndex}
              onClick={() => startEditing(item)}
              onMouseEnter={() => setHighlightedIndex(idx)}
              className="d-flex justify-content-between align-items-center"
            >
              <span>{item.itemName}</span>
              {item.barcode && (
                <small className="text-muted">{item.barcode}</small>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
