import { Button } from "@/components/ui/button";
import React from "react";
import { Modal } from "./modal";

const ModalDialogPlayground = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <main className="h-800">
      <Button onClick={() => setOpen(!open)}>Open modal</Button>
      <input placeholder="Name" />
      <Modal.Root open={open} setOpen={setOpen}>
        <Modal.Content>
          <Modal.Header className="flex">
            <Modal.Title>Delete Project</Modal.Title>
            <Modal.Close className="ml-auto">X</Modal.Close>
          </Modal.Header>
          <Modal.Body>
            <Modal.Description className="text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis
              amet nulla commodi reprehenderit veniam accusantium dolor rerum
              facere in reiciendis.
            </Modal.Description>
          </Modal.Body>

          <Modal.Footer className="flex">
            <Modal.Close className="ml-auto">Cancel</Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </main>
  );
};

// const Modal = ({
//   children,
//   open,
//   onClose,
// }: {
//   children: ReactNode;
//   open: boolean;
//   onClose: () => void;
// }) => {
//   const [mounted, setMounted] = React.useState(false);
//   React.useEffect(() => {
//     function handleKeyboard(e: KeyboardEvent) {
//       console.log("Handle keyboard");
//       if (e.key === "Escape") {
//         onClose();
//       }
//     }

//     if (open) {
//       document.addEventListener("keydown", handleKeyboard);
//     }

//     return () => {
//       document.removeEventListener("keydown", handleKeyboard);
//     };
//   }, [open, onClose]);

//   React.useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!open || !mounted) return null;

//   return createPortal(
//     <div onClick={onClose} className="fixed inset-0 bg-black/50 z-100">
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="p-4 bg-white w-[calc(100vw-2rem)] max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-md"
//       >
//         <header>
//           <Button
//             onClick={() => onClose()}
//             variant={`ghost`}
//             className="flex ml-auto font-semibold"
//           >
//             X
//           </Button>
//         </header>
//         {children}
//       </div>
//     </div>,
//     document.body,
//   );
// };

export { ModalDialogPlayground };
