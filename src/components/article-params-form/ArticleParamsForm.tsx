import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useEffect, useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { Text } from '../../ui/text/Text';
import { RadioGroup } from '../../ui/radio-group/RadioGroup';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';
import { Select } from 'src/ui/select/Select';
import { Separator } from 'src/ui/separator/Separator';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
	onApply: (settings: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	onClose,
	onApply,
}: ArticleParamsFormProps) => {
	const formRef = useRef<HTMLDivElement>(null);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleFontFamilyChange = (
		option: (typeof fontFamilyOptions)[number]
	) => {
		setArticleState((prev) => ({ ...prev, fontFamilyOption: option }));
	};

	const handleFontColorChange = (option: (typeof fontColors)[number]) => {
		setArticleState((prev) => ({ ...prev, fontColor: option }));
	};

	const handleBackgroundColorChange = (
		option: (typeof backgroundColors)[number]
	) => {
		setArticleState((prev) => ({ ...prev, backgroundColor: option }));
	};

	const handleContentWidthChange = (
		option: (typeof contentWidthArr)[number]
	) => {
		setArticleState((prev) => ({ ...prev, contentWidth: option }));
	};

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[number]) => {
		setArticleState((prev) => ({ ...prev, fontSizeOption: option }));
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		onApply(defaultArticleState);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(articleState);
		onClose();
	};

	useEffect(() => {
		const handleClickOverlay = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOverlay);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOverlay);
		};
	}, [isOpen, onClose]);

	return (
		<>
			<div className={styles.wrapper}>
				<ArrowButton isOpen={isOpen} onClick={onToggle} />
			</div>
			<div
				className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}>
				<aside
					ref={formRef}
					className={`${styles.container} ${
						isOpen ? styles.container_open : ''
					}`}>
					<form
						className={styles.form}
						onSubmit={handleSubmit}
						onReset={handleReset}>
						<Text size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							selected={articleState.fontFamilyOption}
							title='шрифт'
							options={fontFamilyOptions}
							onChange={handleFontFamilyChange}
						/>
						<RadioGroup
							name='fontSize'
							title='Выберите размер'
							options={fontSizeOptions}
							selected={articleState.fontSizeOption}
							onChange={handleFontSizeChange}
						/>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={articleState.fontColor}
							onChange={handleFontColorChange}
						/>
						<Separator />
						<Select
							title='цвет фона'
							options={backgroundColors}
							selected={articleState.backgroundColor}
							onChange={handleBackgroundColorChange}
						/>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={articleState.contentWidth}
							onChange={handleContentWidthChange}
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
