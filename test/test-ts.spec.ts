import {typologica} from '..';

import { expect } from 'chai';
import 'mocha';

describe( 'ts type checking works', () => {
	it( 'test for string', () => {
		expect( typologica( 'asdf' ) ).equal( 'string' );
	} );
} );

