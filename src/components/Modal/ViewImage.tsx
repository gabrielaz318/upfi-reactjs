import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Box,

} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {


  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='4x1'>
      <ModalOverlay>
        <ModalContent bgColor="pGray.900" w='initial' h='initial'  >
          <ModalBody p='0'>
            <Box align='center'>

              <Image
                src={imgUrl}
                maxH='600px'
                maxW='900px'

              />
              <Box p={5} align='left'>
                <Link isExternal href={imgUrl}>Abrir original</Link>
              </Box>


            </Box>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )

}


