import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const PreLoader = ({ percent }) => {
	if (percent) {
		return (
			<div
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					height: '100vh',
					backgroundColor: 'rgba(255, 255, 255, 0.5)',
					zIndex: 1031,
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
					}}
				>
					{/* <PreLoader /> */}
					<div style={{ width: 100, height: 100 }}>
						<CircularProgressbar
							value={percent}
							text={`${percent}%`}
							styles={buildStyles({
								textColor: '#000',
								pathColor: '#0c3961',
							})}
						/>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="text-center">
				<div className="spinner-border" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
	}
};

export default PreLoader;
