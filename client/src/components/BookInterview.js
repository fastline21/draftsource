import { openPopupWidget } from 'react-calendly';

export const bookInterview = () => {
    return openPopupWidget({
        url: 'https://calendly.com/draftsourcevirtual/book-an-interview',
    });
};
