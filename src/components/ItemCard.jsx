export default function ItemCard({ item, index, selectedItem, onSelect }) {
  console.log(item);
  
  const isSelected = selectedItem?.itemListId === item.itemListId;
  const isBought = item.purchasedAt;

  const truncate = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div
      className={`card p-2 mb-1 ${isSelected ? 'border-primary' : ''} ${
        isBought ? 'bg-light text-muted' : ''
      }`}
      style={{
        cursor: isBought ? 'not-allowed' : 'pointer',
        opacity: isBought ? 0.5 : 1,
      }}
      onClick={() => !isBought && onSelect(item)}
    >
      <div className="d-flex justify-content-between align-items-center">
        <span className="fs-6">
          {index + 1}. {truncate(item.itemName, 30)}
        </span>
      </div>
    </div>
  );
}
