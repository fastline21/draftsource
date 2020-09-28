import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// Utils
import useUnsavedChangesWarning from './../../utils/useUnsavedChangesWarning';

// Action
import { setAlert } from './../../state/actions/alertAction';

const Step2 = ({ uploadFile, setAlert }) => {
    const [
        Prompt,
        setDirty,
        setPristine,
        setMessage,
    ] = useUnsavedChangesWarning();
    const history = useHistory();

    const initialInfo = {
        resumeImage: '',
    };

    const [info, setInfo] = useState(initialInfo);
    const [load, setLoad] = useState(true);
    const [upload, setUpload] = useState(null);
    const [submit, setSubmit] = useState(false);

    const onChange = (e) => {
        const { name, files } = e.target;
        setInfo({ ...info, [name]: files[0] });
        setUpload(URL.createObjectURL(files[0]));
        setDirty();
        setMessage('Are you sure you want to leave this page?');
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (JSON.stringify(info) === JSON.stringify(initialInfo)) {
            return setAlert(
                '',
                'Please fill-in the required boxes to Proceed.'
            );
        } else {
            uploadFile(info);
            setInfo(initialInfo);
            setUpload(null);
            setSubmit(true);
            setPristine();
        }
    };

    useEffect(() => {
        if (load) {
            localStorage.clear();
            setLoad(false);
        }

        if (JSON.stringify(info) !== JSON.stringify(initialInfo)) {
            setDirty();
            setMessage('Are you sure you want to leave this page?');
        }

        if (submit) {
            setSubmit(false);
            history.push({
                pathname: '/create-resume',
                search: 'step=3',
            });
        }

        // eslint-disable-next-line
    }, [info, load, submit]);

    return (
        <div className="step-2">
            {Prompt}
            <div className="row">
                <div className="col-lg-6 offset-lg-3">
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form-group">
                            <p className="title">
                                Upload photo ID for verification
                            </p>
                            <div
                                className="upload"
                                style={
                                    upload
                                        ? {
                                              backgroundImage: `url(${upload})`,
                                          }
                                        : null
                                }
                            >
                                <span
                                    className={`top-right${
                                        upload ? ' invisible' : ''
                                    }`}
                                ></span>
                                <span
                                    className={`bottom-left${
                                        upload ? ' invisible' : ''
                                    }`}
                                ></span>
                                <p
                                    className={`caption${
                                        upload ? ' invisible' : ''
                                    }`}
                                >
                                    Drag or Upload from your mobile or desktop
                                </p>
                                <label
                                    htmlFor="resumeImageInput"
                                    className={`form-label${
                                        upload ? ' invisible' : ''
                                    }`}
                                >
                                    Upload
                                </label>
                                <input
                                    type="file"
                                    name="resumeImage"
                                    id="resumeImageInput"
                                    className="form-control-file input"
                                    accept="image/*"
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            {upload ? (
                                <>
                                    <label
                                        htmlFor="replaceUpload"
                                        className="btn btn-primary button replace"
                                    >
                                        Replace
                                    </label>
                                    <input
                                        type="file"
                                        name="replace"
                                        id="replaceUpload"
                                        className="d-none"
                                        onChange={onChange}
                                    />
                                    <br />
                                </>
                            ) : null}
                            <input
                                type="submit"
                                className="btn btn-primary button"
                                value="Get Started"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

Step2.propTypes = {
    setAlert: PropTypes.func.isRequired,
};
export default connect(null, { setAlert })(Step2);
