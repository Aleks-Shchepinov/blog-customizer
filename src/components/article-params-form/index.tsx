export { ArticleParamsForm } from './ArticleParamsForm';
import { useState } from 'react';
import { ArticleParamsForm } from './ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

type FormProps = {
	onApply?: (settings: ArticleStateType) => void;
};

const Form = ({ onApply }: FormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [, setArticleState] = useState(defaultArticleState);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const handleToggleOverlay = () => {
		setIsOpen(false);
	};

	const handleApply = (settings: ArticleStateType) => {
		setArticleState(settings);
		onApply?.(settings);
	};

	return (
		<ArticleParamsForm
			isOpen={isOpen}
			onToggle={handleToggle}
			onClose={handleToggleOverlay}
			onApply={handleApply}
		/>
	);
};

export default Form;
