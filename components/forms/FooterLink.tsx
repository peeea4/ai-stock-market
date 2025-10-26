import Link from 'next/link';
import React, { FC } from 'react';

const FooterLink: FC<FooterLinkProps> = ({ text, href, linkText }) => {
	return (
		<div className='text-center pt-4'>
			<p className='text-sm text-gray-500'>
				{text}{' '}
				<Link href={href} className='footer-link'>
					{linkText}
				</Link>
			</p>
		</div>
	);
};

export default FooterLink;
