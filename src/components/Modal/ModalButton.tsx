type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function ModalButton({ children, onClick }: Props) {
  return (
    <button onClick={onClick} className="px-4 py-2 rounded bg-gray-200">
      {children}
    </button>
  );
}
