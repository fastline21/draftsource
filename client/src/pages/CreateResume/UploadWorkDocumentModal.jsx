import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { setAlert } from './../../state/actions/alertAction';

const UploadWorkDocumentModal = ({
    isShow,
    isHide,
    titleModal,
    note,
    caption,
    uploadData,
    data,
    updateData,
    index,
    setAlert,
}) => {
    // State
    const [show, setShow] = useState(false);
    const [fileBg, setFileBg] = useState(null);
    const [upload, setUpload] = useState({
        file: '',
        skin: '1',
        title: '',
        description: '',
    });

    const { file, title, description, skin } = upload;

    // Close Modal
    const handleClose = useCallback(() => {
        isHide();
        setShow(false);
    }, [isHide]);

    // Show Modal
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (isShow) {
            handleShow();
        }

        if (data !== '') {
            setUpload(data);
            setFileBg(URL.createObjectURL(data.file));
        }
    }, [isShow, data]);

    const onUploadWorkDocument = (e) => {
        setUpload({ ...upload, file: e.target.files[0] });
        setFileBg(URL.createObjectURL(e.target.files[0]));
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setUpload({ ...upload, [name]: value });
    };

    const onUpload = (e) => {
        e.preventDefault();

        if (file === '' || skin === '' || title === '' || description === '') {
            return setAlert(
                '',
                'Please fill-in the required boxes to Proceed.'
            );
        }

        if (data) {
            updateData(index, upload);
        } else {
            uploadData(upload);
        }
        handleClose();
    };

    return (
        <Modal
            id="uploadWorkDocumentModal"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{titleModal}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-7">
                            <label
                                htmlFor="uploadWorkInput"
                                className="upload-work-label"
                            >
                                <p
                                    style={
                                        fileBg ? { visibility: 'hidden' } : null
                                    }
                                >
                                    {caption}{' '}
                                    <span>
                                        or click add
                                        <i className="fas fa-plus"></i>
                                    </span>
                                </p>
                                {fileBg ? (
                                    <iframe
                                        src={fileBg}
                                        title="Preview PDF"
                                    ></iframe>
                                ) : null}
                            </label>
                            <input
                                type="file"
                                id="uploadWorkInput"
                                className="form-control-file input"
                                accept="application/pdf"
                                onChange={onUploadWorkDocument}
                            />
                        </div>
                        <div className="col-lg-5">
                            <div className="form-group">
                                <p className="text">
                                    Choose your layer skin thumbnail
                                </p>
                                <div className="form-inline">
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            onChange={onChange}
                                            className="form-check-input upload-work-layer"
                                            name="skin"
                                            id="uploadWorkLayer1"
                                            value="1"
                                            checked={
                                                skin === '1' ? true : false
                                            }
                                        />
                                        <div className="upload-work-layer-outer">
                                            <label
                                                htmlFor="uploadWorkLayer1"
                                                id="uploadWorkLayerLabel1"
                                                className="upload-work-layer-label"
                                            ></label>
                                        </div>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            onChange={onChange}
                                            className="form-check-input upload-work-layer"
                                            name="skin"
                                            id="uploadWorkLayer2"
                                            value="2"
                                            checked={
                                                skin === '2' ? true : false
                                            }
                                        />
                                        <div className="upload-work-layer-outer">
                                            <label
                                                htmlFor="uploadWorkLayer2"
                                                id="uploadWorkLayerLabel2"
                                                className="upload-work-layer-label"
                                            ></label>
                                        </div>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            onChange={onChange}
                                            className="form-check-input upload-work-layer"
                                            name="skin"
                                            id="uploadWorkLayer3"
                                            value="3"
                                            checked={
                                                skin === '3' ? true : false
                                            }
                                        />
                                        <div className="upload-work-layer-outer">
                                            <label
                                                htmlFor="uploadWorkLayer3"
                                                id="uploadWorkLayerLabel3"
                                                className="upload-work-layer-label"
                                            ></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id=""
                                    className="form-control input"
                                    value={title}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">
                                    Project Description
                                </label>
                                <textarea
                                    name="description"
                                    className="form-control input description"
                                    value={description}
                                    onChange={onChange}
                                ></textarea>
                            </div>
                            <ul>
                                {note.map((e, i) => (
                                    <li key={i}>{e}</li>
                                ))}
                            </ul>
                            <div className="form-inline justify-content-between">
                                {fileBg ? (
                                    <>
                                        <label
                                            htmlFor="replaceDocumentInput"
                                            className="btn btn-primary button replace"
                                        >
                                            Replace
                                        </label>
                                        <input
                                            type="file"
                                            name="replaceDocument"
                                            id="replaceDocumentInput"
                                            className="form-control-file input replace-file"
                                            accept="application/pdf"
                                            onChange={onUploadWorkDocument}
                                        />
                                    </>
                                ) : null}
                                <button
                                    className="btn btn-primary button"
                                    style={
                                        !fileBg ? { marginLeft: 'auto' } : null
                                    }
                                    onClick={onUpload}
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

UploadWorkDocumentModal.propTypes = {
    setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(UploadWorkDocumentModal);
