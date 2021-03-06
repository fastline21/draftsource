import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// Actions
import { setAlert } from './../../state/actions/alertAction';
import {
    addCandidate,
    removeCandidate,
} from './../../state/actions/candidateAction';

const ViewResume = ({
    isShow,
    isHide,
    candidateState: { resume, shortlist },
    addCandidate,
    removeCandidate,
    shortlistView,
}) => {
    const queryParams = new URLSearchParams(window.location.search);
    const newUrl = new URL(window.location.href);
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [shortlisted, setShortlisted] = useState(shortlist);
    const initialData = {
        _id: '',
        resumeImage: '',
        availability: '',
        currency: '',
        specialty: [],
        software: [],
        uploadWork: {
            images: [],
            documents: [],
        },
        workHistory: [],
        education: [],
        aboutYourself: '',
        workspace: '',
        internetType: '',
        hardwareType: '',
        brandName: '',
        internetResult: '',
        computerSpecs: '',
        rating: '',
    };
    const [data, setData] = useState(initialData);

    const handleClose = () => {
        setData(initialData);
        setShow(false);
        isHide(true);
    };

    const handleShow = () => setShow(true);

    const viewImage = (file) => {};

    const {
        _id,
        resumeImage,
        availability,
        aboutYourself,
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
        rating,
    } = data;

    const removeShortlist = (id) => {
        if (shortlistView) {
            const oldData = queryParams.get('candidates');
            let newData;

            if (oldData) {
                newData = oldData.split(',');

                newData = newData.filter((e) => e !== id);

                if (newData.length !== 0) {
                    newData = newData.join(',');
                    newUrl.searchParams.set('candidates', newData);
                } else {
                    newUrl.searchParams.delete('candidates');
                }
            }
            history.push({
                pathname: newUrl.pathname,
                search: newUrl.search,
            });
            isHide(true);
            removeCandidate(id);
        } else {
            removeCandidate(id);
        }
    };

    const addShortlist = (id) => {
        addCandidate(id);
    };

    useEffect(() => {
        if (isShow) {
            handleShow();
        }

        if (resume !== null) {
            setData(resume);
        }

        setShortlisted(shortlist);
    }, [resume, isShow, shortlist]);

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
                                <div className="col-lg-4">
                                    <p className="eng-proficiency mb-1">
                                        English Proficiency
                                    </p>
                                    <div className="rating d-inline">
                                        <i
                                            className={`rating-color fas fa-star${
                                                rating >= 1 ? ' checked' : ''
                                            }`}
                                        ></i>
                                        <i
                                            className={`rating-color fas fa-star${
                                                rating >= 2 ? ' checked' : ''
                                            }`}
                                        ></i>
                                        <i
                                            className={`rating-color fas fa-star${
                                                rating >= 3 ? ' checked' : ''
                                            }`}
                                        ></i>
                                        <i
                                            className={`rating-color fas fa-star${
                                                rating >= 4 ? ' checked' : ''
                                            }`}
                                        ></i>
                                        <i
                                            className={`rating-color fas fa-star${
                                                rating === 5 ? ' checked' : ''
                                            }`}
                                        ></i>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <p>Availability</p>
                                    <p className="availability mb-1">
                                        {availability}
                                    </p>
                                </div>
                                <div className="col-lg-4">
                                    <button
                                        className="btn btn-primary button"
                                        onClick={() =>
                                            shortlisted.includes(_id)
                                                ? removeShortlist(_id)
                                                : addShortlist(_id)
                                        }
                                    >
                                        {shortlist.includes(_id)
                                            ? 'Remove from Shortlist'
                                            : 'Add to Shortlist'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            history.push(
                                                `/view-candidates/shortlisted-candidates${
                                                    shortlist.length > 0
                                                        ? `?candidates=${shortlist.join(
                                                              ','
                                                          )}`
                                                        : ''
                                                }`
                                            );
                                            handleClose();
                                        }}
                                        className="btn btn-primary button shortlist-candidates"
                                    >
                                        Shortlist Candidates
                                    </button>
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
                            <p className="item-title color-1">JPEG OR PNG</p>
                            <div className="row pb-3 upload-work-images">
                                {uploadWork.images.map((e, i) => (
                                    <div className="col-lg-3" key={i}>
                                        <figure className="figure">
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
                            </div>
                            <p className="item-title color-1">PDF</p>
                            <div className="row upload-work-documents">
                                {uploadWork.documents.map((e, i) => (
                                    <div className="col-lg-3" key={i}>
                                        <figure className="figure">
                                            <img
                                                src={`/uploads/bg-upload-${e.skin}.png`}
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
                            <div id="recruitersComments"></div>
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
                                                onClick={viewImage(
                                                    internetResult
                                                )}
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
                                                onClick={viewImage(
                                                    computerSpecs
                                                )}
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
    addCandidate: PropTypes.func.isRequired,
    removeCandidate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    candidateState: state.candidateState,
});

export default connect(mapStateToProps, {
    setAlert,
    addCandidate,
    removeCandidate,
})(ViewResume);
