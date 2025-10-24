'use client';

import React, { FC, memo } from 'react';
import useTradingViewWidget from '@/hooks/useTradingViewWidget';
import { cn } from '@/lib/utils';

type Props = {
	title?: string;
	scriptUrl: string;
	config: Record<string, unknown>;
	height?: number;
	className?: string;
};

const TradingViewWidget: FC<Props> = ({ title, scriptUrl, config, height = 600, className }) => {
	const containerRef = useTradingViewWidget(scriptUrl, config, height);

	return (
		<div className='w-full'>
			{title && <h3 className='font-semibold text-xl text-gray-100 mb-5'>{title}</h3>}
			<div className={cn('tradingview-widget-container', className)} ref={containerRef}>
				<div
					className='tradingview-widget-container__widget'
					style={{ height, width: '100%' }}
				/>
			</div>
		</div>
	);
};

export default memo(TradingViewWidget);
