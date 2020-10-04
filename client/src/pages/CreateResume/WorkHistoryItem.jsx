import React from 'react';

const WorkHistoryItem = ({ index, workHistory, editWork, deleteWork }) => {
    const {
        title,
        company,
        monthStarted,
        yearStarted,
        monthEnded,
        yearEnded,
        description,
        about,
    } = workHistory;

    const onEdit = (e) => {
        e.preventDefault();
        editWork(index);
    };

    const onDelete = (e) => {
        e.preventDefault();
        deleteWork(index);
    };

    return (
        <div className="work-history-item">
            <div className="row">
                <div className="col-lg-4">
                    {title ? <h6 className="item position">{title}</h6> : null}
                    {company ? <p className="item">{company}</p> : null}
                    {monthStarted && yearStarted && monthEnded && yearEnded ? (
                        <p>
                            <span className="item">
                                {monthStarted} {yearStarted}
                            </span>{' '}
                            -{' '}
                            <span className="item">
                                {monthEnded} {yearEnded}
                            </span>
                        </p>
                    ) : null}
                </div>
                <div className="col-lg-8">
                    <div className="row">
                        <div className="col-lg-8 col-md-6">
                            <h6 className="description">Job Description</h6>
                        </div>
                        <div className="col-lg-4 col-md-6 d-flex justify-content-end action">
                            <div>
                                <button onClick={onEdit}>Edit</button>
                            </div>
                            <span>|</span>
                            <div>
                                <button onClick={onDelete}>Delete</button>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <p
                                className="item"
                                style={{ whiteSpace: 'pre-wrap' }}
                            >
                                {description}
                            </p>
                        </div>
                        <div className="col-lg-12 mt-4">
                            <h6 className="about">About</h6>
                            <p
                                className="item"
                                style={{ whiteSpace: 'pre-wrap' }}
                            >
                                {about}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkHistoryItem;
