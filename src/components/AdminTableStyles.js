// Estilos personalizados para que combine perfectamente con nuestro diseño "Starbucks Vibes"
export const customStyles = {
  header: {
    style: {
      minHeight: '56px',
    },
  },
  headRow: {
    style: {
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
      borderTopColor: 'var(--color-border-gray)',
      backgroundColor: 'var(--color-bg-light)',
    },
  },
  headCells: {
    style: {
      color: 'var(--color-brand-primary)',
      fontWeight: '600',
      fontSize: '14px',
    },
  },
  cells: {
    style: {
      fontSize: '14px',
      color: 'var(--color-text-dark)',
      padding: '12px 15px',
    },
  },
  rows: {
    style: {
      minHeight: '60px',
      '&:not(:lastOfType)': {
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: 'var(--color-border-gray)',
      },
    },
    highlightOnHoverStyle: {
      backgroundColor: '#f9fdfa',
      borderBottomColor: 'var(--color-border-gray)',
      outline: '1px solid var(--color-border-gray)',
      transitionDuration: '0.15s',
      transitionProperty: 'background-color',
    },
  },
  pagination: {
    style: {
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
      borderTopColor: 'var(--color-border-gray)',
      fontSize: '13px',
      color: 'var(--color-text-light)',
    },
    pageButtonsStyle: {
      fill: 'var(--color-brand-primary)',
      '&:disabled': {
        fill: 'var(--color-border-gray)',
      },
      '&:hover:not(:disabled)': {
        backgroundColor: '#e8f5e9',
      },
    },
  },
};
