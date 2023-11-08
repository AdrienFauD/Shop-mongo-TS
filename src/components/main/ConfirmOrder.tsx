import { Button, ButtonGroup, Modal } from 'react-bootstrap'

interface ConfirmOrderProps {
    show: boolean,
    handleClose : () => void
}

export default function ConfirmOrder({ show, handleClose }: ConfirmOrderProps) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                Are you sure you want to purchase this item ?
            </Modal.Header>
            <ButtonGroup size='lg' className='mb-3'>
                <Button variant='success' onClick={() => { }}>
                    Yes
                </Button>
                <Button variant='danger' onClick={() => { }}>
                    No
                </Button >
            </ButtonGroup>
        </Modal>
    )
}
