import React, { useState, useEffect } from 'react';
import { Prompt } from 'react-router-dom';

const useUnsavedChangesWarning = () => {
    const [isDirty, setDirty] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        //Detecting browser closing
        window.onbeforeunload = isDirty && (() => message);

        return () => {
            window.onbeforeunload = null;
        };
    }, [isDirty, message]);
    const routerPrompt = <Prompt when={isDirty} message={message} />;

    return [
        routerPrompt,
        () => setDirty(true),
        () => setDirty(false),
        (msg) => setMessage(msg),
    ];
};

export default useUnsavedChangesWarning;
