import { Form, ListGroup } from 'react-bootstrap';

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
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        startEditing(suggestions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setHighlightedIndex(-1);
    }
  };

  return (
    <div ref={wrapperRef} className="position-relative mb-3">
      <Form.Group controlId="searchInput">
        <Form.Label>Pesquisar Produto</Form.Label>
        <Form.Control
          type="text"
          placeholder="Digite o nome ou código do produto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-controls="autocomplete-list"
          aria-expanded={suggestions.length > 0}
          aria-haspopup="listbox"
          autoComplete="off"
        />
      </Form.Group>

      {suggestions.length > 0 && (
        <ListGroup
          ref={suggestionsRef}
          id="autocomplete-list"
          role="listbox"
          className="position-absolute w-100 zindex-tooltip"
          style={{ maxHeight: '180px', overflowY: 'auto' }}
        >
          {suggestions.map((item, index) => (
            <ListGroup.Item
              key={item.itemId}
              action
              active={index === highlightedIndex}
              onClick={() => startEditing(item)}
              role="option"
              aria-selected={index === highlightedIndex}
            >
              {item.itemName} {item.barcode ? ` - ${item.barcode}` : ''}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
