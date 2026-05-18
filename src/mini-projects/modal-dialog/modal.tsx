import React from "react";
import { createPortal } from "react-dom";

type ModalContext = {
  open: boolean;
  isAnimatingIn: boolean;
  titleId: string;
  descId: string;
  setOpen: (open: boolean) => void;
  setShouldRender: React.Dispatch<React.SetStateAction<boolean>>;
};
const ModalContext = React.createContext<ModalContext | null>(null);

const useModal = () => {
  const ctxt = React.useContext(ModalContext);
  if (!ctxt)
    throw new Error(
      "Modal context not found. Wrap the component with ModalRoot",
    );
  return ctxt;
};

type ModalRootProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
};
const ModalRoot = ({ children, open, setOpen }: ModalRootProps) => {
  const [mounted, setMounted] = React.useState(false);
  const [shouldRender, setShouldRender] = React.useState(open);
  const [isAnimatingIn, setIsAnimatingIn] = React.useState(false);
  const frameRef = React.useRef<number | null>(null);
  const secondFrameRef = React.useRef<number | null>(null);
  const previousFocusElement = React.useRef<HTMLElement | null>(null);
  const titleId = React.useId();
  const descId = React.useId();

  // handle mounted state
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // handle shouldRemder
  React.useEffect(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (secondFrameRef.current) cancelAnimationFrame(secondFrameRef.current);
    if (open) {
      setShouldRender(true);
      frameRef.current = requestAnimationFrame(() => {
        secondFrameRef.current = requestAnimationFrame(() => {
          setIsAnimatingIn(true);
        });
      });
    } else {
      setIsAnimatingIn(false);
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (secondFrameRef.current) cancelAnimationFrame(secondFrameRef.current);
    };
  }, [open]);

  // handle keyboard event
  React.useEffect(() => {
    function handleKeyboard(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("keydown", handleKeyboard);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [open, setOpen]);

  // handle scroll lock
  React.useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // handle inert
  React.useEffect(() => {
    if (!open) return;
    const appRoot = document.getElementById("root");
    if (!appRoot) return;
    appRoot.setAttribute("inert", "");

    return () => {
      appRoot.removeAttribute("inert");
    };
  }, [open]);

  // handle focus previous element
  React.useLayoutEffect(() => {
    if (!open) return;
    previousFocusElement.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    return () => {
      previousFocusElement.current?.focus();
    };
  }, [open]);
  if (!shouldRender || !mounted) return null;

  return (
    <ModalContext.Provider
      value={{ open, setOpen, titleId, setShouldRender, isAnimatingIn, descId }}
    >
      {createPortal(children, document.body)}
    </ModalContext.Provider>
  );
};

type ModalContentProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;
const ModalContent = ({
  children,
  className = "",
  ...props
}: ModalContentProps) => {
  const { setOpen, titleId, open, setShouldRender, isAnimatingIn, descId } =
    useModal();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const visible = open && isAnimatingIn;
  React.useEffect(() => {
    contentRef.current?.focus();
  }, []);

  React.useEffect(() => {
    const dialog = contentRef.current;
    if (!dialog) return;
    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab" || !dialog) return;
      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelector),
      );
      if (focusableElements.length === 0) {
        e.preventDefault();
        dialog.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const activeElement = document.activeElement;

      if (e.shiftKey && activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
        return;
      }

      if (!e.shiftKey && activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
        return;
      }
    }

    dialog.addEventListener("keydown", handleKeyDown);

    return () => {
      dialog.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      {...props}
      onTransitionEnd={(e) => {
        if (e.target !== e.currentTarget) return;
        if (!open) {
          setShouldRender(false);
        }
      }}
      onClick={() => setOpen(false)}
      className={`fixed inset-0 bg-black/50 z-100 transition-opacity duration-200 ${className} ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div
        tabIndex={-1}
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClick={(e) => {
          e.stopPropagation();
          props.onClick?.(e);
        }}
        className={`z-100 p-4 bg-white w-[calc(100vw-2rem)] max-w-lg max-h-[calc(100vh-2rem)] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-md flex flex-col transition-all duration-200 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        {children}
      </div>
    </div>
  );
};

const ModalHeader = ({
  children,
  className = "",
  ...props
}: { children: React.ReactNode } & React.ComponentPropsWithRef<"header">) => {
  return (
    <header {...props} className={`shrink-0 ${className}`}>
      {children}
    </header>
  );
};

const ModalTitle = ({
  children,
  className = "",
  ...props
}: { children: React.ReactNode } & React.ComponentPropsWithoutRef<"p">) => {
  const { titleId } = useModal();
  return (
    <p {...props} id={titleId} className={`${className}`}>
      {children}
    </p>
  );
};

const ModalDescription = ({
  children,
  className = "",
  ...props
}: { children: React.ReactNode } & React.ComponentPropsWithoutRef<"div">) => {
  const { descId } = useModal();
  return (
    <div {...props} id={descId} className={`${className}`}>
      {children}
    </div>
  );
};

const ModalFooter = ({
  children,
  className = "",
  ...props
}: { children: React.ReactNode } & React.ComponentPropsWithRef<"footer">) => {
  return (
    <footer {...props} className={`shrink-0 ${className}`}>
      {children}
    </footer>
  );
};

const ModalBody = ({
  children,
  className = "",
  ...props
}: { children: React.ReactNode } & React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div {...props} className={`flex-1 overflow-y-auto ${className}`}>
      {children}
    </div>
  );
};

const ModalClose = ({
  children,
  className = "",
  onClick,
  ...props
}: {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"button">) => {
  const { setOpen } = useModal();
  return (
    <button
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) {
          setOpen(false);
        }
      }}
      className={`${className}`}
    >
      {children}
    </button>
  );
};

export const Modal = {
  Root: ModalRoot,
  Content: ModalContent,
  Body: ModalBody,
  Header: ModalHeader,
  Title: ModalTitle,
  Close: ModalClose,
  Description: ModalDescription,
  Footer: ModalFooter,
};
