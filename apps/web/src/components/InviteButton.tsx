import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { CoValue, createInviteLink } from "jazz-tools";
import { useAccount } from "jazz-tools/react";
import { useState } from "react";
import { isElectron } from "../utils/deeplink";

interface InviteButtonProps {
  value: CoValue;
  valueHint: string;
}

export function InviteButton({ value, valueHint }: InviteButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [existingInviteLink, setExistingInviteLink] = useState<string>();
  const { me } = useAccount();

  const generateAndCopyLink = async () => {
    let inviteLink = existingInviteLink;

    if (value?.$jazz?.owner && value?.$jazz?.id && !inviteLink) {
      // Based on the Jazz todo example, createInviteLink should return a string
      inviteLink = createInviteLink(
        value,
        "writer",
        "localhost:4200/",
        valueHint,
      );
      setExistingInviteLink(inviteLink);
    }

    if (inviteLink) {
      // Convert to deep link format for Electron
      const finalLink = isElectron ? inviteLink.replace('http://localhost:4200/', 'codo-ing://') : inviteLink;
      await navigator.clipboard.writeText(finalLink);
      // Could add a toast notification here
    }
  };

  if (!value || !me?.canAdmin(value)) {
    return null;
  }

  return (
    <>
      <Button
        color="secondary"
        variant="bordered"
        onPress={onOpen}
        disabled={!value.$jazz?.owner || !value.$jazz?.id}
      >
        Invite
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Invite Others to {valueHint}</ModalHeader>
          <ModalBody>
            <p className="mb-4">
              Share this link to invite others as collaborators:
            </p>
            {existingInviteLink ? (
              <div className="bg-gray-100 p-3 rounded-lg break-all text-sm">
                {isElectron ? existingInviteLink.replace('http://localhost:4200/', 'codo-ing://') : existingInviteLink}
              </div>
            ) : (
              <p className="text-gray-500">
                Click "Generate & Copy Link" to create an invite link
              </p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onPress={generateAndCopyLink}
              disabled={!value.$jazz?.owner || !value.$jazz?.id}
            >
              Generate & Copy Link
            </Button>
            <Button variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
