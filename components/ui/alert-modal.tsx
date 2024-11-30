import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

type AlertModalProps = {
  open: boolean; // Add a prop to control the open state
  onOpenChange: (isOpen: boolean) => void; // Callback to change open state
  children?: ReactNode;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void; // Callback for confirm action
};

export function AlertModal({
  children,
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
}: AlertModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children && <div className="my-4">{children}</div>}
        {cancelText && confirmText && (
          <DialogFooter>
            <div className="flex space-x-4  items-center justify-end">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {cancelText}
              </Button>
              <Button variant="destructive" onClick={onConfirm}>
                {confirmText}
              </Button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
