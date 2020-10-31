import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// Utils
import useUnsavedChangesWarning from './../../utils/useUnsavedChangesWarning';

// Action
import { setAlert } from './../../state/actions/alertAction';
import {
	resumeStep,
	clearError,
	resumeSuccess,
} from './../../state/actions/resumeAction';

const Step2 = ({
	uploadFile,
	setAlert,
	resumeStep,
	clearError,
	resumeSuccess,
	resumeState: { step, success, error },
}) => {
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
	const [upload, setUpload] = useState(null);

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
			return setAlert('', 'Please fill-in the required boxes to Proceed.');
		} else {
			uploadFile(info);
			setInfo(initialInfo);
			setUpload(null);
			resumeSuccess(true);
			setPristine();
		}
	};

	useEffect(() => {
		if (step === 2) {
			setDirty();
			setMessage('Are you sure you want to leave this page?');
		}

		if (step !== 2) {
			setPristine();
			setAlert(
				'/create-resume?step=1',
				'You are not authorize to go in this page. Please start at Step 1'
			);
		}

		if (error) {
			setDirty();
			setMessage('Are you sure you want to leave this page?');
			setAlert('', error.msg);
			clearError();
		}

		if (success) {
			resumeSuccess(false);
			resumeStep(3);
			history.push({
				pathname: '/create-resume',
				search: 'step=3',
			});
		}

		// eslint-disable-next-line
	}, [step, error, success]);

	return (
		<div className="step-2">
			{Prompt}
			<div className="row">
				<div className="col-lg-6 offset-lg-3">
					<form className="form" onSubmit={onSubmit}>
						<div className="form-group">
							<p className="title">Upload photo ID for verification</p>
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
									className={`top-right${upload ? ' invisible' : ''}`}
								></span>
								<span
									className={`bottom-left${upload ? ' invisible' : ''}`}
								></span>
								<p className={`caption${upload ? ' invisible' : ''}`}>
									Upload from your mobile or desktop
								</p>
								<label
									htmlFor="resumeImageInput"
									className={`form-label${upload ? ' invisible' : ''}`}
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
										name="resumeImage"
										id="replaceUpload"
										className="d-none"
										accept="image/*"
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
	resumeStep: PropTypes.func.isRequired,
	uploadFile: PropTypes.func.isRequired,
	clearError: PropTypes.func.isRequired,
	resumeSuccess: PropTypes.func.isRequired,
	resumeState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	resumeState: state.resumeState,
});

export default connect(mapStateToProps, {
	setAlert,
	resumeStep,
	clearError,
	resumeSuccess,
})(Step2);
