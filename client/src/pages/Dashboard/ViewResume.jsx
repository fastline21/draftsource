import React, { useEffect, useState, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { setAlert } from './../../state/actions/alertAction';

// Components
import ModalActionResume from './ModalActionResume';
import ViewImage from './ViewImage';
import ViewSampleWorkImage from './ViewSampleWorkImage';
import ViewSampleWorkDocument from './ViewSampleWorkDocument';

const ViewResume = ({
    isShow,
    isHide,
    loadCandidate,
    candidateState: { resume },
    setAlert,
}) => {
    const [show, setShow] = useState(false);
    const [editRate, setEditRate] = useState(false);
    const [editSalary, setEditSalary] = useState(false);
    const [rate, setRate] = useState(0);
    const [showModalAction, setShowModalAction] = useState(false);
    const [action, setAction] = useState('');
    const [msg, setMsg] = useState('');
    const recruitersCommentsRef = useRef(null);
    const [showWorkImage, setShowWorkImage] = useState(false);
    const [showWorkDocument, setShowWorkDocument] = useState(false);
    const [viewWorkImage, setViewWorkImage] = useState({
        file: '',
        title: '',
        desc: '',
    });
    const [viewWorkDocument, setViewWorkDocument] = useState({
        file: '',
        title: '',
        desc: '',
    });
    const [showImage, setShowImage] = useState(false);
    const [viewImage, setViewImage] = useState({
        title: '',
        image: '',
    });
    const initialData = {
        _id: '',
        firstName: '',
        lastName: '',
        resumeImage: '',
        city: '',
        availability: '',
        expectedSalary: '',
        currency: '',
        specialty: [],
        software: [],
        uploadWork: {
            images: [],
            documents: [],
        },
        aboutYourself: '',
        workHistory: [],
        education: [],
        workspace: '',
        internetType: '',
        hardwareType: '',
        brandName: '',
        internetResult: '',
        computerSpecs: '',
        recruitmentsComment: [],
        rating: '',
    };
    const [data, setData] = useState(initialData);
    const [newData, setNewData] = useState({
        rate: 0,
        salary: '',
        comments: '',
    });

    const handleClose = () => {
        setData(initialData);
        setShow(false);
        isHide(true);
    };

    const handleShow = () => setShow(true);

    const editChange = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
    };

    const {
        _id,
        firstName,
        lastName,
        resumeImage,
        city,
        availability,
        aboutYourself,
        expectedSalary,
        specialty,
        software,
        uploadWork,
        workHistory,
        education,
        workspace,
        internetType,
        hardwareType,
        brandName,
        internetResult,
        computerSpecs,
        status,
        recruitmentsComment,
    } = data;

    const editNewRate = (rate) => {
        if (editRate) {
            setNewData({ ...newData, rate });
            setRate(rate);
        }
    };

    const approveResume = () => {
        if (
            newData.rate === 0 ||
            newData.comments === undefined ||
            newData.comments.length === 0
        ) {
            setAlert('', 'Please fill-in the required boxes to Proceed.');
        } else {
            setAction('approve');
            setShowModalAction(true);
            setMsg(
                '<h2 className="title">Approve Resume?</h2><p>This resume will add to your approved resume tab.</p>'
            );
        }
    };

    const rejectResume = () => {
        setAction('reject');
        setShowModalAction(true);
        setMsg(
            '<h2 className="title">Reject Resume?</h2><p>This resume will go to your reject resume tab. You can go back and review it again and decide to reapprove or delete this application.</p>'
        );
    };

    const deleteResume = () => {
        setAction('delete');
        setShowModalAction(true);
        setMsg(
            '<h2 className="title">Delete Resume?</h2><p>This resume will remove from the system and data of draftsource.</p>'
        );
    };

    const reapproveResume = () => {
        setAction('reapprove');
        setShowModalAction(true);
        setMsg(
            '<h2 className="title">Reapprove Resume?</h2><p>This resume will go to your approve resume tab. You can reject this resume later on if you wanted.</p>'
        );
    };

    const actionButton = () => {
        let a = '';
        if (status === 'Pending') {
            a = (
                <>
                    <button
                        className="btn btn-primary button"
                        onClick={approveResume}
                    >
                        Approve
                    </button>
                    <button
                        className="btn btn-primary button button1"
                        onClick={rejectResume}
                    >
                        Reject
                    </button>
                </>
            );
        } else if (status === 'Approve') {
            a = (
                <button
                    className="btn btn-primary button button"
                    onClick={rejectResume}
                >
                    Reject
                </button>
            );
        } else if (status === 'Reject') {
            a = (
                <>
                    <button
                        className="btn btn-primary button"
                        onClick={reapproveResume}
                    >
                        Reapprove
                    </button>
                    <button
                        className="btn btn-primary button button1"
                        onClick={deleteResume}
                    >
                        Delete
                    </button>
                </>
            );
        }
        return a;
    };

    useEffect(() => {
        if (isShow) {
            handleShow();
        }

        if (resume !== null) {
            setData(resume);
            setNewData({
                ...newData,
                comments: resume.recruitmentsComment,
                rate: resume.rating,
            });
        }
    }, [resume, isShow, data]);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="xl"
            id="seeResume"
        >
            <Modal.Body>
                <ModalActionResume
                    isShow={showModalAction}
                    id={_id}
                    msg={msg}
                    action={action}
                    rate={newData.rate}
                    comments={newData.comments}
                    salary={
                        newData.salary !== '' ? newData.salary : expectedSalary
                    }
                    isHide={() => {
                        handleClose();
                        loadCandidate();
                    }}
                    hideModal={() => setShowModalAction(false)}
                />
                <ViewImage
                    isShow={showImage}
                    isHide={() => {
                        setShowImage(false);
                        setViewImage({
                            image: '',
                            title: '',
                        });
                    }}
                    image={viewImage.image}
                    title={viewImage.title}
                />
                <ViewSampleWorkImage
                    isShow={showWorkImage}
                    isHide={() => {
                        setShowWorkImage(false);
                        setViewWorkImage({ title: '', desc: '', file: '' });
                    }}
                    title={viewWorkImage.title}
                    desc={viewWorkImage.desc}
                    file={viewWorkImage.file}
                />
                <ViewSampleWorkDocument
                    isShow={showWorkDocument}
                    isHide={() => {
                        setShowWorkDocument(false);
                        setViewWorkDocument({ title: '', desc: '', file: '' });
                    }}
                    title={viewWorkDocument.title}
                    desc={viewWorkDocument.desc}
                    file={viewWorkDocument.file}
                />
                <button className="close" onClick={handleClose}>
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                </button>
                <div className="container-fluid">
                    <div className="row pb-5">
                        <div className="col-lg-3">
                            <img
                                src={`/uploads/${resumeImage}`}
                                alt=""
                                className="img-fluid resume-image mb-3"
                            />
                            {aboutYourself !== '' && (
                                <audio controls>
                                    <source src={`/uploads/${aboutYourself}`} />
                                    Your browser does not support the audio!
                                </audio>
                            )}
                        </div>
                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-lg-8">
                                    <p className="fullname">
                                        {firstName} <br />
                                        {lastName}
                                    </p>
                                    <p className="city">{city}</p>
                                </div>
                                <div className="col-lg-4">{actionButton()}</div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-lg-4">
                                    <p className="eng-proficiency mb-1">
                                        English Proficiency
                                    </p>
                                    <div className="rating d-inline">
                                        <i
                                            className={`rating-color fas fa-star${
                                                newData.rate >= 1
                                                    ? ' checked'
                                                    : ''
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                editNewRate(1);
                                            }}
                                        ></i>
                                        <i
                                            className={`rating-color fas fa-star${
                                                newData.rate >= 2
                                                    ? ' checked'
                                                    : ''
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                editNewRate(2);
                                            }}
                                        ></i>
                                        <i
                                            className={`rating-color fas fa-star${
                                                newData.rate >= 3
                                                    ? ' checked'
                                                    : ''
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                editNewRate(3);
                                            }}
                                        ></i>
                                        <i
                                            className={`rating-color fas fa-star${
                                                newData.rate >= 4
                                                    ? ' checked'
                                                    : ''
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                editNewRate(4);
                                            }}
                                        ></i>
                                        <i
                                            className={`rating-color fas fa-star${
                                                newData.rate === 5
                                                    ? ' checked'
                                                    : ''
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                editNewRate(5);
                                            }}
                                        ></i>
                                    </div>
                                    {!editRate ? (
                                        <button
                                            className="btn btn-primary edit-button"
                                            onClick={() => setEditRate(true)}
                                        >
                                            Edit
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-primary edit-button"
                                            onClick={() => setEditRate(false)}
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                                <div className="col-lg-4">
                                    <p className="availability mb-1">
                                        {availability}
                                    </p>
                                    <p className="salary d-inline">
                                        {editSalary ? (
                                            <input
                                                type="number"
                                                className="form-control input"
                                                name="salary"
                                                placeholder={`${
                                                    newData.salary === ''
                                                        ? expectedSalary
                                                        : newData.salary
                                                }/hr`}
                                                onChange={editChange}
                                            />
                                        ) : (
                                            <>
                                                {`$${
                                                    newData.salary === ''
                                                        ? expectedSalary
                                                        : newData.salary
                                                }`}
                                                <span
                                                    style={{
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    /hr
                                                </span>
                                            </>
                                        )}
                                    </p>
                                    {!editSalary ? (
                                        <button
                                            className="btn btn-primary edit-button"
                                            onClick={() => setEditSalary(true)}
                                        >
                                            Edit
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-primary edit-button"
                                            onClick={() => setEditSalary(false)}
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="col-lg-3">
                            <p className="item-title color-1 mb-0">
                                Skills & Specialties
                            </p>
                        </div>
                        <div className="col-lg-9">
                            <p id="specialty" className="specialty mb-0">
                                {specialty.join(', ')}
                            </p>
                        </div>
                    </div>
                    <div className="row pb-5">
                        <div className="col-lg-3">
                            <p className="item-title color-1 mb-0">
                                Software Use
                            </p>
                        </div>
                        <div className="col-lg-9">
                            <p id="software" className="software mb-0">
                                {software.join(', ')}
                            </p>
                        </div>
                    </div>
                    <div className="row pb-5">
                        <div className="col-lg-3">
                            <p className="item-title color-2">Sample Works</p>
                        </div>
                        <div className="col-lg-9">
                            <div className="row pb-3 upload-work-images">
                                {uploadWork.images.map((e, i) => (
                                    <div className="col-lg-3" key={i}>
                                        <figure
                                            className="figure"
                                            onClick={() => {
                                                setShowWorkImage(true);
                                                setViewWorkImage({
                                                    title: e.title,
                                                    desc: e.description,
                                                    file: e.file,
                                                });
                                            }}
                                        >
                                            <img
                                                src={`/uploads/${e.file}`}
                                                alt=""
                                                className="figure-img img-fluid"
                                            />
                                            <figcaption className="figure-caption">
                                                {e.title}
                                            </figcaption>
                                        </figure>
                                    </div>
                                ))}
                                {uploadWork.documents.map((e, i) => (
                                    <div className="col-lg-3" key={i}>
                                        <figure
                                            className="figure"
                                            onClick={() => {
                                                setShowWorkDocument(true);
                                                setViewWorkDocument({
                                                    title: e.title,
                                                    desc: e.description,
                                                    file: e.file,
                                                });
                                            }}
                                        >
                                            <img
                                                src={`../uploads/bg-upload-${e.skin}.png`}
                                                alt=""
                                                className="figure-img img-fluid"
                                            />
                                            <figcaption className="figure-caption">
                                                {e.title}
                                            </figcaption>
                                        </figure>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="row pb-5">
                        <div className="col-lg-3">
                            <p className="item-title color-2">
                                Work Experience
                            </p>
                        </div>
                        <div className="col-lg-9">
                            <div id="workHistory" className="work-history">
                                {workHistory.map((e, i) => (
                                    <div className="work-history-item" key={i}>
                                        <p className="title">{e.title}</p>
                                        <p className="company">{e.company}</p>
                                        <p className="month-year">
                                            {e.monthStarted} {e.yearStarted} -{' '}
                                            {e.monthEnded} {e.yearEnded}
                                        </p>
                                        <p className="item-title">
                                            Job Description
                                        </p>
                                        <p className="description">
                                            {e.description}
                                        </p>
                                        <p className="item-title">About</p>
                                        <p className="about">{e.about}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="row pb-5">
                        <div className="col-lg-3">
                            <p className="item-title color-2">Education</p>
                        </div>
                        <div className="col-lg-9">
                            <div id="education" className="education">
                                {education.map((e, i) => (
                                    <div className="education-item" key={i}>
                                        <table className="education-item table table-borderless">
                                            <tbody>
                                                <tr>
                                                    <td
                                                        className={`item-choices pl-0${
                                                            i === 0
                                                                ? ' pt-0'
                                                                : ''
                                                        }`}
                                                    >
                                                        {e.choices}
                                                    </td>
                                                </tr>
                                                {e.choices !== 'High School' ? (
                                                    <tr>
                                                        <td className="item-title pb-0 pl-0">
                                                            Degree
                                                        </td>
                                                        <td className="item-degree pb-0 item-value">
                                                            {e.degree}
                                                        </td>
                                                    </tr>
                                                ) : null}
                                                <tr>
                                                    <td className="item-title pb-0 pl-0">
                                                        School
                                                    </td>
                                                    <td className="item-school pb-0 item-value">
                                                        {e.school}
                                                    </td>
                                                </tr>
                                                {e.choices !== 'High School' ? (
                                                    <tr>
                                                        <td className="item-title pb-0 pl-0">
                                                            Course
                                                        </td>
                                                        <td className="item-course pb-0 item-value">
                                                            {e.course}
                                                        </td>
                                                    </tr>
                                                ) : null}
                                                <tr>
                                                    <td className="item-title pb-0 pl-0">
                                                        Started - Graduated
                                                    </td>
                                                    <td className="item-month-year pb-0 item-value">
                                                        {e.monthYearStarted} -{' '}
                                                        {e.monthYearGraduated}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="row pb-5">
                        <div className="col-lg-3">
                            <p className="item-title color-2">
                                Recruiter's Comments
                            </p>
                        </div>
                        <div className="col-lg-9">
                            <div id="recruitersComments">
                                <div className="form-inline">
                                    <input
                                        type="text"
                                        className="form-control input"
                                        name="comments"
                                        ref={recruitersCommentsRef}
                                    />
                                    <button
                                        className="btn btn-primary button"
                                        onClick={() => {
                                            setNewData({
                                                ...newData,
                                                comments: [
                                                    ...newData.comments,
                                                    recruitersCommentsRef
                                                        .current.value,
                                                ],
                                            });
                                            recruitersCommentsRef.current.value =
                                                '';
                                        }}
                                    >
                                        Save
                                    </button>
                                </div>
                                <ul>
                                    {newData.comments !== '' &&
                                        newData.comments.map((e, i) => (
                                            <li key={i}>{e}</li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row pb-5">
                        <div className="col-lg-3">
                            <p className="item-title color-2">
                                Work from Home Capabilites
                            </p>
                        </div>
                        <div className="col-lg-9">
                            <table className="table table-borderless workspace-item">
                                <tbody>
                                    <tr>
                                        <th
                                            scope="row"
                                            className="pt-0 item-title"
                                        >
                                            Workspace
                                        </th>
                                        <td
                                            id="workspace"
                                            className="pt-0 item-value"
                                        >
                                            {workspace}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th
                                            scope="row"
                                            className="pt-0 item-title"
                                        >
                                            Internet Type
                                        </th>
                                        <td
                                            id="internetType"
                                            className="pt-0 item-value"
                                        >
                                            {internetType}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th
                                            scope="row"
                                            className="pt-0 item-title"
                                        >
                                            Hardware Type
                                        </th>
                                        <td
                                            id="hardwareType"
                                            className="pt-0 item-value"
                                        >
                                            {hardwareType}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th
                                            scope="row"
                                            className="pt-0 item-title"
                                        >
                                            Brand Name
                                        </th>
                                        <td
                                            id="brandName"
                                            className="pt-0 item-value"
                                        >
                                            {brandName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th
                                            scope="row"
                                            className="pt-0 item-title"
                                        >
                                            Internet Speedtest Result
                                        </th>
                                        <td className="pt-0">
                                            <button
                                                className="btn btn-primary view"
                                                onClick={() => {
                                                    setShowImage(true);
                                                    setViewImage({
                                                        ...viewImage,
                                                        image: internetResult,
                                                        title:
                                                            'Internet Result',
                                                    });
                                                }}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th
                                            scope="row"
                                            className="pt-0 item-title"
                                        >
                                            Computer Specs
                                        </th>
                                        <td className="pt-0">
                                            <button
                                                className="btn btn-primary view"
                                                onClick={() => {
                                                    setShowImage(true);
                                                    setViewImage({
                                                        ...viewImage,
                                                        image: computerSpecs,
                                                        title: 'Computer Specs',
                                                    });
                                                }}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

ViewResume.propTypes = {
    setAlert: PropTypes.func.isRequired,
    candidateState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    candidateState: state.candidateState,
});

export default connect(mapStateToProps, { setAlert })(ViewResume);
