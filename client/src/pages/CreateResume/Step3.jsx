import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Utils
import useUnsavedChangesWarning from './../../utils/useUnsavedChangesWarning';

// Action
import { setAlert } from './../../state/actions/alertAction';
import { addResume, clearError } from './../../state/actions/resumeAction';

// List
import { workspaceList } from './../../list/Workspace';
import { internetTypeList } from './../../list/InternetType';
import { hardwareTypeList } from './../../list/HardwareType';

// Components
import InternetResultModal from './InternetResultModal';
import ComputerSpecsModal from './ComputerSpecsModal';

const Step3 = ({
    setAlert,
    addResume,
    clearError,
    uploadFile,
    resumeState: { error },
}) => {
    const [
        Prompt,
        setDirty,
        setPristine,
        setMessage,
    ] = useUnsavedChangesWarning();

    const history = useHistory();

    const initialInfo = {
        workspace: 'Office',
        internetType: 'DSL',
        hardwareType: 'Desktop',
        brandName: '',
        internetResult: '',
        computerSpecs: '',
    };
    const initialModal = {
        internetResult: false,
        computerSpecs: false,
    };

    const [info, setInfo] = useState(initialInfo);
    const [modal, setModal] = useState(initialModal);
    const [submit, setSubmit] = useState(false);

    const {
        workspace,
        internetType,
        hardwareType,
        brandName,
        internetResult,
        computerSpecs,
    } = info;

    const onChange = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
        setDirty();
        setMessage('Are you sure you want to leave this page?');
    };

    const uploadModal = (name, value) => {
        setInfo({ ...info, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (
            JSON.stringify(info) === JSON.stringify(initialInfo) ||
            internetResult === '' ||
            computerSpecs === ''
        ) {
            return setAlert(
                '',
                'Please fill-in the required boxes to Proceed.'
            );
        } else {
            uploadFile({
                internetResult,
                computerSpecs,
            });
            addResume({
                workspace,
                internetType,
                hardwareType,
                brandName,
            });
            setInfo(initialInfo);
            setSubmit(true);
            setPristine();
        }
    };

    useEffect(() => {
        if (JSON.stringify(info) !== JSON.stringify(initialInfo)) {
            setDirty();
            setMessage('Are you sure you want to leave this page?');
        }

        if (error) {
            setAlert('', error.msg);
            clearError();
        }

        if (submit) {
            setSubmit(false);
            history.push({
                pathname: '/create-resume',
                search: 'step=4',
            });
        }

        // eslint-disable-next-line
    }, [info, submit, error]);

    return (
        <div className="step-3">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form-row">
                            <div className="left col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label
                                        htmlFor="workspaceInput"
                                        className="form-label"
                                    >
                                        Workspace
                                    </label>
                                    <select
                                        name="workspace"
                                        id="workspaceInput"
                                        className="form-control input"
                                        value={workspace}
                                        onChange={onChange}
                                    >
                                        {workspaceList().map((e, i) => (
                                            <option key={i} value={e}>
                                                {e}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="internetTypeInput"
                                        className="form-label"
                                    >
                                        Internet Type
                                    </label>
                                    <select
                                        name="internetType"
                                        id="internetTypeInput"
                                        className="form-control input"
                                        value={internetType}
                                        onChange={onChange}
                                    >
                                        {internetTypeList().map((e, i) => (
                                            <option key={i} value={e}>
                                                {e}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="hardwareTypeInput"
                                        className="form-label"
                                    >
                                        Hardware Type
                                    </label>
                                    <select
                                        name="hardwareType"
                                        id="hardwareTypeInput"
                                        className="form-control input"
                                        value={hardwareType}
                                        onChange={onChange}
                                    >
                                        {hardwareTypeList().map((e, i) => (
                                            <option key={i} value={e}>
                                                {e}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="brandNameInput"
                                        className="form-label"
                                    >
                                        Brand Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control input"
                                        id="brandNameInput"
                                        name="brandName"
                                        value={brandName}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <div className="right col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group">
                                    <p className="title">
                                        Internet Speedtest Result
                                    </p>
                                    <p className="subtitle">
                                        visit{' '}
                                        <a
                                            href="https://www.speedtest.net/"
                                            style={{ color: '#0c3961' }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            www.speedtest.net
                                        </a>
                                    </p>
                                    <button
                                        type="button"
                                        className="btn btn-primary upload-button"
                                        id="internetResultButton"
                                        onClick={() =>
                                            setModal({
                                                ...modal,
                                                internetResult: true,
                                            })
                                        }
                                    >
                                        Upload Speedtest Result
                                    </button>
                                    <p
                                        className={`upload${
                                            internetResult !== ''
                                                ? ' visible'
                                                : ''
                                        }`}
                                    >
                                        <label
                                            id="internetResultFile"
                                            className="selected-file"
                                        >
                                            {internetResult.name}
                                        </label>
                                        <label
                                            htmlFor="replaceInternetResultInput"
                                            className="replace-button"
                                        >
                                            Replace
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            name="internetResult"
                                            id="replaceInternetResultInput"
                                            className="form-control-file"
                                            onChange={(e) =>
                                                setInfo({
                                                    ...info,
                                                    internetResult:
                                                        e.target.files[0],
                                                })
                                            }
                                        />
                                    </p>
                                </div>
                                <div className="form-group">
                                    <p className="title">Computer Specs</p>
                                    <button
                                        type="button"
                                        className="btn btn-primary upload-button"
                                        onClick={() =>
                                            setModal({
                                                ...modal,
                                                computerSpecs: true,
                                            })
                                        }
                                    >
                                        Upload Computer Specs
                                    </button>
                                    <p
                                        className={`upload${
                                            computerSpecs !== ''
                                                ? ' visible'
                                                : ''
                                        }`}
                                    >
                                        <label
                                            id="computerSpecsFile"
                                            className="selected-file"
                                        >
                                            {computerSpecs.name}
                                        </label>
                                        <label
                                            htmlFor="replaceComputerSpecsInput"
                                            className="replace-button"
                                        >
                                            Replace
                                        </label>
                                        <input
                                            id="replaceComputerSpecsInput"
                                            type="file"
                                            accept="image/*"
                                            name="computerSpecs"
                                            className="form-control-file"
                                            onChange={(e) =>
                                                setInfo({
                                                    ...info,
                                                    computerSpecs:
                                                        e.target.files[0],
                                                })
                                            }
                                        />
                                    </p>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="submit"
                                        value="Proceed"
                                        className="btn btn-primary button"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {Prompt}
            {modal.internetResult ? (
                <InternetResultModal
                    isShow={modal.internetResult}
                    isHide={() => setModal({ ...modal, internetResult: false })}
                    uploadModal={uploadModal}
                />
            ) : null}
            {modal.computerSpecs ? (
                <ComputerSpecsModal
                    isShow={modal.computerSpecs}
                    isHide={() => setModal({ ...modal, computerSpecs: false })}
                    uploadModal={uploadModal}
                />
            ) : null}
        </div>
    );
};

Step3.propTypes = {
    setAlert: PropTypes.func.isRequired,
    addResume: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    resumeState: state.resumeState,
});

export default connect(mapStateToProps, { setAlert, clearError, addResume })(
    Step3
);
