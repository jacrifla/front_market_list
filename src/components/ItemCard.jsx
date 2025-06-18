import { Card } from 'react-bootstrap';

export default function ItemCard({ item, index, selectedItem, onSelect }) {
  const isSelected = selectedItem?.itemListId === item.itemListId;
  const isBought = !!item.purchasedAt;

  const truncate = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <Card
      border={isSelected ? 'primary' : undefined}
      bg={isBought ? 'light' : undefined}
      text={isBought ? 'muted' : undefined}
      className="mb-1"
      style={{
        cursor: isBought ? 'not-allowed' : 'pointer',
        opacity: isBought ? 0.5 : 1,
      }}
      onClick={() => !isBought && onSelect?.(item)}
    >
      <Card.Body className="p-2 d-flex justify-content-between align-items-center">
        <Card.Text className="fs-6 mb-0">
          {index + 1}. {truncate(item.itemName, 30)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
