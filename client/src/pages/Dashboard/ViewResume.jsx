import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getSymbolFromCurrency from 'currency-symbol-map';

// Actions
import { clearResume } from './../../state/actions/candidateAction';
import { setAlert } from './../../state/actions/alertAction';

// Components
import ViewImage from './ViewImage';
import ViewSampleWork from './ViewSampleWork';
import ModalActionResume from './ModalActionResume';

const ViewResume = ({
    isShow,
    loadCandidate,
    candidateState: { resume },
    clearResume,
    setAlert,
}) => {
    // Initial
    const initialData = {
        _id: '',
        resumeImage: '',
        aboutYourself: '',
        firstName: '',
        lastName: '',
        city: '',
        status: '',
        rating: '',
        availability: '',
        expectedSalary: '',
        currency: '',
        specialty: [],
        software: [],
        uploadWork: { images: [] },
        workHistory: [],
        education: [],
        recruitmentsComment: '',
        workspace: '',
        internetType: '',
        hardwareType: '',
        brandName: '',
        internetResult: '',
        computerSpecs: '',
    };
    const initialViewImage = {
        show: false,
        title: '',
        file: '',
    };
    const initialViewSampleWork = {
        show: false,
        title: '',
        file: '',
    };

    // State
    const [show, setShow] = useState(false);
    const [data, setData] = useState(initialData);
    const [action, setAction] = useState(null);
    const [showModalAction, setShowModalAction] = useState(false);
    const [msg, setMsg] = useState('');
    const [viewImage, setViewImage] = useState(initialViewImage);
    const [viewSampleWork, setViewSampleWork] = useState(initialViewSampleWork);

    const {
        _id,
        resumeImage,
        aboutYourself,
        firstName,
        lastName,
        city,
        status,
        rating,
        availability,
        expectedSalary,
        currency,
        specialty,
        software,
        uploadWork,
        workHistory,
        education,
        recruitmentsComment,
        workspace,
        internetType,
        hardwareType,
        brandName,
        internetResult,
        computerSpecs,
    } = data;

    const approveResume = () => {
        if (
            rating === 0 ||
            recruitmentsComment === undefined ||
            recruitmentsComment.length === 0
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
        if (status === 'Pending') {
            return (
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
            return (
                <button
                    className="btn btn-primary button button"
                    onClick={rejectResume}
                >
                    Reject
                </button>
            );
        } else if (status === 'Reject') {
            return (
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
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleClose = () => {
        setShow(false);
        clearResume();
    };

    const handleShow = () => setShow(true);

    useEffect(() => {
        if (isShow) {
            handleShow();
            setData(resume);
        }
    }, [isShow]);

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
                <ViewImage
                    viewImage={viewImage}
                    isHide={() => setViewImage(initialViewImage)}
                />
                <ViewSampleWork
                    isShow={viewSampleWork.show}
                    isHide={() => setViewSampleWork(initialViewSampleWork)}
                    viewSampleWork={viewSampleWork}
                />
                <ModalActionResume
                    isShow={showModalAction}
                    load={data}
                    msg={msg}
                    action={action}
                    isHide={() => {
                        setShowModalAction(false);
                        handleClose();
                        loadCandidate();
                    }}
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
                            <audio controls controlsList="nodownload">
                                <source src={`/uploads/${aboutYourself}`} />
                                Your browser does not support the audio!
                            </audio>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-8">
                                    <p className="fullname">
                                        {firstName} <br />
                                        {lastName}
                                    </p>
                                    <p className="city">{city}</p>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-lg-4">
                                    <p className="data-title mb-0">
                                        English Proficiency
                                    </p>
                                    <div className="rating d-inline">
                                        <i
                                            className={`rating-color fas fa-star${
                                                rating >= 1 ? ' checked' : ''
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setData({ ...data, rating: 1 });
                                            }}
                                        ></i>
                                        <i
                                            className={`rating-color fas fa-star${
                                                rating >= 2 ? ' checked' : ''
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setData({ ...data, rating: 2 });
                                            }}
                                        ></i>
                                        <i
                                            className={`rating-color fas fa-star${
                                                rating >= 3 ? ' checked' : ''
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setData({ ...data, rating: 3 });
                                            }}
                                        ></i>
                                        <i
                                            className={`rating-color fas fa-star${
                                                rating >= 4 ? ' checked' : ''
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setData({ ...data, rating: 4 });
                                            }}
                                        ></i>
                                        <i
                                            className={`rating-color fas fa-star${
                                                rating === 5 ? ' checked' : ''
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setData({ ...data, rating: 5 });
                                            }}
                                        ></i>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <p className="data-title mb-0">
                                        Availability
                                    </p>
                                    <p className="availability">
                                        {availability}
                                    </p>
                                </div>
                                <div className="col-lg-4">
                                    <p className="data-title mb-0">
                                        Expected Salary
                                    </p>
                                    <p className="expected-salary">
                                        {getSymbolFromCurrency(currency)}{' '}
                                        {expectedSalary} /hr
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">{actionButton()}</div>
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
                                            style={{ cursor: 'pointer' }}
                                            onClick={() =>
                                                setViewSampleWork({
                                                    show: true,
                                                    title: e.title,
                                                    file: e.file,
                                                })
                                            }
                                        >
                                            <img
                                                src={`/uploads/${e.file}`}
                                                alt={e.title}
                                                className="figure-img img-fluid"
                                            />
                                            <figcaption className="figure-caption">
                                                {e.title}
                                            </figcaption>
                                        </figure>
                                    </div>
                                ))}
                            </div>
                            <hr className="line-break" />
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
                            <hr className="line-break" />
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
                            <hr className="line-break" />
                        </div>
                    </div>
                    <div className="row pb-5">
                        <div className="col-lg-3">
                            <p className="item-title color-2">
                                Recruiter's Comments
                            </p>
                        </div>
                        <div className="col-lg-9">
                            <div id="recruitmentsComment" className="pb-5">
                                <textarea
                                    name="recruitmentsComment"
                                    className="form-control input"
                                    value={recruitmentsComment}
                                    onChange={onChange}
                                    cols="30"
                                    rows="12"
                                ></textarea>
                            </div>
                            <hr className="line-break" />
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
                                                onClick={() =>
                                                    setViewImage({
                                                        show: true,
                                                        title:
                                                            'Internet Speedtest Result',
                                                        file: internetResult,
                                                    })
                                                }
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
                                                onClick={() =>
                                                    setViewImage({
                                                        show: true,
                                                        title: 'Computer Specs',
                                                        file: computerSpecs,
                                                    })
                                                }
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
    candidateState: PropTypes.object.isRequired,
    clearResume: PropTypes.func.isRequired,
    isShow: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    candidateState: state.candidateState,
});

export default connect(mapStateToProps, { clearResume, setAlert })(ViewResume);
