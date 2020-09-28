import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Utils
import useUnsavedChangesWarning from './../../utils/useUnsavedChangesWarning';

// Components
import SpecialtyItem from './SpecialtyItem';
import SpecialtySelected from './SpecialtySelected';
import SoftwareItem from './SoftwareItem';
import SoftwareSelected from './SoftwareSelected';
import UploadWorkImageModal from './UploadWorkImageModal';
import UploadWorkDocumentModal from './UploadWorkDocumentModal';
import UploadWorkItem from './UploadWorkItem';

// List
import { specialtyList } from './../../list/Specialty';
import { softwareList } from './../../list/Software';

// Action
import { setAlert } from './../../state/actions/alertAction';
import { clearUser } from './../../state/actions/userAction';
import { submitResume, clearError } from './../../state/actions/resumeAction';

const Step6 = ({
    setAlert,
    submitResume,
    clearError,
    clearUser,
    check,
    resumeState: { resume, error },
}) => {
    const [
        Prompt,
        setDirty,
        setPristine,
        setMessage,
    ] = useUnsavedChangesWarning();

    const otherSpecialtyRef = useRef(null);
    const otherSoftwareRef = useRef(null);

    const initialUploadModal = {
        show: false,
        title: '',
        note: '',
        data: '',
        index: '',
    };

    const [specialty, setSpecialty] = useState([]);
    const [software, setSoftware] = useState([]);
    const [uploadWork, setUploadWork] = useState({
        images: [],
        documents: [],
    });
    const [uploadWorkImageModal, setUploadWorkImageModal] = useState(
        initialUploadModal
    );
    const [uploadWorkDocumentModal, setUploadWorkDocumentModal] = useState('');
    const [load, setLoad] = useState(true);
    const [submit, setSubmit] = useState(false);

    // Select Specialty
    const onSelectSpecialty = (e) => {
        if (specialty.includes(specialtyList()[e])) {
            setSpecialty((specialty) => [
                ...specialty.filter(
                    (x) =>
                        specialty.indexOf(x) !==
                        specialty.indexOf(specialtyList()[e])
                ),
            ]);
            Array.from(document.querySelectorAll('.specialty .list .nav-item'))
                .find((el) => el.textContent === specialtyList()[e])
                .classList.remove('active');
        } else {
            setSpecialty((specialty) => [...specialty, specialtyList()[e]]);
            Array.from(document.querySelectorAll('.specialty .list .nav-item'))
                .find((el) => el.textContent === specialtyList()[e])
                .classList.add('active');
        }
        setDirty();
        setMessage('Are you sure you want to leave this page?');
    };

    // Select Software
    const onSelectSoftware = (e) => {
        if (software.includes(softwareList()[e])) {
            setSoftware((software) => [
                ...software.filter(
                    (x) =>
                        software.indexOf(x) !==
                        software.indexOf(softwareList()[e])
                ),
            ]);
            Array.from(document.querySelectorAll('.software .list .nav-item'))
                .find((el) => el.textContent === softwareList()[e])
                .classList.remove('active');
        } else {
            setSoftware((software) => [...software, softwareList()[e]]);
            Array.from(document.querySelectorAll('.software .list .nav-item'))
                .find((el) => el.textContent === softwareList()[e])
                .classList.add('active');
        }
        setDirty();
        setMessage('Are you sure you want to leave this page?');
    };

    // Specialty List
    const specialtyListGenerate = () => {
        let key = 0;
        let list = [];
        for (let x = 0; x < 4; x++) {
            let item = [];
            for (let y = 0; y < 5; y++) {
                item.push(
                    <SpecialtyItem
                        key={key}
                        index={key}
                        value={specialtyList()[key]}
                        select={onSelectSpecialty}
                    />
                );
                key++;
            }
            list.push(
                <div className="col-lg-3 col-md-6 col-sm-6" key={x}>
                    <ul className="nav flex-column">{item}</ul>
                </div>
            );
        }
        return list;
    };

    // Software List
    const softwareListGenerate = () => {
        let key = 0;
        let list = [];
        for (let x = 0; x < 4; x++) {
            let item = [];
            for (let y = 0; y < 5; y++) {
                item.push(
                    <SoftwareItem
                        key={key}
                        index={key}
                        value={softwareList()[key]}
                        select={onSelectSoftware}
                    />
                );
                key++;
            }
            list.push(
                <div className="col-lg-3 col-md-6 col-sm-6" key={x}>
                    <ul className="nav flex-column">{item}</ul>
                </div>
            );
        }
        return list;
    };

    // Specialty Close
    const onSpecialtyClose = (e) => {
        const item = specialty[e];
        if (specialtyList().includes(item)) {
            Array.from(document.querySelectorAll('.specialty .list .nav-item'))
                .find((el) => el.textContent === item)
                .classList.remove('active');
        }
        setSpecialty((specialty) => [
            ...specialty.filter((x) => specialty.indexOf(x) !== e),
        ]);
    };

    // Software Close
    const onSoftwareClose = (e) => {
        const item = software[e];
        if (softwareList().includes(item)) {
            Array.from(document.querySelectorAll('.software .list .nav-item'))
                .find((el) => el.textContent === item)
                .classList.remove('active');
        }
        setSoftware((software) => [
            ...software.filter((x) => software.indexOf(x) !== e),
        ]);
    };

    // Add Other Specialty
    const addOtherSpecialty = (e) => {
        e.preventDefault();
        const lowerSpecialty = specialtyList().map((el) => el.toLowerCase());
        const lowerOther = otherSpecialtyRef.current.value;
        if (lowerSpecialty.includes(lowerOther.toLowerCase())) {
            const index = lowerSpecialty.indexOf(lowerOther.toLowerCase());
            setSpecialty((specialty) => [...specialty, specialtyList()[index]]);
            Array.from(document.querySelectorAll('.specialty .list .nav-item'))
                .find((el) => el.textContent === specialtyList()[index])
                .classList.add('active');
        } else {
            setSpecialty((specialty) => [...specialty, lowerOther]);
        }
        otherSpecialtyRef.current.value = '';
        setDirty();
        setMessage('Are you sure you want to leave this page?');
    };

    // Add Other Software
    const addOtherSoftware = (e) => {
        e.preventDefault();
        const lowerSoftware = softwareList().map((el) => el.toLowerCase());
        const lowerOther = otherSoftwareRef.current.value;
        if (lowerSoftware.includes(lowerOther.toLowerCase())) {
            const index = lowerSoftware.indexOf(lowerOther.toLowerCase());
            setSoftware((software) => [...software, softwareList()[index]]);
            Array.from(document.querySelectorAll('.software .list .nav-item'))
                .find((el) => el.textContent === softwareList()[index])
                .classList.add('active');
        } else {
            setSoftware((software) => [...software, lowerOther]);
        }
        otherSoftwareRef.current.value = '';
        setDirty();
        setMessage('Are you sure you want to leave this page?');
    };

    // Upload Work Image Modal Click
    const onUploadWorkImageModal = (e) => {
        e.preventDefault();
        setUploadWorkImageModal({
            show: true,
            title: 'Upload your JPG or PNG',
            note: [
                'Upload your jpeg or png but not exceed on 3mb',
                'Minimum size W 1200 x H 1100 pixels',
                'Preferred no texts layered on top of the image to keep it clean look',
            ],
            caption: 'Draft a JPEG or PNG',
            data: '',
            index: '',
        });
    };

    // Upload Work Document Modal Click
    const onUploadWorkDocumentModal = (e) => {
        e.preventDefault();
        setUploadWorkDocumentModal({
            show: true,
            title: 'Upload your PDF',
            note: [
                'Upload your pdf not exceeding to 5mb',
                'Concise and professionaly done is a must',
                'Avoid unnecessary elements to make it more direct',
                'A clean and modern look attracts client',
            ],
            caption: 'Draft PDF',
            data: '',
            index: '',
        });
    };

    // Hide Upload Work Image Modal
    const isHideImage = () => {
        setUploadWorkImageModal(initialUploadModal);
    };

    // Hide Upload Work Document Modal
    const isHideDocument = () => {
        setUploadWorkDocumentModal(initialUploadModal);
    };

    // Upload Work Image Data
    const uploadWorkImageData = (data) => {
        setUploadWork({ ...uploadWork, images: [...uploadWork.images, data] });
        setUploadWorkImageModal(initialUploadModal);
        setDirty();
        setMessage('Are you sure you want to leave this page?');
    };

    // Upload Work Document Data
    const uploadWorkDocumentData = (data) => {
        setUploadWork({
            ...uploadWork,
            documents: [...uploadWork.documents, data],
        });
        setUploadWorkImageModal(initialUploadModal);
        setDirty();
        setMessage('Are you sure you want to leave this page?');
    };

    // Edit Upload Work Image Modal
    const onEditWorkImage = (index) => {
        setUploadWorkImageModal({
            show: true,
            title: 'Upload your JPG or PNG',
            note: [
                'Upload your jpeg or png but not exceed on 3mb',
                'Minimum size W 1200 x H 1100 pixels',
                'Preferred no texts layered on top of the image to keep it clean look',
            ],
            caption: 'Draft a JPEG or PNG',
            data: uploadWork.images[index],
            index,
        });
    };

    // Edit Upload Work Document Modal
    const onEditWorkDocument = (index) => {
        setUploadWorkDocumentModal({
            show: true,
            title: 'Upload your PDF',
            note: [
                'Upload your pdf not exceeding to 5mb',
                'Concise and professionaly done is a must',
                'Avoid unnecessary elements to make it more direct',
                'A clean and modern look attracts client',
            ],
            caption: 'Draft a PDF',
            data: uploadWork.documents[index],
            index,
        });
    };

    // Delete Upload Work Image
    const onDeleteWorkImage = (current) => {
        const { images } = uploadWork;
        const removeItem = images.filter((image, index) => index !== current);
        setUploadWork({ ...uploadWork, images: [...removeItem] });
        setUploadWorkImageModal(initialUploadModal);
    };

    // Delete Upload Work Document
    const onDeleteWorkDocument = (current) => {
        const { documents } = uploadWork;
        const removeItem = documents.filter(
            (document, index) => index !== current
        );
        setUploadWork({ ...uploadWork, documents: [...removeItem] });
        setUploadWorkDocumentModal(initialUploadModal);
    };

    // Update Upload Work Image
    const updateWorkImageData = (current, data) => {
        const { images } = uploadWork;
        const newUpdate = images.map((image, index) =>
            index === current ? data : image
        );
        setUploadWork({ ...uploadWork, images: [...newUpdate] });
        setUploadWorkImageModal(initialUploadModal);
        setDirty();
        setMessage('Are you sure you want to leave this page?');
    };

    // Update Upload Work Document
    const updateWorkDocumentData = (current, data) => {
        const { documents } = uploadWork;
        const newUpdate = documents.map((document, index) =>
            index === current ? data : document
        );
        setUploadWork({ ...uploadWork, documents: [...newUpdate] });
        setUploadWorkDocumentModal(initialUploadModal);
        setDirty();
        setMessage('Are you sure you want to leave this page?');
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (
            specialty.length === 0 ||
            software.length === 0 ||
            uploadWork.images.length === 0 ||
            uploadWork.documents.length === 0
        ) {
            return setAlert(
                'error',
                'Please fill-in the required boxes to Proceed.'
            );
        } else {
            const formData = new FormData();
            for (const [key, value] of Object.entries(resume)) {
                if (key === 'education' || key === 'workHistory') {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, value);
                }
            }
            for (const [key, value] of Object.entries(check())) {
                formData.append(key, value);
            }
            for (const property in uploadWork) {
                uploadWork[property].forEach((element) => {
                    formData.append([property], element.file);
                });
            }
            formData.append('specialty', specialty);
            formData.append('software', software);
            formData.append('uploadWork', JSON.stringify(uploadWork));
            submitResume(formData);
            setSpecialty([]);
            setSoftware([]);
            setUploadWork({
                images: [],
                documents: [],
            });
            setSubmit(true);
            setPristine();
        }
    };

    useEffect(() => {
        if (load) {
            setDirty();
            setMessage('Are you sure you want to leave this page?');
            setLoad(false);
        }

        if (error) {
            setAlert('', error.msg);
            clearError();
        }

        if (submit) {
            setSubmit(false);
            setAlert(
                '/',
                '<h2 class="title">Thank you for your resume</h2><p class="subtitle">We will call you within 72 hours to verify your profile.</p>'
            );
            clearUser();
        }

        // eslint-disable-next-line
    }, [error, submit, load]);

    return (
        <div className="step-6">
            {Prompt}
            {uploadWorkImageModal.show ? (
                <UploadWorkImageModal
                    titleModal={uploadWorkImageModal.title}
                    note={uploadWorkImageModal.note}
                    isHide={isHideImage}
                    isShow={uploadWorkImageModal.show}
                    caption={uploadWorkImageModal.caption}
                    uploadData={uploadWorkImageData}
                    data={uploadWorkImageModal.data}
                    index={uploadWorkImageModal.index}
                    updateData={updateWorkImageData}
                />
            ) : null}
            {uploadWorkDocumentModal.show ? (
                <UploadWorkDocumentModal
                    titleModal={uploadWorkDocumentModal.title}
                    note={uploadWorkDocumentModal.note}
                    isHide={isHideDocument}
                    isShow={uploadWorkDocumentModal.show}
                    caption={uploadWorkDocumentModal.caption}
                    uploadData={uploadWorkDocumentData}
                    data={uploadWorkDocumentModal.data}
                    index={uploadWorkDocumentModal.index}
                    updateData={updateWorkDocumentData}
                />
            ) : null}
            <div className="row">
                <div className="col-lg-12">
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form-row specialty">
                            <div className="col-lg-4">
                                <h5 className="title">
                                    Specialty{' '}
                                    <span>Atleast (3) three skills</span>
                                </h5>
                                {specialty.length === 0 ? (
                                    <p className="subtitle">
                                        This section wil view your selected
                                        specialties. Choose atleast (3) three or
                                        more skills and still relevant to the
                                        job position you are applying for.
                                    </p>
                                ) : (
                                    specialty.map((e, i) => (
                                        <SpecialtySelected
                                            key={i}
                                            value={e}
                                            index={i}
                                            onSpecialtyClose={onSpecialtyClose}
                                        />
                                    ))
                                )}
                            </div>
                            <div className="col-lg-8">
                                <div className="list">
                                    <div className="form-row">
                                        {specialtyListGenerate()}
                                    </div>
                                </div>
                                <div className="form-inline">
                                    <input
                                        type="text"
                                        placeholder="Other Specialty"
                                        className="form-control input other-input"
                                        ref={otherSpecialtyRef}
                                    />
                                    <button
                                        className="btn btn-primary button other-add"
                                        onClick={addOtherSpecialty}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="form-row software">
                            <div className="col-lg-4">
                                <h5 className="title">
                                    Software{' '}
                                    <span>Atleast (3) three software use</span>
                                </h5>
                                {software.length === 0 ? (
                                    <p className="subtitle">
                                        This section will view your selected
                                        software you usually or regularly used
                                        in order to perform on asuch of wuality
                                        output and strill matched to the job
                                        position you are applying for.
                                    </p>
                                ) : (
                                    software.map((e, i) => (
                                        <SoftwareSelected
                                            key={i}
                                            value={e}
                                            index={i}
                                            onSoftwareClose={onSoftwareClose}
                                        />
                                    ))
                                )}
                            </div>
                            <div className="col-lg-8">
                                <div className="list">
                                    <div className="form-row">
                                        {softwareListGenerate()}
                                    </div>
                                </div>
                                <div className="form-inline">
                                    <input
                                        type="text"
                                        placeholder="Other Software"
                                        className="form-control input other-input"
                                        ref={otherSoftwareRef}
                                    />
                                    <button
                                        className="btn btn-primary button other-add"
                                        onClick={addOtherSoftware}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="form-row upload-work">
                            <div className="col-lg-4">
                                <h5 className="title">
                                    Upload Your Work <span>upto 50mb</span>
                                </h5>
                                <p className="subtitle">
                                    Avoid putting names on your photos such as
                                    emails, brand names, company names. such
                                    action will result to revoking of resumes.
                                </p>
                            </div>
                            <div className="col-lg-8">
                                <div className="upload-image">
                                    <label className="form-label">
                                        JPEG or PNG's
                                    </label>
                                    {uploadWork.images.length === 0 ? (
                                        <button
                                            className="btn btn-primary button"
                                            onClick={onUploadWorkImageModal}
                                        >
                                            Add your first sample project as
                                            JPEG or PNG format
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    ) : (
                                        <div className="row">
                                            {uploadWork.images.map((e, i) => (
                                                <div
                                                    className="col-lg-3 col-md-3 col-sm-3"
                                                    key={i}
                                                >
                                                    <UploadWorkItem
                                                        index={i}
                                                        data={e}
                                                        isEdit={onEditWorkImage}
                                                        isDelete={
                                                            onDeleteWorkImage
                                                        }
                                                    />
                                                </div>
                                            ))}
                                            <div className="col-lg-3 col-md-3 col-sm-3">
                                                <div
                                                    className="add-entry"
                                                    onClick={
                                                        onUploadWorkImageModal
                                                    }
                                                >
                                                    <i className="fas fa-plus"></i>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="upload-document">
                                    <label className="form-label">PDF</label>
                                    {uploadWork.documents.length === 0 ? (
                                        <button
                                            className="btn btn-primary button"
                                            onClick={onUploadWorkDocumentModal}
                                        >
                                            Add your first sample project as PDF
                                            format
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    ) : (
                                        <div className="row">
                                            {uploadWork.documents.map(
                                                (e, i) => (
                                                    <div
                                                        className="col-lg-3 col-md-3 col-sm-3"
                                                        key={i}
                                                    >
                                                        <UploadWorkItem
                                                            index={i}
                                                            data={e}
                                                            isEdit={
                                                                onEditWorkDocument
                                                            }
                                                            isDelete={
                                                                onDeleteWorkDocument
                                                            }
                                                        />
                                                    </div>
                                                )
                                            )}
                                            <div className="col-lg-3 col-md-3 col-sm-3">
                                                <div
                                                    className="add-entry"
                                                    onClick={
                                                        onUploadWorkDocumentModal
                                                    }
                                                >
                                                    <i className="fas fa-plus"></i>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-lg-2 offset-lg-10">
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="btn btn-primary btn-block button submit"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

Step6.propTypes = {
    setAlert: PropTypes.func.isRequired,
    submitResume: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
    resumeState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    resumeState: state.resumeState,
});

export default connect(mapStateToProps, {
    setAlert,
    clearError,
    submitResume,
    clearUser,
})(Step6);
