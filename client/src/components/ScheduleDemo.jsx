import { openPopupWidget } from 'react-calendly';

export default () => {
	return openPopupWidget({
		url: 'https://calendly.com/carlosalison/30min',
	});
};
