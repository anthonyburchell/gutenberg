/**
 * Internal dependencies
 */
import { name, settings } from '../';
import { blockEditRender } from 'blocks/test/helpers';

describe( 'core/more', () => {
	test( 'block edit matches snapshot', () => {
		const wrapper = blockEditRender( name, settings );

		expect( wrapper ).toMatchSnapshot();
	} );
} );
