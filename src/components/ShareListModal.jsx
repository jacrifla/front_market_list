import React from 'react';

export default function ShareListModal({ show, onClose, token }) {
  if (!show) return null;

  const shareUrl = `${token}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `${shareUrl}`
  )}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copiado para a área de transferência!');
    } catch {
      alert('Erro ao copiar o link.');
    }
  };

  return (
    <div className="modal-backdrop show" style={{ display: 'block' }}>
      <div className="modal d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Compartilhar Lista</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <p>Compartilhe esse token para dar acesso à sua lista:</p>
              <div className="input-group">
                <input type="text" className="form-control" value={shareUrl} readOnly />
                <button className="btn btn-outline-secondary" type="button" onClick={handleCopy}>
                  Copiar
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-success w-100">
                Enviar via WhatsApp
              </a>
              <button className="btn btn-secondary" onClick={onClose}>Fechar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
