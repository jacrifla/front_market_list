export default function ItemCard({ item, index, selectedItem, onSelect }) {
  const isSelected = selectedItem?.itemListId === item.itemListId;

  const truncate = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div
      className={`card p-2 mb-1 ${isSelected ? 'border-primary' : ''}`}
      style={{ cursor: 'pointer' }}
      onClick={() => onSelect(item)}
    >
      <div className="d-flex justify-content-between align-items-center">
        <span className="fs-6">
          {index + 1}. {truncate(item.itemName, 30)}
        </span>
      </div>
    </div>
  );
}
